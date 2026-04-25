import express from "express";
import { userAuth, isCandidate } from "../middleware/userMiddleware.js";
import pool from "../config/db.js";
import { getTestQuestions } from "../controllers/getTestQuestions.js";
import { submitTest } from "../controllers/submitTest.js";

const router = express.Router();

router.get("/dashboard", userAuth, isCandidate, async (req, res) => {
  const candResult = await pool.query(
    "SELECT id FROM candidates WHERE user_id = $1",
    [req.user.id],
  );

  if (candResult.rows.length === 0) {
    return res.status(404).json({ error: "Candidate not found" });
  }

  const Candidate = candResult.rows[0].name;
  res.json({ msg: "Welcome Candidate", Candidate: Candidate });
});

router.get("/profile", userAuth, isCandidate, async (req, res) => {
  try {
    //  Get candidate_id
    const candResult = await pool.query(
      "SELECT id FROM candidates WHERE user_id = $1",
      [req.user.id],
    );

    if (candResult.rows.length === 0) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const candidate_id = candResult.rows[0].id;

    //  Fetch all data
    const [profile, education, experience, projects, skills, certifications] =
      await Promise.all([
        pool.query("SELECT * FROM candidate_profile WHERE candidate_id=$1", [
          candidate_id,
        ]),
        pool.query("SELECT * FROM education WHERE candidate_id=$1", [
          candidate_id,
        ]),
        pool.query("SELECT * FROM experience WHERE candidate_id=$1", [
          candidate_id,
        ]),
        pool.query("SELECT * FROM projects WHERE candidate_id=$1", [
          candidate_id,
        ]),
        pool.query("SELECT * FROM skills WHERE candidate_id=$1", [
          candidate_id,
        ]),
        pool.query("SELECT * FROM certifications WHERE candidate_id=$1", [
          candidate_id,
        ]),
      ]);

    //  Response
    res.status(200).json({
      profile: profile.rows[0] || null,
      education: education.rows,
      experience: experience.rows,
      projects: projects.rows,
      skills: skills.rows,
      certifications: certifications.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/profile", userAuth, isCandidate, async (req, res) => {
  const client = await pool.connect();

  try {
    //  Get candidate_id
    const candResult = await client.query(
      "SELECT id FROM candidates WHERE user_id = $1",
      [req.user.id],
    );

    if (candResult.rows.length === 0) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const candidate_id = candResult.rows[0].id;

    const {
      profile_photo,
      resume_url,
      profile_summary,
      experience_years,
      expected_salary,
      current_location,
      preferred_location,
      current_address,
      permanent_address,
      linkedin_url,
      github_url,
      portfolio_url,
      education = [],
      experience = [],
      projects = [],
      skills = [],
      certifications = [],
    } = req.body;

    // validation
    if (!resume_url || !profile_summary) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    //  START TRANSACTION
    await client.query("BEGIN");

    // UPSERT candidate_profile
    await client.query(
      `
      INSERT INTO candidate_profile (
        candidate_id,
        profile_photo,
        resume_url,
        profile_summary,
        experience_years,
        expected_salary,
        current_location,
        preferred_location,
        current_address,
        permanent_address,
        linkedin_url,
        github_url,
        portfolio_url
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      ON CONFLICT (candidate_id)
      DO UPDATE SET
        profile_photo = EXCLUDED.profile_photo,
        resume_url = EXCLUDED.resume_url,
        profile_summary = EXCLUDED.profile_summary,
        experience_years = EXCLUDED.experience_years,
        expected_salary = EXCLUDED.expected_salary,
        current_location = EXCLUDED.current_location,
        preferred_location = EXCLUDED.preferred_location,
        current_address = EXCLUDED.current_address,
        permanent_address = EXCLUDED.permanent_address,
        linkedin_url = EXCLUDED.linkedin_url,
        github_url = EXCLUDED.github_url,
        portfolio_url = EXCLUDED.portfolio_url,
        updated_at = CURRENT_TIMESTAMP
      `,
      [
        candidate_id,
        profile_photo,
        resume_url,
        profile_summary,
        experience_years,
        expected_salary,
        current_location,
        preferred_location,
        current_address,
        permanent_address,
        linkedin_url,
        github_url,
        portfolio_url,
      ],
    );

    //  DELETE old data
    await client.query("DELETE FROM education WHERE candidate_id=$1", [
      candidate_id,
    ]);
    await client.query("DELETE FROM experience WHERE candidate_id=$1", [
      candidate_id,
    ]);
    await client.query("DELETE FROM projects WHERE candidate_id=$1", [
      candidate_id,
    ]);
    await client.query("DELETE FROM skills WHERE candidate_id=$1", [
      candidate_id,
    ]);
    await client.query("DELETE FROM certifications WHERE candidate_id=$1", [
      candidate_id,
    ]);

    //  INSERT education
    for (let edu of education) {
      await client.query(
        `INSERT INTO education (candidate_id, level, board_university, institute_name, field_of_study, passing_year, grading_type,score)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          candidate_id,
          edu.level,
          edu.board_university,
          edu.institute_name,
          edu.field_of_study,
          edu.passing_year,
          edu.grading_type,
          edu.score,
        ],
      );
    }

    //  INSERT skills
    for (let skill of skills) {
      await client.query(
        `INSERT INTO skills (candidate_id, skill_name, proficiency)
         VALUES ($1,$2,$3)`,
        [candidate_id, skill.skill_name, skill.proficiency],
      );
    }

    // INSERT experience
    for (let exp of experience) {
      await client.query(
        `INSERT INTO experience (candidate_id, company_name, job_title, start_date, end_date, is_current, description)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          candidate_id,
          exp.company_name,
          exp.job_title,
          exp.start_date,
          exp.end_date,
          exp.is_current,
          exp.description,
        ],
      );
    }

    //  INSERT projects
    for (let proj of projects) {
      await client.query(
        `INSERT INTO projects (candidate_id, project_title, description, technologies_used, project_link, github_link)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          candidate_id,
          proj.project_title,
          proj.description,
          proj.technologies_used,
          proj.project_link,
          proj.github_link,
        ],
      );
    }

    //  INSERT certifications
    for (let cert of certifications) {
      await client.query(
        `INSERT INTO certifications (candidate_id, certificate_name, issuing_organization, issue_date, credential_url)
         VALUES ($1,$2,$3,$4,$5)`,
        [
          candidate_id,
          cert.certificate_name,
          cert.issuing_organization,
          cert.issue_date,
          cert.credential_url,
        ],
      );
    }

    // COMMIT
    await client.query("COMMIT");

    res.status(200).json({ message: "Profile saved successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
});

router.post("/apply/:jobId", userAuth, isCandidate, async (req, res) => {
  const client = await pool.connect();

  try {
    const jobId = req.params.jobId;
    const { cover_letter } = req.body;

    await client.query("BEGIN");

    const jobCheck = await client.query("SELECT id FROM jobs WHERE id = $1", [
      jobId,
    ]);

    if (jobCheck.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Job not found" });
    }
    // Get best education
    const candResult = await client.query(
      `SELECT c.id,
              e.field_of_study,
              e.score,
              e.level,
              e.grading_type
       FROM candidates c
       LEFT JOIN education e ON c.id = e.candidate_id
       WHERE c.user_id = $1
       ORDER BY 
      CASE e.level
        WHEN 'Post-Graduation' THEN 5
        WHEN 'Graduation' THEN 4
        WHEN 'Diploma' THEN 3
        WHEN 'HSC' THEN 2
        WHEN 'SSC' THEN 1
      END DESC,
      e.passing_year DESC
    LIMIT 1`,
      [req.user.id],
    );

    if (candResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Candidate not found" });
    }

    const candidate = candResult.rows[0];

    // Check duplicate
    const existing = await client.query(
      `SELECT 1 FROM applications 
       WHERE candidate_id = $1 AND job_id = $2`,
      [candidate.id, jobId],
    );

    if (existing.rows.length > 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Already applied" });
    }

    //  Get eligibility
    const eligibilityResult = await client.query(
      `SELECT * FROM job_eligibility WHERE job_id = $1`,
      [jobId],
    );

    if (eligibilityResult.rows.length > 0) {
      const eligibility = eligibilityResult.rows[0];

      //  Education level check
      if (eligibility.min_education) {
        const levels = [
          "SSC",
          "HSC",
          "Diploma",
          "Graduation",
          "Post-Graduation",
        ];

        if (!candidate.level) {
          await client.query("ROLLBACK");
          return res.status(400).json({
            error: "Candidate education not found",
          });
        }

        if (
          levels.indexOf(candidate.level) <
          levels.indexOf(eligibility.min_education)
        ) {
          await client.query("ROLLBACK");
          return res.status(400).json({
            error: "Not eligible (Education level)",
          });
        }
      }

      // brach check
      if (
        eligibility.allowed_branches &&
        eligibility.allowed_branches.length > 0
      ) {
        const allowed = eligibility.allowed_branches.map((b) =>
          b.toLowerCase(),
        );

        const candidateBranch = candidate.field_of_study?.toLowerCase();

        const isMatch = allowed.some((branch) =>
          candidateBranch?.includes(branch),
        );

        if (!isMatch) {
          await client.query("ROLLBACK");
          return res.status(400).json({
            error: "Not eligible (Branch)",
          });
        }
      }

      //CGPA check
      if (eligibility.min_cgpa !== null && eligibility.min_cgpa !== undefined) {
        if (!candidate.score) {
          await client.query("ROLLBACK");
          return res.status(400).json({
            error: "Candidate score not available",
          });
        }

        if (candidate.grading_type === "PERCENTAGE") {
          await client.query("ROLLBACK");
          return res.status(400).json({
            error: "Not eligible (CGPA required)",
          });
        }

        if (candidate.score < eligibility.min_cgpa) {
          await client.query("ROLLBACK");
          return res.status(400).json({
            error: "Not eligible (CGPA)",
          });
        }
      }
    }

    // lets score candidate
    const jobResult = await client.query(
      `SELECT skills_required, experience_required 
   FROM jobs WHERE id = $1`,
      [jobId],
    );

    const job = jobResult.rows[0];

    // candidate skills
    const skillResult = await client.query(
      `SELECT skill_name FROM skills WHERE candidate_id = $1`,
      [candidate.id],
    );

    // projects
    const projectResult = await client.query(
      `SELECT technologies_used FROM projects WHERE candidate_id = $1`,
      [candidate.id],
    );

    // experience
    const expResult = await client.query(
      `SELECT start_date, end_date, is_current FROM experience 
   WHERE candidate_id = $1`,
      [candidate.id],
    );

    let score = 0;
    // skills score
    const jobSkills = job.skills_required || [];
    const candidateSkills = skillResult.rows.map((s) =>
      s.skill_name.toLowerCase(),
    );

    let matchedSkills = 0;

    jobSkills.forEach((js) => {
      if (candidateSkills.some((cs) => cs.includes(js.toLowerCase()))) {
        matchedSkills++;
      }
    });

    if (jobSkills.length > 0) {
      const skillScore = (matchedSkills / jobSkills.length) * 50;
      score += skillScore;
    }
    // project score
    let projectMatches = 0;

    projectResult.rows.forEach((p) => {
      const tech = p.technologies_used?.toLowerCase() || "";

      const matched = jobSkills.some((js) => tech.includes(js.toLowerCase()));

      if (matched) projectMatches++;
    });

    if (projectResult.rows.length > 0) {
      const projectScore = Math.min(projectMatches * 10, 30);

      score += projectScore;
    }

    let totalMonths = 0;

    expResult.rows.forEach((exp) => {
      const start = new Date(exp.start_date);
      const end = exp.is_current ? new Date() : new Date(exp.end_date);

      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

      totalMonths += months;
    });

    const totalYears = totalMonths / 12;

    if (
      job.experience_required !== null &&
      job.experience_required !== undefined
    ) {
      if (job.experience_required === 0) {
        // Fresher job → everyone gets full score
        score += 20;
      } else {
        const expScore = Math.min(
          (totalYears / job.experience_required) * 20,
          20,
        );

        score += expScore;
      }
    }

    score = Math.round(score);
    // Insert
    await client.query(
      `INSERT INTO applications 
       (candidate_id, job_id, cover_letter,match_score)
       VALUES ($1,$2,$3,$4)`,
      [candidate.id, jobId, cover_letter, score],
    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "Application submitted successfully",
      match_score: score,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
});

router.get("/test/:jobId", getTestQuestions);
router.post("test/submit", submitTest);

export default router;

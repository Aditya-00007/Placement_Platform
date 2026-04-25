import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminMiddleware.js";
import pool from "../config/db.js";
import { uploadQuestionsCSV } from "../controllers/UploadQuestionsCSV.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const candidates = await pool.query("SELECT COUNT(*) FROM candidates");
    const employers = await pool.query("SELECT COUNT(*) FROM employers");
    const jobs = await pool.query("SELECT COUNT(*) FROM jobs");
    const applications = await pool.query("SELECT COUNT(*) FROM applications");

    res.json({
      candidates: parseInt(candidates.rows[0].count),
      employers: parseInt(employers.rows[0].count),
      jobs: parseInt(jobs.rows[0].count),
      applications: parseInt(applications.rows[0].count),
    });
  } catch (err) {
    console.error("STATS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/jobs", adminAuth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        j.id,
        j.title,
        j.location,
        j.job_type,
        j.status,
        e.company_name,
        COUNT(a.id) AS application_count
      FROM jobs j
      JOIN employer_profile e 
        ON j.posted_by = e.employer_id
      LEFT JOIN applications a 
        ON j.id = a.job_id
      GROUP BY j.id, e.company_name
      ORDER BY j.created_at DESC
    `);

    res.json({ jobs: result.rows });
  } catch (err) {
    console.error("GET JOBS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/jobs/:id", adminAuth, async (req, res) => {
  try {
    const jobId = req.params.id;

    const result = await pool.query(
      `SELECT 
        j.*,
        e.min_education,
        e.min_cgpa,
        e.allowed_branches
      FROM jobs j
      LEFT JOIN job_eligibility e ON j.id = e.job_id
      WHERE j.id = $1 `,
      [jobId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    const row = result.rows[0];

    const job = {
      ...row,
      eligibility: {
        min_education: row.min_education,
        min_cgpa: row.min_cgpa,
        allowed_branches: row.allowed_branches,
      },
    };

    res.json({ job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/jobs/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM jobs WHERE id = $1", [id]);

    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    console.error("DELETE JOB ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/jobs/:id/close", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("UPDATE jobs SET status = 'CLOSED' WHERE id = $1", [id]);

    res.json({ msg: "Job closed successfully" });
  } catch (err) {
    console.error("CLOSE JOB ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/candidates", adminAuth, async (req, res) => {
  const { search } = req.query;

  const result = await pool.query(
    `
    SELECT 
      c.id,
      u.email,
      c.name,
      cp.current_location,
      cp.experience_years,
      ARRAY(
        SELECT s.skill_name 
        FROM skills s 
        WHERE s.candidate_id = c.id
      ) AS skills
    FROM candidates c
    JOIN users u ON c.user_id = u.id
    LEFT JOIN candidate_profile cp ON c.id = cp.candidate_id
    WHERE c.name ILIKE $1
  `,
    [`%${search || ""}%`],
  );

  res.json({ candidates: result.rows });
});

router.get("/candidates/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Basic info
    const basic = await pool.query(
      `
      SELECT 
        c.id,
        c.name,
        u.email
      FROM candidates c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = $1
    `,
      [id],
    );

    if (basic.rows.length === 0) {
      return res.status(404).json({ msg: "Candidate not found" });
    }

    // 2. Profile
    const profile = await pool.query(
      `
      SELECT * FROM candidate_profile
      WHERE candidate_id = $1
    `,
      [id],
    );

    // 3. Education
    const education = await pool.query(
      `
      SELECT * FROM education
      WHERE candidate_id = $1
      ORDER BY passing_year DESC
    `,
      [id],
    );

    // 4. Skills
    const skills = await pool.query(
      `
      SELECT skill_name, proficiency
      FROM skills
      WHERE candidate_id = $1
    `,
      [id],
    );

    // 5. Projects
    const projects = await pool.query(
      `
      SELECT * FROM projects
      WHERE candidate_id = $1
    `,
      [id],
    );

    // 6. Experience
    const experience = await pool.query(
      `
      SELECT * FROM experience
      WHERE candidate_id = $1
    `,
      [id],
    );

    res.json({
      basic: basic.rows[0],
      profile: profile.rows[0] || null,
      education: education.rows,
      skills: skills.rows,
      projects: projects.rows,
      experience: experience.rows,
    });
  } catch (err) {
    console.error("GET CANDIDATE DETAILS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/candidates/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM candidates WHERE id = $1", [id]);

  res.json({ msg: "Candidate deleted" });
});

router.get("/employers", adminAuth, async (req, res) => {
  const { filter } = req.query;

  let condition = "";

  if (filter === "PENDING") {
    condition = "WHERE is_approved = FALSE";
  } else if (filter === "APPROVED") {
    condition = "WHERE is_approved = TRUE";
  }

  const result = await pool.query(`
    SELECT *
    FROM employer_profile
    ${condition}
    ORDER BY created_at DESC
  `);

  res.json({ employers: result.rows });
});

router.put("/employers/:id/approve", adminAuth, async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "UPDATE employer_profile SET is_approved = TRUE WHERE employer_id = $1",
    [id],
  );

  res.json({ msg: "Employer approved" });
});

router.put("/employers/:id/reject", adminAuth, async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "UPDATE employer_profile SET is_approved = FALSE WHERE employer_id = $1",
    [id],
  );

  res.json({ msg: "Employer rejected" });
});

router.post(
  "/upload-questions",
  adminAuth,
  upload.single("file"),
  uploadQuestionsCSV,
);

export default router;

import express from "express";
import { userAuth, isEmployer } from "../middleware/userMiddleware.js";
import client from "../config/db.js";
import pool from "../config/db.js";
import { createTestConfig } from "../controllers/CreateTestConfig.js";
import { addTestRules } from "../controllers/AddTestRules.js";

const router = express.Router();

router.get("/dashboard", userAuth, isEmployer, async (req, res) => {
  const empResult = await pool.query(
    "SELECT id FROM employers WHERE user_id = $1",
    [req.user.id],
  );

  if (empResult.rows.length === 0) {
    return res.status(404).json({ error: "Employer not found" });
  }
  const employer_id = empResult.rows[0].id;
  // Stats
  const statsQuery = await pool.query(
    `
    SELECT 
      (SELECT COUNT(*) FROM jobs WHERE posted_by=$1) AS total_jobs,
      (SELECT COUNT(*) FROM applications a 
        JOIN jobs j ON a.job_id=j.id 
        WHERE j.posted_by=$1) AS total_applications,
      (SELECT COUNT(*) FROM applications a 
        JOIN jobs j ON a.job_id=j.id 
        WHERE j.posted_by=$1 AND a.status='SHORTLISTED') AS shortlisted,
      (SELECT COUNT(*) FROM applications a 
        JOIN jobs j ON a.job_id=j.id 
        WHERE j.posted_by=$1 AND a.status='HIRED') AS hired
  `,
    [employer_id],
  );

  // Jobs
  const jobsQuery = await pool.query(
    `SELECT id, title, location, status 
     FROM jobs WHERE posted_by=$1 
     ORDER BY created_at DESC LIMIT 5`,
    [employer_id],
  );

  // Applications
  const appsQuery = await pool.query(
    `
    SELECT a.id, a.status, c.name AS candidate_name, j.title AS job_title
    FROM applications a
    JOIN jobs j ON a.job_id=j.id
    JOIN candidates c ON a.candidate_id=c.id
    WHERE j.posted_by=$1
    ORDER BY a.applied_at DESC LIMIT 5
  `,
    [employer_id],
  );

  res.json({
    stats: {
      totalJobs: statsQuery.rows[0].total_jobs,
      totalApplications: statsQuery.rows[0].total_applications,
      shortlisted: statsQuery.rows[0].shortlisted,
      hired: statsQuery.rows[0].hired,
    },
    jobs: jobsQuery.rows,
    applications: appsQuery.rows,
  });
});

router.get("/profile", userAuth, isEmployer, async (req, res) => {
  try {
    //  Get employer_id
    console.log("USER:", req.user);
    const empResult = await pool.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;

    //  Fetch all data
    const emp_profile = await pool.query(
      "SELECT * FROM employer_profile WHERE employer_id=$1",
      [employer_id],
    );

    //  Response
    res.status(200).json({
      profile: emp_profile.rows[0] || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/status", userAuth, isEmployer, async (req, res) => {
  try {
    const empResult = await pool.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;

    const emp_profile = await pool.query(
      "SELECT is_approved FROM employer_profile WHERE employer_id=$1",
      [employer_id],
    );

    res.status(200).json({
      isApproved: emp_profile.rows[0]?.is_approved ?? false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/profile", userAuth, isEmployer, async (req, res) => {
  try {
    const empResult = await pool.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;
    const {
      company_name,
      company_description,
      company_logo_url,
      company_website,
      address,
      city,
      state,
      country,
      employee_count,
      industry,
      contact_email,
      contact_phone,
      linkedin_url,
      twitter_url,
      founded_year,
      hr_name,
    } = req.body;

    if (
      !company_name ||
      !industry ||
      !contact_email ||
      !address ||
      !city ||
      !state ||
      !country
    ) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const query = `
      INSERT INTO employer_profile (
        employer_id,
        company_name,
        company_description,
        company_logo_url,
        company_website,
        address,
        city,
        state,
        country,
        employee_count,
        industry,
        contact_email,
        contact_phone,
        linkedin_url,
        twitter_url,
        founded_year,
        hr_name
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,$15,$16,$17
      )
      ON CONFLICT (employer_id)
      DO UPDATE SET
        company_name = EXCLUDED.company_name,
        company_description = EXCLUDED.company_description,
        company_logo_url = EXCLUDED.company_logo_url,
        company_website = EXCLUDED.company_website,
        address = EXCLUDED.address,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        country = EXCLUDED.country,
        employee_count = EXCLUDED.employee_count,
        industry = EXCLUDED.industry,
        contact_email = EXCLUDED.contact_email,
        contact_phone = EXCLUDED.contact_phone,
        linkedin_url = EXCLUDED.linkedin_url,
        twitter_url = EXCLUDED.twitter_url,
        founded_year = EXCLUDED.founded_year,
        hr_name = EXCLUDED.hr_name,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const values = [
      employer_id,
      company_name,
      company_description,
      company_logo_url,
      company_website,
      address,
      city,
      state,
      country,
      employee_count,
      industry,
      contact_email,
      contact_phone,
      linkedin_url,
      twitter_url,
      founded_year,
      hr_name,
    ];

    const result = await pool.query(query, values);

    res.status(200).json({
      message: "Profile saved successfully",
      profile: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/jobs", userAuth, isEmployer, async (req, res) => {
  const {
    title,
    description,
    requirements,
    responsibilities,
    location,
    job_type,
    work_mode,
    salary_min,
    salary_max,
    experience_required,
    skills_required,
    application_deadline,
    eligibility,
  } = req.body;
  if (!title || !description || !location) {
    return res.status(400).json({
      error: "Required fields missing",
    });
  }
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    //  Get employer_id
    const empResult = await client.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;

    //  Insert into jobs
    const jobResult = await client.query(
      `INSERT INTO jobs 
      (title, description, requirements, responsibilities,
       location, job_type, work_mode,
       salary_min, salary_max,
       experience_required, skills_required,
       application_deadline, posted_by)
       
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING id`,
      [
        title,
        description,
        requirements,
        responsibilities,
        location,
        job_type,
        work_mode,
        salary_min,
        salary_max,
        experience_required,
        skills_required,
        application_deadline,
        employer_id,
      ],
    );

    const job_id = jobResult.rows[0].id;

    //  Insert eligibility
    if (eligibility) {
      const { min_education, min_cgpa, allowed_branches } = eligibility;

      await client.query(
        `INSERT INTO job_eligibility 
        (job_id, min_education, min_cgpa, allowed_branches)
        VALUES ($1,$2,$3,$4)`,
        [job_id, min_education, min_cgpa, allowed_branches],
      );
    }

    await client.query("COMMIT");
    res.status(201).json({
      message: "Job posted successfully",
      job_id,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
});

router.put("/jobs/:id", userAuth, isEmployer, async (req, res) => {
  const jobId = req.params.id;

  const {
    title,
    description,
    requirements,
    responsibilities,
    location,
    job_type,
    work_mode,
    salary_min,
    salary_max,
    experience_required,
    skills_required,
    application_deadline,
    status,
    eligibility,
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 🔹 Get employer_id
    const empResult = await client.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;

    // 🔹 SECURITY: check job belongs to employer
    const jobCheck = await client.query(
      "SELECT id FROM jobs WHERE id = $1 AND posted_by = $2",
      [jobId, employer_id],
    );

    if (jobCheck.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(403).json({ error: "Unauthorized job access" });
    }

    // 🔹 UPDATE jobs table
    await client.query(
      `UPDATE jobs SET
        title=$1,
        description=$2,
        requirements=$3,
        responsibilities=$4,
        location=$5,
        job_type=$6,
        work_mode=$7,
        salary_min=$8,
        salary_max=$9,
        experience_required=$10,
        skills_required=$11,
        application_deadline=$12,
        status=$13
      WHERE id=$14`,
      [
        title,
        description,
        requirements,
        responsibilities,
        location,
        job_type,
        work_mode,
        salary_min,
        salary_max,
        experience_required,
        skills_required,
        application_deadline,
        status,
        jobId,
      ],
    );

    // 🔹 UPDATE eligibility
    if (eligibility) {
      const { min_education, min_cgpa, allowed_branches } = eligibility;

      await client.query(
        `UPDATE job_eligibility
         SET min_education=$1,
             min_cgpa=$2,
             allowed_branches=$3
         WHERE job_id=$4`,
        [min_education, min_cgpa, allowed_branches, jobId],
      );
    }

    await client.query("COMMIT");

    res.json({ message: "Job updated successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("🔥 UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

router.get("/jobs", userAuth, isEmployer, async (req, res) => {
  const { filter, sort } = req.query;

  const empResult = await pool.query(
    "SELECT id FROM employers WHERE user_id = $1",
    [req.user.id],
  );

  if (empResult.rows.length === 0) {
    return res.status(404).json({ error: "Employer not found" });
  }

  const employer_id = empResult.rows[0].id;

  let query = `
    SELECT 
      j.id,
      j.title,
      j.location,
      j.job_type,
      j.status,
      j.created_at,
      (SELECT COUNT(*) FROM applications a WHERE a.job_id = j.id) AS application_count
    FROM jobs j
    WHERE j.posted_by = $1
  `;

  const values = [employer_id];

  // FILTER
  if (filter && filter !== "ALL") {
    values.push(filter);
    query += ` AND j.status = $${values.length}`;
  }

  // SORT
  if (sort === "oldest") {
    query += ` ORDER BY j.created_at ASC`;
  } else {
    query += ` ORDER BY j.created_at DESC`;
  }

  const result = await pool.query(query, values);

  res.json({ jobs: result.rows });
});

router.get("/jobs/:id", userAuth, isEmployer, async (req, res) => {
  try {
    const jobId = req.params.id;

    const empResult = await pool.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;

    const result = await pool.query(
      `SELECT 
        j.*,
        e.min_education,
        e.min_cgpa,
        e.allowed_branches
      FROM jobs j
      LEFT JOIN job_eligibility e ON j.id = e.job_id
      WHERE j.id = $1 AND j.posted_by = $2`,
      [jobId, employer_id],
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

router.get("/jobs-list", userAuth, isEmployer, async (req, res) => {
  const empResult = await pool.query(
    "SELECT id FROM employers WHERE user_id = $1",
    [req.user.id],
  );

  if (empResult.rows.length === 0) {
    return res.status(404).json({ error: "Employer not found" });
  }
  const employer_id = empResult.rows[0].id;
  const result = await pool.query(
    "SELECT id, title FROM jobs WHERE posted_by=$1",
    [employer_id],
  );
  res.json(result.rows);
});

router.delete("/jobs/:id", userAuth, isEmployer, async (req, res) => {
  const jobId = req.params.id;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    //  Get employer_id
    const empResult = await client.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;

    //  Check ownership
    const jobCheck = await client.query(
      "SELECT id FROM jobs WHERE id = $1 AND posted_by = $2",
      [jobId, employer_id],
    );

    if (jobCheck.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(403).json({ error: "Unauthorized" });
    }

    //  Delete job (CASCADE will handle related tables)
    await client.query("DELETE FROM jobs WHERE id = $1", [jobId]);

    await client.query("COMMIT");

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

router.get("/applications", userAuth, isEmployer, async (req, res) => {
  const { job, status, sort } = req.query;
  const empResult = await pool.query(
    "SELECT id FROM employers WHERE user_id = $1",
    [req.user.id],
  );

  if (empResult.rows.length === 0) {
    return res.status(404).json({ error: "Employer not found" });
  }
  const employer_id = empResult.rows[0].id;

  let query = `
    SELECT 
      a.id,
      a.status,
      a.match_score,
      a.applied_at,
      c.name AS candidate_name,
      j.title AS job_title
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    JOIN candidates c ON a.candidate_id = c.id
    WHERE j.posted_by = $1
  `;

  const values = [employer_id];

  // FILTER: Job
  if (job && job !== "ALL") {
    query += ` AND j.id = ${job}`;
  }

  // FILTER: Status
  if (status && status !== "ALL") {
    query += ` AND a.status = '${status}'`;
  }

  // SORT
  if (sort === "oldest") {
    query += ` ORDER BY a.applied_at ASC`;
  } else {
    query += ` ORDER BY a.applied_at DESC`;
  }

  const result = await pool.query(query, values);
  res.json(result.rows);
});

router.patch(
  "/applications/:id/status",
  userAuth,
  isEmployer,
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["SHORTLISTED", "REJECTED", "HIRED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid status",
      });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Get employer_id
      const empResult = await client.query(
        "SELECT id FROM employers WHERE user_id = $1",
        [req.user.id],
      );

      if (empResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "Employer not found" });
      }

      const employer_id = empResult.rows[0].id;

      // Check if application belongs to employer's job
      const appResult = await client.query(
        `SELECT a.id 
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       WHERE a.id = $1 AND j.posted_by = $2`,
        [id, employer_id],
      );

      if (appResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({
          error: "Application not found or unauthorized",
        });
      }

      // Update status
      await client.query(
        `UPDATE applications 
       SET status = $1 
       WHERE id = $2`,
        [status, id],
      );

      await client.query("COMMIT");

      res.status(200).json({
        message: `Application ${status.toLowerCase()} successfully`,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: "Server error" });
    } finally {
      client.release();
    }
  },
);

router.post("/test-config", userAuth, isEmployer, createTestConfig);
router.post("/test-rules", userAuth, isEmployer, addTestRules);
router.get("/test-status/:jobId", userAuth, isEmployer, async (req, res) => {
  const { jobId } = req.params;

  try {
    const result = await pool.query(
      "SELECT id FROM test_configs WHERE job_id = $1",
      [jobId],
    );

    res.json({
      hasTest: result.rows.length > 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

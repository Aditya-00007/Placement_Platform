import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get public job listings
router.get("/jobs", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        j.id, j.title, j.description, j.requirements, j.responsibilities,
        j.location, j.job_type, j.work_mode, j.salary_min, j.salary_max,
        j.experience_required, j.skills_required, j.status, j.application_deadline,
        j.created_at,
        COALESCE(e.company_name, 'Partner Enterprise') AS company_name,
        e.company_website, e.company_logo_url, e.city, e.industry,
        el.min_education, el.min_cgpa, el.allowed_branches,
        tc.duration AS test_duration, tc.passing_score
      FROM jobs j
      LEFT JOIN employer_profile e ON j.posted_by = e.employer_id
      LEFT JOIN job_eligibility el ON j.id = el.job_id
      LEFT JOIN test_configs tc ON j.id = tc.job_id
      WHERE j.status = 'OPEN'
      ORDER BY j.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Public jobs error:", err.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Get single job details
router.get("/jobs/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        j.id, j.title, j.description, j.requirements, j.responsibilities,
        j.location, j.job_type, j.work_mode, j.salary_min, j.salary_max,
        j.experience_required, j.skills_required, j.status, j.application_deadline,
        j.created_at,
        COALESCE(e.company_name, 'Partner Enterprise') AS company_name,
        e.company_website, e.company_logo_url, e.city, e.industry,
        el.min_education, el.min_cgpa, el.allowed_branches,
        tc.duration AS test_duration, tc.passing_score
      FROM jobs j
      LEFT JOIN employer_profile e ON j.posted_by = e.employer_id
      LEFT JOIN job_eligibility el ON j.id = el.job_id
      LEFT JOIN test_configs tc ON j.id = tc.job_id
      WHERE j.id = $1
    `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Public job details error:", err.message);
    res.status(500).json({ error: "Failed to fetch job details" });
  }
});

// Get public overview stats
router.get("/stats", async (req, res) => {
  try {
    const jobs = await pool.query("SELECT COUNT(*) FROM jobs WHERE status = 'OPEN'");
    const candidates = await pool.query("SELECT COUNT(*) FROM candidates");
    const employers = await pool.query("SELECT COUNT(*) FROM employers");

    res.json({
      open_jobs: parseInt(jobs.rows[0].count, 10),
      candidates: parseInt(candidates.rows[0].count, 10),
      employers: parseInt(employers.rows[0].count, 10),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch platform stats" });
  }
});

export default router;

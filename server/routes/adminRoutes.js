import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminMiddleware.js";
import pool from "../config/db.js";

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

export default router;

import pool from "../config/db.js";

export const createTestConfig = async (req, res) => {
  const { job_id, duration, passing_score } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO test_configs (job_id, duration, passing_score)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [job_id, duration, passing_score],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("CONFIG ERROR:", err);
    if (err.code === "23505") {
      return res.status(400).json({
        error: "Test already exists for this job",
      });
    }

    res.status(500).json({ error: err.message });
  }
};

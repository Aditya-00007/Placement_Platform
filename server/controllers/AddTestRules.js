import pool from "../config/db.js";

export const addTestRules = async (req, res) => {
  const { test_config_id, rules } = req.body;

  try {
    for (let rule of rules) {
      await pool.query(
        `INSERT INTO test_config_rules 
        (test_config_id, skill, difficulty, question_count)
        VALUES ($1, $2, $3, $4)`,
        [test_config_id, rule.skill, rule.difficulty, rule.question_count],
      );
    }

    res.json({ message: "Rules added successfully" });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Test already exists for this job" });
    }
    res.status(500).json({ error: err.message });
  }
};

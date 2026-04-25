export const getTestQuestions = async (req, res) => {
  const { jobId } = req.params;

  try {
    // 1. Get test config
    const configRes = await db.query(
      "SELECT * FROM test_configs WHERE job_id = $1",
      [jobId],
    );

    if (configRes.rows.length === 0) {
      return res.status(404).json({ error: "No test config found" });
    }

    const config = configRes.rows[0];

    // 2. Get rules
    const rulesRes = await db.query(
      "SELECT * FROM test_config_rules WHERE test_config_id = $1",
      [config.id],
    );

    let questions = [];

    // 3. Fetch questions per rule
    for (let rule of rulesRes.rows) {
      const qRes = await db.query(
        `SELECT id, question, option_a, option_b, option_c, option_d
         FROM questions
         WHERE skill = $1 AND difficulty = $2
         ORDER BY RANDOM()
         LIMIT $3`,
        [rule.skill, rule.difficulty, rule.question_count],
      );

      questions.push(...qRes.rows);
    }

    // 4. Shuffle final questions (important)
    questions = questions.sort(() => Math.random() - 0.5);

    res.json({
      duration: config.duration,
      questions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

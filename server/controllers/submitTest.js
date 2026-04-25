export const submitTest = async (req, res) => {
  const { application_id, answers } = req.body;

  try {
    let score = 0;

    // 1. Loop through answers
    for (let ans of answers) {
      const qRes = await db.query(
        "SELECT correct_option, marks FROM questions WHERE id = $1",
        [ans.question_id],
      );

      if (qRes.rows.length === 0) continue;

      const correctOption = qRes.rows[0].correct_option;
      const marks = qRes.rows[0].marks;

      const isCorrect = correctOption === ans.selected_option;

      if (isCorrect) {
        score += marks;
      }

      // 2. Save each answer
      await db.query(
        `INSERT INTO application_answers
        (application_id, question_id, selected_option, is_correct)
        VALUES ($1, $2, $3, $4)`,
        [application_id, ans.question_id, ans.selected_option, isCorrect],
      );
    }

    // 3. Get start time
    const appRes = await db.query(
      "SELECT test_started_at FROM applications WHERE id = $1",
      [application_id],
    );

    const startTime = appRes.rows[0].test_started_at;
    const endTime = new Date();

    const timeTaken = Math.floor((endTime - startTime) / 1000);

    // 4. Update application
    await db.query(
      `UPDATE applications
       SET test_score = $1,
           test_total = $2,
           time_taken = $3,
           test_submitted = TRUE,
           test_completed_at = NOW()
       WHERE id = $4`,
      [score, answers.length, timeTaken, application_id],
    );

    res.json({
      message: "Test submitted successfully",
      score,
      total: answers.length,
      timeTaken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

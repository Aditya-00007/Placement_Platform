import fs from "fs";
import csv from "csv-parser";
import pool from "../config/db.js";

export const uploadQuestionsCSV = async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", async () => {
      try {
        for (let row of results) {
          // Validation
          if (!["A", "B", "C", "D"].includes(row.correct_option)) continue;

          await pool.query(
            `INSERT INTO questions 
            (skill, difficulty, question, option_a, option_b, option_c, option_d, correct_option)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [
              row.skill,
              row.difficulty,
              row.question,
              row.option_a,
              row.option_b,
              row.option_c,
              row.option_d,
              row.correct_option,
            ],
          );
        }

        fs.unlinkSync(req.file.path); // delete file after upload

        res.json({ message: "CSV uploaded successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
};

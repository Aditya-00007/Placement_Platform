import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseCSVLine(text) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      result.push(cur.trim());
      cur = "";
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

async function seedDb() {
  const client = await pool.connect();

  try {
    const adminCheck = await client.query("SELECT COUNT(*) FROM admins");
    if (parseInt(adminCheck.rows[0].count, 10) === 0) {
      const email = process.env.ADMIN_EMAIL || "admin@placement.com";
      const password = process.env.ADMIN_PASSWORD || "Admin@12345";
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.query(
        "INSERT INTO admins (email, password) VALUES ($1, $2)",
        [email, hashedPassword]
      );
      console.log(`Admin account created: ${email}`);
    }

    const questionCheck = await client.query("SELECT COUNT(*) FROM questions");
    const csvPath = path.resolve(__dirname, "../utils/questions.csv");

    if (parseInt(questionCheck.rows[0].count, 10) === 0 && fs.existsSync(csvPath)) {
      const content = fs.readFileSync(csvPath, "utf-8");
      const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0).slice(1);

      for (const line of lines) {
        const parts = parseCSVLine(line);
        if (parts.length < 8) continue;
        const [skill, difficulty, question, option_a, option_b, option_c, option_d, correct_option] = parts;
        if (!question || !["A", "B", "C", "D"].includes(correct_option?.toUpperCase())) continue;

        await client.query(
          `INSERT INTO questions 
          (skill, difficulty, question, option_a, option_b, option_c, option_d, correct_option)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [skill, difficulty, question, option_a, option_b, option_c, option_d, correct_option.toUpperCase()]
        );
      }
      console.log("Question bank seeded successfully");
    }

    console.log("Database seed completed");
    client.release();
    process.exit(0);
  } catch (err) {
    console.error("Database seed failed:", err.message);
    client.release();
    process.exit(1);
  }
}

seedDb();

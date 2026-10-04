import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDb() {
  const schemaPath = path.resolve(__dirname, "../../database/schema.sql");

  if (!fs.existsSync(schemaPath)) {
    console.error(`Schema file not found at ${schemaPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(schemaPath, "utf-8");

  try {
    const client = await pool.connect();
    await client.query(sql);
    console.log("Database schema initialized successfully");
    client.release();
    process.exit(0);
  } catch (err) {
    console.error("Failed to initialize database schema:", err.message);
    process.exit(1);
  }
}

initDb();

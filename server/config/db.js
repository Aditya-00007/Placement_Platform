import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST || process.env.D_Host || "localhost",
  port: Number(process.env.DB_PORT || process.env.D_Port || 5432),
  user: process.env.DB_USER || process.env.D_User || "postgres",
  password: process.env.DB_PASSWORD || process.env.D_Password || "",
  database: process.env.DB_NAME || process.env.Database || "postgres",
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err.message));

export const db = pool;
export default pool;

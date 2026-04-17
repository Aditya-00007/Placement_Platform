import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });

const pool = new pg.Pool({
  host: process.env.D_Host,
  user: process.env.D_User,
  password: process.env.D_Password,
  database: process.env.Database,
  port: Number(process.env.D_PORT),
});

pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(" DB connection error:", err));

export default pool;

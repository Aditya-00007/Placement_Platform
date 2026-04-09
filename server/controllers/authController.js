import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jwsonwebtoken";

// mail based auth
import nodemailer from "nodemailer";

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userCheck.rows.length > 0) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  await pool.query(
    "INSERT INTO otp_verification (email, otp, expires_at) VALUES ($1, $2, $3)",
    [email, otp, expires],
  );

  // send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password",
    },
  });

  await transporter.sendMail({
    from: "your_email@gmail.com",
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  });

  res.json({ msg: "OTP sent" });
};

// REGISTER
const register = async (req, res) => {
  const { email, otp, name, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM otp_verification WHERE email = $1 AND otp = $2",
    [email, otp],
  );

  if (result.rows.length === 0) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  const record = result.rows[0];

  if (new Date() > record.expires_at) {
    await pool.query("DELETE FROM otp_verification WHERE email = $1", [email]);
    return res.status(400).json({ msg: "OTP expired" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword],
  );

  res.json(newUser.rows[0]);
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(400).json({ msg: "Invalid email" });
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    return res.status(400).json({ msg: "Wrong password" });
  }

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);

  res.json({ token });
};

export { register, login };

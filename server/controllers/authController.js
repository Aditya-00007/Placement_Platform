import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// mail based auth
export const sendOTP = async (req, res) => {
  const { email } = req.body;
  // delete expired OTPs
  await pool.query("DELETE FROM otp_verification WHERE expires_at < NOW()");
  //check user if already exist or not
  const userCheck = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (userCheck.rows.length > 0) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 min
  // delete old otp first
  await pool.query("DELETE FROM otp_verification WHERE email=$1", [email]);

  await pool.query(
    "INSERT INTO otp_verification (email, otp, expires_at) VALUES ($1, $2, $3)",
    [email, otp, expires],
  );

  // send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP",
    text: `Welcome to Placement Platform ,Your OTP is ${otp}`,
  });

  res.json({ msg: "OTP sent" });
};

// REGISTER
const register = async (req, res) => {
  const { email, otp, name, password, role } = req.body;
  // check if anything missing
  if (!email || !password || !role || !name) {
    return res.status(400).json({ msg: "All fields required" });
  }
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    //  Verify OTP
    const result = await client.query(
      "SELECT * FROM otp_verification WHERE email = $1 AND otp = $2",
      [email, otp],
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    const record = result.rows[0];

    if (new Date() > record.expires_at) {
      await client.query("ROLLBACK");
      return res.status(400).json({ msg: "OTP expired" });
    }

    // Check if user already exists
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ msg: "User already exists" });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Insert into USERS
    const userResult = await client.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, role],
    );

    const user = userResult.rows[0];

    //  Insert into role-specific table
    if (role === "candidate") {
      await client.query(
        "INSERT INTO candidates (user_id, name) VALUES ($1, $2)",
        [user.id, name],
      );
    } else if (role === "employer") {
      await client.query(
        "INSERT INTO employers (user_id, name) VALUES ($1, $2)",
        [user.id, name],
      );
    } else {
      await client.query("ROLLBACK");
      return res.status(400).json({ msg: "Invalid role" });
    }

    //  Delete OTP after use
    await client.query("DELETE FROM otp_verification WHERE email = $1", [
      email,
    ]);

    await client.query("COMMIT"); // success
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.json({
      msg: "Registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    await client.query("ROLLBACK"); //  undo everything
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  } finally {
    client.release();
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user from USERS table
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    //  Check password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    //  Fetch profile based on role
    let profile = null;

    if (user.role === "candidate") {
      const candidate = await pool.query(
        "SELECT * FROM candidates WHERE user_id = $1",
        [user.id],
      );
      profile = candidate.rows[0];
    } else if (user.role === "employer") {
      const employer = await pool.query(
        "SELECT * FROM employers WHERE user_id = $1",
        [user.id],
      );
      profile = employer.rows[0];
    }

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      profile, //  for frontend dashboard
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export { register, login };

import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);

    if (admin.rows.length === 0) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: admin.rows[0].id, role: "admin" },
      process.env.JWT_SECRET,
    );

    res.json({
      token,
      user: {
        id: admin.rows[0].id,
        email: admin.rows[0].email,
        role: "admin",
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

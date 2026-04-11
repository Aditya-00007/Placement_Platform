import express from "express";
import { userAuth, isEmployer } from "../middleware/userMiddleware.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/dashboard", userAuth, isEmployer, (req, res) => {
  res.json({ msg: "Welcome Employee" });
});

router.post("/dashboard/profile", userAuth, isEmployer, async (req, res) => {
  try {
    const empResult = await pool.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;
    const {
      company_name,
      company_description,
      company_logo_url,
      company_website,
      address,
      city,
      state,
      country,
      employee_count,
      industry,
      contact_email,
      contact_phone,
      linkedin_url,
      twitter_url,
      founded_year,
      hr_name,
    } = req.body;

    if (
      !company_name ||
      !industry ||
      !contact_email ||
      !address ||
      !city ||
      !state ||
      !country
    ) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const query = `
      INSERT INTO employer_profile (
        employer_id,
        company_name,
        company_description,
        company_logo_url,
        company_website,
        address,
        city,
        state,
        country,
        employee_count,
        industry,
        contact_email,
        contact_phone,
        linkedin_url,
        twitter_url,
        founded_year,
        hr_name
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,$15,$16,$17
      )
      ON CONFLICT (employer_id)
      DO UPDATE SET
        company_name = EXCLUDED.company_name,
        company_description = EXCLUDED.company_description,
        company_logo_url = EXCLUDED.company_logo_url,
        company_website = EXCLUDED.company_website,
        address = EXCLUDED.address,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        country = EXCLUDED.country,
        employee_count = EXCLUDED.employee_count,
        industry = EXCLUDED.industry,
        contact_email = EXCLUDED.contact_email,
        contact_phone = EXCLUDED.contact_phone,
        linkedin_url = EXCLUDED.linkedin_url,
        twitter_url = EXCLUDED.twitter_url,
        founded_year = EXCLUDED.founded_year,
        hr_name = EXCLUDED.hr_name,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const values = [
      employer_id,
      company_name,
      company_description,
      company_logo_url,
      company_website,
      address,
      city,
      state,
      country,
      employee_count,
      industry,
      contact_email,
      contact_phone,
      linkedin_url,
      twitter_url,
      founded_year,
      hr_name,
    ];

    const result = await pool.query(query, values);

    res.status(200).json({
      message: "Profile saved successfully",
      profile: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

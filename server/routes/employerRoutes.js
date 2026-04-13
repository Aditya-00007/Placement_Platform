import express from "express";
import { userAuth, isEmployer } from "../middleware/userMiddleware.js";
import client from "../config/db.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/dashboard", userAuth, isEmployer, async (req, res) => {
  const empResult = await client.query(
    "SELECT id FROM employers WHERE user_id = $1",
    [req.user.id],
  );

  if (empResult.rows.length === 0) {
    return res.status(404).json({ error: "Employer not found" });
  }

  const employer = empResult.rows[0].name;
  res.json({ msg: "Welcome Employee", employer: employer });
});

router.get("/profile", userAuth, isEmployer, async (req, res) => {
  try {
    //  Get employer_id
    const empResult = await client.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;

    //  Fetch all data
    const emp_profile = await client.query(
      "SELECT * FROM employer_profile WHERE employer_id=$1",
      [employer_id],
    );

    //  Response
    res.status(200).json({
      profile: emp_profile.rows[0] || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/profile", userAuth, isEmployer, async (req, res) => {
  try {
    const empResult = await client.query(
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

    const result = await client.query(query, values);

    res.status(200).json({
      message: "Profile saved successfully",
      profile: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/jobs", userAuth, isEmployer, async (req, res) => {
  const {
    title,
    description,
    requirements,
    responsibilities,
    location,
    job_type,
    work_mode,
    salary_min,
    salary_max,
    experience_required,
    skills_required,
    application_deadline,
    eligibility,
  } = req.body;
  if (!title || !description || !location) {
    return res.status(400).json({
      error: "Required fields missing",
    });
  }
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    //  Get employer_id
    const empResult = await client.query(
      "SELECT id FROM employers WHERE user_id = $1",
      [req.user.id],
    );

    if (empResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Employer not found" });
    }

    const employer_id = empResult.rows[0].id;

    //  Insert into jobs
    const jobResult = await client.query(
      `INSERT INTO jobs 
      (title, description, requirements, responsibilities,
       location, job_type, work_mode,
       salary_min, salary_max,
       experience_required, skills_required,
       application_deadline, posted_by)
       
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING id`,
      [
        title,
        description,
        requirements,
        responsibilities,
        location,
        job_type,
        work_mode,
        salary_min,
        salary_max,
        experience_required,
        skills_required,
        application_deadline,
        employer_id,
      ],
    );

    const job_id = jobResult.rows[0].id;

    //  Insert eligibility
    if (eligibility) {
      const { min_education, min_cgpa, allowed_branches } = eligibility;

      await client.query(
        `INSERT INTO job_eligibility 
        (job_id, min_education, min_cgpa, allowed_branches)
        VALUES ($1,$2,$3,$4)`,
        [job_id, min_education, min_cgpa, allowed_branches],
      );
    }

    await client.query("COMMIT");
    res.status(201).json({
      message: "Job posted successfully",
      job_id,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
});

router.patch(
  "/applications/:id/status",
  userAuth,
  isEmployer,
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["SHORTLISTED", "REJECTED", "HIRED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid status",
      });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Get employer_id
      const empResult = await client.query(
        "SELECT id FROM employers WHERE user_id = $1",
        [req.user.id],
      );

      if (empResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "Employer not found" });
      }

      const employer_id = empResult.rows[0].id;

      // Check if application belongs to employer's job
      const appResult = await client.query(
        `SELECT a.id 
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       WHERE a.id = $1 AND j.posted_by = $2`,
        [id, employer_id],
      );

      if (appResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({
          error: "Application not found or unauthorized",
        });
      }

      // Update status
      await client.query(
        `UPDATE applications 
       SET status = $1 
       WHERE id = $2`,
        [status, id],
      );

      await client.query("COMMIT");

      res.status(200).json({
        message: `Application ${status.toLowerCase()} successfully`,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: "Server error" });
    } finally {
      client.release();
    }
  },
);

export default router;

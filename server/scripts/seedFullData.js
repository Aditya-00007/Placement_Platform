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

async function seed() {
  const client = await pool.connect();
  console.log("Seeding consistent test data across tables...");

  try {
    await client.query("BEGIN");

    // 1. Seed Admin
    const adminEmail = "admin@placement.com";
    const adminPass = await bcrypt.hash("admin123", 10);
    const existingAdmin = await client.query("SELECT id FROM admins WHERE email = $1", [adminEmail]);
    if (existingAdmin.rows.length === 0) {
      await client.query(
        "INSERT INTO admins (email, password) VALUES ($1, $2)",
        [adminEmail, adminPass]
      );
      console.log("Seeded Admin: admin@placement.com / admin123");
    } else {
      await client.query("UPDATE admins SET password = $1 WHERE email = $2", [adminPass, adminEmail]);
      console.log("Updated Admin credentials: admin@placement.com / admin123");
    }

    // 2. Seed Employer / Teacher
    const employerEmail = "teacher@placement.com";
    const employerPass = await bcrypt.hash("password123", 10);
    let empUserId;
    const existingEmpUser = await client.query("SELECT id FROM users WHERE email = $1", [employerEmail]);
    if (existingEmpUser.rows.length === 0) {
      const uRes = await client.query(
        "INSERT INTO users (email, password, role) VALUES ($1, $2, 'employer') RETURNING id",
        [employerEmail, employerPass]
      );
      empUserId = uRes.rows[0].id;
    } else {
      empUserId = existingEmpUser.rows[0].id;
      await client.query("UPDATE users SET password = $1 WHERE id = $2", [employerPass, empUserId]);
    }

    let employerId;
    const existingEmp = await client.query("SELECT id FROM employers WHERE user_id = $1", [empUserId]);
    if (existingEmp.rows.length === 0) {
      const empRes = await client.query(
        "INSERT INTO employers (user_id, name) VALUES ($1, $2) RETURNING id",
        [empUserId, "Prof. Rajesh Sharma (Placement Coordinator)"]
      );
      employerId = empRes.rows[0].id;
    } else {
      employerId = existingEmp.rows[0].id;
    }

    await client.query(
      `INSERT INTO employer_profile 
      (employer_id, company_name, company_description, company_website, address, city, state, country, employee_count, industry, contact_email, contact_phone, hr_name, is_approved)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, TRUE)
      ON CONFLICT (employer_id) DO UPDATE SET
        company_name = EXCLUDED.company_name,
        company_description = EXCLUDED.company_description,
        is_approved = TRUE`,
      [
        employerId,
        "TechCorp Solutions & Placement Cell",
        "Leading recruitment partner and technology enterprise campus hiring division.",
        "https://techcorp.example.com",
        "Tech Hub Tower 4, Cyber City",
        "Pune",
        "Maharashtra",
        "India",
        250,
        "Information Technology",
        employerEmail,
        "+91 9876543210",
        "Prof. Rajesh Sharma",
      ]
    );
    console.log("Seeded Employer/Teacher: teacher@placement.com / password123");

    // 3. Seed Candidate / Student
    const studentEmail = "student@placement.com";
    const studentPass = await bcrypt.hash("password123", 10);
    let candUserId;
    const existingCandUser = await client.query("SELECT id FROM users WHERE email = $1", [studentEmail]);
    if (existingCandUser.rows.length === 0) {
      const uRes = await client.query(
        "INSERT INTO users (email, password, role) VALUES ($1, $2, 'candidate') RETURNING id",
        [studentEmail, studentPass]
      );
      candUserId = uRes.rows[0].id;
    } else {
      candUserId = existingCandUser.rows[0].id;
      await client.query("UPDATE users SET password = $1 WHERE id = $2", [studentPass, candUserId]);
    }

    let candidateId;
    const existingCand = await client.query("SELECT id FROM candidates WHERE user_id = $1", [candUserId]);
    if (existingCand.rows.length === 0) {
      const candRes = await client.query(
        "INSERT INTO candidates (user_id, name) VALUES ($1, $2) RETURNING id",
        [candUserId, "Aarav Patel"]
      );
      candidateId = candRes.rows[0].id;
    } else {
      candidateId = existingCand.rows[0].id;
    }

    // Candidate Profile
    await client.query(
      `INSERT INTO candidate_profile 
      (candidate_id, profile_summary, experience_years, expected_salary, current_location, preferred_location, current_address, permanent_address, linkedin_url, github_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (candidate_id) DO UPDATE SET
        profile_summary = EXCLUDED.profile_summary,
        experience_years = EXCLUDED.experience_years,
        expected_salary = EXCLUDED.expected_salary`,
      [
        candidateId,
        "Passionate Computer Engineering graduate specializing in Full-Stack JavaScript, React, Node.js, and PostgreSQL. Eager to solve real-world problems in high-growth engineering teams.",
        0,
        650000,
        "Pune",
        "Pune / Mumbai / Remote",
        "A-204, Green Palms Residency, Baner, Pune",
        "A-204, Green Palms Residency, Baner, Pune",
        "https://linkedin.com/in/aarav-patel-dev",
        "https://github.com/aarav-patel",
      ]
    );

    // Education
    await client.query("DELETE FROM education WHERE candidate_id = $1", [candidateId]);
    await client.query(
      `INSERT INTO education (candidate_id, level, board_university, institute_name, field_of_study, passing_year, grading_type, score)
       VALUES 
       ($1, 'Graduation', 'Savitribai Phule Pune University', 'Pune Institute of Computer Technology', 'Computer Engineering', 2025, 'CGPA', 8.85),
       ($1, 'HSC', 'Maharashtra State Board', 'Fergusson College Junior Wing', 'Science PCM', 2021, 'PERCENTAGE', 92.40)`,
      [candidateId]
    );

    // Experience
    await client.query("DELETE FROM experience WHERE candidate_id = $1", [candidateId]);
    await client.query(
      `INSERT INTO experience (candidate_id, company_name, job_title, start_date, end_date, is_current, description)
       VALUES ($1, 'NexGen Web Labs', 'Full-Stack Developer Intern', '2024-06-01', '2024-11-30', FALSE, 'Built RESTful microservices with Node.js and PostgreSQL. Designed reusable dashboard components in React.')`,
      [candidateId]
    );

    // Projects
    await client.query("DELETE FROM projects WHERE candidate_id = $1", [candidateId]);
    await client.query(
      `INSERT INTO projects (candidate_id, project_title, description, technologies_used, project_link, github_link)
       VALUES 
       ($1, 'Campus Placement Portal', 'Full-stack placement automation platform featuring candidate-job matching algorithms and online assessments.', 'React, Node.js, Express, PostgreSQL, TailwindCSS', 'https://placement.example.com', 'https://github.com/aarav-patel/placement-platform'),
       ($1, 'Smart Task Orchestrator', 'Collaborative project manager with real-time updates and role-based permissions.', 'React, Node.js, Socket.IO, PostgreSQL', 'https://tasks.example.com', 'https://github.com/aarav-patel/smart-tasks')`,
      [candidateId]
    );

    // Skills
    await client.query("DELETE FROM skills WHERE candidate_id = $1", [candidateId]);
    await client.query(
      `INSERT INTO skills (candidate_id, skill_name, proficiency)
       VALUES 
       ($1, 'JavaScript', 'ADVANCED'),
       ($1, 'React', 'ADVANCED'),
       ($1, 'Node', 'INTERMEDIATE'),
       ($1, 'SQL', 'ADVANCED')`,
      [candidateId]
    );

    // Certifications
    await client.query("DELETE FROM certifications WHERE candidate_id = $1", [candidateId]);
    await client.query(
      `INSERT INTO certifications (candidate_id, certificate_name, issuing_organization, issue_date, credential_url)
       VALUES 
       ($1, 'Meta Front-End Developer Certificate', 'Meta / Coursera', '2024-08-15', 'https://coursera.org/verify/meta-frontend'),
       ($1, 'PostgreSQL Database Associate', 'PostgreSQL Certification Authority', '2024-10-10', 'https://postgres.example.com/cert/123')`,
      [candidateId]
    );
    console.log("Seeded Candidate/Student: student@placement.com / password123");

    // 4. Seed Questions from CSV if questions table is empty
    const qCountRes = await client.query("SELECT COUNT(*) FROM questions");
    const csvPath = path.resolve(__dirname, "../utils/questions.csv");
    if (parseInt(qCountRes.rows[0].count, 10) === 0 && fs.existsSync(csvPath)) {
      const fileData = fs.readFileSync(csvPath, "utf-8");
      const lines = fileData.split(/\r?\n/).filter((l) => l.trim().length > 0).slice(1);
      for (const line of lines) {
        const parts = parseCSVLine(line);
        if (parts.length < 8) continue;
        const [skill, difficulty, question, option_a, option_b, option_c, option_d, correct_option] = parts;
        if (!question || !["A", "B", "C", "D"].includes(correct_option?.toUpperCase())) continue;
        await client.query(
          `INSERT INTO questions (skill, difficulty, question, option_a, option_b, option_c, option_d, correct_option)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [skill, difficulty, question, option_a, option_b, option_c, option_d, correct_option.toUpperCase()]
        );
      }
      console.log("Seeded Questions from questions.csv");
    }

    // 5. Seed 3 Jobs
    // Clean old jobs posted by this employer
    await client.query("DELETE FROM jobs WHERE posted_by = $1", [employerId]);

    // Job 1
    const job1Res = await client.query(
      `INSERT INTO jobs 
      (title, description, requirements, responsibilities, location, job_type, work_mode, salary_min, salary_max, experience_required, skills_required, posted_by, status, application_deadline)
      VALUES ($1, $2, $3, $4, $5, 'FULL_TIME', 'HYBRID', $6, $7, $8, $9, $10, 'OPEN', '2026-12-31')
      RETURNING id`,
      [
        "Associate Software Engineer (Full Stack)",
        "We are looking for passionate entry-level Full Stack Engineers to build scalable web applications and cloud services.",
        "Solid foundation in JavaScript, React, Node.js, and relational databases. Strong analytical and problem-solving skills.",
        "Design, develop, and maintain responsive front-end components and RESTful APIs. Collaborate in agile sprints and code reviews.",
        "Pune, Maharashtra",
        550000,
        850000,
        0,
        ["JavaScript", "React", "Node", "SQL"],
        employerId,
      ]
    );
    const job1Id = job1Res.rows[0].id;

    await client.query(
      `INSERT INTO job_eligibility (job_id, min_education, min_cgpa, allowed_branches)
       VALUES ($1, 'Graduation', 7.00, ARRAY['Computer Engineering', 'Information Technology', 'Electronics'])`,
      [job1Id]
    );

    const tc1 = await client.query(
      `INSERT INTO test_configs (job_id, duration, passing_score)
       VALUES ($1, 30, 6)
       RETURNING id`,
      [job1Id]
    );
    await client.query(
      `INSERT INTO test_config_rules (test_config_id, skill, difficulty, question_count)
       VALUES 
       ($1, 'JavaScript', 'EASY', 3),
       ($1, 'React', 'EASY', 3),
       ($1, 'Node', 'EASY', 2),
       ($1, 'SQL', 'EASY', 2)`,
      [tc1.rows[0].id]
    );

    // Job 2
    const job2Res = await client.query(
      `INSERT INTO jobs 
      (title, description, requirements, responsibilities, location, job_type, work_mode, salary_min, salary_max, experience_required, skills_required, posted_by, status, application_deadline)
      VALUES ($1, $2, $3, $4, $5, 'FULL_TIME', 'REMOTE', $6, $7, $8, $9, $10, 'OPEN', '2026-11-30')
      RETURNING id`,
      [
        "Frontend React Developer",
        "Join our modern UI engineering team creating pixel-perfect, accessible user interfaces for enterprise platforms.",
        "Hands-on experience with modern React (hooks, context, state management), TailwindCSS, responsive design, and REST APIs.",
        "Translate UI/UX mockups into production-grade code. Optimize web application performance and cross-browser compatibility.",
        "Remote - India",
        500000,
        750000,
        0,
        ["React", "JavaScript"],
        employerId,
      ]
    );
    const job2Id = job2Res.rows[0].id;

    await client.query(
      `INSERT INTO job_eligibility (job_id, min_education, min_cgpa, allowed_branches)
       VALUES ($1, 'Graduation', 6.50, ARRAY['Computer Engineering', 'Information Technology'])`,
      [job2Id]
    );

    const tc2 = await client.query(
      `INSERT INTO test_configs (job_id, duration, passing_score)
       VALUES ($1, 25, 5)
       RETURNING id`,
      [job2Id]
    );
    await client.query(
      `INSERT INTO test_config_rules (test_config_id, skill, difficulty, question_count)
       VALUES 
       ($1, 'React', 'EASY', 4),
       ($1, 'JavaScript', 'EASY', 4)`,
      [tc2.rows[0].id]
    );

    // Job 3
    const job3Res = await client.query(
      `INSERT INTO jobs 
      (title, description, requirements, responsibilities, location, job_type, work_mode, salary_min, salary_max, experience_required, skills_required, posted_by, status, application_deadline)
      VALUES ($1, $2, $3, $4, $5, 'FULL_TIME', 'ONSITE', $6, $7, $8, $9, $10, 'OPEN', '2026-12-15')
      RETURNING id`,
      [
        "Backend Developer (Node.js & PostgreSQL)",
        "Build high-throughput backend services, data pipelines, and optimized database queries for our core platform.",
        "Strong experience in Node.js, Express, PostgreSQL, indexing, database schema design, and asynchronous patterns.",
        "Architect and maintain REST APIs. Implement robust authorization, connection pooling, and performance monitoring.",
        "Mumbai, Maharashtra",
        650000,
        1000000,
        1,
        ["Node", "SQL", "JavaScript"],
        employerId,
      ]
    );
    const job3Id = job3Res.rows[0].id;

    await client.query(
      `INSERT INTO job_eligibility (job_id, min_education, min_cgpa, allowed_branches)
       VALUES ($1, 'Graduation', 7.50, ARRAY['Computer Engineering', 'Information Technology'])`,
      [job3Id]
    );

    const tc3 = await client.query(
      `INSERT INTO test_configs (job_id, duration, passing_score)
       VALUES ($1, 30, 7)
       RETURNING id`,
      [job3Id]
    );
    await client.query(
      `INSERT INTO test_config_rules (test_config_id, skill, difficulty, question_count)
       VALUES 
       ($1, 'Node', 'MEDIUM', 4),
       ($1, 'SQL', 'MEDIUM', 4)`,
      [tc3.rows[0].id]
    );
    console.log("Seeded 3 Jobs with eligibility criteria and test configurations");

    // 6. Seed Application for Student on Job 1
    const appRes = await client.query(
      `INSERT INTO applications 
      (candidate_id, job_id, cover_letter, match_score, status, test_score, test_total, time_taken, test_submitted, is_verified, test_started_at, test_completed_at)
      VALUES ($1, $2, $3, 92, 'SHORTLISTED', 8, 10, 1140, TRUE, TRUE, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '41 minutes')
      RETURNING id`,
      [
        candidateId,
        job1Id,
        "I am excited to apply for the Associate Software Engineer role. My experience building full-stack applications with React, Node.js, and PostgreSQL aligns closely with the team requirements.",
      ]
    );
    console.log("Seeded Application for Aarav Patel on Job 1 (Status: SHORTLISTED, Score: 8/10)");

    await client.query("COMMIT");
    console.log("\n==================================================");
    console.log("DATABASE SEED COMPLETED SUCCESSFULLY!");
    console.log("==================================================");
    console.log("1. Admin Account:");
    console.log("   Email:    admin@placement.com");
    console.log("   Password: admin123");
    console.log("   URL:      /admin/login");
    console.log("--------------------------------------------------");
    console.log("2. Employer / Teacher Account:");
    console.log("   Email:    teacher@placement.com");
    console.log("   Password: password123");
    console.log("   URL:      /signin");
    console.log("--------------------------------------------------");
    console.log("3. Student / Candidate Account:");
    console.log("   Email:    student@placement.com");
    console.log("   Password: password123");
    console.log("   URL:      /signin");
    console.log("--------------------------------------------------");
    console.log("4. Jobs Created: 3 active jobs with eligibility & tests");
    console.log("==================================================\n");

    client.release();
    process.exit(0);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seeding error:", err.message);
    client.release();
    process.exit(1);
  }
}

seed();

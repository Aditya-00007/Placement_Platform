CREATE TABLE candidate_profile (
    candidate_id INT PRIMARY KEY REFERENCES candidates(id) ON DELETE CASCADE,

    profile_photo TEXT,
    resume_url TEXT,
    profile_summary TEXT,

    experience_years INT DEFAULT 0,
    expected_salary DECIMAL(10,2),

    current_location VARCHAR(100),
    preferred_location VARCHAR(100),

    current_address TEXT,
    permanent_address TEXT,

    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    portfolio_url VARCHAR(255)
);

CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,

    level VARCHAR(50) CHECK (level IN ('SSC','HSC','Diploma','Graduation','Post-Graduation')),
    board_university VARCHAR(100),
    institute_name VARCHAR(150),
    field_of_study VARCHAR(100),
    passing_year INT,
    grading_type VARCHAR(10) CHECK (grading_type IN ('CGPA','PERCENTAGE')),
    score DECIMAL(5,2)
);

CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,

    company_name VARCHAR(150),
    job_title VARCHAR(150),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,

    project_title VARCHAR(150),
    description TEXT,
    technologies_used TEXT,
    project_link VARCHAR(255),
    github_link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,

    skill_name VARCHAR(100),
    proficiency VARCHAR(20) CHECK (proficiency IN ('BEGINNER','INTERMEDIATE','ADVANCED'))
);
CREATE TABLE certifications (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,

    certificate_name VARCHAR(150),
    issuing_organization VARCHAR(150),
    issue_date DATE,
    credential_url VARCHAR(255)
);
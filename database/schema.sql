DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('CANDIDATE', 'EMPLOYER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE job_type_enum AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE work_mode_enum AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE job_status_enum AS ENUM ('OPEN', 'CLOSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status_enum AS ENUM ('APPLIED', 'SHORTLISTED', 'REJECTED', 'HIRED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('candidate', 'employer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employers (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS otp_verification (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    otp TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS candidate_profile (
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

CREATE TABLE IF NOT EXISTS education (
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

CREATE TABLE IF NOT EXISTS experience (
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

CREATE TABLE IF NOT EXISTS projects (
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

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
    skill_name VARCHAR(100),
    proficiency VARCHAR(20) CHECK (proficiency IN ('BEGINNER','INTERMEDIATE','ADVANCED'))
);

CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
    certificate_name VARCHAR(150),
    issuing_organization VARCHAR(150),
    issue_date DATE,
    credential_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS employer_profile (
    employer_id INT PRIMARY KEY REFERENCES employers(id) ON DELETE CASCADE,
    company_name VARCHAR(150) NOT NULL,
    company_description TEXT,
    company_logo_url TEXT,
    company_website VARCHAR(255),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    employee_count INT,
    industry VARCHAR(100) NOT NULL,
    contact_email VARCHAR(150) UNIQUE NOT NULL,
    contact_phone VARCHAR(20),
    linkedin_url TEXT,
    twitter_url TEXT,
    founded_year INT,
    hr_name VARCHAR(100),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    description TEXT,
    requirements TEXT,
    responsibilities TEXT,
    location VARCHAR(100),
    job_type job_type_enum,
    work_mode work_mode_enum,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    experience_required INT DEFAULT 0,
    skills_required TEXT[],
    posted_by INT REFERENCES employers(id) ON DELETE CASCADE,
    status job_status_enum DEFAULT 'OPEN',
    application_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (salary_min <= salary_max),
    CHECK (experience_required >= 0)
);

CREATE TABLE IF NOT EXISTS job_eligibility (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
    min_education VARCHAR(100),
    min_cgpa DECIMAL(3,2),
    allowed_branches TEXT[]
);

CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES candidates(id) ON DELETE CASCADE,
    job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
    cover_letter TEXT,
    match_score INT DEFAULT 0,
    status application_status_enum DEFAULT 'APPLIED',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    test_score INT DEFAULT 0,
    test_total INT DEFAULT 0,
    time_taken INT,
    test_submitted BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    test_started_at TIMESTAMP,
    test_completed_at TIMESTAMP,
    UNIQUE(candidate_id, job_id)
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    skill VARCHAR(50),
    difficulty VARCHAR(10),
    question TEXT,
    option_a TEXT,
    option_b TEXT,
    option_c TEXT,
    option_d TEXT,
    correct_option CHAR(1),
    marks INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS test_configs (
    id SERIAL PRIMARY KEY,
    job_id INT UNIQUE REFERENCES jobs(id) ON DELETE CASCADE,
    duration INT,
    passing_score INT
);

CREATE TABLE IF NOT EXISTS test_config_rules (
    id SERIAL PRIMARY KEY,
    test_config_id INT REFERENCES test_configs(id) ON DELETE CASCADE,
    skill VARCHAR(50),
    difficulty VARCHAR(10),
    question_count INT
);

CREATE TABLE IF NOT EXISTS application_answers (
    id SERIAL PRIMARY KEY,
    application_id INT REFERENCES applications(id) ON DELETE CASCADE,
    question_id INT REFERENCES questions(id) ON DELETE SET NULL,
    selected_option CHAR(1),
    is_correct BOOLEAN
);

CREATE INDEX IF NOT EXISTS idx_candidates_user_id ON candidates(user_id);
CREATE INDEX IF NOT EXISTS idx_employers_user_id ON employers(user_id);
CREATE INDEX IF NOT EXISTS idx_education_candidate_id ON education(candidate_id);
CREATE INDEX IF NOT EXISTS idx_experience_candidate_id ON experience(candidate_id);
CREATE INDEX IF NOT EXISTS idx_projects_candidate_id ON projects(candidate_id);
CREATE INDEX IF NOT EXISTS idx_skills_candidate_id ON skills(candidate_id);
CREATE INDEX IF NOT EXISTS idx_certifications_candidate_id ON certifications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_employer_profile_approved ON employer_profile(is_approved);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_applications_candidate_id ON applications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_questions_skill_diff ON questions(skill, difficulty);
CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_verification(email);

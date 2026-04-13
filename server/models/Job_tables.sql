CREATE TYPE user_role_enum AS ENUM ('CANDIDATE', 'EMPLOYER');

CREATE TYPE job_type_enum AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT');

CREATE TYPE work_mode_enum AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

CREATE TYPE job_status_enum AS ENUM ('OPEN', 'CLOSED');

CREATE TYPE application_status_enum AS ENUM ('APPLIED', 'SHORTLISTED', 'REJECTED', 'HIRED');

CREATE TABLE jobs (
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

    posted_by INT,

    status job_status_enum DEFAULT 'OPEN',

    application_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (posted_by) REFERENCES employers(id) ON DELETE CASCADE,

    CHECK (salary_min <= salary_max),
    CHECK (experience_required >= 0)
);

CREATE TABLE job_eligibility (
    id SERIAL PRIMARY KEY,
    job_id INT,
    min_education VARCHAR(100),
    min_cgpa DECIMAL(3,2),
    allowed_branches TEXT[],
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,

    candidate_id INT,
    job_id INT,
    cover_letter TEXT,
    match_score INT DEFAULT 0,
    status application_status_enum DEFAULT 'APPLIED',

    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,

    UNIQUE(candidate_id, job_id)
);
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    skill VARCHAR(50),              -- React, Node, etc.
    difficulty VARCHAR(10),         -- EASY, MEDIUM, HARD
    question TEXT,
    option_a TEXT,
    option_b TEXT,
    option_c TEXT,
    option_d TEXT,
    correct_option CHAR(1),         -- A/B/C/D
    marks INT DEFAULT 1
);

CREATE TABLE test_configs (
    id SERIAL PRIMARY KEY,
    job_id INT UNIQUE REFERENCES jobs(id) ON DELETE CASCADE,
    duration INT,                  -- min
    passing_score INT              -- e.g., 7 out of 10
);

CREATE TABLE test_config_rules (
    id SERIAL PRIMARY KEY,
    test_config_id INT REFERENCES test_configs(id) ON DELETE CASCADE,
    skill VARCHAR(50),
    difficulty VARCHAR(10),
    question_count INT
);

ALTER TABLE applications
ADD COLUMN test_score INT DEFAULT 0,
ADD COLUMN test_total INT DEFAULT 0,
ADD COLUMN test_submitted BOOLEAN DEFAULT FALSE,
ADD COLUMN is_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN test_started_at TIMESTAMP,
ADD COLUMN test_completed_at TIMESTAMP;

CREATE TABLE application_answers (
    id SERIAL PRIMARY KEY,
    application_id INT REFERENCES applications(id) ON DELETE CASCADE,
    question_id INT,
    selected_option CHAR(1),
    is_correct BOOLEAN
);
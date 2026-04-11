CREATE TABLE employer_profile (
    employer_id INT PRIMARY KEY REFERENCES employers(id) ON DELETE CASCADE,

    company_name VARCHAR(150) NOT NULL,
    company_description TEXT,
    company_logo_url TEXT,
    company_website VARCHAR(255),

    address TEXT NOT NULL, -- full address (street, building, pincode)
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
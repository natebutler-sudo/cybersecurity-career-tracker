-- Cybersecurity Career Tracker Database Schema

-- Roles (NIST NICE Framework)
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL UNIQUE,
  nist_category VARCHAR(50) NOT NULL,  -- SECURELY_PROVISION, OPERATE_MAINTAIN, PROTECT_DEFEND, INVESTIGATE, OVERSEE_GOVERN
  specialty_area VARCHAR(255),
  description TEXT,
  entry_level BOOLEAN DEFAULT false,
  typical_experience_years INT DEFAULT 0,
  avg_salary_usd INT,
  job_growth_percent DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_roles_category ON roles(nist_category);
CREATE INDEX idx_roles_entry_level ON roles(entry_level);

-- Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100),  -- Technical, Compliance, Soft Skills, Investigation, etc.
  proficiency_level VARCHAR(50),  -- Beginner, Intermediate, Advanced
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_skills_category ON skills(category);

-- Role-Skill relationships
CREATE TABLE role_skills (
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  required BOOLEAN DEFAULT true,  -- True if required, false if beneficial
  proficiency_level VARCHAR(50),  -- Expected proficiency
  PRIMARY KEY (role_id, skill_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certifications
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  issuer VARCHAR(255) NOT NULL,
  difficulty VARCHAR(50),  -- Entry-level, Intermediate, Advanced
  cost_usd INT,
  exam_required BOOLEAN DEFAULT true,
  exam_duration_hours INT,
  passing_score INT,
  validity_years INT,
  description TEXT,
  url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_certifications_difficulty ON certifications(difficulty);

-- Role-Certification relationships
CREATE TABLE role_certifications (
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  cert_id UUID NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
  recommended BOOLEAN DEFAULT true,  -- True if commonly expected
  priority INT DEFAULT 1,  -- Priority order (1=most important)
  PRIMARY KEY (role_id, cert_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Career Progression Paths
CREATE TABLE progression_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,  -- e.g. "SOC Analyst to Security Manager"
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Progression Steps
CREATE TABLE progression_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id UUID NOT NULL REFERENCES progression_paths(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id),
  step_order INT NOT NULL,
  typical_duration_years INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_progression_steps_path ON progression_steps(path_id);
CREATE UNIQUE INDEX idx_progression_steps_unique ON progression_steps(path_id, step_order);

-- Career Pathways Summary (denormalized for performance)
CREATE VIEW career_pathways AS
SELECT
  pp.id as path_id,
  pp.name,
  r.id as role_id,
  r.title,
  ps.step_order,
  ps.typical_duration_years
FROM progression_paths pp
JOIN progression_steps ps ON pp.id = ps.path_id
JOIN roles r ON ps.role_id = r.id
ORDER BY pp.id, ps.step_order;

-- Add timestamps trigger
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_roles_timestamp BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_skills_timestamp BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_certifications_timestamp BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_progression_paths_timestamp BEFORE UPDATE ON progression_paths FOR EACH ROW EXECUTE FUNCTION update_timestamp();

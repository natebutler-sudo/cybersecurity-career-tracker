-- NIST NICE Framework Sample Data
-- Real cybersecurity roles, skills, and certifications

-- ============================================
-- ROLES (NIST NICE Framework)
-- ============================================

INSERT INTO roles (title, nist_category, specialty_area, description, entry_level, typical_experience_years, avg_salary_usd, job_growth_percent) VALUES
-- PROTECT & DEFEND (Most Common Entry Point)
('SOC Analyst Level 1', 'PROTECT_DEFEND', 'Incident Handling', 'Monitor security events and respond to alerts in a Security Operations Center', true, 0, 65000, 15.0),
('SOC Analyst Level 2', 'PROTECT_DEFEND', 'Incident Handling', 'Intermediate incident response with investigation and containment', false, 2, 80000, 15.0),
('SOC Analyst Level 3', 'PROTECT_DEFEND', 'Incident Handling', 'Senior analyst leading incident response and mentoring team', false, 5, 100000, 15.0),
('Information Security Analyst', 'PROTECT_DEFEND', 'Infrastructure Defense', 'Monitor and protect company networks, systems, and data', true, 1, 75000, 12.0),
('Threat Analyst', 'PROTECT_DEFEND', 'Infrastructure Defense', 'Analyze threats and vulnerabilities, develop mitigation strategies', false, 3, 90000, 18.0),
('Intrusion Detection Specialist', 'PROTECT_DEFEND', 'Infrastructure Defense', 'Detect and investigate network intrusions using IDS/IPS systems', false, 2, 85000, 14.0),

-- INVESTIGATE
('Digital Forensics Examiner', 'INVESTIGATE', 'Digital Forensics', 'Collect and analyze digital evidence from devices and systems', false, 3, 95000, 12.0),
('Incident Handler', 'INVESTIGATE', 'Incident Handling', 'Lead incident response activities and conduct investigations', false, 2, 88000, 20.0),
('Malware Analyst', 'INVESTIGATE', 'Malware Analysis', 'Analyze malware behavior and provide threat intelligence', false, 4, 110000, 22.0),
('Cyber Threat Intelligence Analyst', 'INVESTIGATE', 'Threat Analysis', 'Gather and analyze intelligence on cyber threats', false, 3, 100000, 25.0),

-- SECURELY PROVISION
('Software Developer (Security-focused)', 'SECURELY_PROVISION', 'Software Development', 'Develop applications with secure coding practices', true, 2, 100000, 10.0),
('Security Software Developer', 'SECURELY_PROVISION', 'Software Development', 'Develop security-specific tools and applications', false, 4, 130000, 18.0),
('Systems Security Engineer', 'SECURELY_PROVISION', 'Systems Architecture', 'Design and implement secure systems architecture', false, 5, 120000, 16.0),
('Cloud Security Engineer', 'SECURELY_PROVISION', 'Cloud & Infrastructure Security', 'Secure cloud infrastructure and applications', false, 3, 125000, 35.0),
('Enterprise Security Architect', 'SECURELY_PROVISION', 'Enterprise Architecture', 'Design enterprise-wide security solutions', false, 8, 150000, 14.0),

-- OPERATE & MAINTAIN
('Systems Administrator', 'OPERATE_MAINTAIN', 'Systems Administration', 'Manage and maintain IT systems and networks', true, 1, 70000, 5.0),
('Network Administrator', 'OPERATE_MAINTAIN', 'Network Administration', 'Manage and maintain network infrastructure', true, 1, 75000, 6.0),
('Information Systems Security Officer (ISSO)', 'OPERATE_MAINTAIN', 'Systems Administration', 'Oversee security operations and compliance for systems', false, 4, 95000, 12.0),
('Database Administrator (DBA)', 'OPERATE_MAINTAIN', 'Data Administration', 'Manage and secure databases', false, 2, 100000, 8.0),

-- OVERSEE & GOVERN
('Compliance Analyst', 'OVERSEE_GOVERN', 'Risk & Compliance Management', 'Assess compliance with security standards and regulations', true, 1, 70000, 18.0),
('Risk Manager', 'OVERSEE_GOVERN', 'Risk & Compliance Management', 'Identify and manage organizational security risks', false, 5, 110000, 16.0),
('Compliance Manager', 'OVERSEE_GOVERN', 'Risk & Compliance Management', 'Manage compliance programs and audits', false, 5, 105000, 18.0),
('Security Manager', 'OVERSEE_GOVERN', 'Security Management', 'Manage security operations and team', false, 6, 115000, 14.0),
('Chief Information Security Officer (CISO)', 'OVERSEE_GOVERN', 'Information Security Strategy & Management', 'Executive-level security leadership and strategy', false, 10, 200000, 20.0);

-- ============================================
-- SKILLS
-- ============================================

INSERT INTO skills (name, category, proficiency_level, description) VALUES
-- Technical Skills
('Network Security', 'Technical', 'Intermediate', 'Understanding of firewalls, VPNs, proxies, network protocols'),
('Intrusion Detection/Prevention (IDS/IPS)', 'Technical', 'Intermediate', 'SNORT, Suricata, Zeek network monitoring'),
('Security Information & Event Management (SIEM)', 'Technical', 'Advanced', 'Splunk, ELK, ArcSight log analysis and correlation'),
('Threat Hunting', 'Technical', 'Advanced', 'Proactively search for threats in networks and systems'),
('Log Analysis', 'Technical', 'Intermediate', 'Parse and analyze system, network, and application logs'),
('Vulnerability Assessment', 'Technical', 'Intermediate', 'Nessus, Qualys, OpenVAS scanning and remediation'),
('Penetration Testing', 'Technical', 'Advanced', 'Kali Linux, Metasploit, BurpSuite offensive security testing'),
('Cryptography', 'Technical', 'Advanced', 'Encryption, hashing, certificates, key management'),
('Cloud Security (AWS/Azure/GCP)', 'Technical', 'Advanced', 'Secure cloud infrastructure and applications'),
('Malware Analysis', 'Technical', 'Advanced', 'Static and dynamic analysis of malware'),
('Digital Forensics', 'Technical', 'Advanced', 'EnCase, FTK, Volatility evidence collection and analysis'),
('Incident Response', 'Technical', 'Advanced', 'NIST IR framework, containment, eradication, recovery'),
('Secure Coding', 'Technical', 'Intermediate', 'OWASP Top 10, secure development practices'),
('SQL Injection / Web Vulnerabilities', 'Technical', 'Advanced', 'Understanding of common web security flaws'),
('Python Programming', 'Technical', 'Intermediate', 'Scripting, automation, tool development'),

-- Compliance & Governance
('HIPAA', 'Compliance', 'Intermediate', 'Healthcare data protection regulations'),
('PCI-DSS', 'Compliance', 'Intermediate', 'Payment Card Industry security standards'),
('SOC 2', 'Compliance', 'Intermediate', 'Service Organization Control auditing'),
('ISO 27001/27002', 'Compliance', 'Intermediate', 'Information security management systems'),
('NIST Cybersecurity Framework', 'Compliance', 'Intermediate', 'NIST CSF implementation and assessment'),
('Risk Assessment', 'Compliance', 'Advanced', 'Identifying and evaluating organizational risks'),
('Audit & Assessment', 'Compliance', 'Advanced', 'Security auditing and compliance testing'),

-- Soft Skills
('Communication', 'Soft Skills', 'Advanced', 'Technical and non-technical stakeholder communication'),
('Problem Solving', 'Soft Skills', 'Advanced', 'Critical thinking and issue resolution'),
('Teamwork & Collaboration', 'Soft Skills', 'Advanced', 'Cross-functional team coordination'),
('Leadership', 'Soft Skills', 'Advanced', 'Leading teams and projects'),
('Time Management', 'Soft Skills', 'Intermediate', 'Managing multiple priorities and deadlines'),
('Documentation', 'Soft Skills', 'Intermediate', 'Clear technical writing and reporting');

-- ============================================
-- CERTIFICATIONS
-- ============================================

INSERT INTO certifications (name, issuer, difficulty, cost_usd, exam_required, exam_duration_hours, passing_score, validity_years, description, url) VALUES
-- CompTIA (Entry-Level Foundation)
('A+', 'CompTIA', 'Entry-level', 319, true, 2, 700, 3, 'CompTIA A+ certifies entry-level IT technical support skills', 'https://www.comptia.org/certifications/a'),
('Network+', 'CompTIA', 'Entry-level', 319, true, 2, 720, 3, 'Networking fundamentals and infrastructure', 'https://www.comptia.org/certifications/network'),
('Security+', 'CompTIA', 'Entry-level', 369, true, 2, 750, 3, 'Foundation security principles (NIST NICE requirement)', 'https://www.comptia.org/certifications/security'),
('CySA+', 'CompTIA', 'Intermediate', 369, true, 2, 750, 3, 'Cybersecurity Analyst - threat detection and response', 'https://www.comptia.org/certifications/cysa'),
('CASP+', 'CompTIA', 'Advanced', 369, true, 3, 780, 3, 'CompTIA Advanced Security Practitioner', 'https://www.comptia.org/certifications/casp'),

-- Certified Ethical Hacker (CEH)
('Certified Ethical Hacker (CEH)', 'EC-Council', 'Intermediate', 1000, true, 4, 60, 3, 'Ethical hacking and penetration testing', 'https://www.eccouncil.org/'),

-- GIAC (SANS)
('GIAC Security Essentials (GSEC)', 'GIAC', 'Entry-level', 2500, true, 1, 60, 4, 'Fundamental security knowledge and skills', 'https://www.giac.org/'),
('GIAC Certified Incident Handler (GCIH)', 'GIAC', 'Intermediate', 2500, true, 1, 60, 4, 'Incident handling and response procedures', 'https://www.giac.org/'),
('GIAC Certified Intrusion Analyst (GCIA)', 'GIAC', 'Advanced', 2500, true, 2, 60, 4, 'Intrusion detection and analysis', 'https://www.giac.org/'),
('GIAC Certified Forensic Examiner (GCFE)', 'GIAC', 'Advanced', 2500, true, 2, 60, 4, 'Digital forensics and incident investigation', 'https://www.giac.org/'),

-- (ISC)²
('Certified Information Systems Security Professional (CISSP)', '(ISC)²', 'Advanced', 749, true, 3, 70, 3, 'Enterprise security architecture and management', 'https://www.isc2.org/'),
('Certified Information Security Manager (CISM)', '(ISC)²', 'Advanced', 749, true, 3, 70, 3, 'Security management and governance', 'https://www.isc2.org/'),
('Certified Cloud Security Professional (CCSP)', '(ISC)²', 'Advanced', 749, true, 3, 70, 3, 'Cloud security architecture and design', 'https://www.isc2.org/'),
('Certified Information Systems Auditor (CISA)', 'ISACA', 'Advanced', 760, true, 4, 70, 3, 'IT auditing and compliance', 'https://www.isaca.org/'),

-- AWS/Cloud Certifications
('AWS Certified Security – Specialty', 'Amazon AWS', 'Advanced', 300, true, 3, 70, 3, 'AWS cloud security and compliance', 'https://aws.amazon.com/'),
('Microsoft Certified: Azure Security Engineer Associate', 'Microsoft', 'Intermediate', 99, true, 2, 70, 1, 'Azure security architecture', 'https://microsoft.com/'),

-- Offensive Security
('Offensive Security Certified Professional (OSCP)', 'Offensive Security', 'Advanced', 999, true, 24, 70, 3, 'Hands-on penetration testing skills', 'https://www.offensive-security.com/'),
('Offensive Security Web Expert (OSWE)', 'Offensive Security', 'Advanced', 999, true, 48, 75, 3, 'Advanced web application penetration testing', 'https://www.offensive-security.com/');

-- ============================================
-- LINK ROLES TO SKILLS
-- ============================================

-- SOC Analyst L1 requires
INSERT INTO role_skills (role_id, skill_id, required, proficiency_level)
SELECT r.id, s.id, true, 'Intermediate' FROM roles r, skills s
WHERE r.title = 'SOC Analyst Level 1' AND s.name IN ('Network Security', 'SIEM', 'Log Analysis', 'Incident Response', 'Communication', 'Problem Solving');

-- Malware Analyst requires
INSERT INTO role_skills (role_id, skill_id, required, proficiency_level)
SELECT r.id, s.id, true, 'Advanced' FROM roles r, skills s
WHERE r.title = 'Malware Analyst' AND s.name IN ('Malware Analysis', 'Python Programming', 'Reverse Engineering', 'Incident Response');

-- Security Software Developer requires
INSERT INTO role_skills (role_id, skill_id, required, proficiency_level)
SELECT r.id, s.id, true, 'Advanced' FROM roles r, skills s
WHERE r.title = 'Security Software Developer' AND s.name IN ('Secure Coding', 'Cryptography', 'Python Programming');

-- CISO requires
INSERT INTO role_skills (role_id, skill_id, required, proficiency_level)
SELECT r.id, s.id, true, 'Advanced' FROM roles r, skills s
WHERE r.title = 'Chief Information Security Officer (CISO)' AND s.name IN ('Leadership', 'Communication', 'Risk Assessment', 'Compliance');

-- ============================================
-- LINK ROLES TO CERTIFICATIONS
-- ============================================

-- SOC Analyst L1 should have Security+
INSERT INTO role_certifications (role_id, cert_id, recommended, priority)
SELECT r.id, c.id, true, 1 FROM roles r, certifications c
WHERE r.title = 'SOC Analyst Level 1' AND c.name = 'Security+';

-- SOC Analyst L1 beneficial: CEH, CySA+
INSERT INTO role_certifications (role_id, cert_id, recommended, priority)
SELECT r.id, c.id, false, 2 FROM roles r, certifications c
WHERE r.title = 'SOC Analyst Level 1' AND c.name IN ('Certified Ethical Hacker (CEH)', 'CySA+');

-- Malware Analyst should have GCFE, GCIA
INSERT INTO role_certifications (role_id, cert_id, recommended, priority)
SELECT r.id, c.id, true, 1 FROM roles r, certifications c
WHERE r.title = 'Malware Analyst' AND c.name IN ('GIAC Certified Forensic Examiner (GCFE)', 'GIAC Certified Intrusion Analyst (GCIA)');

-- CISO should have CISSP
INSERT INTO role_certifications (role_id, cert_id, recommended, priority)
SELECT r.id, c.id, true, 1 FROM roles r, certifications c
WHERE r.title = 'Chief Information Security Officer (CISO)' AND c.name = 'Certified Information Systems Security Professional (CISSP)';

-- ============================================
-- CAREER PROGRESSION PATHS
-- ============================================

INSERT INTO progression_paths (name, description) VALUES
('SOC Analyst to Security Manager', 'Common entry point through SOC operations to management'),
('Developer to Security Architect', 'Software development background leading to security architecture'),
('Systems Admin to CISO', 'IT operations foundation to Chief Information Security Officer'),
('Incident Response to Threat Intelligence', 'Investigation focus leading to advanced threat analysis'),
('Compliance to Security Governance', 'Compliance specialization to enterprise security leadership');

-- SOC Analyst Path
INSERT INTO progression_steps (path_id, role_id, step_order, typical_duration_years)
SELECT p.id, r.id, 1, 2 FROM progression_paths p, roles r
WHERE p.name = 'SOC Analyst to Security Manager' AND r.title = 'SOC Analyst Level 1';

INSERT INTO progression_steps (path_id, role_id, step_order, typical_duration_years)
SELECT p.id, r.id, 2, 3 FROM progression_paths p, roles r
WHERE p.name = 'SOC Analyst to Security Manager' AND r.title = 'SOC Analyst Level 2';

INSERT INTO progression_steps (path_id, role_id, step_order, typical_duration_years)
SELECT p.id, r.id, 3, 3 FROM progression_paths p, roles r
WHERE p.name = 'SOC Analyst to Security Manager' AND r.title = 'SOC Analyst Level 3';

INSERT INTO progression_steps (path_id, role_id, step_order, typical_duration_years)
SELECT p.id, r.id, 4, 4 FROM progression_paths p, roles r
WHERE p.name = 'SOC Analyst to Security Manager' AND r.title = 'Security Manager';

INSERT INTO progression_steps (path_id, role_id, step_order, typical_duration_years)
SELECT p.id, r.id, 5, 5 FROM progression_paths p, roles r
WHERE p.name = 'SOC Analyst to Security Manager' AND r.title = 'Chief Information Security Officer (CISO)';

-- Developer to Architect Path
INSERT INTO progression_steps (path_id, role_id, step_order, typical_duration_years)
SELECT p.id, r.id, 1, 2 FROM progression_paths p, roles r
WHERE p.name = 'Developer to Security Architect' AND r.title = 'Software Developer (Security-focused)';

INSERT INTO progression_steps (path_id, role_id, step_order, typical_duration_years)
SELECT p.id, r.id, 2, 4 FROM progression_paths p, roles r
WHERE p.name = 'Developer to Security Architect' AND r.title = 'Security Software Developer';

INSERT INTO progression_steps (path_id, role_id, step_order, typical_duration_years)
SELECT p.id, r.id, 3, 5 FROM progression_paths p, roles r
WHERE p.name = 'Developer to Security Architect' AND r.title = 'Enterprise Security Architect';

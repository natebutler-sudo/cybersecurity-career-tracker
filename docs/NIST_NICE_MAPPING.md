# NIST NICE Framework Mapping

**NIST Cybersecurity Workforce Framework (NICE)** organizes cybersecurity jobs into **7 categories**, **22 specialty areas**, and **52 work roles**.

This project focuses on the **most common roles** for career starters through senior professionals.

---

## Seven Core Job Role Categories

### 1. **SECURELY PROVISION** 🔧
Design, develop, and deploy systems to protect information and infrastructure.

**Sample Roles:**
- Security Software Developer
- Systems Security Engineer
- Enterprise Architect

**Career Path:**
1. Software Developer → Security Software Developer
2. Systems Admin → Systems Security Engineer
3. IT Architect → Enterprise Security Architect

---

### 2. **OPERATE AND MAINTAIN** ⚙️
Manage and maintain systems to ensure they operate securely.

**Sample Roles:**
- Systems Administrator
- Network Administrator
- Information Systems Security Officer (ISSO)

**Career Path:**
1. Help Desk → Systems Admin → ISSO
2. Network Admin → Senior Network Admin → Network Security Engineer

---

### 3. **PROTECT AND DEFEND** 🛡️
Implement defensive measures and manage security controls.

**Sample Roles:**
- Security Operations Center (SOC) Analyst
- Information Security Analyst
- Incident Response Specialist

**Career Path (Most Common Entry Point):**
1. SOC Analyst Level 1 (entry)
2. SOC Analyst Level 2 (mid)
3. SOC Analyst Level 3 / Incident Response Lead (senior)

---

### 4. **INVESTIGATE** 🔎
Analyze, investigate, and respond to security incidents.

**Sample Roles:**
- Digital Forensics Examiner
- Incident Handler
- Malware Analyst

**Career Path:**
1. SOC Analyst → Incident Handler
2. Incident Handler → Forensic Examiner
3. Forensic Examiner → Cyber Threat Intelligence Analyst

---

### 5. **OVERSEE AND GOVERN** 📋
Manage risk, compliance, and governance frameworks.

**Sample Roles:**
- Compliance Manager
- Risk Manager
- Security Manager

**Career Path:**
1. Analyst → Compliance Analyst
2. Compliance Analyst → Compliance Manager
3. Compliance Manager → Chief Information Security Officer (CISO)

---

## Sample Progression Paths

### Path A: Security Operations → Leadership
```
SOC Analyst L1 (0-2 yrs)
    ↓
SOC Analyst L2 (2-5 yrs)
    ↓
SOC Analyst L3 / Incident Response Lead (5-8 yrs)
    ↓
Senior Manager / Director of Security Operations (8+ yrs)
    ↓
Chief Information Security Officer (CISO) (10+ yrs)
```

### Path B: Development → Security
```
Software Developer (2-3 yrs)
    ↓
Security Software Developer (3-7 yrs)
    ↓
Security Architect (7-10 yrs)
    ↓
Chief Security Architect (10+ yrs)
```

### Path C: IT Operations → Governance
```
Systems Administrator (2-3 yrs)
    ↓
Systems Security Engineer (3-6 yrs)
    ↓
Compliance Manager (6-10 yrs)
    ↓
Chief Information Security Officer (10+ yrs)
```

---

## Key Skills by Category

### PROTECT & DEFEND (Most Entry-Level)
- Network security
- Intrusion detection/prevention
- Firewalls, VPNs, proxies
- Security information & event management (SIEM)
- Log analysis
- Threat hunting

**Entry certifications:**
- CompTIA Security+ (A+, Network+ recommended first)
- CompTIA CySA+
- Certified Ethical Hacker (CEH)

---

### INVESTIGATE
- Digital forensics tools (EnCase, FTK, Volatility)
- Log analysis & correlation
- Incident response procedures
- Chain of custody
- Evidence handling
- Malware analysis

**Entry certifications:**
- CompTIA Security+
- GIAC Security Essentials (GSEC)
- Certified Incident Handler (GCIH)

---

### SECURELY PROVISION
- Secure coding practices
- Cryptography
- Threat modeling
- Software architecture
- Secure development lifecycle (SDLC)
- API security

**Entry certifications:**
- CompTIA Security+
- Certified Secure Software Developer (CSSD)
- OWASP Certified

---

### OVERSEE & GOVERN
- Risk assessment & management
- Compliance frameworks (SOC 2, ISO 27001, HIPAA, PCI-DSS)
- Security policies & procedures
- Vendor management
- Business continuity & disaster recovery
- Board-level communication

**Entry certifications:**
- CompTIA Security+
- Certified Information Systems Auditor (CISA)
- Certified Information Security Manager (CISM)

---

## Database Schema Reference

These roles will be stored in the `roles` table:

```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  nist_category VARCHAR(50),        -- "PROTECT_DEFEND", "OVERSEE_GOVERN", etc.
  specialty_area VARCHAR(255),       -- "Incident Handling", "Risk Management", etc.
  description TEXT,
  entry_level BOOLEAN,              -- True if commonly hired without prior security role
  typical_experience_years INT,      -- Experience needed for this role
  avg_salary_usd INT,               -- Base average salary
  job_growth_percent DECIMAL,        -- YoY job market growth
  created_at TIMESTAMP
);

CREATE TABLE skills (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(100),            -- "Technical", "Compliance", "Investigation", etc.
  proficiency_level VARCHAR(50),    -- "Beginner", "Intermediate", "Advanced"
  created_at TIMESTAMP
);

CREATE TABLE role_skills (
  role_id UUID REFERENCES roles(id),
  skill_id UUID REFERENCES skills(id),
  required BOOLEAN,                 -- True if required, false if beneficial
  PRIMARY KEY (role_id, skill_id)
);

CREATE TABLE certifications (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  issuer VARCHAR(255),
  difficulty VARCHAR(50),           -- "Entry-level", "Intermediate", "Advanced"
  cost_usd INT,
  exam_required BOOLEAN,
  description TEXT,
  created_at TIMESTAMP
);

CREATE TABLE role_certifications (
  role_id UUID REFERENCES roles(id),
  cert_id UUID REFERENCES certifications(id),
  recommended BOOLEAN,              -- True if commonly expected
  PRIMARY KEY (role_id, cert_id)
);
```

---

## Next Steps

1. ✅ Map all 52 NIST NICE roles
2. ✅ Assign skills to each role
3. ✅ Include common certifications
4. ✅ Add salary data per region/experience
5. ⬜ Build career planner (gap analysis)
6. ⬜ Add job market data feed

---

## References

- [NIST Cybersecurity Workforce Framework](https://csrc.nist.gov/projects/nice/)
- [NICE Occupational Information Network (O*NET)](https://www.onetonline.org/)
- [SANS Cyber Aces](https://www.cybrary.it/)

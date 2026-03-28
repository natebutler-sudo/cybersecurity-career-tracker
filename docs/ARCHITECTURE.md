# System Architecture

## High-Level Overview

```
┌─────────────────┐
│   React + Vite  │ (Port 5173)
│    Frontend     │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────────────────┐
│  Node.js + Express API      │ (Port 3001)
│  /api/v1/roles              │
│  /api/v1/skills             │
│  /api/v1/certifications     │
│  /api/v1/progression-paths  │
└────────┬────────────────────┘
         │ SQL
         ↓
┌──────────────────┐
│   PostgreSQL 14  │ (Port 5432)
│   Database       │
└──────────────────┘
```

---

## Component Breakdown

### Frontend (React + Vite)

**Purpose:** Interactive single-page application for browsing roles, certifications, and career paths.

**Key Pages:**
- `Home` — Overview, search roles
- `Roles` — Browse all NIST NICE roles
- `RoleDetail` — Deep dive on a specific role with skills, certs, salary
- `CareerPathPlanner` — Visualize progression from current role to target
- `Certifications` — Browse certifications by role

**State Management:**
- React Context for global state (roles, skills, user filters)
- Custom hooks for API data fetching

**API Integration:**
- `src/api/client.ts` — Axios instance for all backend calls
- Centralized error handling

---

### Backend API (Node.js + Express)

**Purpose:** RESTful API serving role, skill, and certification data. Designed for future scalability (user accounts, progress tracking).

**Endpoints (MVP):**

```
GET  /api/v1/roles                      # List all roles
GET  /api/v1/roles?category=PROTECT     # Filter by NIST category
GET  /api/v1/roles/:id                  # Role details
GET  /api/v1/roles/:id/skills           # Skills required for role
GET  /api/v1/roles/:id/certifications   # Certs recommended for role

GET  /api/v1/skills                     # List all skills
GET  /api/v1/skills?category=Technical  # Filter by category

GET  /api/v1/certifications             # List all certs
GET  /api/v1/certifications?difficulty=Entry # Filter by difficulty

GET  /api/v1/progression-paths          # Career progression paths
GET  /api/v1/progression-paths/:id      # Specific path with steps
```

**Request/Response Format:**

```typescript
// Success Response
{
  success: true,
  data: { /* T */ },
  timestamp: "2024-01-15T10:30:00Z"
}

// Error Response
{
  success: false,
  error: "Role not found",
  timestamp: "2024-01-15T10:30:00Z"
}
```

**Middleware Stack:**
1. CORS
2. Body parser (JSON)
3. Request logging
4. Error handling
5. (Future: Authentication)

---

### Database (PostgreSQL)

**Core Tables:**

1. **roles** — NIST NICE job roles
   - id, title, nist_category, specialty_area, description
   - entry_level, typical_experience_years, avg_salary_usd, job_growth_percent

2. **skills** — Technical and soft skills
   - id, name, category, proficiency_level, description

3. **role_skills** — Many-to-many: roles ↔ skills
   - role_id, skill_id, required (boolean), proficiency_level

4. **certifications** — Certs (CompTIA, GIAC, CISM, etc.)
   - id, name, issuer, difficulty, cost_usd, exam_required, validity_years

5. **role_certifications** — Many-to-many: roles ↔ certifications
   - role_id, cert_id, recommended (boolean), priority

6. **progression_paths** — Career journey templates
   - id, name, description

7. **progression_steps** — Steps within a path
   - id, path_id, role_id, step_order, typical_duration_years

---

## Data Flow

### Example: User browses "SOC Analyst" role

1. **Frontend:** User clicks role "SOC Analyst"
2. **Frontend → API:** `GET /api/v1/roles/soc-analyst`
3. **API → DB:** `SELECT * FROM roles WHERE id = 'soc-analyst'`
4. **DB → API:** Returns role record
5. **API → Frontend:** `{ success: true, data: {...}, timestamp: "..." }`
6. **Frontend:** Renders role details (title, salary, description)
7. **Frontend → API:** `GET /api/v1/roles/soc-analyst/skills`
8. **API → DB:** `SELECT skills.* FROM skills JOIN role_skills ON ... WHERE role_id = 'soc-analyst'`
9. **DB → API:** Returns 10+ skills
10. **API → Frontend:** Returns skill list
11. **Frontend:** Renders skills table/cards

---

## Environment Configuration

### .env Files (Never Committed)

```
.env.dev   → Local development (hot reload)
.env.test  → CI/CD testing (ephemeral DB)
.env.prod  → Production deployment
```

### Docker Compose Environments

**Development:** `docker-compose up`
- Frontend hot-reload on `localhost:5173`
- Backend auto-restart on code changes
- Local PostgreSQL with seed data

**Test:** GitHub Actions CI
- Ephemeral test database
- Run all tests
- Build production images (don't push)

**Production:** (TBD)
- Deployed to cloud (AWS, GCP, Vercel, etc.)
- Real PostgreSQL (AWS RDS, etc.)
- CDN for static assets
- Rate limiting, monitoring, logging

---

## Security Considerations

### Current (MVP)

- ✅ CORS configured
- ✅ Input validation (Joi)
- ✅ SQL injection prevention (prepared statements)
- ✅ Environment secrets in .env (not committed)

### Future

- 🔜 Authentication (Firebase Auth or JWT)
- 🔜 Rate limiting
- 🔜 Request logging & monitoring
- 🔜 Database encryption at rest
- 🔜 HTTPS/TLS
- 🔜 API versioning strategy

---

## Scalability Roadmap

**Phase 1 (Current):**
- Static role/skill data served from PostgreSQL
- No user accounts

**Phase 2 (Next):**
- User accounts (Firebase Auth)
- User progress tracking (certifications completed, roles saved)
- Favorites/bookmarking

**Phase 3 (Future):**
- Job board integration
- Resume analyzer ("compare your resume to this role")
- AI coaching (ChatGPT integration?)
- Community reviews of roles/certifications

---

## Technology Choices

| Layer | Technology | Why? |
|-------|-----------|------|
| Frontend | React + Vite | Fast, modular, popular in modern web dev |
| Backend | Node.js + Express | Non-blocking I/O, rapid development |
| Language | TypeScript | Type safety, catches bugs early |
| Database | PostgreSQL | Relational data (many-to-many), structured |
| ORM | None (raw SQL) | Keep it simple for MVP, upgrade if needed |
| Testing | Jest | Industry standard, works w/ TS |
| Deployment | Docker | Consistent across dev/test/prod |
| CI/CD | GitHub Actions | Native to GitHub, free for public repos |

---

## File Structure Walkthrough

```
cybersecurity-career-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Full page components
│   │   ├── api/               # API client functions
│   │   ├── types/             # TypeScript interfaces
│   │   ├── App.tsx            # Root component
│   │   └── main.tsx           # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── CLAUDE.md              # Frontend-specific guardrails
│
├── backend/
│   ├── src/
│   │   ├── index.ts           # Express app init
│   │   ├── routes/            # API endpoints
│   │   ├── models/            # DB queries
│   │   ├── middleware/        # Express middleware
│   │   ├── types/             # TypeScript interfaces
│   │   ├── config/            # Environment & DB setup
│   │   └── db/
│   │       ├── migrate.ts      # Run migrations
│   │       └── seed.ts         # Populate test data
│   ├── package.json
│   ├── tsconfig.json
│   └── CLAUDE.md              # Backend-specific guardrails
│
├── db/
│   ├── schema.sql             # Initial database schema
│   ├── migrations/            # (Future: versioned migrations)
│   └── seeds/                 # (Future: seed data)
│
├── docker/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── nginx.conf
│
├── docs/
│   ├── ARCHITECTURE.md        # This file
│   ├── NIST_NICE_MAPPING.md   # Role reference
│   └── API.md                 # (Future: full API docs)
│
├── .github/
│   └── workflows/
│       ├── ci.yml             # Test & lint on PR
│       └── deploy.yml         # (Future: auto-deploy)
│
├── CLAUDE.md                  # Root-level guardrails (this file)
├── docker-compose.yml         # Local dev setup
├── .env.example               # Template for secrets
├── .gitignore
└── README.md
```

---

## Next Steps

1. ✅ Architecture defined
2. ✅ Database schema created
3. ✅ Guardrails documented
4. ⬜ Scaffold frontend components
5. ⬜ Scaffold backend routes
6. ⬜ Populate NIST NICE data (seed)
7. ⬜ Wire frontend ↔ backend integration
8. ⬜ Set up monitoring & logging

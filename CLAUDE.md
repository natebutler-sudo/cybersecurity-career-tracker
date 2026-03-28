# Cybersecurity Career Tracker — Project Guardrails

**Mission:** Interactive platform that maps cybersecurity career progression using the NIST NICE Framework. Help people understand roles, required skills, certifications, and salary expectations as they advance their careers.

**Target Audience:** Career changers, IT professionals, students entering cybersecurity, and people planning career advancement.

---

## Architecture & Tech Stack

- **Frontend:** React 18 + Vite + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL (structured career/role data)
- **Auth:** (TBD — may integrate Firebase Auth later)
- **Deployment:** Docker + GitHub Actions → Dev/Test/Prod

---

## Project Structure

```
cybersecurity-career-tracker/
├── frontend/          # React + Vite web app
├── backend/           # Node.js/Express API
├── db/                # Database schemas & migrations
├── docker/            # Docker & Docker Compose configs
├── .github/workflows/ # CI/CD pipelines
├── docs/              # Architecture, NIST mapping, API docs
└── CLAUDE.md          # This file
```

---

## Core Features (MVP)

1. **Career Pathways** — Browse NIST NICE roles and progression paths
2. **Role Details** — Skills, certifications, experience required per role
3. **Career Planner** — Map your current skills → target role → gap analysis
4. **Salary & Market Data** — Compensation ranges, job market demand
5. **Resource Links** — Training, certification courses, job boards

**Future:** User accounts (Firebase Auth), progress tracking, saved pathways, community reviews.

---

## Guardrails for Subagents

### ✅ What Subagents CAN Do
- Write feature code following existing patterns
- Add tests (required before PR)
- Update README & docs
- Refactor within a feature
- Suggest improvements with context

### ❌ What Subagents CANNOT Do (Requires Nate Approval)
- Change database schema without showing migration
- Add external dependencies without justification
- Modify authentication flow
- Change environment variable structure
- Deploy to production
- Break existing tests or features

---

## Environment Setup

Three separate databases and deployments:
- **dev**: Local machine, hot-reload, mock data
- **test**: CI/CD runs tests, staging DB
- **prod**: Deployed live, real user data

Environment configs in `.env.{dev|test|prod}` — never commit secrets.

---

## Code Standards

- TypeScript everywhere (no `.js` files)
- ESLint + Prettier configured
- Jest for tests (minimum 70% coverage)
- API versioning: `/api/v1/`
- Database migrations required for schema changes
- All PRs reviewed before merge

---

## NIST NICE Framework

See `/docs/NIST_NICE_MAPPING.md` for:
- 7 Core Job Roles Categories
- 32+ Specific job roles
- Progression paths (entry → mid → senior)
- Required certifications per role
- Salary bands by region & experience

---

## CI/CD Pipeline

**On every push to main:**
1. Install dependencies
2. Run ESLint
3. Run Jest tests
4. Build Docker images
5. Run integration tests (test env)
6. (Manual approval) Deploy to prod

---

## Next Steps

1. ✓ Project scaffold created
2. ✓ Guardrails defined
3. ⬜ Frontend dev setup + first component
4. ⬜ Backend API scaffold + first endpoint
5. ⬜ Database schema migrations
6. ⬜ GitHub Actions workflows
7. ⬜ NIST NICE data import

---

**Questions for Nate:**
- Do you want user authentication from day 1 (Firebase)? Or build features first, add auth later?
- Preferred React component library (Material-UI, Shadcn, Ant Design)?
- Should salary data be hardcoded or pull from external API?

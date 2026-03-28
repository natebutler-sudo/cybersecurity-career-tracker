# Quick Start Guide — Cybersecurity Career Tracker

Get the project running in **3 minutes**.

## Prerequisites

- ✅ Docker & Docker Compose installed
- ✅ Git (to clone the repo)

## One-Command Startup

```bash
cd cybersecurity-career-tracker
docker-compose up
```

**That's it!** Wait 30-60 seconds for services to start.

---

## Access the Application

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:5173 | React app - browse roles, skills, certs |
| **Backend API** | http://localhost:3001/api/v1 | REST API endpoints |
| **Database** | localhost:5432 | PostgreSQL (internal) |
| **Health Check** | http://localhost:3001/health | Backend health status |

---

## What You Get Running

### Frontend (React + Vite)
- 🎨 Interactive role browser with NIST NICE framework
- 🔍 Filter by category (Protect & Defend, Investigate, etc.)
- 📊 Salary, experience, job growth metrics
- ✅ Entry-level role badges

### Backend (Node.js + Express)
- 📡 REST API serving role, skill, certification data
- 🐘 PostgreSQL database with 20+ cybersecurity roles
- 🔗 Relations between roles → skills → certifications
- 💾 Seeded with real NIST NICE framework data

### Database (PostgreSQL)
- 📋 **roles** — 20+ job titles by NIST category
- 🎯 **skills** — Technical, compliance, soft skills
- 📜 **certifications** — 20+ real certifications (CompTIA, GIAC, AWS, etc.)
- 🔀 **Many-to-many relationships** — roles ↔ skills ↔ certs
- 🗺️ **progression_paths** — Career journey templates

---

## API Examples

### Get all roles
```bash
curl http://localhost:3001/api/v1/roles
```

### Get roles by category
```bash
curl "http://localhost:3001/api/v1/roles?category=PROTECT_DEFEND"
```

### Get a specific role's skills
```bash
curl "http://localhost:3001/api/v1/roles/{role-id}/skills"
```

### Get certifications
```bash
curl http://localhost:3001/api/v1/certifications
```

---

## Stopping the Application

Press `Ctrl+C` in the terminal running `docker-compose up`, then:

```bash
docker-compose down
```

To remove the database:
```bash
docker-compose down -v
```

---

## Development Workflow

### Add a new feature
1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes (frontend or backend)
3. Test locally (everything auto-reloads in Docker)
4. Commit: `git commit -m "Description"`
5. Push: `git push origin feature/your-feature`
6. Open PR on GitHub

### Edit the database
- **Schema changes:** Add SQL to `db/schema.sql` (then rebuild)
- **Seed data:** Update `db/seed.sql` and restart containers
- **Migrations:** (Future) Add versioned migrations to `db/migrations/`

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

---

## Troubleshooting

### Port already in use
If port 5173 or 3001 is in use:

```bash
# Kill process on port 5173
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill process on port 3001
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Database connection error
```bash
# Restart just the database
docker-compose restart postgres

# Then restart backend
docker-compose restart backend
```

### Frontend not updating
```bash
# Rebuild frontend container
docker-compose build frontend
docker-compose up frontend
```

---

## Three Environments

### Development (Local)
```bash
docker-compose up
```
- Hot reload for frontend & backend
- Mock data in database
- Full logging

### Testing (CI/CD)
```bash
# Runs on every PR via GitHub Actions
```
- GitHub Actions runs tests, lint, type-check
- Ephemeral test database
- See `.github/workflows/ci.yml`

### Production (Deploy)
```bash
# (Coming soon)
```
- Deployed to cloud platform (AWS, GCP, Vercel, etc.)
- Real PostgreSQL (managed)
- CDN for static assets

---

## Next Steps

1. ✅ **Run locally** — `docker-compose up`
2. ✅ **Explore the frontend** — http://localhost:5173
3. ✅ **Test API endpoints** — http://localhost:3001/api/v1/roles
4. ⬜ **Deploy to production** — (Next phase)
5. ⬜ **Layer in new features** — Certification roadmap, user accounts, etc.

---

## Project Links

- 🐙 **GitHub:** https://github.com/natebutler-sudo/cybersecurity-career-tracker
- 📖 **Architecture:** See `docs/ARCHITECTURE.md`
- 🏗️ **Guardrails:** See `CLAUDE.md` (for subagents)
- 🎓 **NIST Framework:** See `docs/NIST_NICE_MAPPING.md`

---

**Ready to go live?** All systems are go. Ship it! 🚀

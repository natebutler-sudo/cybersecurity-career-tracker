# Cybersecurity Career Tracker

Interactive platform mapping cybersecurity career progression using the **NIST NICE Framework**.

Helps professionals understand roles, required skills, certifications, and career advancement paths in cybersecurity.

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+ (or use Docker)

### Development

```bash
# Clone the repo
git clone https://github.com/yourusername/cybersecurity-career-tracker.git
cd cybersecurity-career-tracker

# Start all services (frontend, backend, database)
docker-compose up

# Frontend: http://localhost:5173
# Backend API: http://localhost:3001
# Database: localhost:5432
```

### With local development (hot reload)

```bash
# Terminal 1: Frontend
cd frontend
npm install
npm run dev

# Terminal 2: Backend
cd backend
npm install
npm run dev

# Terminal 3: Database (if not using Docker)
docker run -d -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=career_tracker_dev \
  postgres:14
```

## Project Structure

```
├── frontend/              # React + Vite SPA
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client calls
│   │   └── App.tsx
│   └── vite.config.ts
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── models/        # Data models
│   │   ├── middleware/    # Auth, logging, etc.
│   │   └── index.ts
│   └── package.json
├── db/                    # Database
│   ├── migrations/        # SQL migration files
│   └── schema.sql         # Initial schema
├── docker/                # Docker configs
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md
│   ├── NIST_NICE_MAPPING.md
│   └── API.md
└── .github/workflows/     # CI/CD pipelines
```

## Features

- 🎯 Browse NIST NICE cybersecurity roles
- 📈 Understand career progression paths
- 🎓 See required certifications per role
- 💰 Salary bands and market demand
- 🔗 Links to training & resources
- 🚀 (Coming soon) User accounts & progress tracking

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite + TypeScript |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL 14 |
| Infrastructure | Docker + Docker Compose |
| CI/CD | GitHub Actions |

## Development Workflow

1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes, write tests
3. Run tests: `npm test`
4. Push and open a PR
5. (Nate reviews & approves)
6. Merge to main → auto-deploy to test env

## Environment Variables

See `.env.example` for required variables:

```bash
# Frontend
VITE_API_URL=http://localhost:3001/api/v1

# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/career_tracker_dev
NODE_ENV=development
PORT=3001
```

## Three Environments

| Environment | Purpose | Database |
|-------------|---------|----------|
| **dev** | Local development | Local PostgreSQL |
| **test** | CI/CD testing | Ephemeral test DB |
| **prod** | Live deployment | Production PostgreSQL |

## Contributing

This project uses guardrails to help subagents work safely. See `/CLAUDE.md` for details on what features can be built without approval.

## License

MIT

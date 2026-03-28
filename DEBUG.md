# Debugging Guide

## Step 1: Check Docker is Running

```bash
docker --version
docker-compose --version
```

You should see version numbers. If not, install Docker Desktop.

## Step 2: Check for Port Conflicts

```bash
# Check if ports are already in use
lsof -i :5173   # Frontend
lsof -i :3001   # Backend
lsof -i :5432   # Database
```

If ports are in use, either:
- Stop the existing process, or
- Modify `docker-compose.yml` to use different ports

## Step 3: Start Docker Compose with Logs

```bash
cd /Users/nateb/Projects/cybersecurity-career-tracker
docker-compose up --build
```

**Wait for these messages:**
```
backend_1   | 🚀 Backend running on http://localhost:3001
frontend_1  | ➜  Local:   http://localhost:5173/
postgres_1  | database system is ready to accept connections
```

If you see errors, note them and share them with me.

## Step 4: Test the Backend

While containers are running, open another terminal:

```bash
# Test backend health
curl http://localhost:3001/health

# Should respond with:
# {"success":true,"data":{"status":"ok","timestamp":"..."}...}

# Test API
curl http://localhost:3001/api/v1/roles | head -50
```

## Step 5: Test the Frontend

Visit in browser:
```
http://localhost:5173
```

You should see:
- Title: "🛡️ Cybersecurity Career Tracker"
- Category filter buttons
- Loading spinner (briefly)
- Role cards with data

## Common Issues & Solutions

### Issue: "Cannot connect to Docker daemon"
**Solution:** Start Docker Desktop and wait for it to fully start.

### Issue: "Port 5173 already in use"
**Solution:** Kill the process or change the port:
```bash
# Change in docker-compose.yml:
# ports:
#   - "5174:5173"  # Use 5174 instead
docker-compose up
```

### Issue: "Database connection refused"
**Solution:** Database needs time to start. Wait 30 seconds and try again:
```bash
docker-compose logs postgres
```

Look for: `database system is ready to accept connections`

### Issue: "Frontend shows blank page"
**Solution:** Check browser console (F12) for errors. Then check:
```bash
docker-compose logs frontend
docker-compose logs backend
```

### Issue: "API returns 'Role not found'"
**Solution:** Database seed didn't run. Check:
```bash
docker-compose logs postgres

# If seed didn't run, manually seed:
docker-compose exec postgres psql -U career_user -d career_tracker_dev -f /docker-entrypoint-initdb.d/02-seed.sql
```

## Step 6: Restart Everything

If all else fails, clean up and restart:

```bash
# Stop all containers
docker-compose down

# Remove volumes (clears database)
docker-compose down -v

# Start fresh
docker-compose up --build
```

## Getting Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Last 50 lines
docker-compose logs --tail=50
```

## Check Running Containers

```bash
docker ps
```

You should see 3 containers:
- `career-tracker-api` (backend)
- `career-tracker-web` (frontend)
- `career-tracker-db` (postgres)

## Network Issues

If frontend can't reach backend:

```bash
# Check Docker network
docker network ls
docker network inspect cybersecurity-career-tracker_default

# Verify backend is accessible from frontend container
docker-compose exec frontend curl http://backend:3001/health
```

## Nuclear Option

If nothing works, completely reset:

```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

---

**Share your error messages and I'll help you fix it!**

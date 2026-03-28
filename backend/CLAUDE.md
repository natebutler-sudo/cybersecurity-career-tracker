# Backend Guardrails — Node.js + Express

**Stack:** Node.js 18+ + Express + TypeScript + PostgreSQL

---

## Code Structure

```
src/
├── index.ts              # Express app setup
├── config/               # Environment & database config
│   └── db.ts
├── routes/               # API endpoints
│   ├── roles.ts
│   ├── skills.ts
│   └── index.ts
├── models/               # Database queries & logic
│   ├── Role.ts
│   ├── Skill.ts
│   └── ...
├── middleware/           # Auth, logging, error handling
│   ├── auth.ts
│   ├── errorHandler.ts
│   └── ...
├── types/                # TypeScript interfaces
│   └── index.ts
└── db/                   # Migrations & seeds
    ├── migrate.ts
    └── seed.ts
```

---

## API Conventions

**Base URL:** `http://localhost:3001/api/v1`

**Responses:** Always JSON with this shape:
```typescript
{
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
```

**Example endpoints:**
```
GET    /api/v1/roles              # List all roles
GET    /api/v1/roles/:id          # Get role details
GET    /api/v1/roles/:id/skills   # Skills for a role
GET    /api/v1/certifications     # List certifications
```

---

## Request/Response Example

```typescript
// src/routes/roles.ts
import { Router } from 'express';
import { getRoles, getRoleById } from '../models/Role';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const roles = await getRoles();
    res.json({
      success: true,
      data: roles,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const role = await getRoleById(req.params.id);
    if (!role) {
      return res.status(404).json({
        success: false,
        error: 'Role not found',
        timestamp: new Date().toISOString()
      });
    }
    res.json({
      success: true,
      data: role,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    next(err);
  }
});

export default router;
```

---

## Database Access

Use prepared statements to prevent SQL injection:

```typescript
// src/models/Role.ts
import { query } from '../config/db';

export const getRoles = async () => {
  const result = await query(
    'SELECT id, title, category, description FROM roles ORDER BY title'
  );
  return result.rows;
};

export const getRoleById = async (id: string) => {
  const result = await query(
    'SELECT * FROM roles WHERE id = $1',
    [id]
  );
  return result.rows[0];
};
```

---

## Environment Variables

Create `.env.{dev|test|prod}`:

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/career_tracker_dev
LOG_LEVEL=debug
```

Never commit `.env` files.

---

## Testing

Use Jest:

```typescript
// src/models/Role.test.ts
import { getRoleById } from './Role';

describe('Role model', () => {
  it('returns role by id', async () => {
    const role = await getRoleById('soc-analyst');
    expect(role.title).toBe('SOC Analyst');
  });
});
```

Run: `npm test`

---

## Database Migrations

Migrations track schema changes:

```bash
npm run db:migrate    # Run pending migrations
npm run db:seed       # Seed NIST NICE data
```

**Never modify migrations after they're committed.** Create new ones instead.

---

## Error Handling

All errors caught in middleware and returned as JSON:

```typescript
// src/middleware/errorHandler.ts
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});
```

---

## Coding Standards

✅ **Required:**
- TypeScript for all `.ts` files
- Async/await (no callbacks)
- Error handling in all routes
- Prepared statements for SQL
- Input validation with Joi

❌ **Not Allowed:**
- Synchronous database queries
- Hardcoded credentials
- SQL string concatenation (injection risk!)
- `any` types

---

## Subagent Restrictions

❌ **Cannot change without Nate approval:**
- Database schema
- API response format
- Authentication system
- Environment variable names

✅ **Can do freely:**
- Add new routes/endpoints
- Add models/queries
- Fix bugs
- Add validation
- Optimize queries

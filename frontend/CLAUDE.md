# Frontend Guardrails — React + Vite

**Stack:** React 18 + TypeScript + Vite

---

## Code Structure

```
src/
├── components/        # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── RoleCard.tsx
│   └── ...
├── pages/            # Page components (one per route)
│   ├── Home.tsx
│   ├── Roles.tsx
│   ├── RoleDetail.tsx
│   └── ...
├── api/              # API client functions
│   └── client.ts     # Axios instance
├── types/            # TypeScript interfaces
│   └── index.ts
├── styles/           # Global CSS/SCSS
└── App.tsx
```

---

## Coding Standards

✅ **Required:**
- TypeScript for all `.tsx` files
- Functional components with hooks
- Props typed with interfaces
- ESLint passing
- Tests for components with user interaction

❌ **Not Allowed:**
- Class components
- `any` types (use `unknown` or proper type)
- Inline styles (use CSS modules or Tailwind)
- API calls directly in components (use `/api` module)

---

## Component Example

```typescript
// src/components/RoleCard.tsx
import { Role } from '../types';
import styles from './RoleCard.module.css';

interface RoleCardProps {
  role: Role;
  onSelect: (roleId: string) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, onSelect }) => {
  return (
    <div className={styles.card}>
      <h3>{role.title}</h3>
      <p>{role.category}</p>
      <button onClick={() => onSelect(role.id)}>Learn More</button>
    </div>
  );
};
```

---

## API Integration

**All API calls through `/api/client.ts`:**

```typescript
// src/api/client.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const client = axios.create({ baseURL: API_URL });

export const getRoles = async () => {
  const res = await client.get('/roles');
  return res.data;
};
```

**Usage in components:**
```typescript
import { getRoles } from '../api/client';

const [roles, setRoles] = useState([]);
useEffect(() => {
  getRoles().then(setRoles);
}, []);
```

---

## Testing

Use Jest + React Testing Library:

```typescript
// src/components/RoleCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RoleCard } from './RoleCard';

it('calls onSelect when button clicked', async () => {
  const handleSelect = jest.fn();
  const role = { id: '1', title: 'SOC Analyst', category: 'Operate' };

  render(<RoleCard role={role} onSelect={handleSelect} />);
  await userEvent.click(screen.getByRole('button'));
  expect(handleSelect).toHaveBeenCalledWith('1');
});
```

Run: `npm test`

---

## Environment Variables

Create `.env.local` (dev), `.env.test`, `.env.prod`:

```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_ENV=development
```

**In code:** `import.meta.env.VITE_API_URL`

---

## Build & Deploy

- `npm run build` → optimized production bundle
- Output: `dist/` (static HTML/JS/CSS)
- Deploy to Docker or Firebase Hosting

---

## Subagent Restrictions

❌ **Cannot change without Nate approval:**
- Routing structure
- API contract (data shapes)
- Build/vite config
- ESLint rules

✅ **Can do freely:**
- Add new pages/components
- Refactor component internals
- Update styles/layout
- Add new routes (following structure)

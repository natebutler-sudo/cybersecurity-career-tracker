import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getRoles, getRoleById, getRoleByTitle, getEntryRoles, getRoleSkills, getRoleCertifications } from './models/Role'
import { getSkills } from './models/Skill'
import { getCertifications } from './models/Certification'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: { status: 'ok', timestamp: new Date().toISOString() },
  })
})

// ============================================
// ROLES ENDPOINTS
// ============================================

app.get('/api/v1/roles', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const category = _req.query.category as string | undefined
    const roles = await getRoles(category)
    res.json({
      success: true,
      data: roles,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

app.get('/api/v1/roles/entry-level', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await getEntryRoles()
    res.json({
      success: true,
      data: roles,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

app.get('/api/v1/roles/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let role = null
    try {
      role = await getRoleById(req.params.id)
    } catch {
      // If UUID parsing fails, try finding by title
      role = await getRoleByTitle(req.params.id)
    }

    if (!role) {
      return res.status(404).json({
        success: false,
        error: 'Role not found',
        timestamp: new Date().toISOString(),
      })
    }
    res.json({
      success: true,
      data: role,
      timestamp: new Date().toISOString(),
    })
    return
  } catch (err) {
    next(err)
    return
  }
})

app.get('/api/v1/roles/:id/skills', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skills = await getRoleSkills(req.params.id)
    res.json({
      success: true,
      data: skills,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

app.get('/api/v1/roles/:id/certifications', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const certs = await getRoleCertifications(req.params.id)
    res.json({
      success: true,
      data: certs,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

// ============================================
// SKILLS ENDPOINTS
// ============================================

app.get('/api/v1/skills', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const category = _req.query.category as string | undefined
    const skills = await getSkills(category)
    res.json({
      success: true,
      data: skills,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

// ============================================
// CERTIFICATIONS ENDPOINTS
// ============================================

app.get('/api/v1/certifications', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const difficulty = _req.query.difficulty as string | undefined
    const certs = await getCertifications(difficulty)
    res.json({
      success: true,
      data: certs,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    timestamp: new Date().toISOString(),
  })
})

// Error handler
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err)
    res.status(500).json({
      success: false,
      error: err.message || 'Internal server error',
      timestamp: new Date().toISOString(),
    })
  }
)

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
  console.log(`📍 API: http://localhost:${PORT}/api/v1`)
  console.log(`📊 Roles: GET /api/v1/roles`)
  console.log(`📋 Skills: GET /api/v1/skills`)
  console.log(`📜 Certifications: GET /api/v1/certifications`)
})

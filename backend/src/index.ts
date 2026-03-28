import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: { status: 'ok', timestamp: new Date().toISOString() },
  })
})

// API v1 Routes (placeholder)
app.get('/api/v1/roles', async (req, res) => {
  try {
    // TODO: Fetch from database
    res.json({
      success: true,
      data: [
        {
          id: '1',
          title: 'SOC Analyst',
          category: 'PROTECT_DEFEND',
          nist_category: 'Protect and Defend',
          description: 'Monitor security alerts and respond to incidents',
        },
        {
          id: '2',
          title: 'Security Engineer',
          category: 'SECURELY_PROVISION',
          nist_category: 'Securely Provision',
          description: 'Design and implement secure systems',
        },
      ],
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'Internal server error',
      timestamp: new Date().toISOString(),
    })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    timestamp: new Date().toISOString(),
  })
})

// Error handler
app.use(
  (err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
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
})

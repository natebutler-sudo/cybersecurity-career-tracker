import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err)
})

export const query = async (text: string, params?: (string | number | boolean)[]) => {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    if (duration > 1000) {
      console.warn(`Query took ${duration}ms`, { text, params })
    }
    return res
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

export const getClient = async () => {
  return pool.connect()
}

export default pool

import { query } from '../config/db'

export interface Certification {
  id: string
  name: string
  issuer: string
  difficulty: string
  cost_usd: number
  exam_required: boolean
  exam_duration_hours: number
  passing_score: number
  validity_years: number
  description: string
  url: string
  created_at: string
}

export const getCertifications = async (difficulty?: string): Promise<Certification[]> => {
  let sql = 'SELECT * FROM certifications'
  const params: string[] = []

  if (difficulty) {
    sql += ' WHERE difficulty = $1'
    params.push(difficulty)
  }

  sql += ' ORDER BY name'
  const result = await query(sql, params)
  return result.rows
}

export const getCertificationsByDifficulty = async (difficulty: string): Promise<Certification[]> => {
  const result = await query(
    'SELECT * FROM certifications WHERE difficulty = $1 ORDER BY name',
    [difficulty]
  )
  return result.rows
}

export const getCertificationDifficulties = async (): Promise<string[]> => {
  const result = await query('SELECT DISTINCT difficulty FROM certifications ORDER BY difficulty')
  return result.rows.map((row) => row.difficulty)
}

export const getCertificationsForRole = async (roleId: string): Promise<Certification[]> => {
  const result = await query(
    `SELECT c.* FROM certifications c
     JOIN role_certifications rc ON c.id = rc.cert_id
     WHERE rc.role_id = $1
     ORDER BY c.name`,
    [roleId]
  )
  return result.rows
}

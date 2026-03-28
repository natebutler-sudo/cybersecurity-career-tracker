import { query } from '../config/db'

export interface Role {
  id: string
  title: string
  nist_category: string
  specialty_area: string
  description: string
  entry_level: boolean
  typical_experience_years: number
  avg_salary_usd: number
  job_growth_percent: number
  created_at: string
}

export const getRoles = async (category?: string): Promise<Role[]> => {
  let sql = 'SELECT * FROM roles'
  const params: string[] = []

  if (category) {
    sql += ' WHERE nist_category = $1'
    params.push(category)
  }

  sql += ' ORDER BY title'
  const result = await query(sql, params)
  return result.rows
}

export const getRoleById = async (id: string): Promise<Role | null> => {
  const result = await query('SELECT * FROM roles WHERE id = $1', [id])
  return result.rows[0] || null
}

export const getRoleByTitle = async (title: string): Promise<Role | null> => {
  const result = await query('SELECT * FROM roles WHERE title = $1', [title])
  return result.rows[0] || null
}

export const getEntryRoles = async (): Promise<Role[]> => {
  const result = await query('SELECT * FROM roles WHERE entry_level = true ORDER BY title')
  return result.rows
}

export const getRolesByCategory = async (category: string): Promise<Role[]> => {
  const result = await query(
    'SELECT * FROM roles WHERE nist_category = $1 ORDER BY title',
    [category]
  )
  return result.rows
}

export const getRoleSkills = async (roleId: string) => {
  const result = await query(
    `SELECT s.id, s.name, s.category, s.proficiency_level, rs.required, rs.proficiency_level as role_proficiency
     FROM role_skills rs
     JOIN skills s ON rs.skill_id = s.id
     WHERE rs.role_id = $1
     ORDER BY rs.required DESC, s.name`,
    [roleId]
  )
  return result.rows
}

export const getRoleCertifications = async (roleId: string) => {
  const result = await query(
    `SELECT c.id, c.name, c.issuer, c.difficulty, c.cost_usd, rc.recommended, rc.priority
     FROM role_certifications rc
     JOIN certifications c ON rc.cert_id = c.id
     WHERE rc.role_id = $1
     ORDER BY rc.recommended DESC, rc.priority`,
    [roleId]
  )
  return result.rows
}

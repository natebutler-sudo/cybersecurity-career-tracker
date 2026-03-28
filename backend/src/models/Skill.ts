import { query } from '../config/db'

export interface Skill {
  id: string
  name: string
  category: string
  proficiency_level: string
  description: string
  created_at: string
}

export const getSkills = async (category?: string): Promise<Skill[]> => {
  let sql = 'SELECT * FROM skills'
  const params: string[] = []

  if (category) {
    sql += ' WHERE category = $1'
    params.push(category)
  }

  sql += ' ORDER BY name'
  const result = await query(sql, params)
  return result.rows
}

export const getSkillsByCategory = async (category: string): Promise<Skill[]> => {
  const result = await query('SELECT * FROM skills WHERE category = $1 ORDER BY name', [category])
  return result.rows
}

export const getSkillCategories = async (): Promise<string[]> => {
  const result = await query('SELECT DISTINCT category FROM skills ORDER BY category')
  return result.rows.map((row) => row.category)
}

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

export interface Specialization {
  id: string
  name: string
  description: string
  color: string
  created_at: string
}

export interface CertMetrics {
  cert_id: string
  pass_rate_percent: number | null
  job_postings_monthly: number | null
  avg_salary_increase_usd: number | null
  study_hours_estimate: number | null
  vendor_pass_rate_source: string | null
}

export interface CertificationWithMetrics extends Certification {
  metrics?: CertMetrics
  prerequisites?: Certification[]
  specializations?: Specialization[]
}

export interface Prerequisite {
  cert_id: string
  prerequisite_cert_id: string
  is_required: boolean
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
  return result.rows.map((row: { difficulty: string }) => row.difficulty)
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

export const getSpecializations = async (): Promise<Specialization[]> => {
  const result = await query('SELECT * FROM specializations ORDER BY name')
  return result.rows
}

export const getSpecializationById = async (specId: string): Promise<Specialization | null> => {
  const result = await query('SELECT * FROM specializations WHERE id = $1', [specId])
  return result.rows[0] || null
}

export const getCertificationsBySpecialization = async (specId: string): Promise<CertificationWithMetrics[]> => {
  const result = await query(
    `SELECT DISTINCT c.*, cm.pass_rate_percent, cm.job_postings_monthly, cm.avg_salary_increase_usd, cm.study_hours_estimate, cm.vendor_pass_rate_source
     FROM certifications c
     JOIN cert_specializations cs ON c.id = cs.cert_id
     LEFT JOIN cert_metrics cm ON c.id = cm.cert_id
     WHERE cs.specialization_id = $1
     ORDER BY c.difficulty, c.name`,
    [specId]
  )
  return result.rows.map((row: any) => ({
    ...row,
    metrics: {
      cert_id: row.id,
      pass_rate_percent: row.pass_rate_percent,
      job_postings_monthly: row.job_postings_monthly,
      avg_salary_increase_usd: row.avg_salary_increase_usd,
      study_hours_estimate: row.study_hours_estimate,
      vendor_pass_rate_source: row.vendor_pass_rate_source
    }
  }))
}

export const getCertificationMetrics = async (certId: string): Promise<CertMetrics | null> => {
  const result = await query('SELECT * FROM cert_metrics WHERE cert_id = $1', [certId])
  return result.rows[0] || null
}

export const getCertificationPrerequisites = async (certId: string): Promise<Certification[]> => {
  const result = await query(
    `SELECT c.* FROM certifications c
     JOIN cert_prerequisites cp ON c.id = cp.prerequisite_cert_id
     WHERE cp.cert_id = $1
     ORDER BY c.name`,
    [certId]
  )
  return result.rows
}

export const getSpecializationRoadmap = async () => {
  const specs = await getSpecializations()
  const roadmap: {
    [key: string]: {
      name: string
      color: string
      certifications: (Certification & { metrics?: CertMetrics })[]
    }
  } = {}

  for (const spec of specs) {
    const certs = await getCertificationsBySpecialization(spec.id)
    roadmap[spec.name] = {
      name: spec.name,
      color: spec.color,
      certifications: certs as any
    }
  }

  return roadmap
}

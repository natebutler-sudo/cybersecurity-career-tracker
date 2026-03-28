import React from 'react'
import './App.css'

interface Role {
  id: string
  title: string
  nist_category: string
  specialty_area: string
  description: string
  entry_level: boolean
  typical_experience_years: number
  avg_salary_usd: number
  job_growth_percent: number
}

export const App: React.FC = () => {
  const [roles, setRoles] = React.useState<Role[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const categories = [
    'PROTECT_DEFEND',
    'INVESTIGATE',
    'SECURELY_PROVISION',
    'OPERATE_MAINTAIN',
    'OVERSEE_GOVERN',
  ]

  const categoryLabels: Record<string, string> = {
    PROTECT_DEFEND: '🛡️ Protect & Defend',
    INVESTIGATE: '🔎 Investigate',
    SECURELY_PROVISION: '🔧 Securely Provision',
    OPERATE_MAINTAIN: '⚙️ Operate & Maintain',
    OVERSEE_GOVERN: '📋 Oversee & Govern',
  }

  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1'
        const url = selectedCategory
          ? `${apiUrl}/roles?category=${selectedCategory}`
          : `${apiUrl}/roles`

        const response = await fetch(url)
        const json = await response.json()

        if (json.success) {
          setRoles(json.data)
        } else {
          setError(json.error)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch roles')
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [selectedCategory])

  const filteredRoles = selectedCategory
    ? roles.filter((r) => r.nist_category === selectedCategory)
    : roles

  return (
    <div className="app">
      <header>
        <h1>🛡️ Cybersecurity Career Tracker</h1>
        <p>Explore NIST NICE Framework roles and map your cybersecurity career path</p>
      </header>

      <main>
        {error && <p style={{ color: '#fca5a5' }}>⚠️ {error}</p>}

        <section className="filters">
          <h2>Filter by NIST Category</h2>
          <div className="category-buttons">
            <button
              className={!selectedCategory ? 'active' : ''}
              onClick={() => setSelectedCategory(null)}
            >
              All Roles ({roles.length})
            </button>
            {categories.map((cat) => {
              const count = roles.filter((r) => r.nist_category === cat).length
              return (
                <button
                  key={cat}
                  className={selectedCategory === cat ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {categoryLabels[cat]} ({count})
                </button>
              )
            })}
          </div>
        </section>

        {loading && <p>Loading roles...</p>}

        {!loading && filteredRoles.length > 0 && (
          <>
            <h2>Career Roles ({filteredRoles.length})</h2>
            <div className="roles-grid">
              {filteredRoles.map((role) => (
                <div key={role.id} className={`role-card ${role.entry_level ? 'entry-level' : ''}`}>
                  {role.entry_level && <span className="badge">Entry Level</span>}
                  <h3>{role.title}</h3>
                  <p className="specialty">{role.specialty_area}</p>
                  <p className="description">{role.description}</p>
                  <div className="role-meta">
                    <div className="meta-item">
                      <span className="label">Experience:</span>
                      <span className="value">{role.typical_experience_years}+ years</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">Salary:</span>
                      <span className="value">${(role.avg_salary_usd / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">Growth:</span>
                      <span className="value">{role.job_growth_percent}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && filteredRoles.length === 0 && (
          <p>No roles found in this category.</p>
        )}
      </main>

      <footer>
        <p>
          🚀 Built with React + Vite | 🐘 PostgreSQL | 📡 Node.js API | 📊 NIST NICE Framework
        </p>
      </footer>
    </div>
  )
}

export default App

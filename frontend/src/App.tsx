import React from 'react'
import './App.css'

interface Role {
  id: string
  title: string
  category: string
}

export const App: React.FC = () => {
  const [roles, setRoles] = React.useState<Role[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1'
        const response = await fetch(`${apiUrl}/roles`)
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
  }, [])

  return (
    <div className="app">
      <header>
        <h1>🛡️ Cybersecurity Career Tracker</h1>
        <p>Map your path through the NIST NICE Framework</p>
      </header>

      <main>
        {loading && <p>Loading roles...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && (
          <>
            <h2>Roles ({roles.length})</h2>
            {roles.length === 0 ? (
              <p>No roles found. Check your backend connection.</p>
            ) : (
              <div className="roles-grid">
                {roles.slice(0, 6).map(role => (
                  <div key={role.id} className="role-card">
                    <h3>{role.title}</h3>
                    <p>{role.category}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer>
        <p>Built with React + Vite | Backend API at {import.meta.env.VITE_API_URL}</p>
      </footer>
    </div>
  )
}

export default App

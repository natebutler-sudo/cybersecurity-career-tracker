import React from 'react'
import '../styles/roadmap.css'

interface Certification {
  id: string
  name: string
  issuer: string
  difficulty: string
  cost_usd: number
  exam_duration_hours: number
  passing_score: number
  validity_years: number
  description: string
}

interface CertMetrics {
  cert_id: string
  pass_rate_percent: number | null
  job_postings_monthly: number | null
  avg_salary_increase_usd: number | null
  study_hours_estimate: number | null
  vendor_pass_rate_source: string | null
}

interface CertificationWithMetrics extends Certification {
  metrics?: CertMetrics
  prerequisites?: Certification[]
}

interface Specialization {
  name: string
  color: string
  certifications: CertificationWithMetrics[]
}

interface RoadmapData {
  [key: string]: Specialization
}

interface ExpandedCard {
  certId: string
  specName: string
}

export const CertificationRoadmap: React.FC = () => {
  const [roadmapData, setRoadmapData] = React.useState<RoadmapData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedSpec, setSelectedSpec] = React.useState<string | null>(null)
  const [expandedCards, setExpandedCards] = React.useState<ExpandedCard[]>([])

  React.useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1'
        const response = await fetch(`${apiUrl}/certifications/roadmap`)
        const json = await response.json()

        if (json.success) {
          setRoadmapData(json.data.specializations || json.data)
          // Set first specialization as default
          const specs = Object.keys(json.data.specializations || json.data)
          if (specs.length > 0) {
            setSelectedSpec(specs[0])
          }
        } else {
          setError(json.error || 'Failed to load roadmap')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch roadmap')
      } finally {
        setLoading(false)
      }
    }

    fetchRoadmap()
  }, [])

  const toggleExpandCard = (certId: string, specName: string) => {
    const key = `${certId}-${specName}`
    setExpandedCards((prev) => {
      const isExpanded = prev.some((card) => `${card.certId}-${card.specName}` === key)
      if (isExpanded) {
        return prev.filter((card) => `${card.certId}-${card.specName}` !== key)
      } else {
        return [...prev, { certId, specName }]
      }
    })
  }

  if (loading) {
    return (
      <div className="roadmap-container">
        <h1>🗺️ Certification Roadmap</h1>
        <p>Loading roadmap data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="roadmap-container">
        <h1>🗺️ Certification Roadmap</h1>
        <p style={{ color: '#fca5a5' }}>⚠️ {error}</p>
      </div>
    )
  }

  if (!roadmapData) {
    return (
      <div className="roadmap-container">
        <h1>🗺️ Certification Roadmap</h1>
        <p>No roadmap data available.</p>
      </div>
    )
  }

  const specializations = Object.entries(roadmapData)

  return (
    <div className="roadmap-container">
      <header className="roadmap-header">
        <h1>🗺️ Certification Roadmap</h1>
        <p>
          Explore certifications by specialization. Real-world metrics including pass rates, job
          demand, salary impact, and study time estimates guide your certification path.
        </p>
      </header>

      {/* Filter - show on mobile/tablet, full display on desktop */}
      <nav className="roadmap-filter">
        <h3>Specializations</h3>
        <div className="filter-buttons">
          {specializations.map(([specName, spec]) => (
            <button
              key={specName}
              className={`filter-btn ${selectedSpec === specName ? 'active' : ''}`}
              style={
                selectedSpec === specName ? { backgroundColor: spec.color, color: 'white' } : {}
              }
              onClick={() => setSelectedSpec(specName)}
            >
              {specName}
            </button>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="roadmap-content">
        {/* Desktop: Show all specializations */}
        <div className="roadmap-timeline-desktop">
          {specializations.map(([specName, spec]) => (
            <SpecializationLane
              key={specName}
              specName={specName}
              spec={spec}
              expandedCards={expandedCards}
              onToggleExpand={toggleExpandCard}
            />
          ))}
        </div>

        {/* Mobile/Tablet: Show selected specialization */}
        {selectedSpec && roadmapData[selectedSpec] && (
          <div className="roadmap-timeline-mobile">
            <SpecializationLane
              specName={selectedSpec}
              spec={roadmapData[selectedSpec]}
              expandedCards={expandedCards}
              onToggleExpand={toggleExpandCard}
            />
          </div>
        )}
      </main>
    </div>
  )
}

interface SpecializationLaneProps {
  specName: string
  spec: Specialization
  expandedCards: ExpandedCard[]
  onToggleExpand: (certId: string, specName: string) => void
}

const SpecializationLane: React.FC<SpecializationLaneProps> = ({
  specName,
  spec,
  expandedCards,
  onToggleExpand,
}) => {
  const getDifficultyLevel = (difficulty: string): number => {
    const lower = difficulty.toLowerCase()
    if (lower.includes('entry')) return 0
    if (lower.includes('advanced')) return 2
    return 1
  }

  const sortedCerts = [...spec.certifications].sort(
    (a, b) => getDifficultyLevel(a.difficulty) - getDifficultyLevel(b.difficulty)
  )

  return (
    <section className="spec-lane" style={{ borderLeftColor: spec.color }}>
      <h2 style={{ color: spec.color }}>{specName}</h2>
      <div className="cert-timeline">
        {sortedCerts.map((cert, index) => {
          const isExpanded = expandedCards.some(
            (card) => card.certId === cert.id && card.specName === specName
          )
          const prerequisites = cert.prerequisites || []

          return (
            <div key={cert.id} className="cert-wrapper">
              {/* Prerequisites connector */}
              {prerequisites.length > 0 && (
                <div className="prereq-indicator">
                  {prerequisites.map((prereq) => (
                    <span key={prereq.id} className="prereq-badge">
                      Requires: {prereq.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Certification Card */}
              <CertificationCard
                cert={cert}
                difficulty={getDifficultyLevel(cert.difficulty)}
                isExpanded={isExpanded}
                onToggle={() => onToggleExpand(cert.id, specName)}
                index={index}
              />

              {/* Expanded metrics panel */}
              {isExpanded && cert.metrics && <MetricsPanel metrics={cert.metrics} />}
            </div>
          )
        })}
      </div>
    </section>
  )
}

interface CertificationCardProps {
  cert: CertificationWithMetrics
  difficulty: number
  isExpanded: boolean
  onToggle: () => void
  index: number
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  cert,
  difficulty,
  isExpanded,
  onToggle,
  index,
}) => {
  const difficultyColor = ['#2ecc71', '#f39c12', '#e74c3c'][difficulty]
  const difficultyLabel = ['Entry', 'Intermediate', 'Advanced'][difficulty]

  return (
    <div
      className={`cert-card ${isExpanded ? 'expanded' : ''}`}
      style={{
        borderTopColor: difficultyColor,
        animationDelay: `${index * 0.05}s`,
      }}
      onClick={onToggle}
    >
      <div className="card-header">
        <h3>{cert.name}</h3>
        <span className="issuer">{cert.issuer}</span>
      </div>

      <div className="card-body">
        <div className="difficulty-badge" style={{ backgroundColor: difficultyColor }}>
          {difficultyLabel}
        </div>

        {cert.metrics && (
          <div className="quick-metrics">
            <div className="metric-item">
              <span className="metric-label">Pass Rate</span>
              <span className="metric-value">
                {cert.metrics.pass_rate_percent || '—'}
                {cert.metrics.pass_rate_percent && '%'}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Demand</span>
              <span className="metric-value">
                {cert.metrics.job_postings_monthly ? `${cert.metrics.job_postings_monthly}/mo` : '—'}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Salary Impact</span>
              <span className="metric-value">
                {cert.metrics.avg_salary_increase_usd
                  ? `$${(cert.metrics.avg_salary_increase_usd / 1000).toFixed(0)}K`
                  : '—'}
              </span>
            </div>
          </div>
        )}

        <p className="description">{cert.description}</p>

        <div className="card-footer">
          <span className="cost">${cert.cost_usd}</span>
          <span className="validity">{cert.validity_years}yr validity</span>
          <button className="expand-btn" onClick={onToggle}>
            {isExpanded ? '▼ Less' : '▶ More'}
          </button>
        </div>
      </div>
    </div>
  )
}

interface MetricsPanelProps {
  metrics: CertMetrics
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="metrics-panel">
      <h4>📊 Detailed Metrics</h4>

      <div className="metrics-grid">
        <div className="metric-detail">
          <label>Pass Rate</label>
          <div className="metric-bar">
            {metrics.pass_rate_percent !== null ? (
              <>
                <div
                  className="bar-fill"
                  style={{
                    width: `${metrics.pass_rate_percent}%`,
                    backgroundColor:
                      metrics.pass_rate_percent >= 60
                        ? '#2ecc71'
                        : metrics.pass_rate_percent >= 45
                          ? '#f39c12'
                          : '#e74c3c',
                  }}
                ></div>
                <span className="bar-label">{metrics.pass_rate_percent}%</span>
              </>
            ) : (
              <span>Data not available</span>
            )}
          </div>
          {metrics.vendor_pass_rate_source && (
            <p className="source">Source: {metrics.vendor_pass_rate_source}</p>
          )}
        </div>

        <div className="metric-detail">
          <label>Job Market Demand</label>
          <div className="demand-value">
            {metrics.job_postings_monthly !== null
              ? `~${metrics.job_postings_monthly.toLocaleString()} monthly positions`
              : 'Data not available'}
          </div>
        </div>

        <div className="metric-detail">
          <label>Average Salary Impact</label>
          <div className="salary-value">
            {metrics.avg_salary_increase_usd !== null
              ? `+$${metrics.avg_salary_increase_usd.toLocaleString()} annually`
              : 'Data not available'}
          </div>
        </div>

        <div className="metric-detail">
          <label>Recommended Study Time</label>
          <div className="study-hours">
            {metrics.study_hours_estimate !== null
              ? `${metrics.study_hours_estimate} hours`
              : 'Data not available'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificationRoadmap

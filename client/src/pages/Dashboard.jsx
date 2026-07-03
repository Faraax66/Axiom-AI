import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import StatCard from '../components/StatCard'

export default function Dashboard() {
  const [prs, setPrs] = useState([])
  const [stats, setStats] = useState({
    repos: 0, prs: 0, issues: 0, avgScore: 0
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      // Fetch PRs with repo and review data
      const { data: prData } = await supabase
        .from('pull_requests')
        .select(`
          *,
          repositories(github_owner, github_repo_name),
          reviews(score, total_issues, critical_count, high_count, medium_count, low_count)
        `)
        .order('created_at', { ascending: false })

      if (prData) {
        setPrs(prData)

        // Calculate stats
        const repos = new Set(prData.map(p => p.repo_id)).size
        const totalIssues = prData.reduce((sum, p) => {
          const review = p.reviews?.[0]
          return sum + (review?.total_issues || 0)
        }, 0)
        const scores = prData
          .map(p => p.reviews?.[0]?.score)
          .filter(Boolean)
        const avgScore = scores.length
          ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
          : 0

        setStats({
          repos,
          prs: prData.length,
          issues: totalIssues,
          avgScore
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const severityDot = (pr) => {
    const review = pr.reviews?.[0]
    if (!review) return { color: '#555', label: 'No review' }
    if (review.critical_count > 0) return { color: '#E24B4A', label: `${review.critical_count} critical` }
    if (review.high_count > 0) return { color: '#BA7517', label: `${review.high_count} high` }
    if (review.medium_count > 0) return { color: '#7F77DD', label: `${review.medium_count} medium` }
    return { color: '#1D9E75', label: '0 issues' }
  }

  if (loading) return (
    <div style={{ color: '#555', padding: '40px', fontSize: '13px' }}>
      Loading...
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#f0ede8',
            margin: 0
          }}>Dashboard</h1>
          <p style={{
            fontSize: '12px',
            color: '#555',
            margin: '4px 0 0'
          }}>Your code review activity at a glance</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '28px'
      }}>
        <StatCard label="Repos Connected" value={stats.repos} sub="Active" />
        <StatCard label="PRs Reviewed" value={stats.prs} sub="Total" />
        <StatCard label="Issues Caught" value={stats.issues} color="#E24B4A" sub="Across all PRs" />
        <StatCard label="Avg Health Score" value={`${stats.avgScore}/100`} color="#7F77DD" sub="Overall quality" />
      </div>

      {/* PR Table */}
      <div style={{
        background: '#111113',
        border: '0.5px solid #1e1e22',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 18px',
          borderBottom: '0.5px solid #1e1e22',
          fontSize: '12px',
          fontWeight: '500',
          color: '#888',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>Recent Pull Requests</div>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr>
              {['PR Title', 'Repo', 'Author', 'Score', 'Issues', 'Status'].map(h => (
                <th key={h} style={{
                  padding: '10px 18px',
                  fontSize: '10px',
                  color: '#444',
                  fontWeight: '500',
                  textAlign: 'left',
                  borderBottom: '0.5px solid #1e1e22'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{
                  padding: '32px',
                  textAlign: 'center',
                  color: '#444',
                  fontSize: '13px'
                }}>
                  No PRs reviewed yet. Open a PR on a connected repo to get started.
                </td>
              </tr>
            ) : (
              prs.map(pr => {
                const repo = pr.repositories
                const review = pr.reviews?.[0]
                const sev = severityDot(pr)
                return (
                  <tr
                    key={pr.id}
                    onClick={() => navigate(`/pr/${pr.id}`)}
                    style={{
                      cursor: 'pointer',
                      borderBottom: '0.5px solid #111',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#161618'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{
                      padding: '12px 18px',
                      fontSize: '12px',
                      color: '#ccc',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>{pr.pr_title}</td>
                    <td style={{
                      padding: '12px 18px',
                      fontSize: '11px',
                      color: '#555',
                      fontFamily: 'monospace'
                    }}>{repo?.github_repo_name}</td>
                    <td style={{
                      padding: '12px 18px',
                      fontSize: '11px',
                      color: '#555'
                    }}>{pr.pr_author}</td>
                    <td style={{
                      padding: '12px 18px',
                      fontSize: '12px',
                      color: '#7F77DD',
                      fontWeight: '500'
                    }}>{review?.score ?? '—'}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '11px',
                        color: sev.color
                      }}>
                        <span style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: sev.color,
                          flexShrink: 0
                        }}></span>
                        {sev.label}
                      </span>
                    </td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{
                        fontSize: '10px',
                        padding: '3px 8px',
                        borderRadius: '99px',
                        background: pr.status === 'reviewed' ? '#0d2820' : '#2a1e08',
                        color: pr.status === 'reviewed' ? '#1D9E75' : '#BA7517',
                        border: `0.5px solid ${pr.status === 'reviewed' ? '#0F6E56' : '#854F0B'}`
                      }}>{pr.status}</span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
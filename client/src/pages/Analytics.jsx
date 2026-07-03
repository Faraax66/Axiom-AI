import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'

export default function Analytics() {
  const [repos, setRepos] = useState([])
  const [severityData, setSeverityData] = useState([])
  const [weeklyData, setWeeklyData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const { data: prData } = await supabase
        .from('pull_requests')
        .select(`
          *,
          repositories(github_owner, github_repo_name),
          reviews(score, total_issues, critical_count, high_count, medium_count, low_count, created_at)
        `)
        .order('created_at', { ascending: false })

      if (prData) {
        // Repo health scores
        const repoMap = {}
        prData.forEach(pr => {
          const name = pr.repositories?.github_repo_name
          const score = pr.reviews?.[0]?.score
          if (name && score) {
            if (!repoMap[name]) repoMap[name] = []
            repoMap[name].push(score)
          }
        })
        const repoHealth = Object.entries(repoMap).map(([name, scores]) => ({
          name,
          score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        }))
        setRepos(repoHealth)

        // Severity totals
        let c = 0, h = 0, m = 0, l = 0
        prData.forEach(pr => {
          const rev = pr.reviews?.[0]
          if (rev) {
            c += rev.critical_count || 0
            h += rev.high_count || 0
            m += rev.medium_count || 0
            l += rev.low_count || 0
          }
        })
        setSeverityData([
          { name: 'Critical', value: c, color: '#E24B4A' },
          { name: 'High', value: h, color: '#BA7517' },
          { name: 'Medium', value: m, color: '#7F77DD' },
          { name: 'Low', value: l, color: '#1D9E75' },
        ])

        // Weekly PR counts (last 6 weeks)
        const weeks = []
        for (let i = 5; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i * 7)
          const label = `W${6 - i}`
          const count = prData.filter(pr => {
            const created = new Date(pr.created_at)
            const diff = (new Date() - created) / (1000 * 60 * 60 * 24)
            return diff <= (i + 1) * 7 && diff > i * 7
          }).length
          weeks.push({ label, count })
        }
        setWeeklyData(weeks)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div style={{ color: '#555', padding: '40px', fontSize: '13px' }}>
      Loading...
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '18px',
          fontWeight: '500',
          color: '#f0ede8',
          margin: 0
        }}>Analytics</h1>
        <p style={{
          fontSize: '12px',
          color: '#555',
          margin: '4px 0 0'
        }}>Code quality trends across your repositories</p>
      </div>

      {/* Charts row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '16px'
      }}>
        {/* Weekly PRs */}
        <div style={{
          background: '#111113',
          border: '0.5px solid #1e1e22',
          borderRadius: '10px',
          padding: '18px'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px'
          }}>PRs Reviewed Per Week</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="label" tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1a1a1e', border: '0.5px solid #333', borderRadius: '6px', fontSize: '11px' }}
                labelStyle={{ color: '#888' }}
                itemStyle={{ color: '#7F77DD' }}
              />
              <Bar dataKey="count" fill="#7F77DD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Pie */}
        <div style={{
          background: '#111113',
          border: '0.5px solid #1e1e22',
          borderRadius: '10px',
          padding: '18px'
        }}>
          <div style={{
            fontSize: '11px',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px'
          }}>Issues by Severity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                >
                  {severityData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1a1a1e', border: '0.5px solid #333', borderRadius: '6px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {severityData.map(s => (
                <div key={s.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: '#888'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: s.color,
                      flexShrink: 0
                    }}></span>
                    {s.name}
                  </div>
                  <span style={{
                    fontSize: '11px',
                    color: s.color,
                    fontWeight: '500'
                  }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Repo Health */}
      <div style={{
        background: '#111113',
        border: '0.5px solid #1e1e22',
        borderRadius: '10px',
        padding: '18px'
      }}>
        <div style={{
          fontSize: '11px',
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '16px'
        }}>Repository Health Scores</div>
        {repos.length === 0 ? (
          <div style={{ color: '#444', fontSize: '13px' }}>
            No data yet — review some PRs first.
          </div>
        ) : (
          repos.map(repo => (
            <div key={repo.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                fontSize: '12px',
                color: '#888',
                width: '140px',
                flexShrink: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>{repo.name}</div>
              <div style={{
                flex: 1,
                height: '4px',
                background: '#1a1a1e',
                borderRadius: '99px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${repo.score}%`,
                  height: '4px',
                  background: repo.score >= 75 ? '#1D9E75' : repo.score >= 50 ? '#BA7517' : '#E24B4A',
                  borderRadius: '99px'
                }}></div>
              </div>
              <div style={{
                fontSize: '11px',
                color: '#666',
                width: '32px',
                textAlign: 'right'
              }}>{repo.score}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
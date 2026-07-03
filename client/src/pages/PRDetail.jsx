import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import ReviewCard from '../components/ReviewCard'

export default function PRDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pr, setPr] = useState(null)
  const [review, setReview] = useState(null)
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPR()
  }, [id])

  async function fetchPR() {
    try {
      const { data: prData } = await supabase
        .from('pull_requests')
        .select(`
          *,
          repositories(github_owner, github_repo_name),
          reviews(*)
        `)
        .eq('id', id)
        .single()

      if (prData) {
        setPr(prData)
        const rev = prData.reviews?.[0]
        setReview(rev)

        if (rev) {
          const { data: issueData } = await supabase
            .from('issues')
            .select('*')
            .eq('review_id', rev.id)
            .order('created_at', { ascending: true })

          setIssues(issueData || [])
        }
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

  if (!pr) return (
    <div style={{ color: '#555', padding: '40px', fontSize: '13px' }}>
      PR not found.
    </div>
  )

  const repo = pr.repositories

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'transparent',
          border: '0.5px solid #1e1e22',
          borderRadius: '6px',
          color: '#555',
          fontSize: '12px',
          padding: '6px 12px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >← Back to Dashboard</button>

      {/* PR Header */}
      <div style={{
        background: '#111113',
        border: '0.5px solid #1e1e22',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <h1 style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#f0ede8',
          margin: '0 0 10px'
        }}>{pr.pr_title}</h1>
        <div style={{
          display: 'flex',
          gap: '20px',
          fontSize: '11px',
          color: '#555'
        }}>
          <span>Repo: <span style={{ color: '#888' }}>
            {repo?.github_owner}/{repo?.github_repo_name}
          </span></span>
          <span>Author: <span style={{ color: '#888' }}>{pr.pr_author}</span></span>
          <span>PR #<span style={{ color: '#888' }}>{pr.pr_number}</span></span>
        </div>
      </div>

      {/* Review Summary */}
      {review && (
        <div style={{
          background: '#111113',
          border: '0.5px solid #1e1e22',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#888',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>AI Review Summary</div>
            <div style={{
              fontSize: '22px',
              fontWeight: '500',
              color: review.score >= 75 ? '#1D9E75' : review.score >= 50 ? '#BA7517' : '#E24B4A'
            }}>{review.score}<span style={{
              fontSize: '12px',
              color: '#444'
            }}>/100</span></div>
          </div>

          <p style={{
            fontSize: '13px',
            color: '#888',
            margin: '0 0 14px',
            lineHeight: '1.6'
          }}>{review.summary}</p>

          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            {[
              { label: 'Critical', count: review.critical_count, color: '#E24B4A' },
              { label: 'High', count: review.high_count, color: '#BA7517' },
              { label: 'Medium', count: review.medium_count, color: '#7F77DD' },
              { label: 'Low', count: review.low_count, color: '#1D9E75' },
            ].map(s => (
              <div key={s.label} style={{
                fontSize: '11px',
                padding: '4px 12px',
                borderRadius: '99px',
                background: s.color + '15',
                color: s.color,
                border: `0.5px solid ${s.color}33`
              }}>{s.count} {s.label}</div>
            ))}
          </div>
        </div>
      )}

      {/* Issues */}
      <div style={{
        fontSize: '12px',
        fontWeight: '500',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '12px'
      }}>Review Comments ({issues.length})</div>

      {issues.length === 0 ? (
        <div style={{
          color: '#444',
          fontSize: '13px',
          padding: '20px'
        }}>No issues found for this PR.</div>
      ) : (
        issues.map(issue => (
          <ReviewCard key={issue.id} issue={issue} />
        ))
      )}
    </div>
  )
}
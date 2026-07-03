const severityConfig = {
    Critical: { color: '#E24B4A', bg: '#1a0a0a', border: '#4a1515' },
    High:     { color: '#BA7517', bg: '#1a1208', border: '#4a3008' },
    Medium:   { color: '#7F77DD', bg: '#12111e', border: '#2a2850' },
    Low:      { color: '#1D9E75', bg: '#0a1812', border: '#0f3828' },
  }
  
  export default function ReviewCard({ issue }) {
    const config = severityConfig[issue.severity] || severityConfig.Low
  
    return (
      <div style={{
        background: config.bg,
        border: `0.5px solid ${config.border}`,
        borderRadius: '10px',
        padding: '14px 16px',
        marginBottom: '10px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <span style={{
            background: config.color + '22',
            color: config.color,
            fontSize: '10px',
            fontWeight: '500',
            padding: '2px 8px',
            borderRadius: '99px',
            border: `0.5px solid ${config.color}44`
          }}>{issue.severity}</span>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#666'
          }}>{issue.file} — Line {issue.line}</span>
        </div>
        <div style={{
          fontSize: '13px',
          color: '#ccc',
          marginBottom: '8px',
          lineHeight: '1.5'
        }}>{issue.issue}</div>
        <div style={{
          fontSize: '12px',
          color: '#555',
          borderTop: '0.5px solid #1e1e22',
          paddingTop: '8px'
        }}>
          <span style={{ color: '#7F77DD' }}>Fix: </span>
          {issue.suggestion}
        </div>
      </div>
    )
  }
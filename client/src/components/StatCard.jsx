export default function StatCard({ label, value, sub, color }) {
    return (
      <div style={{
        background: '#111113',
        border: '0.5px solid #1e1e22',
        borderRadius: '10px',
        padding: '16px'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: '500',
          color: color || '#f0ede8',
          marginBottom: '4px'
        }}>{value}</div>
        <div style={{
          fontSize: '11px',
          color: '#555',
          marginBottom: '6px'
        }}>{label}</div>
        {sub && (
          <div style={{
            fontSize: '11px',
            color: '#1D9E75'
          }}>{sub}</div>
        )}
      </div>
    )
  }
  
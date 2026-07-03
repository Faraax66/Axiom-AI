import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', icon: '⊞', label: 'Dashboard' },
  { path: '/analytics', icon: '▦', label: 'Analytics' },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: '200px',
      background: '#111113',
      borderRight: '0.5px solid #1e1e22',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 16px',
        borderBottom: '0.5px solid #1e1e22',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          background: '#7F77DD',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px'
        }}>⚡</div>
        <span style={{
          color: '#f0ede8',
          fontWeight: '500',
          fontSize: '15px',
          letterSpacing: '0.02em'
        }}>Axiom AI</span>
      </div>

      {/* Nav Items */}
      <nav style={{ padding: '12px 0', flex: 1 }}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 16px',
              fontSize: '13px',
              color: isActive ? '#f0ede8' : '#555',
              background: isActive ? '#1a1a1e' : 'transparent',
              textDecoration: 'none',
              borderLeft: isActive ? '2px solid #7F77DD' : '2px solid transparent',
              transition: 'all 0.15s'
            })}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '16px',
        borderTop: '0.5px solid #1e1e22',
        fontSize: '11px',
        color: '#444'
      }}>
        Axiom AI · Free Tier
      </div>
    </aside>
  )
}
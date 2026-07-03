import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import PRDetail from './pages/PRDetail'
import Analytics from './pages/Analytics'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{
        display: 'flex',
        background: '#0d0d0f',
        minHeight: '100vh',
        color: '#f0ede8',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <Sidebar />
        <main style={{
          marginLeft: '200px',
          flex: 1,
          padding: '28px',
          maxWidth: 'calc(100vw - 200px)',
          overflowX: 'hidden'
        }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pr/:id" element={<PRDetail />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
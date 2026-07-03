'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'Resources', href: '/resources' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 48px 20px 32px',
      transition: 'all 0.4s ease',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      background: scrolled ? 'rgba(0,0,0,0.6)' : 'transparent',
    }}>

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Image 
          src="/logo.png" 
          alt="Axiom AI" 
          width={160} 
          height={42} 
          style={{ objectFit: 'contain' }} 
        />
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '15px',
              fontWeight: '300',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'all 0.3s ease',
              opacity: hoveredIndex === null ? 0.8 : hoveredIndex === i ? 1 : 0.15,
              filter: hoveredIndex === null ? 'none' : hoveredIndex === i ? 'none' : 'blur(2px)',
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link 
        href="#"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '14px',
          fontWeight: '400',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          border: '1px solid var(--border-highlight)',
          padding: '12px 24px',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          background: 'transparent',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.26)'
          e.currentTarget.style.borderColor = 'rgb(175, 175, 175)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'var(--border-highlight)'
        }}
      >
        Get Started →
      </Link>

    </nav>
  )
}
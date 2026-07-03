'use client'
import NextImage from 'next/image'
import Link from 'next/link'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'How it Works', href: '#' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Demo', href: '#' },
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Customers', href: '#' },
      { label: 'Stats', href: '#' },
    ]
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Docs', href: '/resources/docs' },
      { label: 'GitHub', href: 'https://github.com/Faraax66/Axiom-AI' },
      { label: 'Diffs', href: '#' },
      { label: 'Changelog', href: '/resources/changelog' },
    ]
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact us', href: '/contact' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Legal', href: '#' },
    ]
  },
]

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      width: '100%',
      minHeight: '300px',
      background: '#000000',
      overflow: 'hidden',
    }}>

      {/* Map background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}>
        <NextImage
          src="/footer-map.jpg"
          alt=""
          fill
          unoptimized
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.8,
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        margin: '0 auto',maxWidth: '100%',
        padding: '40px 48px 24px 32px',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>

        {/* Main row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}>

          {/* Left — logo + copyright */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <NextImage
              src="/logo.png"
              alt="Axiom AI"
              width={140}
              height={36}
              style={{ objectFit: 'contain' }}
            />
              <p style={{
                fontFamily: '"Anybody", sans-serif',
                fontSize: '11px',
                fontWeight: '400',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
            }}>
                © 2026 Axiom AI Systems Inc. All rights reserved.
            </p>
          </div>

          {/* Right — 4 columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, auto)',
            gap: '63px',
            alignItems: 'start',
          }}>
            {columns.map((col) => (
              <div key={col.heading}>
                <p style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  marginBottom: '16px',
                  margin: '0 0 16px 0',
                }}>
                  {col.heading}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '13px',
                        fontWeight: '400',
                        color: 'rgba(255,255,255,0.45)',
                        textDecoration: 'none',
                        letterSpacing: '0.01em',
                        transition: 'color 0.2s ease',
                      }}
                        onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

      </div>

    </footer>
  )
}
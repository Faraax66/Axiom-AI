'use client'

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      background: '#000000',
    }}>

      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 1,
        }}
      >
        <source src="/BG.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)',
        zIndex: 1,
      }} />

      {/* Center — Headline + CTAs */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        textAlign: 'center',
        width: '80%',
        maxWidth: '800px',
      }}>

        {/* Headline */}
        <h1 style={{
          fontFamily: '"Bacasime Antique", serif',
          fontSize: 'clamp(46px, 4vw, 74px)',
          fontWeight: '400',
          color: '#ffffff',
          lineHeight: '1.15',
          letterSpacing: '-0.01em',
          marginBottom: '36px',
        }}>
          Powering the{' '}
          <em style={{ fontStyle: 'italic' }}>next workflow</em>
          {' '}of code review.
        </h1>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Get Started */}
          <a href="#" style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            color: '#ffffff',
            background: '#1a1a1a',
            border: 'none',
            padding: '13px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            letterSpacing: '0.02em',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2a2a2a'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#1a1a1a'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
          >
            Get Started
          </a>

          {/* View Demo */}
          <a href="#" style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            color: '#ffffff',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '13px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            letterSpacing: '0.02em',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
          >
            View Demo
          </a>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        left: 0,
        right: 0,
        zIndex: 2,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 48px',
      }}>

        {/* Bottom left — Scroll Down */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '14 px',
        }}>
          {/* Diamond + line */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0px',
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              background: 'rgba(255,255,255,0.6)',
              transform: 'rotate(45deg)',
            }} />
            <div style={{
              width: '2.5px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.05))',
            }} />
          </div>

          {/* Scroll Down text */}
          <p style={{
            fontFamily: '"Bai Jamjuree", sans-serif',
            fontSize: '17px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.06em',
            textTransform: 'capitalize',
            marginLeft: '17px',
            marginTop: '-6px',
          }}>
            Scroll Down
          </p>
        </div>

        {/* Bottom right — Description */}
        <p style={{
          fontFamily: '"Antic Didone", serif',
          fontSize: '20px',
          fontWeight: '400',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: '1.3',
          maxWidth: '390px',
          textAlign: 'right',
          margin: 0,
          marginBottom: '30px',
        }}>
          We help engineering teams automate GitHub PR reviews — catching bugs, security issues, and bad patterns before they hit production.
        </p>

      </div>

    </section>
  )
}
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Developers',
    price: '$0',
    period: '/month',
    features: [
      { text: '1 Active GitHub Repo', active: true },
      { text: '50 automated reviews/mo', active: true },
      { text: 'Standard severity tags', active: false },
      { text: 'No team performance analytics', active: false },
    ],
    cta: 'Start Free',
  },
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    features: [
      { text: '5 Active GitHub Repos', active: true },
      { text: 'Unlimited automated reviews', active: true },
      { text: 'Full dashboard & historical logs', active: true },
      { text: 'Team analytics & Repo grades', active: true },
      { text: 'No Slack/Discord integrations', active: false },
    ],
    cta: 'Deploy Starter',
  },
  {
    name: 'Enterprise Team',
    price: '$49',
    period: '/month',
    features: [
      { text: 'Unlimited GitHub Repositories', active: true },
      { text: 'Unlimited automated reviews', active: true },
      { text: 'Custom team performance metrics', active: true },
      { text: 'Slack & Discord notification sync', active: true },
      { text: 'Dedicated support channels', active: true },
    ],
    cta: 'Deploy Team Upgrade',
  },
]

export default function PricingSection() {
  const bgTextRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards start hidden below, reveal upward over the Pricing text
      gsap.fromTo('.pricing-card',
        { y: 300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'center center',
            scrub: 1,
          }
        }
      )
  
      // Pricing text drifts up as cards come in
      gsap.fromTo(bgTextRef.current,
        { y: 0 },
        {
          y: -300,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
    }, sectionRef)
  
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="pricing" style={{
      position: 'relative',
      padding: '140px 64px',
      background: '#000000',
      overflow: 'hidden',
    }}>

      {/* Background "Pricing" text */}
      <div ref={bgTextRef} style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(120px, 18vw, 280px)',
          fontWeight: '700',
          color: 'rgba(255, 255, 255, 0.74)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          Pricing
        </span>
      </div>

      {/* Cards */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        {plans.map((plan) => (
          <div key={plan.name} className="pricing-card" style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '16px',
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>

            {/* Top */}
            <div>
              {/* Tier name */}
              <p style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '18px',
                fontWeight: '400',
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '16px',
                letterSpacing: '0.01em',
              }}>
                {plan.name}
              </p>

              {/* Price */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '4px',
                marginBottom: '36px',
              }}>
                <span style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 'clamp(38px, 4vw, 60px)',
                  fontWeight: '300',
                  color: '#ffffff',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: '16px',
                  fontWeight: '300',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '8px',
                }}>
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '13px',
                    fontWeight: '400',
                    color: feature.active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.5',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}>
                    <span style={{ marginTop: '2px' }}>•</span>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              textAlign: 'center',
            }}>
              <a href="#" style={{
                fontFamily: '"Instrument Sans", sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.3s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                {plan.cta}
              </a>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}
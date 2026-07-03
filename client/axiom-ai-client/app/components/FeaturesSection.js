'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '/icons/pr-detection.png',
    title: 'Instant PR Detection',
    description: 'Connect via official GitHub webhooks. Our systems detect open, synchronized, or updated pull requests instantly to launch reviews without latency.',
  },
  {
    icon: '/icons/ai-analysis.png',
    title: 'AI-Powered Analysis',
    description: 'Leverage advanced Gemini intelligence tuned for security vulnerabilities, logic flaws, architectural standards, and structural hot paths.',
  },
  {
    icon: '/icons/severity.png',
    title: 'Severity-Tagged Comments',
    description: 'Receive organized, targeted inline remarks labeled Critical, High, Medium, or Low. Fix breaking bugs before they touch staging environment servers.',
  },
  {
    icon: '/icons/review-history.png',
    title: 'Persistent Review History',
    description: 'Access complete historical logs of code reviews and resolved comments powered by Supabase. Run deep retrospectives on command.',
  },
  {
    icon: '/icons/team-analytics.png',
    title: 'Team Analytics & Health',
    description: 'Track key metrics, reviewer velocities, repeating anti-patterns, and repository health ratings over time on comprehensive visual reports.',
  },
  {
    icon: '/icons/multi-repo.png',
    title: 'Multi-Repo Support',
    description: 'Manage multiple repositories across different teams in a single streamlined account and dashboard. Scale your review standards uniformly.',
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const bgTextRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading scale up on entry
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          }
        }
      )

      // Animate each feature card
      document.querySelectorAll('.feature-card').forEach((card, i) => {
        const rect = card.querySelector('.border-rect')
      
        if (rect) {
          const length = rect.getTotalLength()
          rect.style.strokeDasharray = length
          rect.style.strokeDashoffset = length
      
          // Card fades in
          gsap.fromTo(card,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
              }
            }
          )
      
          // Border draws synced to scroll wheel
          gsap.to(rect, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 0.5,
            }
          })
      
          // Content fades in after border is halfway drawn
          gsap.fromTo(card.querySelectorAll('.card-content'),
            { opacity: 0, y: 15 },
            {
              opacity: 1, y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 60%',
              }
            }
          )
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="product" style={{
      position: 'relative',
      padding: '140px 64px',
      background: '#000000',
      overflow: 'hidden',
    }}>

      {/* Section heading */}
      <div ref={headingRef} style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        marginBottom: '80px',
      }}>
        <p style={{
          fontFamily: '"Jura", sans-serif',
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
        </p>
        <h2 style={{
          fontFamily: '"Jura", sans-serif',
          fontSize: 'clamp(28px, 4vw, 56px)',
          fontWeight: '700',
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.01em',
          lineHeight: 0.1,
          textShadow: '0 0 25px rgba(255,255,255,0.5), 0 0 120px rgba(255, 255, 255, 0.68), 0 0 200px rgba(255,255,255,0.1)',
filter: 'brightness(1.2)',
        }}>
          Engineered for Modern Teams
        </h2>
      </div>

      {/* Cards grid */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {features.map((feature, i) => (
          <div
          key={i}
          className="feature-card"
          style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '36px',
            opacity: 0,
          }}
        >
           {/* SVG border that draws itself */}
        <svg
          className="card-border"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            borderRadius: '16px',
            pointerEvents: 'none',
          }}
        >
          <rect
            className="border-rect"
            x="1" y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="16"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
        </svg>

            {/* Icon */}
            <div className="card-content" style={{ marginBottom: '20px' }}>
              <Image
                src={feature.icon}
                alt={feature.title}
                width={28}
                height={28}
                style={{ opacity: 0.7 }}
              />
            </div>

            {/* Title */}
            <h3 className="card-content" style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: '20px',
              fontWeight: '500',
              color: '#ffffff',
              marginBottom: '16px',
              lineHeight: '1.3',
              letterSpacing: '-0.01em',
            }}>
              {feature.title}
            </h3>

            {/* Description */}
            <p className="card-content" style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: '1.8',
              letterSpacing: '0.01em',
            }}>
              {feature.description}
            </p>

          </div>
        ))}
      </div>

    </section>
  )
}
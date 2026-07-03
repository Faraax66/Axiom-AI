'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { img: '/stats/stat-1.png', label: 'Developer Loss Target' },
  { img: '/stats/stat-2.png', label: 'Saved per Dev/Day' },
  { img: '/stats/stat-3.png', label: 'Avg PR Review Speed' },
  { img: '/stats/stat-4.png', label: 'Severity Alert Levels' },
]

const statSizes = [
  { width: 200, height: 100 },
  { width: 240, height: 100 },
  { width: 230, height: 100 },
  { width: 70, height: 100 },
]

export default function StatsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.stats-heading',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      )

      document.querySelectorAll('.stat-item').forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'top 55%',
              scrub: 0.5,
            }
          }
        )

        gsap.fromTo(item.querySelector('img'),
          { filter: 'drop-shadow(0 0 0px rgba(255,255,255,0)) brightness(0.6)' },
          {
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.9)) drop-shadow(0 0 60px rgba(255,255,255,0.4)) brightness(1)',
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 0.5,
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      padding: '140px 64px',
      background: '#000000',
      overflow: 'hidden',
    }}>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '80px',
        alignItems: 'start',
      }}>

        {/* Left — heading */}
        <div className="stats-heading" style={{ paddingTop: '8px' }}>
          <h2 style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: 'clamp(48px, 6vw, 80px)',
            fontWeight: '300',
            color: '#ffffff',
            lineHeight: '1.0',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            Stats
          </h2>
          <p style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '14px',
            fontWeight: '300',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.03em',
          }}>
            Improved Velocity
          </p>
        </div>

        {/* Right — 2x2 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          rowGap: '64px',
          columnGap: '48px',
        }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                opacity: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              {/* Image */}
              <div style={{
                width: `${statSizes[i].width}px`,
                height: `${statSizes[i].height}px`,
                display: 'flex',
                alignItems: 'flex-end',
              }}>
                <Image
                  src={stat.img}
                  alt={stat.label}
                  width={statSizes[i].width}
                  height={statSizes[i].height}
                  unoptimized
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'left bottom',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>

              {/* Label */}
              <p style={{
                fontFamily: '"Metrophobic", sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.02em',
                margin: 0,
              }}>
                {stat.label}
              </p>

            </div>
          ))}
        </div>

      </div>

    </section>
  )
}
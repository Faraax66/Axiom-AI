'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NextImage from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function ProductShowcase() {
  const sectionRef = useRef(null)
  const bgTextRef = useRef(null)
  const dashboardRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Product text drifts upward on scroll
      gsap.fromTo(bgTextRef.current,
        { y: 200 },
        {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )

      // Dashboard scales up from small synced to scroll
      gsap.fromTo(dashboardRef.current,
        { scale: 0.5 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          }
        }
      )
      // Horizontal scroll reveal
      gsap.fromTo( headingRef.current,
      {
        x: '100%',
        y: 0,
      },
      {
        x: '-90%',
        y: 500, // adjust (100–300px)
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      }
    )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <><section ref={sectionRef} style={{
      position: 'relative',
      zIndex: 1,
      padding: '160px 64px 450px',
      background: '#000000',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* Giant Product text behind */}
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
          Product
        </span>
      </div>

      <div
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <NextImage
        ref={dashboardRef}
        src="/dashboard-preview.png"
        alt="Axiom AI Dashboard"
        width={1000}
        height={600}
        unoptimized
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
          maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
        }}
      />
    </div>

    {/* Horizontal scrolling heading */}
    <h2
      ref={headingRef}
      style={{
        position: 'absolute',
        left: 0,
        top: '65%', // adjust this until it matches your Figma
        fontFamily: '"Montserrat", sans-serif',
        fontSize: 'clamp(28px, 4vw, 56px)',
        fontWeight: '300',
        color: '#ffffff',
        whiteSpace: 'nowrap',
        zIndex: 2,
        willChange: 'transform',
        pointerEvents: 'none',
      }}
    >
      All in one dashboard. Track trends across your team and codebase in real
      time.&nbsp;&nbsp;&nbsp;
    </h2>
    </section></>
  )
}
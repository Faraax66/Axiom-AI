'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NextImage from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef(null)
  const spotlightRef = useRef(null)
  const contentRef = useRef(null)

        useEffect(() => {
            const ctx = gsap.context(() => {
                gsap.fromTo(sectionRef.current,
                    { opacity: 0 },
                    {
                      opacity: 1,
                      ease: 'none',
                      scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 100%',
                        end: 'top 30%',
                        scrub: 1,
                      }
                    }
                  )
            }, sectionRef)
            return () => ctx.revert()
        }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      background: '#000000',
      display: 'flex',
      opacity: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* image background */}
      <NextImage
        src="/CTA-BG.png"
        alt="CTA Background"
        fill
        unoptimized
        style={{
            objectFit: 'cover',
            zIndex: 0,
            opacity: 1,
        }}
        />

      {/* Dark edges vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.9) 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div ref={contentRef} style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        maxWidth: '860px',
        padding: '0 48px',
      }}>

        {/* Heading */}
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(32px, 7vw, 64px)',
          fontWeight: '400',
          color: '#ffffff',
          lineHeight: '1.1',
          letterSpacing: '-0.01em',
          marginBottom: '40px',
        }}>
          Stop Reviewing<br />Manually.
        </h2>

        {/* Description */}
        <p style={{
          fontFamily: '"Anybody", sans-serif',
          fontSize: '16px',
          fontWeight: '400',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: '1.3',
          maxWidth: '570px',
          margin: '0 auto 40px',
          letterSpacing: '0.01em',
        }}>
          Your senior developers have better things to do than review every PR. Let Axiom AI handle the first pass — catching critical issues, vulnerabilities, refine code design patterns, and high velocity metrics, start today.
        </p>

        {/* CTA Button */}
        <a href="#" style={{
          fontFamily: '"Anybody", sans-serif',
          fontSize: '13px',
          fontWeight: '500',
          color: '#000000',
          background: '#ffffff',
          padding: '11px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          transition: 'all 0.3s ease',
          display: 'inline-block',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.85)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#ffffff'
          }}
        >
          Get in touch
        </a>

      </div>

    </section>
  )
}
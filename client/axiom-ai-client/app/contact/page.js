'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NextImage from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function ContactPage() {
  const contactTextRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only the Contact text slides down on scroll
      gsap.to(contactTextRef.current, {
        y: 300,
        ease: 'none',
        scrollTrigger: {
          trigger: contactTextRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ background: '#000000' }}>

        {/* SECTION 1 — Full page with Contact text + cards half visible */}
        <section style={{
          position: 'relative',
          height: '100vh',
          zindex: 1,
        }}>

          {/* Background image — full */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <NextImage
              src="/contact-BG.png"
              alt=""
              fill
              unoptimized
              style={{ objectFit: 'cover', opacity: 1 }}
            />
          </div>

          {/* Giant Contact text — slides down on scroll */}
          <div ref={contactTextRef} style={{
            position: 'absolute',
            top: '20%',
            zIndex: 1,
            pointerEvents: 'none',
            textAlign: 'center',
            left: '18.5%',
          }}>
            <span style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(100px, 16vw, 240px)',
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 0.84)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Contact
            </span>
          </div>

          {/* Cards container */}
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            left: 0,
            right: 0,
            zIndex: 2,
            display: 'flex',
            gap: '170px',
            padding: '0 64px',
          }}>

          {/* Left card — Get in touch — tweak height here */}
          <div style={{
            flex: '1',
            height: '220px', // tweak this
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '40px',
            padding: '35px 35px',
          }}>
              <h1 style={{
                fontFamily: '"Be Vietnam Pro", sans-serif',
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: '400',
                color: '#ffffff',
                lineHeight: '1.15',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}>
                Get in touch
              </h1>
              <p style={{
                fontFamily: '"Antic", serif',
                fontSize: '18px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.53)',
                lineHeight: '1.1',
                maxWidth: '360px',
              }}>
                Have questions or ready to transform your business with AI automation?
              </p>
            </div>

            {/* Right card — Form */}
            <div style={{
              flex: '1.4',
              height: '555px', // tweak this independently
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '40px',
              padding: '35px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>

              {/* General Information */}
              <p style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '30px',
                fontWeight: '500',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '6px',
              }}>
                General Information
              </p>

              {/* Name */}
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderRadius: '10px',
                padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <input
                  type="text"
                  placeholder="Name"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontFamily: '"Instrument Sans", sans-serif',
                    fontSize: '14px',
                    color: '#ffffff',
                  }}
                />
              </div>

              {/* Email */}
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderRadius: '10px',
                padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <input
                  type="email"
                  placeholder="Email"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontFamily: '"Instrument Sans", sans-serif',
                    fontSize: '14px',
                    color: '#ffffff',
                  }}
                />
              </div>

              {/* Message */}
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderRadius: '10px',
                padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <textarea
                  placeholder="Message"
                  rows={9}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    resize: 'none',
                    fontFamily: '"Instrument Sans", sans-serif',
                    fontSize: '14px',
                    color: '#ffffff',
                  }}
                />
              </div>

              {/* Submit button — centered, same width as input */}
              <button style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '10px',
                fontFamily: '"Instrument Sans", sans-serif',
                fontSize: '14px',
                color: '#ffffff',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                marginTop: '10px',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                }}
              >
                Submit
              </button>

            </div>
          </div>

        </section>

        {/* SECTION 2 — Bottom strip with duplicate image, 1/4 height */}
        <section style={{
          position: 'relative',
          height: '40vh',
          overflow: 'hidden',
          zIndex: 0,
          marginTop: '0',
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <NextImage
              src="/contact-BG.png"
              alt=""
              fill
              unoptimized
              style={{
                objectFit: 'cover',
                objectPosition: 'bottom',
                opacity: 0.8,
              }}
            />
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
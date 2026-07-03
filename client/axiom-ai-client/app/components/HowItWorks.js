'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Connect Repo',
    description: 'Link your GitHub repository via OAuth in one click.',
  },
  {
    number: '02',
    title: 'PR Opened',
    description: 'A developer opens or updates a Pull Request.',
  },
  {
    number: '03',
    title: 'Axiom Analyzing',
    description: 'Gemini reviews the diff like a senior developer.',
  },
  {
    number: '04',
    title: 'Review Posted',
    description: 'Structured inline comments posted automatically.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      const numSteps = steps.length

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60px',
        end: () => `+=${window.innerHeight * 2}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const stepIndex = Math.min(
            numSteps - 1,
            Math.floor(self.progress * numSteps)
          )
          setActiveStep(stepIndex)

          gsap.to(lineRef.current, {
            scaleY: self.progress,
          })
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      height: 'calc(100vh - 60px)', 
      marginTop: '80px',
      padding: '80px 64px',
      background: '#000000',
      overflow: 'hidden',
    }}>


      {/* Main grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr',
        gap: '100px',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'start',
        height: '100%',
      }}>

        {/* Left — Steps with connecting line */}
        <div style={{ position: 'relative', paddingLeft: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>

          {/* Connecting line track */}
          <div style={{
            position: 'absolute',
            left: '7px',
            top: '11px',
            bottom: '11px',
            width: '1px',
            background: 'rgba(255,255,255,0.1)',
          }} />

          {/* Animated line draw */}
          <div ref={lineRef} style={{
            position: 'absolute',
            left: '7px',
            top: '11px',
            bottom: '11px',
            width: '1px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.2))',
            transform: 'scaleY(0)',
          }} />

          {steps.map((step, i) => (
            <div
              key={i}
              ref={el => stepRefs.current[i] = el}
              style={{
                position: 'relative',
                marginBottom: i === steps.length - 1 ? 0 : '50px',
                opacity: 1,
              }}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: '-40px',
                top: '4px',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                background: activeStep === i ? '#ffffff' : '#000000',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: activeStep === i ? '0 0 16px rgba(255,255,255,0.8)' : 'none',
                transition: 'all 0.4s ease',
              }} />

              <p style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '12px',
                fontWeight: '700',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}>
                {step.number}
              </p>
              <h3 style={{
                fontFamily: '"Manrope", sans-serif',
                fontSize: '22px',
                fontWeight: '500',
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '-0.01em',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: '1.6',
                maxWidth: '280px',
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right — GitHub UI mockup (fixed visual, state-driven) */}
        <div style={{
          position: 'relative',
        }}>
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
            marginBottom: '50px',
          }}>
            How It Works
          </h2>
          <GitHubMockup activeStep={activeStep} />
        </div>

      </div>

    </section>
  )
}

function GitHubMockup({ activeStep }) {
  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid #30363d',
      borderRadius: '8px',
      overflow: 'hidden',
      fontFamily: '"JetBrains Mono", monospace',
    }}>

      {/* Top bar */}
      <div style={{
        background: '#161b22',
        borderBottom: '1px solid #30363d',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: '12px', fontSize: '12px', color: '#8b949e' }}>
          github.com/Faraax66/Axiom-AI
        </span>
      </div>

      <div style={{ padding: '24px' }}>

        {/* STEP 0 — Repo connected */}
        {activeStep === 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ color: '#8b949e', fontSize: '13px' }}>Faraax66 /</span>
              <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: '600' }}>Axiom-AI</span>
              <span style={{
                fontSize: '11px',
                color: '#3fb950',
                border: '1px solid #238636',
                borderRadius: '20px',
                padding: '2px 10px',
              }}>
                ● Connected
              </span>
            </div>
            <div style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '16px',
              fontSize: '12px',
              color: '#8b949e',
            }}>
              <p style={{ marginBottom: '8px' }}>✓ OAuth authorized</p>
              <p style={{ marginBottom: '8px' }}>✓ Webhook registered</p>
              <p>✓ Listening for pull_request events...</p>
            </div>
          </div>
        )}

        {/* STEP 1 — PR Opened */}
        {activeStep === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{
                fontSize: '11px',
                color: '#3fb950',
                border: '1px solid #238636',
                borderRadius: '20px',
                padding: '2px 10px',
              }}>
                ● Open
              </span>
              <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: '600' }}>
                PR #402: Fix auth token leak
              </span>
            </div>
            <div style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              fontSize: '12px',
              overflow: 'hidden',
            }}>
              <div style={{ background: '#fa4549' + '20', padding: '6px 16px', color: '#ff7b72' }}>
                - token = req.headers[&#39;authorization&#39;];
              </div>
              <div style={{ background: '#3fb950' + '20', padding: '6px 16px', color: '#56d364' }}>
                + const rawToken = req.headers[&#39;authorization&#39;];
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Analyzing */}
        {activeStep === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: '600' }}>
                PR #402: Fix auth token leak
              </span>
            </div>
            <div style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              fontSize: '12px',
              padding: '6px 16px',
              color: '#ff7b72',
              marginBottom: '4px',
            }}>
              - token = req.headers[&#39;authorization&#39;];
            </div>
            <div style={{
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: '6px',
              fontSize: '12px',
              padding: '6px 16px',
              color: '#56d364',
              marginBottom: '16px',
            }}>
              + const rawToken = req.headers[&#39;authorization&#39;];
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: '#a5a5ff',
            }}>
              <span className="pulse-dot" style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#a5a5ff',
                display: 'inline-block',
              }} />
              Axiom AI is reviewing this PR...
            </div>
          </div>
        )}

        {/* STEP 3 — Comment posted */}
        {activeStep === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: '600' }}>
                PR #402: Fix auth token leak
              </span>
            </div>
            <div style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '16px',
              fontSize: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ color: '#a5a5ff', fontWeight: '700' }}>▲ Axiom AI Reviewer</span>
                <span style={{
                  color: '#f85149',
                  border: '1px solid #f85149',
                  borderRadius: '4px',
                  padding: '1px 8px',
                  fontSize: '10px',
                }}>
                  CRITICAL
                </span>
              </div>
              <p style={{ color: '#c9d1d9', lineHeight: '1.6' }}>
                Secure token splitting logic implemented correctly. Prevents raw auth header leakage and ensures Bearer standard conforming requests.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
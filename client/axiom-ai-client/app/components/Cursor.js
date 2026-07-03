'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const onMouseEnterLink = () => {
      dot.style.opacity = '0'
      ring.style.width = '40px'
      ring.style.height = '40px'
      ring.style.borderColor = 'rgba(255,255,255,0.6)'
    }

    const onMouseLeaveLink = () => {
      dot.style.opacity = '1'
      ring.style.width = '28px'
      ring.style.height = '28px'
      ring.style.borderColor = 'rgba(255,255,255,0.6)'
    }

    // Smooth ring follow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMouseMove)

    // Apply to all interactive elements
    const interactives = document.querySelectorAll('a, button')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: 'fixed',
        width: '6px',
        height: '6px',
        background: '#ffffff',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
      }} />

      {/* Ring */}
      <div ref={ringRef} style={{
        position: 'fixed',
        width: '28px',
        height: '28px',
        border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99998,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
      }} />
    </>
  )
}
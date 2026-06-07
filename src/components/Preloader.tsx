import { useEffect, useRef, useState } from 'react'

interface Props {
  onDone: () => void
}

// ── timing constants (ms) ──────────────────────────────────
const LOGO_DELAY    = 300
const LINE_DELAY    = 700
const BAR_DELAY     = 950   // loading bar + counter start
const BAR_DURATION  = 1400  // bar fill duration
const EXIT_AT       = 2600  // start fade-out
const DONE_AT       = 3200  // call onDone, unmount

export const PRELOADER_END_S = DONE_AT / 1000   // 3.2 — used by Hero
// ─────────────────────────────────────────────────────────────

export default function Preloader({ onDone }: Props) {
  const [pct, setPct]       = useState(0)
  const [exiting, setExiting] = useState(false)
  const [hidden, setHidden] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Percentage counter — starts when bar starts, eased cubic-out
    const counterTimer = setTimeout(() => {
      const t0 = performance.now()
      const tick = (now: number) => {
        const elapsed = now - t0
        const progress = Math.min(elapsed / BAR_DURATION, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setPct(Math.floor(eased * 100))
        if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }, BAR_DELAY)

    const exitTimer = setTimeout(() => setExiting(true), EXIT_AT)
    const doneTimer = setTimeout(() => {
      setHidden(true)
      document.body.style.overflow = ''
      onDone()
    }, DONE_AT)

    return () => {
      clearTimeout(counterTimer)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
      cancelAnimationFrame(rafRef.current)
      document.body.style.overflow = ''
    }
  }, [onDone])

  if (hidden) return null

  return (
    <>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#050D1A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.04)' : 'scale(1)',
        transition: exiting ? 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)' : 'none',
        pointerEvents: exiting ? 'none' : 'all',
      }}>

        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(14,165,233,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
        }} />

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)',
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          animation: 'prePulse 3s ease-in-out infinite',
        }} />

        {/* Background 3D shapes */}
        <div style={{ position:'absolute', top:'12%', left:'8%',   width:48, height:48, border:'1.5px solid rgba(245,158,11,0.2)',  pointerEvents:'none', animation:'shape3d 8s linear 0s infinite' }} />
        <div style={{ position:'absolute', top:'15%', right:'8%',  width:64, height:64, border:'1.5px solid rgba(14,165,233,0.18)', pointerEvents:'none', animation:'shape3d 11s linear -3s infinite' }} />
        <div style={{ position:'absolute', bottom:'14%', left:'10%', width:38, height:38, border:'1.5px solid rgba(16,185,129,0.15)', pointerEvents:'none', animation:'shape3d 14s linear -5s infinite' }} />
        <div style={{ position:'absolute', bottom:'12%', right:'9%', width:55, height:55, border:'1.5px solid rgba(167,139,250,0.18)', pointerEvents:'none', animation:'shape3d 9s linear -7s infinite' }} />

        {/* Tech scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 1, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), rgba(14,165,233,0.5), transparent)',
          animation: 'preScan 2.2s ease-in-out 0.4s infinite',
        }} />

        {/* 3D gyroscope orbit rings */}
        <div style={{
          position: 'absolute', width: 280, height: 280,
          top: '50%', left: '50%', marginTop: -140, marginLeft: -140,
          perspective: '600px', pointerEvents: 'none',
          animation: 'preUp 0.9s ease 200ms both',
        }}>
          <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px solid rgba(245,158,11,0.35)', animation:'preOrbit1 4s linear infinite' }} />
          <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px solid rgba(14,165,233,0.28)', animation:'preOrbit2 6s linear infinite' }} />
          <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px solid rgba(16,185,129,0.22)', animation:'preOrbit3 8s linear infinite' }} />
        </div>

        {/* ── Center content ── */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1.2rem',
          position: 'relative', zIndex: 1,
        }}>

          {/* Logo block */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            animation: `preUp 0.8s cubic-bezier(0.22,1,0.36,1) ${LOGO_DELAY}ms both`,
          }}>
            <img
              src="/logo6.png"
              alt="Leitech Systems Solution"
              style={{
                height: 'clamp(72px, 14vw, 140px)',
                width: 'auto',
                maxWidth: '260px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 18px rgba(245,158,11,0.35))',
                animation: 'logoGlow 2.5s ease-in-out 1.2s infinite',
              }}
            />
          </div>

          {/* Separator line */}
          <div style={{
            alignSelf: 'stretch', height: 1,
            background: 'linear-gradient(90deg, transparent, #F59E0B, #0EA5E9, transparent)',
            transformOrigin: 'center',
            animation: `preLineIn 1s ease ${LINE_DELAY}ms both`,
          }} />

          {/* Tagline */}
          <div style={{
            fontSize: '0.6rem', textTransform: 'uppercase',
            letterSpacing: '0.28em', color: '#475569',
            animation: `preUp 0.6s ease ${LINE_DELAY + 100}ms both`,
          }}>
            Inspire · Innovate · Secure
          </div>

          {/* Loading bar track */}
          <div style={{
            width: 200, height: 1,
            background: 'rgba(14,165,233,0.1)',
            overflow: 'hidden',
            animation: `preUp 0.4s ease ${BAR_DELAY}ms both`,
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #F59E0B, #38BDF8)',
              width: '0%',
              animation: `preBarFill ${BAR_DURATION}ms cubic-bezier(0.4,0,0.2,1) ${BAR_DELAY}ms forwards`,
            }} />
          </div>

          {/* Percentage */}
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem', color: '#F59E0B',
            letterSpacing: '0.1em', minWidth: '4ch', textAlign: 'right',
            animation: `preUp 0.4s ease ${BAR_DELAY}ms both`,
          }}>
            {pct}%
          </div>

        </div>
      </div>

      <style>{`
        @keyframes preUp      { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }
        @keyframes preLineIn  { from { transform:scaleX(0) }                  to { transform:scaleX(1) } }
        @keyframes preBarFill { from { width:0% }                             to { width:100% } }
        @keyframes prePulse   { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes logoGlow   { 0%,100%{filter:drop-shadow(0 0 14px rgba(245,158,11,0.3))} 50%{filter:drop-shadow(0 0 32px rgba(245,158,11,0.65))} }
        @keyframes shape3d    { from { transform:perspective(300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); } to { transform:perspective(300px) rotateX(360deg) rotateY(360deg) rotateZ(180deg); } }
        @keyframes preScan    { 0%{top:0%;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{top:100%;opacity:0} }
        @keyframes preOrbit1  { from{transform:rotateY(0deg)}                         to{transform:rotateY(360deg)} }
        @keyframes preOrbit2  { from{transform:rotateX(60deg) rotateY(0deg)}          to{transform:rotateX(60deg) rotateY(360deg)} }
        @keyframes preOrbit3  { from{transform:rotateX(-60deg) rotateY(0deg)}         to{transform:rotateX(-60deg) rotateY(360deg)} }
      `}</style>
    </>
  )
}

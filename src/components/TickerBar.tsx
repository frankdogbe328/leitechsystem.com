import { useState, useEffect } from 'react'

const ITEMS = [
  '📞 +233 508 096 108',
  '📧 leitech_systems@outlook.com',
  '✅ 5+ Years Experience',
  '70+ Projects Completed',
  '24/7 Support Available',
  '100% Client Satisfaction',
  '🎉 Free Site Visit — No Obligation!',
  '☀️ Cut Your Electricity Bill by Up to 100%',
  '📍 Teshie Nungua Estate, Accra, Ghana',
  '🔒 Solar · Security · Smart Home · Communications',
]

// Duplicate for seamless infinite loop
const TRACK = [...ITEMS, ...ITEMS]

export default function TickerBar() {
  const [scrolled, setScrolled] = useState(false)
  const [light, setLight] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mirror the site's theme toggle
  useEffect(() => {
    const check = () =>
      setLight(document.documentElement.dataset.theme === 'light')
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const top = scrolled ? 60 : 78

  return (
    <>
      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: tickerScroll 32s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 900px) {
          .ticker-bar-fixed {
            top: 56px !important;
          }
        }
      `}</style>

      <div
        className="ticker-bar-fixed"
        style={{
          position: 'fixed',
          top,
          left: 0,
          right: 0,
          zIndex: 799,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: light ? 'rgba(240,244,248,0.97)' : 'rgba(5,13,26,0.97)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(245,158,11,0.25)',
          transition: 'top 0.35s ease',
          userSelect: 'none',
        }}
      >
        {/* Scrolling track */}
        <div style={{ flex: 1, overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'center' }}>
          <div className="ticker-track">
            {TRACK.map((item, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  color: light ? '#334155' : '#CBD5E1',
                  padding: '0 2.4rem',
                  gap: '0.5rem',
                }}
              >
                {item}
                <span
                  style={{
                    display: 'inline-block',
                    width: 3,
                    height: 3,
                    borderRadius: '50%',
                    background: '#F59E0B',
                    opacity: 0.6,
                    marginLeft: '2.4rem',
                    flexShrink: 0,
                  }}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 40,
            background: light
              ? 'linear-gradient(to right, rgba(240,244,248,0.9), transparent)'
              : 'linear-gradient(to right, rgba(5,13,26,0.9), transparent)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 60,
            background: light
              ? 'linear-gradient(to left, rgba(240,244,248,0.97), transparent)'
              : 'linear-gradient(to left, rgba(5,13,26,0.97), transparent)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </div>
    </>
  )
}

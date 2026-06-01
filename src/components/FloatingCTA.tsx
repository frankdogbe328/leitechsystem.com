import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { X, Zap } from 'lucide-react'

export default function FloatingCTA() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [scrolled, setScrolled]   = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reset dismiss on every page change so it can reappear
  useEffect(() => { setDismissed(false) }, [pathname])

  const visible = scrolled && pathname !== '/contact' && !dismissed

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '6.5rem',
        right: '1.5rem',
        zIndex: 840,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transform: visible ? 'translateX(0)' : 'translateX(calc(100% + 4rem))',
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <button
        onClick={() => navigate('/contact')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.72rem 1.2rem',
          background: 'linear-gradient(135deg, #F59E0B, #D97706)',
          color: '#050D1A',
          fontWeight: 700,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          border: 'none',
          borderRadius: '2px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(245,158,11,0.35)',
          whiteSpace: 'nowrap',
        }}
      >
        <Zap size={12} />
        Get a Quote
      </button>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'rgba(15,30,53,0.9)',
          border: '1px solid rgba(245,158,11,0.25)',
          color: '#94A3B8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <X size={12} />
      </button>
    </div>
  )
}

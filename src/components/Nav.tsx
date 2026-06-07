import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'

interface Props { loaded: boolean }

const links = [
  { label: 'Home',         path: '/' },
  { label: 'About',        path: '/about' },
  { label: 'Services',     path: '/services' },
  { label: 'Gallery',      path: '/gallery' },
  { label: 'Institutions', path: '/institutions' },
  { label: 'FAQ',          path: '/faq' },
  { label: 'Contact',      path: '/contact' },
]

const LOGO_IN   = 100
const LINK_BASE = 200
const LINK_STEP = 65
const CTA_DELAY = LINK_BASE + links.length * LINK_STEP

export default function Nav({ loaded }: Props) {
  const navigate    = useNavigate()
  const location    = useLocation()
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sweeping,   setSweeping]   = useState(false)
  const [sweepKey,   setSweepKey]   = useState(0)
  const [light,      setLight]      = useState(() => localStorage.getItem('theme') === 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', light ? 'light' : 'dark')
    localStorage.setItem('theme', light ? 'light' : 'dark')
  }, [light])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname === path

  const go = (path: string) => {
    setSweepKey((k) => k + 1)
    setSweeping(true)
    setTimeout(() => setSweeping(false), 700)
    navigate(path)
  }

  const stagger = (delayMs: number): React.CSSProperties => ({
    opacity:   loaded ? 1 : 0,
    transform: loaded ? 'none' : 'translateY(-14px)',
    transition: loaded
      ? `opacity 0.55s ease ${delayMs}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delayMs}ms`
      : 'none',
  })

  return (
    <>
      {sweeping && (
        <div key={sweepKey} style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: 2, zIndex: 9998,
          background: 'linear-gradient(90deg, #F59E0B, #0EA5E9)',
          transformOrigin: 'left center',
          pointerEvents: 'none',
          animation: 'sweepBar 0.6s cubic-bezier(0.4,0,0.2,1) forwards',
        }} />
      )}

      {/* ── Main nav ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '0.6rem 3rem' : '1.1rem 3rem',
        background: light
          ? (scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.90)')
          : (scrolled ? 'rgba(5,13,26,0.97)' : 'rgba(5,13,26,0.78)'),
        backdropFilter: 'blur(22px)',
        borderBottom: `1px solid ${scrolled
          ? (light ? 'rgba(14,165,233,0.25)' : 'rgba(14,165,233,0.18)')
          : (light ? 'rgba(14,165,233,0.12)' : 'rgba(14,165,233,0.07)')}`,
        transition: 'padding 0.3s ease, border-color 0.3s ease, background 0.3s ease',
      }}>

        {/* Logo */}
        <button onClick={() => go('/')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center',
          padding: 0, ...stagger(LOGO_IN),
        }}>
          <img
            src="/logo6.png"
            alt="Leitech Systems Solution"
            className="nav-logo"
            style={{ height: 44, width: 'auto', maxWidth: 155, objectFit: 'contain', display: 'block' }}
          />
        </button>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="nav-desktop">
          {links.map((l, i) => {
            const active = isActive(l.path)
            return (
              <li key={l.path} style={stagger(LINK_BASE + i * LINK_STEP)}>
                <button
                  onClick={() => go(l.path)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.68rem', fontWeight: active ? 600 : 500,
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    color: active ? '#F59E0B' : (light ? '#475569' : '#94A3B8'),
                    transition: 'color 0.25s',
                    padding: 0, position: 'relative',
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = light ? '#0F172A' : '#F1F5F9' }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = light ? '#475569' : '#94A3B8' }}
                >
                  {l.label}
                  {active && (
                    <span style={{
                      position: 'absolute', bottom: -4, left: 0, right: 0,
                      height: 1.5, borderRadius: 1,
                      background: 'linear-gradient(90deg,#F59E0B,#0EA5E9)',
                    }} />
                  )}
                </button>
              </li>
            )
          })}

          {/* Theme toggle */}
          <li style={stagger(CTA_DELAY - 80)}>
            <button
              onClick={() => setLight(v => !v)}
              title={light ? 'Switch to dark mode' : 'Switch to light mode'}
              style={{
                background: light ? 'rgba(14,165,233,0.08)' : 'rgba(14,165,233,0.07)',
                border: `1px solid ${light ? 'rgba(14,165,233,0.25)' : 'rgba(14,165,233,0.15)'}`,
                borderRadius: 8,
                width: 34, height: 34,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: light ? '#0EA5E9' : '#94A3B8',
                cursor: 'pointer', transition: 'all 0.25s',
              }}
            >
              {light ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </li>

          {/* CTA */}
          <li style={stagger(CTA_DELAY)}>
            <button
              onClick={() => go('/contact')}
              className="btn btn-primary"
              style={{ fontSize: '0.64rem', padding: '0.5rem 1.3rem' }}
            >
              Get a Quote
            </button>
          </li>
        </ul>

        {/* Mobile right — theme toggle + hamburger */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.6rem' }} className="nav-mobile-right">
          <button
            onClick={() => setLight(v => !v)}
            style={{
              background: 'none', border: 'none',
              color: light ? '#0EA5E9' : '#94A3B8',
              padding: '0.25rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
            }}
          >
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            style={{ display: 'flex', background: 'none', border: 'none', color: '#94A3B8', padding: '0.25rem', cursor: 'pointer', ...stagger(LOGO_IN) }}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div className="mob-overlay" style={{
          position: 'fixed', inset: 0, zIndex: 900,
          background: light ? 'rgba(248,250,252,0.98)' : 'rgba(5,13,26,0.98)',
          backdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '2rem',
        }}>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#94A3B8', padding: '0.25rem', cursor: 'pointer' }}
          ><X size={26} /></button>

          {links.map((l, i) => {
            const active = isActive(l.path)
            return (
              <button
                key={l.path}
                onClick={() => { setMobileOpen(false); go(l.path) }}
                className="mob-link"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '1.9rem', fontWeight: 700,
                  color: active ? '#F59E0B' : (light ? '#0F172A' : '#F1F5F9'),
                  letterSpacing: '0.04em', minHeight: 44,
                  animation: `mobLinkIn 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`,
                }}
              >
                {l.label}
              </button>
            )
          })}
          <button
            onClick={() => { setMobileOpen(false); go('/contact') }}
            className="btn btn-primary"
            style={{ animation: `mobLinkIn 0.45s cubic-bezier(0.22,1,0.36,1) ${links.length * 55}ms both` }}
          >
            Get a Quote
          </button>
          <img src="/logo6.png" alt="Leitech" style={{ height: 48, width: 'auto', maxWidth: 140, objectFit: 'contain', opacity: 0.85 }} />
        </div>
      )}

      <style>{`
        @keyframes sweepBar {
          0%   { transform: scaleX(0); opacity: 1; }
          75%  { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes mobLinkIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: none; }
        }
        @media (max-width: 900px) {
          .nav-desktop      { display: none !important; }
          .nav-mobile-right { display: flex !important; }
          nav               { padding: 0.75rem 1.25rem !important; }
          .nav-logo         { height: 38px !important; max-width: 140px !important; }
        }
        @media (max-width: 480px) {
          .mob-link  { font-size: 1.45rem !important; }
          .mob-overlay { gap: 1.5rem !important; }
          .nav-logo  { height: 32px !important; max-width: 120px !important; }
          nav        { padding: 0.65rem 1rem !important; }
        }
      `}</style>
    </>
  )
}

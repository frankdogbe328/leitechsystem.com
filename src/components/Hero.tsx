import { ArrowRight, ChevronDown } from 'lucide-react'
import { PRELOADER_END_S } from './Preloader'
import StatNumber from './StatNumber'

// ── All hero animations start firing right when the preloader exits ──
const E = PRELOADER_END_S      // 3.2 s
const anim = (duration: number, offsetS: number, easing = 'ease') =>
  `fadeUp ${duration}s ${easing} ${E + offsetS}s both`

const stats = [
  { n: '5+',   l: 'Years Experience' },
  { n: '8+',   l: 'Service Areas' },
  { n: '24/7', l: 'Support Ready' },
  { n: '100%', l: 'Satisfaction' },
  { n: 'GH',   l: 'Ghana & W. Africa' },
]

interface Props { loaded: boolean }

export default function Hero({ loaded: _ }: Props) {
  return (
    <section
      id="top"
      className="hero-section"
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '10rem 1.5rem 6rem',
        position: 'relative', overflow: 'hidden',
        backgroundImage: `linear-gradient(rgba(5,10,20,0.85), rgba(5,10,20,0.45)), url('/images/back2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
      }} />

      {/* Orbs — capped at viewport width to prevent horizontal overflow */}
      <div style={{ position:'absolute', width:'min(700px,90vw)', height:'min(700px,90vw)', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:'min(500px,70vw)', height:'min(500px,70vw)', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)',
        top:'-100px', right:'-100px', pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:'min(400px,60vw)', height:'min(400px,60vw)', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
        bottom:'-80px', left:'-80px', pointerEvents:'none' }} />

      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
        background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.22)',
        padding: '0.4rem 1rem', fontSize: '0.62rem', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F59E0B',
        marginBottom: '2rem',
        animation: anim(0.7, 0),
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%', background: '#F59E0B',
          display: 'inline-block', animation: 'pulse 2s ease-in-out infinite',
        }} />
        Ghana & West Africa · Est. 5+ Years
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: 'clamp(2.6rem, 6vw, 5.5rem)', fontWeight: 800,
        lineHeight: 1.05, maxWidth: 900, marginBottom: '0.15em',
        animation: anim(0.9, 0.15),
      }}>
        Integrated{' '}
        <span style={{
          background: 'linear-gradient(90deg, #F59E0B, #FCD34D)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>Solar,</span>{' '}
        Security &{' '}
        <span style={{
          background: 'linear-gradient(90deg, #0EA5E9, #38BDF8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>Smart</span>{' '}
        Infrastructure
      </h1>

      {/* Divider */}
      <div style={{
        width: 64, height: 3, borderRadius: 2,
        background: 'linear-gradient(90deg, #F59E0B, #0EA5E9)',
        margin: '1.8rem auto',
        animation: anim(0.7, 0.35),
      }} />

      {/* Sub */}
      <p style={{
        fontSize: '1rem', color: '#94A3B8', fontWeight: 400,
        maxWidth: 640, lineHeight: 1.85, marginBottom: '2.5rem',
        animation: anim(0.9, 0.5),
      }}>
        LEITECH SYSTEMS SOLUTION delivers advanced solar energy systems, security
        infrastructure, and intelligent technology solutions for homes, businesses,
        and government institutions across Ghana and West Africa.
      </p>

      {/* CTAs */}
      <div className="hero-ctas" style={{
        display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
        animation: anim(0.9, 0.65),
      }}>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="btn btn-primary"
        >
          Request Consultation <ArrowRight size={14} />
        </a>
        <a
          href="#services"
          onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="btn btn-outline"
        >
          View Services
        </a>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="btn btn-ghost"
        >
          Get a Quote
        </a>
      </div>

      {/* Stats bar */}
      <div className="hero-stats-bar" style={{
        display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
        marginTop: '5rem',
        border: '1px solid rgba(14,165,233,0.14)',
        background: 'rgba(12,26,46,0.6)', backdropFilter: 'blur(12px)',
        width: '100%', maxWidth: 900,
        animation: anim(0.9, 0.85),
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: '1.6rem 2.5rem', textAlign: 'center', flex: 1, minWidth: 120,
            borderRight: i < stats.length - 1 ? '1px solid rgba(14,165,233,0.1)' : 'none',
          }}>
            <StatNumber
              value={s.n}
              delay={400}
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, lineHeight: 1, marginBottom: '0.3rem',
                background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}
            />
            <div style={{ fontSize: '0.56rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#475569' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          color: '#475569', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.2rem', textDecoration: 'none',
          animation: anim(0.7, 1.1),
        }}
      >
        <span style={{ fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Scroll</span>
        <ChevronDown size={16} style={{ animation: 'bounce 2s ease-in-out infinite' }} />
      </a>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(22px) } to { opacity:1; transform:none } }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

        /* Hero responsive */
        @media (max-width:1024px) {
          .hero-section { padding: 9rem 1.5rem 5rem !important; }
          .hero-stats-bar { max-width: 100% !important; flex-wrap: wrap !important; }
          .hero-stats-bar > div { min-width: 140px !important; flex: 1 1 140px !important; }
        }
        @media (max-width:768px) {
          .hero-section { padding: 8rem 1.25rem 5rem !important; }
          .hero-stats-bar { flex-direction: column !important; margin-top: 3rem !important; }
          .hero-stats-bar > div { border-right: none !important; border-bottom: 1px solid rgba(14,165,233,0.1); width: 100%; flex: none !important; padding: 1.2rem 1.5rem !important; }
          .hero-stats-bar > div:last-child { border-bottom: none; }
        }
        @media (max-width:480px) {
          .hero-section { padding: 7rem 1rem 4rem !important; }
          .hero-ctas { flex-direction: column !important; width: 100%; }
          .hero-ctas .btn { width: 100%; justify-content: center; }
          .hero-stats-bar > div > div { font-size: 0.58rem !important; }
        }
      `}</style>
    </section>
  )
}

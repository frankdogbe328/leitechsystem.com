import { Sun, Shield, Home, Radio, ArrowRight } from 'lucide-react'

const bullets = [
  'Solar power design and installation',
  'CCTV surveillance systems',
  'Electric fencing and perimeter protection',
  'Access control & smart building systems',
  'Telecommunications infrastructure support',
]

const badges = [
  { icon: <Sun size={22} color="#F59E0B" />, label: 'Solar Energy' },
  { icon: <Shield size={22} color="#0EA5E9" />, label: 'Security' },
  { icon: <Home size={22} color="#10B981" />, label: 'Smart Home' },
  { icon: <Radio size={22} color="#F59E0B" />, label: 'Comms' },
]

const tags = ['Residential', 'Commercial', 'Government', 'Industrial']

export default function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '5rem', alignItems: 'center',
        }} className="about-grid">
          {/* Text side */}
          <div className="rev">
            <div className="eyebrow">Who We Are</div>
            <h2 className="section-title" style={{ marginBottom: '1.2rem' }}>
              About <em>Leitech</em>
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.85, marginBottom: '1.8rem' }}>
              LEITECH SYSTEMS SOLUTION is a Ghana-based engineering and technology company
              specializing in renewable energy systems, security infrastructure, communications,
              and intelligent electrical installations.
            </p>

            {/* Bullet list */}
            <div style={{ marginBottom: '2rem' }}>
              {bullets.map((b, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid rgba(14,165,233,0.08)',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />
                  </div>
                  <span style={{ fontSize: '0.87rem', color: '#94A3B8' }}>{b}</span>
                </div>
              ))}
            </div>

            {/* We deliver tags */}
            <div>
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#475569', marginBottom: '0.8rem' }}>
                Solutions For
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {tags.map((t) => (
                  <span key={t} style={{
                    padding: '0.35rem 1rem', fontSize: '0.65rem', fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    border: '1px solid rgba(14,165,233,0.18)', color: '#94A3B8',
                    background: 'rgba(14,165,233,0.04)',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            <a href="#contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Work With Us <ArrowRight size={14} />
            </a>
          </div>

          {/* Card side */}
          <div className="rev d2">
            <div className="about-card" style={{
              background: 'rgba(12,26,46,0.8)', border: '1px solid rgba(245,158,11,0.2)',
              padding: '2.5rem', position: 'relative', overflow: 'hidden',
            }}>
              {/* Top gradient line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #F59E0B, #0EA5E9, transparent)',
              }} />

              <div style={{
                fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.3rem',
                letterSpacing: '0.04em',
              }}>
                <span style={{ color: '#F1F5F9' }}>LEI</span>
                <span style={{
                  background: 'linear-gradient(90deg,#F59E0B,#38BDF8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>TECH</span>
                <span style={{ color: '#F1F5F9' }}> SYSTEMS</span>
              </div>
              <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#F59E0B', marginBottom: '2rem' }}>
                Inspire · Innovate · Secure
              </div>

              {/* Badge grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {badges.map((b) => (
                  <div key={b.label} style={{
                    background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.1)',
                    padding: '1.2rem', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '0.6rem', textAlign: 'center',
                    transition: 'border-color 0.3s, background 0.3s',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(245,158,11,0.25)'
                      e.currentTarget.style.background = 'rgba(245,158,11,0.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(14,165,233,0.1)'
                      e.currentTarget.style.background = 'rgba(14,165,233,0.04)'
                    }}
                  >
                    {b.icon}
                    <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div style={{
                padding: '1.2rem',
                background: 'rgba(14,165,233,0.04)',
                border: '1px solid rgba(14,165,233,0.1)',
              }}>
                <div style={{ fontSize: '0.56rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#475569', marginBottom: '0.4rem' }}>
                  Base of Operations
                </div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 500 }}>
                  Block H, Medolines, Burma Camp, Accra
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .about-card { padding: 1.8rem !important; }
        }
        @media (max-width: 480px) {
          .about-card { padding: 1.4rem !important; }
        }
      `}</style>
    </section>
  )
}

import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sun, Lock, Cpu, Radio } from 'lucide-react'

const highlights = [
  {
    icon: <Sun size={32} />,
    label: 'Solar Power Systems',
    desc: 'Residential, commercial, and off-grid solar installations — keeping your property powered day and night.',
    color: '#F59E0B',
  },
  {
    icon: <Lock size={32} />,
    label: 'Security Infrastructure',
    desc: 'CCTV, electric fencing, access control, and intercom systems for complete perimeter protection.',
    color: '#0EA5E9',
  },
  {
    icon: <Cpu size={32} />,
    label: 'Smart Infrastructure',
    desc: 'Home automation, remote energy monitoring, and integrated smart security — all from one platform.',
    color: '#10B981',
  },
  {
    icon: <Radio size={32} />,
    label: 'Communications Infrastructure',
    desc: 'HF/VHF radio, telecommunications cabling, and structured network systems for any environment.',
    color: '#A78BFA',
  },
]

export default function ServicesPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter">
      {/* Page hero */}
      <section className="page-hero" style={{
        backgroundImage: `linear-gradient(rgba(5,10,20,0.80),rgba(5,10,20,0.60)), url('/images/back-services.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(14,165,233,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,0.04) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',
        }} />
        <div className="container">
          <div className="eyebrow">What We Offer</div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 800, lineHeight: 1.05, maxWidth: 700 }}>
            Our Core{' '}
            <span style={{ background: 'linear-gradient(90deg,#F59E0B,#38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Services</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.85rem,2.5vw,1rem)', color: '#94A3B8', maxWidth: 560, lineHeight: 1.8, marginTop: '1rem' }}>
            Residential, commercial and government technology solutions — solar, security, smart systems and communications.
          </p>
        </div>
      </section>

      {/* Service overview cards — clean, no sub-lists */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem',
          }} className="svc-overview-grid">
            {highlights.map((h) => (
              <div key={h.label} className="rev" style={{
                background: 'rgba(15,30,53,0.88)',
                border: `1px solid rgba(14,165,233,0.12)`,
                borderRadius: 20, padding: '2.4rem 2.2rem',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${h.color}00, ${h.color}, ${h.color}00)`,
                  borderRadius: '20px 20px 0 0',
                }} />
                <div style={{
                  width: 60, height: 60, borderRadius: 14,
                  background: `${h.color}14`, border: `1px solid ${h.color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: h.color, marginBottom: '1.4rem',
                }}>{h.icon}</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F1F5F9', marginBottom: '0.75rem', lineHeight: 1.3 }}>{h.label}</h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.75 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--alt" style={{ borderTop: '1px solid rgba(14,165,233,0.1)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="rev">
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Need a Custom <em>Solution?</em></h2>
            <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.8 }}>
              Every property is different. We design bespoke systems tailored to your specific needs and budget.
            </p>
            <button onClick={() => navigate('/contact')} className="btn btn-primary">
              Request Consultation <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .svc-overview-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

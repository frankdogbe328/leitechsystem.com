import { useNavigate } from 'react-router-dom'
import { Sun, Lock, Cpu, Radio, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'

const serviceCards = [
  {
    icon: <Sun size={28} />, color: '#F59E0B',
    title: 'Solar Power Systems',
    desc: 'Residential, commercial and industrial solar design, installation and battery storage solutions.',
    path: '/services',
  },
  {
    icon: <Lock size={28} />, color: '#0EA5E9',
    title: 'Security Infrastructure',
    desc: 'CCTV, electric fencing, access control and intercom systems for any property type.',
    path: '/services',
  },
  {
    icon: <Cpu size={28} />, color: '#10B981',
    title: 'Smart Infrastructure',
    desc: 'Smart home automation, remote energy monitoring and integrated security platforms.',
    path: '/services',
  },
  {
    icon: <Radio size={28} />, color: '#A78BFA',
    title: 'Communications',
    desc: 'HF/VHF radio, telecom cabling, network and signal system installations.',
    path: '/services',
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter">
      {/* Hero — full viewport, animations keyed to preloader exit */}
      <Hero loaded />

      {/* ── Services teaser ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-header rev">
            <div>
              <div className="eyebrow">What We Do</div>
              <h2 className="section-title">Our Core <em>Services</em></h2>
            </div>
            <p className="section-desc">
              End-to-end energy, security and smart technology solutions for every client type.
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            gap: '1px', background: 'rgba(14,165,233,0.06)',
            border: '1px solid rgba(14,165,233,0.08)',
            marginBottom: '2.5rem',
          }} className="home-svc-grid">
            {serviceCards.map((s, i) => (
              <div key={i} className={`rev d${i as 0|1|2|3}`} style={{
                background: '#0F1E35', padding: '2.2rem 1.8rem',
                cursor: 'pointer', transition: 'background 0.3s',
                position: 'relative', overflow: 'hidden',
              }}
                onClick={() => navigate(s.path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#142642'
                  const line = e.currentTarget.querySelector('.hsl') as HTMLElement
                  if (line) line.style.transform = 'scaleX(1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0F1E35'
                  const line = e.currentTarget.querySelector('.hsl') as HTMLElement
                  if (line) line.style.transform = 'scaleX(0)'
                }}
              >
                <div className="hsl" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                  transform: 'scaleX(0)', transition: 'transform 0.4s',
                }} />
                <div style={{
                  width: 52, height: 52, borderRadius: 8,
                  background: `${s.color}14`, border: `1px solid ${s.color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.color, marginBottom: '1.4rem',
                }}>{s.icon}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem', lineHeight: 1.25 }}>{s.title}</h4>
                <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.65 }}>{s.desc}</p>
                <div style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', color: s.color, fontWeight: 600 }}>
                  Learn more <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }} className="rev">
            <button onClick={() => navigate('/services')} className="btn btn-outline">
              View All Services <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <WhyUs />

      {/* Testimonials */}
      <Testimonials />

      {/* ── CTA Banner ── */}
      <section className="section" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(14,165,233,0.04))', borderTop: '1px solid rgba(14,165,233,0.1)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="rev">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Ready to Start?</div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              Power Up Your <em>Property</em>
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: 520, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
              Get a free consultation from our certified team — solar, security, or smart systems, we deliver it all across Ghana and West Africa.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/contact')} className="btn btn-primary">
                Request Consultation <ArrowRight size={14} />
              </button>
              <button onClick={() => navigate('/services')} className="btn btn-outline">
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) { .home-svc-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { .home-svc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Lock, Cpu, Radio, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import type { ReactNode } from 'react'

interface SvcItem { icon: ReactNode; color: string; title: string; desc: string; path: string }

const serviceCards: SvcItem[] = [
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

function HomeServiceCard({ s, delay, onClick }: { s: SvcItem; delay: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="hs-card rev"
      style={{ animationDelay: delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div style={{
        background: hovered ? 'rgba(20,38,66,0.98)' : 'rgba(15,30,53,0.90)',
        border: `1px solid ${hovered ? s.color + '55' : 'rgba(14,165,233,0.12)'}`,
        borderRadius: 20,
        padding: '2.4rem 2rem',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px ${s.color}30, 0 8px 40px ${s.color}20`
          : '0 6px 32px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.18)',
        transition: 'all 0.38s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${s.color}00, ${s.color}, ${s.color}00)`,
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.35s',
          borderRadius: '20px 20px 0 0',
        }} />

        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${s.color}18 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
          pointerEvents: 'none',
        }} />

        {/* Icon */}
        <div style={{
          width: 58, height: 58, borderRadius: 14,
          background: hovered ? `${s.color}22` : `${s.color}14`,
          border: `1px solid ${hovered ? s.color + '55' : s.color + '28'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: s.color, marginBottom: '1.4rem', flexShrink: 0,
          boxShadow: hovered ? `0 0 28px ${s.color}35` : 'none',
          transition: 'all 0.35s',
        }}>{s.icon}</div>

        <h4 style={{
          fontSize: '1.05rem', fontWeight: 700,
          marginBottom: '0.7rem', lineHeight: 1.3,
          color: hovered ? '#F1F5F9' : '#E2E8F0',
          transition: 'color 0.25s',
        }}>{s.title}</h4>

        <p style={{
          fontSize: '0.82rem', color: '#475569',
          lineHeight: 1.75, flex: 1, marginBottom: '1.5rem',
        }}>{s.desc}</p>

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: '1.1rem',
          background: `linear-gradient(90deg, ${s.color}33, transparent)`,
          opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s',
        }} />

        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontSize: '0.72rem', fontWeight: 600,
          color: hovered ? s.color : '#475569',
          transition: 'color 0.25s',
        }}>
          Learn more
          <ArrowRight size={13} style={{ transition: 'transform 0.25s', transform: hovered ? 'translateX(4px)' : 'none' }} />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter">
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
            gap: '1.25rem', marginBottom: '2.5rem',
          }} className="home-svc-grid">
            {serviceCards.map((s, i) => (
              <HomeServiceCard
                key={i} s={s}
                delay={`${i * 75}ms`}
                onClick={() => navigate(s.path)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center' }} className="rev">
            <button onClick={() => navigate('/services')} className="btn btn-outline">
              View All Services <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <WhyUs />
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
        @media (max-width: 540px)  { .home-svc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

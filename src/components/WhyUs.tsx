import { useState } from 'react'
import { Award, Package, Users, HeartHandshake, Settings, BadgeDollarSign } from 'lucide-react'
import type { ReactNode } from 'react'

interface Card { icon: ReactNode; title: string; desc: string; tag: string; color: string }

const cards: Card[] = [
  {
    icon: <Award size={28} />, title: 'Certified Solar Installers', color: '#F59E0B',
    desc: 'Our team holds professional certifications in solar design and installation — every project meets the highest technical standards.',
    tag: 'Industry-certified professionals',
  },
  {
    icon: <Package size={28} />, title: 'High-Quality Equipment', color: '#0EA5E9',
    desc: 'We use only premium, tested components from trusted global manufacturers — performance that lasts for years.',
    tag: 'Premium brands only',
  },
  {
    icon: <Users size={28} />, title: 'Professional Installation Team', color: '#10B981',
    desc: 'Experienced technicians handle every project with precision and zero shortcuts — clean, safe, and fully compliant.',
    tag: 'Skilled & experienced crew',
  },
  {
    icon: <HeartHandshake size={28} />, title: 'Reliable After-Sales Support', color: '#F59E0B',
    desc: 'We stay with you long after installation — available for maintenance, repairs, and upgrades whenever you need us.',
    tag: 'Long-term partnership',
  },
  {
    icon: <Settings size={28} />, title: 'Customized Solutions', color: '#0EA5E9',
    desc: 'Every client is different. We design bespoke solutions tailored to your specific energy needs, property, and budget.',
    tag: 'Tailored to your needs',
  },
  {
    icon: <BadgeDollarSign size={28} />, title: 'Competitive Pricing', color: '#10B981',
    desc: 'Premium technology and workmanship at transparent, fair prices. Detailed quotes with zero hidden costs.',
    tag: 'No hidden fees',
  },
]

function WhyCard({ c, delay }: { c: Card; delay: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`why-card rev`}
      style={{ animationDelay: delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: hovered ? 'rgba(20,38,66,0.98)' : 'rgba(15,30,53,0.9)',
        border: `1px solid ${hovered ? c.color + '50' : 'rgba(14,165,233,0.12)'}`,
        borderRadius: 20,
        padding: '2.4rem 2.2rem',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 24px 70px rgba(0,0,0,0.5), 0 0 0 1px ${c.color}30, 0 8px 32px ${c.color}20`
          : '0 6px 32px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)',
        transition: 'all 0.38s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'default',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${c.color}00, ${c.color}, ${c.color}00)`,
          opacity: hovered ? 1 : 0.3,
          transition: 'opacity 0.35s',
          borderRadius: '20px 20px 0 0',
        }} />

        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 160, height: 160, borderRadius: '50%',
          background: `radial-gradient(circle, ${c.color}20 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
          pointerEvents: 'none',
        }} />

        {/* Icon */}
        <div style={{
          width: 58, height: 58, borderRadius: 14,
          background: hovered ? `${c.color}20` : `${c.color}12`,
          border: `1px solid ${hovered ? c.color + '50' : c.color + '28'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: c.color, marginBottom: '1.6rem', flexShrink: 0,
          boxShadow: hovered ? `0 0 24px ${c.color}30` : 'none',
          transition: 'all 0.35s',
        }}>{c.icon}</div>

        <h4 style={{
          fontSize: '1.05rem', fontWeight: 700,
          marginBottom: '0.8rem', lineHeight: 1.3,
          color: hovered ? '#F1F5F9' : '#E2E8F0',
          transition: 'color 0.25s',
        }}>{c.title}</h4>

        <p style={{
          fontSize: '0.82rem', color: hovered ? '#64748B' : '#475569',
          lineHeight: 1.8, marginBottom: '1.5rem', flex: 1,
          transition: 'color 0.25s',
        }}>{c.desc}</p>

        {/* Tag pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.06em',
          color: c.color,
          background: `${c.color}12`,
          border: `1px solid ${c.color}28`,
          borderRadius: 50, padding: '0.35rem 0.85rem',
          width: 'fit-content',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: c.color, flexShrink: 0,
          }} />
          {c.tag}
        </div>
      </div>
    </div>
  )
}

export default function WhyUs() {
  return (
    <section id="why" className="section">
      <div className="container">
        <div className="section-header rev">
          <div>
            <div className="eyebrow">Our Edge</div>
            <h2 className="section-title">Why Choose <em>Leitech</em></h2>
          </div>
          <p className="section-desc">We don't just install — we engineer solutions built to last a lifetime.</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1.5rem',
        }} className="why-grid">
          {cards.map((c, i) => (
            <WhyCard key={i} c={c} delay={`${i * 80}ms`} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) { .why-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px)  { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

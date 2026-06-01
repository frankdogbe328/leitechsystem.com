import { Award, Package, Users, HeartHandshake, Settings, BadgeDollarSign } from 'lucide-react'
import type { ReactNode } from 'react'

interface Card {
  icon: ReactNode
  title: string
  desc: string
  tag: string
  color: string
}

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
          gap: 1, background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.08)',
        }} className="why-grid">
          {cards.map((c, i) => (
            <div key={i} className={`why-card rev d${(i % 3) as 0 | 1 | 2}`} style={{
              background: '#0F1E35', padding: '2.5rem 2rem',
              position: 'relative', overflow: 'hidden',
              transition: 'background 0.3s',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#142642'
                const line = e.currentTarget.querySelector('.why-line') as HTMLElement
                if (line) line.style.transform = 'scaleX(1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0F1E35'
                const line = e.currentTarget.querySelector('.why-line') as HTMLElement
                if (line) line.style.transform = 'scaleX(0)'
              }}
            >
              <div className="why-line" style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
                transform: 'scaleX(0)', transition: 'transform 0.4s',
              }} />

              <div style={{
                width: 54, height: 54, borderRadius: 8,
                background: `${c.color}12`, border: `1px solid ${c.color}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c.color, marginBottom: '1.4rem',
              }}>{c.icon}</div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.7rem', lineHeight: 1.3 }}>{c.title}</h4>
              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.75, marginBottom: '1.1rem' }}>{c.desc}</p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.68rem', color: c.color, fontWeight: 600,
              }}>
                <span style={{ color: c.color }}>✓</span> {c.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) { .why-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: repeat(2,1fr) !important; }
          .why-card { padding: 1.8rem 1.4rem !important; }
        }
        @media (max-width: 480px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .why-card { padding: 1.6rem 1.2rem !important; }
        }
      `}</style>
    </section>
  )
}

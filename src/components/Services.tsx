import { Sun, Lock, Cpu, Radio } from 'lucide-react'
import type { ReactNode } from 'react'

interface ServiceCard {
  title: string
  desc: string
}

interface Category {
  icon: ReactNode
  label: string
  color: string
  services: ServiceCard[]
}

const categories: Category[] = [
  {
    icon: <Sun size={26} />, label: 'Solar Power Systems', color: '#F59E0B',
    services: [
      { title: 'Residential Solar', desc: 'Custom solar solutions for homes — reduce electricity bills and stay powered during outages.' },
      { title: 'Commercial & Industrial Solar', desc: 'Large-scale systems engineered for businesses, factories, and industrial facilities.' },
      { title: 'Hybrid & Off-Grid Systems', desc: 'Reliable off-grid and hybrid solutions for areas with unreliable grid power.' },
      { title: 'Solar Battery Storage', desc: 'Advanced battery storage to keep your property powered day and night from captured solar energy.' },
    ],
  },
  {
    icon: <Lock size={26} />, label: 'Security Infrastructure', color: '#0EA5E9',
    services: [
      { title: 'CCTV Surveillance', desc: 'Full-perimeter camera systems — HD, night-vision, and remote monitoring capabilities.' },
      { title: 'Electric Fence', desc: 'High-performance fencing for maximum perimeter security on any property type.' },
      { title: 'Access Control', desc: 'Biometric, keycard, and PIN-based systems ensuring only authorised personnel gain entry.' },
      { title: 'Intercom Systems', desc: 'Audio and video intercom solutions for homes, offices, and gated properties.' },
    ],
  },
  {
    icon: <Cpu size={26} />, label: 'Smart Infrastructure', color: '#10B981',
    services: [
      { title: 'Smart Home Automation', desc: 'Control lighting, appliances, security, and climate from a single smart interface.' },
      { title: 'Remote Energy Monitoring', desc: 'Real-time monitoring of your solar and energy systems from anywhere in the world.' },
      { title: 'Smart Security Integration', desc: 'Combine CCTV, access control, and alarm systems into one intelligent platform.' },
    ],
  },
  {
    icon: <Radio size={26} />, label: 'Communications Infrastructure', color: '#A78BFA',
    services: [
      { title: 'HF/VHF Radio Installation', desc: 'Professional radio systems for reliable communications in any environment.' },
      { title: 'Telecommunications Infrastructure', desc: 'Full telecom support — cabling, networking, and signal systems.' },
      { title: 'Network & Signal Systems', desc: 'Structured network installations and signal optimization for homes and enterprises.' },
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header rev">
          <div>
            <div className="eyebrow">What We Offer</div>
            <h2 className="section-title">Our Core <em>Solutions</em></h2>
          </div>
          <p className="section-desc">
            Residential, commercial &amp; institutional technology solutions engineered to last.
          </p>
        </div>

        <div className="svc-categories" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {categories.map((cat, ci) => (
            <div key={ci} className="rev">
              {/* Category header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 6,
                  background: `${cat.color}14`,
                  border: `1px solid ${cat.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cat.color, flexShrink: 0,
                }}>{cat.icon}</div>
                <div className="svc-cat-label" style={{ fontWeight: 700, fontSize: '1.3rem' }}>{cat.label}</div>
                <div style={{
                  flex: 1, height: 1,
                  background: `linear-gradient(90deg, ${cat.color}33, transparent)`,
                }} />
              </div>

              {/* Cards grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cat.services.length === 3 ? 3 : 4}, 1fr)`,
                gap: 1, background: 'rgba(14,165,233,0.06)',
                border: '1px solid rgba(14,165,233,0.08)',
              }} className="svc-row">
                {cat.services.map((s, si) => (
                  <div key={si} className="svc-card" style={{
                    background: '#0F1E35', padding: '1.8rem 1.6rem',
                    position: 'relative', overflow: 'hidden',
                    transition: 'background 0.3s',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#142642'
                      const line = e.currentTarget.querySelector('.svc-line') as HTMLElement
                      if (line) line.style.transform = 'scaleX(1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#0F1E35'
                      const line = e.currentTarget.querySelector('.svc-line') as HTMLElement
                      if (line) line.style.transform = 'scaleX(0)'
                    }}
                  >
                    <div className="svc-line" style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
                      transform: 'scaleX(0)', transition: 'transform 0.4s',
                    }} />
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: cat.color, opacity: 0.7, marginBottom: '1rem',
                    }} />
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.6rem', lineHeight: 1.3 }}>{s.title}</h4>
                    <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .svc-row { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) {
          .svc-categories { gap: 2.5rem !important; }
          .svc-cat-label { font-size: 1.05rem !important; }
          .svc-card { padding: 1.4rem 1.2rem !important; }
        }
        @media (max-width: 480px) {
          .svc-row { grid-template-columns: 1fr !important; }
          .svc-cat-label { font-size: 1rem !important; }
        }
      `}</style>
    </section>
  )
}

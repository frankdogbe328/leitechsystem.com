import { useState } from 'react'
import { Sun, Lock, Cpu, Radio } from 'lucide-react'
import type { ReactNode } from 'react'

interface ServiceCard { title: string; desc: string }
interface Category { icon: ReactNode; label: string; color: string; services: ServiceCard[] }

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

function SvcCard({ s, color }: { s: ServiceCard; color: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="svc-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(20,38,66,0.95)' : 'rgba(15,30,53,0.85)',
        border: `1px solid ${hovered ? color + '44' : 'rgba(14,165,233,0.12)'}`,
        borderRadius: 16,
        padding: '2rem 1.8rem',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px ${color}22, 0 4px 20px ${color}18`
          : '0 4px 24px rgba(0,0,0,0.28), 0 1px 2px rgba(0,0,0,0.18)',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'default',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 100, height: 100, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s',
        pointerEvents: 'none',
      }} />

      {/* Icon dot */}
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${color}18`, border: `1px solid ${color}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.2rem',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      </div>

      <h4 style={{
        fontSize: '0.95rem', fontWeight: 700,
        marginBottom: '0.65rem', lineHeight: 1.3,
        color: hovered ? '#F1F5F9' : '#E2E8F0',
        transition: 'color 0.25s',
      }}>{s.title}</h4>
      <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.7 }}>{s.desc}</p>
    </div>
  )
}

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${cat.color}14`, border: `1px solid ${cat.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cat.color, flexShrink: 0,
                  boxShadow: `0 0 20px ${cat.color}18`,
                }}>{cat.icon}</div>
                <div className="svc-cat-label" style={{ fontWeight: 700, fontSize: '1.3rem' }}>{cat.label}</div>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${cat.color}33, transparent)` }} />
              </div>

              {/* Cards grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cat.services.length === 3 ? 3 : 4}, 1fr)`,
                gap: '1.25rem',
              }} className="svc-row">
                {cat.services.map((s, si) => (
                  <SvcCard key={si} s={s} color={cat.color} />
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
        }
        @media (max-width: 480px) {
          .svc-row { grid-template-columns: 1fr !important; }
          .svc-cat-label { font-size: 1rem !important; }
        }
      `}</style>
    </section>
  )
}

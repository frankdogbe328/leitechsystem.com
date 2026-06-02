import { useState } from 'react'
import { Sun, Lock, Cpu, Radio, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface ServiceItem { title: string; desc: string }
interface Category { icon: ReactNode; label: string; color: string; bg: string; services: ServiceItem[] }

const categories: Category[] = [
  {
    icon: <Sun size={28} />, label: 'Solar Power Systems', color: '#F59E0B', bg: '/images/sl.jpeg',
    services: [
      { title: 'Residential Solar', desc: 'Custom solar solutions for homes — reduce bills and stay powered during outages.' },
      { title: 'Commercial & Industrial Solar', desc: 'Large-scale systems for businesses, factories, and industrial facilities.' },
      { title: 'Hybrid & Off-Grid Systems', desc: 'Reliable off-grid and hybrid solutions for areas with unreliable grid power.' },
      { title: 'Solar Battery Storage', desc: 'Advanced battery storage to keep your property powered day and night.' },
    ],
  },
  {
    icon: <Lock size={28} />, label: 'Security Infrastructure', color: '#0EA5E9', bg: '/images/si.jpeg',
    services: [
      { title: 'CCTV Surveillance', desc: 'Full-perimeter HD camera systems with night-vision and remote monitoring.' },
      { title: 'Electric Fence', desc: 'High-performance fencing for maximum perimeter security on any property.' },
      { title: 'Access Control', desc: 'Biometric, keycard, and PIN-based systems for authorised entry only.' },
      { title: 'Intercom Systems', desc: 'Audio and video intercom for homes, offices, and gated properties.' },
    ],
  },
  {
    icon: <Cpu size={28} />, label: 'Smart Infrastructure', color: '#10B981', bg: '/images/ci.jpeg',
    services: [
      { title: 'Smart Home Automation', desc: 'Control lighting, appliances, security, and climate from one interface.' },
      { title: 'Remote Energy Monitoring', desc: 'Real-time monitoring of your solar and energy systems from anywhere.' },
      { title: 'Smart Security Integration', desc: 'Combine CCTV, access control, and alarms into one intelligent platform.' },
    ],
  },
  {
    icon: <Radio size={28} />, label: 'Communications Infrastructure', color: '#A78BFA', bg: '/images/sh.jpeg',
    services: [
      { title: 'HF/VHF Radio Installation', desc: 'Professional radio systems for reliable comms in any environment.' },
      { title: 'Telecommunications Infrastructure', desc: 'Full telecom support — cabling, networking, and signal systems.' },
      { title: 'Network & Signal Systems', desc: 'Structured installations and signal optimization for homes and enterprises.' },
    ],
  },
]

function CatCard({ cat, delay }: { cat: Category; delay: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="cat-card rev"
      style={{ animationDelay: delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        backgroundImage: hovered
          ? `linear-gradient(160deg, rgba(5,12,25,0.60) 0%, rgba(8,18,38,0.78) 100%), url('${cat.bg}')`
          : `linear-gradient(160deg, rgba(5,12,25,0.70) 0%, rgba(8,18,38,0.82) 100%), url('${cat.bg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: `1px solid ${hovered ? cat.color + '55' : 'rgba(14,165,233,0.12)'}`,
        borderRadius: 20,
        padding: '2.4rem 2.2rem',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px ${cat.color}30, 0 8px 40px ${cat.color}20`
          : '0 6px 32px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.18)',
        transition: 'all 0.38s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'default',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${cat.color}00, ${cat.color}, ${cat.color}00)`,
          opacity: hovered ? 1 : 0.35,
          transition: 'opacity 0.35s',
          borderRadius: '20px 20px 0 0',
        }} />

        {/* Corner glow */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${cat.color}18 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
          pointerEvents: 'none',
        }} />

        {/* Icon */}
        <div style={{
          width: 58, height: 58, borderRadius: 14,
          background: hovered ? `${cat.color}22` : `${cat.color}14`,
          border: `1px solid ${hovered ? cat.color + '55' : cat.color + '28'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: cat.color, marginBottom: '1.4rem', flexShrink: 0,
          boxShadow: hovered ? `0 0 28px ${cat.color}35` : 'none',
          transition: 'all 0.35s',
        }}>{cat.icon}</div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.12rem', fontWeight: 700,
          marginBottom: '1.5rem', lineHeight: 1.3,
          color: hovered ? '#F1F5F9' : '#E2E8F0',
          transition: 'color 0.25s',
        }}>{cat.label}</h3>

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: '1.5rem',
          background: `linear-gradient(90deg, ${cat.color}44, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s',
        }} />

        {/* Service list */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          {cat.services.map((s, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <ChevronRight
                size={14}
                style={{
                  color: cat.color, flexShrink: 0, marginTop: '0.22rem',
                  opacity: hovered ? 1 : 0.6, transition: 'opacity 0.25s',
                }}
              />
              <div>
                <div style={{
                  fontSize: '0.85rem', fontWeight: 600,
                  color: hovered ? '#CBD5E1' : '#94A3B8',
                  marginBottom: '0.2rem', lineHeight: 1.3,
                  transition: 'color 0.25s',
                }}>{s.title}</div>
                <div style={{ fontSize: '0.73rem', color: hovered ? '#CBD5E1' : '#94A3B8', lineHeight: 1.65, transition: 'color 0.25s' }}>{s.desc}</div>
              </div>
            </li>
          ))}
        </ul>

      </div>
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

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
          gap: '1.5rem',
        }} className="cat-grid">
          {categories.map((cat, i) => (
            <CatCard key={i} cat={cat} delay={`${i * 80}ms`} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .cat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

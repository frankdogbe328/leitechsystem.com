import { useState } from 'react'
import { Building2, GraduationCap, Shield, Factory, Sun, Lock, Radio, Users } from 'lucide-react'

const clients = [
  { icon: <Building2 size={20} color="#0EA5E9" />, label: 'Government Ministries & Agencies' },
  { icon: <GraduationCap size={20} color="#F59E0B" />, label: 'Educational Institutions' },
  { icon: <Shield size={20} color="#10B981" />, label: 'Military & Security Agencies' },
  { icon: <Factory size={20} color="#A78BFA" />, label: 'Industrial Facilities' },
]

const solutions = [
  {
    icon: <Sun size={22} />, color: '#F59E0B',
    title: 'Large-Scale Solar Deployment',
    desc: 'Full solar power systems for campuses, barracks, ministries, and industrial estates.',
  },
  {
    icon: <Lock size={22} />, color: '#0EA5E9',
    title: 'Security Infrastructure',
    desc: 'CCTV, electric fencing, and access control for institutional perimeters.',
  },
  {
    icon: <Radio size={22} />, color: '#A78BFA',
    title: 'Telecommunications Installations',
    desc: 'HF/VHF radio, network infrastructure, and signal systems for government and military use.',
  },
  {
    icon: <Users size={22} />, color: '#10B981',
    title: 'Technical Training Programs',
    desc: 'Hands-on training for in-house teams to operate and maintain installed systems.',
  },
]

function SolutionCard({ s }: { s: typeof solutions[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(20,38,66,0.98)' : 'rgba(15,30,53,0.88)',
        border: `1px solid ${hovered ? s.color + '55' : 'rgba(14,165,233,0.12)'}`,
        borderRadius: 16,
        padding: '1.6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(14px)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px ${s.color}28, 0 6px 28px ${s.color}1a`
          : '0 4px 24px rgba(0,0,0,0.28), 0 1px 2px rgba(0,0,0,0.18)',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'default',
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${s.color}00, ${s.color}, ${s.color}00)`,
        opacity: hovered ? 1 : 0.3,
        transition: 'opacity 0.35s',
        borderRadius: '16px 16px 0 0',
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 120, height: 120, borderRadius: '50%',
        background: `radial-gradient(circle, ${s.color}1a 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 11,
        background: hovered ? `${s.color}22` : `${s.color}14`,
        border: `1px solid ${hovered ? s.color + '50' : s.color + '28'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: s.color, marginBottom: '1.1rem',
        boxShadow: hovered ? `0 0 20px ${s.color}30` : 'none',
        transition: 'all 0.35s',
      }}>{s.icon}</div>

      <h4 style={{
        fontSize: '0.88rem', fontWeight: 700,
        marginBottom: '0.55rem', lineHeight: 1.35,
        color: hovered ? '#F1F5F9' : '#E2E8F0',
        transition: 'color 0.25s',
      }}>{s.title}</h4>
      <p style={{
        fontSize: '0.75rem', color: '#475569', lineHeight: 1.7,
      }}>{s.desc}</p>
    </div>
  )
}

export default function Government() {
  return (
    <section id="government" className="section section--alt" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%)',
      }} />

      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '5rem', alignItems: 'center',
        }} className="govt-grid">

          {/* Left — text + clients */}
          <div className="rev">
            <div className="eyebrow">Public Sector & Institutions</div>
            <h2 className="section-title" style={{ marginBottom: '1.2rem' }}>
              Government & <em>Institutions</em>
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              LEITECH SYSTEMS SOLUTION provides specialized energy and infrastructure solutions
              for public sector clients. We understand the unique requirements of institutional
              environments and deliver reliable, scalable, fully-documented systems.
            </p>

            <div>
              {clients.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(14,165,233,0.08)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{c.icon}</div>
                  <span style={{ fontSize: '0.87rem', color: '#94A3B8' }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — modal cards grid */}
          <div className="rev d2">
            <div style={{
              fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.18em',
              color: '#38BDF8', fontWeight: 600, marginBottom: '1.25rem',
            }}>Institutional Solutions</div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }} className="govt-cards">
              {solutions.map((s, i) => <SolutionCard key={i} s={s} />)}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .govt-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 768px) { .govt-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
        @media (max-width: 480px) { .govt-cards { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

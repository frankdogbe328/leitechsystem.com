import { Building2, GraduationCap, Shield, Factory } from 'lucide-react'

const clients = [
  { icon: <Building2 size={20} color="#0EA5E9" />, label: 'Government Ministries & Agencies' },
  { icon: <GraduationCap size={20} color="#F59E0B" />, label: 'Educational Institutions' },
  { icon: <Shield size={20} color="#10B981" />, label: 'Military & Security Agencies' },
  { icon: <Factory size={20} color="#A78BFA" />, label: 'Industrial Facilities' },
]

const solutions = [
  {
    title: 'Large-Scale Solar Deployment',
    desc: 'Full solar power systems for campuses, barracks, ministries, and industrial estates.',
  },
  {
    title: 'Security Infrastructure',
    desc: 'CCTV, electric fencing, and access control for institutional perimeters.',
  },
  {
    title: 'Telecommunications Installations',
    desc: 'HF/VHF radio, network infrastructure, and signal systems for government and military use.',
  },
  {
    title: 'Technical Training Programs',
    desc: 'Hands-on training for in-house teams to operate and maintain installed systems.',
  },
]

export default function Government() {
  return (
    <section id="government" className="section section--alt" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Blue ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%)',
      }} />

      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '5rem', alignItems: 'center',
        }} className="govt-grid">
          {/* Text */}
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
                    width: 40, height: 40, borderRadius: 6,
                    background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{c.icon}</div>
                  <span style={{ fontSize: '0.87rem', color: '#94A3B8' }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions box */}
          <div className="rev d2">
            <div className="govt-card" style={{
              background: 'rgba(12,26,46,0.8)',
              border: '1px solid rgba(14,165,233,0.2)',
              padding: '2.5rem', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #0EA5E9, #38BDF8, transparent)',
              }} />

              <h3 style={{
                fontWeight: 700, fontSize: '1.3rem',
                color: '#38BDF8', marginBottom: '1.8rem',
              }}>Institutional Solutions</h3>

              {solutions.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: i < solutions.length - 1 ? '1px solid rgba(14,165,233,0.08)' : 'none',
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#0EA5E9', flexShrink: 0, marginTop: '0.35rem',
                  }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '0.25rem' }}>{s.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .govt-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 768px) {
          .govt-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .govt-card { padding: 1.8rem !important; }
        }
        @media (max-width: 480px) {
          .govt-card { padding: 1.4rem !important; }
        }
      `}</style>
    </section>
  )
}

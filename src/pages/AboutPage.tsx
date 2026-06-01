import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sun, Shield, Home, Radio, Target, Eye, Award } from 'lucide-react'
import StatNumber from '../components/StatNumber'

const bullets = [
  'Solar power design and installation',
  'CCTV surveillance systems',
  'Electric fencing and perimeter protection',
  'Access control & smart building systems',
  'Telecommunications infrastructure support',
]

const badges = [
  { icon: <Sun size={22} color="#F59E0B" />, label: 'Solar Energy' },
  { icon: <Shield size={22} color="#0EA5E9" />, label: 'Security' },
  { icon: <Home size={22} color="#10B981" />, label: 'Smart Home' },
  { icon: <Radio size={22} color="#F59E0B" />, label: 'Comms' },
]

const tags = ['Residential', 'Commercial', 'Government', 'Industrial']

const pillars = [
  { icon: <Target size={24} color="#F59E0B" />, title: 'Our Mission', color: '#F59E0B', desc: 'To deliver reliable, innovative energy and security systems that protect and empower communities across Ghana and West Africa.' },
  { icon: <Eye size={24} color="#0EA5E9" />, title: 'Our Vision', color: '#0EA5E9', desc: 'To be the leading systems integration company in West Africa — synonymous with quality, trust, and technological excellence.' },
  { icon: <Award size={24} color="#10B981" />, title: 'Our Values', color: '#10B981', desc: 'Integrity, craftsmanship, and long-term partnerships. We treat every client\'s property as our own — no shortcuts, ever.' },
]

const stats = [
  { n: '5+', l: 'Years in Operation' },
  { n: '8+', l: 'Service Areas' },
  { n: '24/7', l: 'Support Available' },
  { n: '100%', l: 'Client Satisfaction' },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter">
      {/* Page hero */}
      <section className="page-hero">
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(14,165,233,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,0.03) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',
        }} />
        <div className="container">
          <div className="eyebrow">Who We Are</div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 800, lineHeight: 1.05, maxWidth: 700 }}>
            About{' '}
            <span style={{ background: 'linear-gradient(90deg,#F59E0B,#38BDF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Leitech
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(0.85rem,2.5vw,1rem)', color: '#94A3B8', maxWidth: 580, lineHeight: 1.8, marginTop: '1rem' }}>
            Ghana-based engineering and technology company specializing in renewable energy,
            security infrastructure, and intelligent systems.
          </p>
        </div>
      </section>

      {/* Company overview */}
      <section className="section section--alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="ab-grid">
            <div className="rev">
              <div className="eyebrow">Our Story</div>
              <h2 className="section-title" style={{ marginBottom: '1.2rem' }}>Built on <em>Expertise</em></h2>
              <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.85, marginBottom: '1.8rem' }}>
                LEITECH SYSTEMS SOLUTION was founded with one goal: to bring world-class energy and
                security technology to Ghana and West Africa. Over 5+ years we have grown into a trusted
                partner for homes, businesses, military institutions, and government agencies.
              </p>
              <div style={{ marginBottom: '2rem' }}>
                {bullets.map((b, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'0.85rem 0', borderBottom:'1px solid rgba(14,165,233,0.08)' }}>
                    <div style={{ width:24, height:24, borderRadius:'50%', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:'#F59E0B' }} />
                    </div>
                    <span style={{ fontSize:'0.87rem', color:'#94A3B8' }}>{b}</span>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'0.15em', color:'#475569', marginBottom:'0.8rem' }}>Solutions For</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                  {tags.map((t) => (
                    <span key={t} style={{ padding:'0.35rem 1rem', fontSize:'0.65rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', border:'1px solid rgba(14,165,233,0.18)', color:'#94A3B8', background:'rgba(14,165,233,0.04)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rev d2">
              <div className="ab-card" style={{ background:'rgba(12,26,46,0.8)', border:'1px solid rgba(245,158,11,0.2)', padding:'2.5rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#F59E0B,#0EA5E9,transparent)' }} />
                <div style={{ fontSize:'1.4rem', fontWeight:800, marginBottom:'0.3rem', letterSpacing:'0.04em' }}>
                  <span style={{ color:'#F1F5F9' }}>LEI</span>
                  <span style={{ background:'linear-gradient(90deg,#F59E0B,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>TECH</span>
                  <span style={{ color:'#F1F5F9' }}> SYSTEMS</span>
                </div>
                <div style={{ fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.18em', color:'#F59E0B', marginBottom:'2rem' }}>Inspire · Innovate · Secure</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'2rem' }}>
                  {badges.map((b) => (
                    <div key={b.label} style={{ background:'rgba(14,165,233,0.04)', border:'1px solid rgba(14,165,233,0.1)', padding:'1.2rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.6rem', textAlign:'center' }}>
                      {b.icon}
                      <span style={{ fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.1em', color:'#475569' }}>{b.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding:'1.2rem', background:'rgba(14,165,233,0.04)', border:'1px solid rgba(14,165,233,0.1)' }}>
                  <div style={{ fontSize:'0.56rem', textTransform:'uppercase', letterSpacing:'0.14em', color:'#475569', marginBottom:'0.4rem' }}>Base of Operations</div>
                  <div style={{ fontSize:'0.85rem', color:'#94A3B8', fontWeight:500 }}>Block H, Medolines, Burma Camp, Accra</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section">
        <div className="container">
          <div className="section-header rev">
            <div>
              <div className="eyebrow">Our Foundation</div>
              <h2 className="section-title">Mission, Vision & <em>Values</em></h2>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }} className="pillars-grid">
            {pillars.map((p, i) => (
              <div key={i} className={`pillar-card rev d${i as 0|1|2}`} style={{ background:'#0F1E35', border:`1px solid ${p.color}22`, padding:'2.5rem', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${p.color},transparent)` }} />
                <div style={{ width:52, height:52, borderRadius:8, background:`${p.color}12`, border:`1px solid ${p.color}28`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.4rem' }}>{p.icon}</div>
                <h4 style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:'0.8rem', color:p.color }}>{p.title}</h4>
                <p style={{ fontSize:'0.88rem', color:'#94A3B8', lineHeight:1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background:'var(--bg2)', borderTop:'1px solid rgba(14,165,233,0.1)', borderBottom:'1px solid rgba(14,165,233,0.1)' }}>
        <div className="container">
          <div className="stats-bar" style={{ display:'flex', justifyContent:'center', flexWrap:'wrap' }}>
            {stats.map((s, i) => (
              <div key={i} className="rev" style={{ padding:'2.5rem 3rem', textAlign:'center', flex:1, minWidth:160, borderRight: i < stats.length-1 ? '1px solid rgba(14,165,233,0.1)' : 'none' }}>
                <StatNumber
                  value={s.n}
                  delay={200}
                  style={{ fontSize:'clamp(2rem,3vw,3rem)', fontWeight:800, background:'linear-gradient(135deg,#F59E0B,#FCD34D)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1, marginBottom:'0.4rem' }}
                />
                <div style={{ fontSize:'0.6rem', textTransform:'uppercase', letterSpacing:'0.14em', color:'#475569' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign:'center' }}>
          <div className="rev">
            <h2 className="section-title" style={{ marginBottom:'1rem' }}>Work With <em>Us</em></h2>
            <p style={{ fontSize:'0.95rem', color:'#94A3B8', maxWidth:480, margin:'0 auto 2rem', lineHeight:1.8 }}>Ready to experience the Leitech difference? Reach out for a consultation.</p>
            <button onClick={() => navigate('/contact')} className="btn btn-primary">Get a Quote <ArrowRight size={14} /></button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width:900px) {
          .ab-grid { grid-template-columns:1fr !important; gap:3rem !important; }
          .pillars-grid { grid-template-columns:repeat(2,1fr) !important; gap:1rem !important; }
        }
        @media (max-width:768px) {
          .ab-grid { grid-template-columns:1fr !important; gap:2.5rem !important; }
          .ab-card { padding:1.8rem !important; }
          .pillars-grid { grid-template-columns:repeat(2,1fr) !important; gap:1rem !important; }
          .pillar-card { padding:1.8rem !important; }
          .stats-bar > div { padding:1.8rem 1.5rem !important; border-right:none !important; border-bottom:1px solid rgba(14,165,233,0.1); }
          .stats-bar > div:last-child { border-bottom:none; }
        }
        @media (max-width:480px) {
          .ab-card { padding:1.4rem !important; }
          .pillars-grid { grid-template-columns:1fr !important; }
          .pillar-card { padding:1.4rem !important; }
        }
      `}</style>
    </div>
  )
}

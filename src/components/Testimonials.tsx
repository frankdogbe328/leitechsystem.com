import { useState } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    text: 'Leitech installed our solar and CCTV together. Excellent workmanship — power bills dropped significantly and everything runs flawlessly.',
    name: 'Kwame A.',
    role: 'Business Owner, Accra',
    initial: 'K',
    color: '#F59E0B',
  },
  {
    text: 'Our off-grid solar has been flawless since day one. Leitech truly understands their craft — and the after-sales support is outstanding.',
    name: 'Abena M.',
    role: 'Homeowner, Tema',
    initial: 'A',
    color: '#0EA5E9',
  },
  {
    text: 'They handled our institutional solar and security installation professionally. Prompt, reliable, and the quality of work is second to none.',
    name: 'Emmanuel O.',
    role: 'Facilities Manager, Spintex',
    initial: 'E',
    color: '#10B981',
  },
]

function TestiCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`testi-card rev d${index as 0 | 1 | 2}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(20,38,66,0.98)' : 'rgba(15,30,53,0.88)',
        border: `1px solid ${hovered ? t.color + '55' : 'rgba(14,165,233,0.12)'}`,
        borderRadius: 20,
        padding: '2.4rem 2.2rem',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 70px rgba(0,0,0,0.45), 0 0 0 1px ${t.color}28, 0 8px 40px ${t.color}18`
          : '0 6px 32px rgba(0,0,0,0.28), 0 1px 3px rgba(0,0,0,0.18)',
        transition: 'all 0.38s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${t.color}00, ${t.color}, ${t.color}00)`,
        opacity: hovered ? 1 : 0.35,
        transition: 'opacity 0.35s',
        borderRadius: '20px 20px 0 0',
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute', bottom: -50, left: -50,
        width: 180, height: 180, borderRadius: '50%',
        background: `radial-gradient(circle, ${t.color}14 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      {/* Stars */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.4rem' }}>
        {[...Array(5)].map((_, si) => (
          <Star key={si} size={14} fill={t.color} color={t.color} />
        ))}
      </div>

      {/* Big quote */}
      <div style={{
        fontSize: '5rem', lineHeight: 0.7,
        color: t.color, opacity: hovered ? 0.18 : 0.1,
        marginBottom: '0.8rem',
        fontFamily: 'Georgia, serif', fontWeight: 700,
        transition: 'opacity 0.3s', userSelect: 'none',
      }}>"</div>

      <p className="testi-quote" style={{
        fontSize: '0.95rem', fontStyle: 'italic',
        color: hovered ? '#E2E8F0' : '#CBD5E1',
        lineHeight: 1.8, marginBottom: '2rem', flex: 1,
        transition: 'color 0.25s',
      }}>{t.text}</p>

      {/* Divider */}
      <div style={{
        height: 1, marginBottom: '1.4rem',
        background: `linear-gradient(90deg, ${t.color}33, transparent)`,
        opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s',
      }} />

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '1rem', color: '#050D1A', flexShrink: 0,
          boxShadow: hovered ? `0 0 16px ${t.color}40` : 'none',
          transition: 'box-shadow 0.35s',
        }}>{t.initial}</div>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F1F5F9' }}>{t.name}</div>
          <div style={{ fontSize: '0.65rem', color: '#475569', marginTop: '0.15rem', letterSpacing: '0.03em' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section-header rev">
          <div>
            <div className="eyebrow">Client Reviews</div>
            <h2 className="section-title">What Clients <em>Say</em></h2>
          </div>
          <p className="section-desc">Real feedback from clients across Ghana.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.75rem' }} className="testi-grid">
          {testimonials.map((t, i) => <TestiCard key={i} t={t} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .testi-grid { grid-template-columns: repeat(2,1fr) !important; gap: 1.25rem !important; } }
        @media (max-width: 560px) { .testi-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .testi-card { padding: 1.8rem 1.6rem !important; } .testi-quote { font-size: 0.88rem !important; } }
      `}</style>
    </section>
  )
}

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

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem',
        }} className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className={`testi-card rev d${i as 0 | 1 | 2}`} style={{
              background: '#0F1E35',
              border: '1px solid rgba(14,165,233,0.1)',
              padding: '2.2rem', position: 'relative', overflow: 'hidden',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${t.color}44`
                e.currentTarget.style.transform = 'translateY(-5px)'
                const line = e.currentTarget.querySelector('.t-line') as HTMLElement
                if (line) line.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(14,165,233,0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
                const line = e.currentTarget.querySelector('.t-line') as HTMLElement
                if (line) line.style.opacity = '0'
              }}
            >
              <div className="t-line" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
                opacity: 0, transition: 'opacity 0.3s',
              }} />

              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.2rem' }}>
                {[...Array(5)].map((_, si) => (
                  <Star key={si} size={13} fill={t.color} color={t.color} />
                ))}
              </div>

              {/* Big quote mark */}
              <div style={{
                fontSize: '4rem', lineHeight: 0.75, color: t.color, opacity: 0.12,
                marginBottom: '1rem', fontFamily: 'Georgia, serif', fontWeight: 700,
              }}>"</div>

              <p className="testi-quote" style={{
                fontSize: '0.95rem', fontStyle: 'italic', fontWeight: 400,
                color: '#E2E8F0', lineHeight: 1.75, marginBottom: '1.8rem',
              }}>{t.text}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '1rem', color: '#050D1A', flexShrink: 0,
                }}>{t.initial}</div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: '0.65rem', color: '#475569', marginTop: '0.1rem' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .testi-grid { grid-template-columns: repeat(2,1fr) !important; gap: 1rem !important; } }
        @media (max-width: 768px) { .testi-grid { grid-template-columns: repeat(2,1fr) !important; gap: 1rem !important; } }
        @media (max-width: 560px) { .testi-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) {
          .testi-card { padding: 1.6rem !important; }
          .testi-quote { font-size: 0.88rem !important; }
        }
      `}</style>
    </section>
  )
}

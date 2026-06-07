import { useState, useEffect, useCallback } from 'react'
import { Star, X, Send, Check } from 'lucide-react'

type ReviewItem = {
  text: string
  name: string
  role: string
  initial: string
  color: string
  stars: number
}

const COLORS = ['#F59E0B', '#0EA5E9', '#10B981', '#A78BFA']

const testimonials: ReviewItem[] = [
  {
    text: 'Since installing my solar system with LEITECH, power outages are no longer a concern. The system runs flawlessly, and my electricity bills have reduced significantly. Highly recommended.',
    name: 'Eric Tieku',
    role: 'Home Solar Installation',
    initial: 'ET',
    color: '#F59E0B',
    stars: 5,
  },
  {
    text: 'Professional service from start to finish. The team explained everything clearly, completed the installation on time, and the system has been performing excellently.',
    name: 'Rahman U.',
    role: 'Home Solar Installation',
    initial: 'RU',
    color: '#0EA5E9',
    stars: 5,
  },
  {
    text: 'LEITECH delivered exactly what they promised. My home now enjoys reliable power day and night, and the installation was neat and professional.',
    name: 'Taofic Mohammed',
    role: 'Home Solar Installation',
    initial: 'TM',
    color: '#10B981',
    stars: 5,
  },
  {
    text: 'Our energy costs have dropped considerably since partnering with LEITECH. Their commercial solar solution has improved our operational efficiency and reduced dependence on the grid.',
    name: 'Ultimate Farms Ltd.',
    role: 'Commercial Solar Installation',
    initial: 'UF',
    color: '#F59E0B',
    stars: 5,
  },
  {
    text: 'The CCTV system installed by LEITECH provides excellent coverage and image quality. I can now monitor my property with confidence wherever I am.',
    name: 'Derrick Gyasi',
    role: 'CCTV Surveillance System',
    initial: 'DG',
    color: '#0EA5E9',
    stars: 5,
  },
  {
    text: 'The smart home solution has transformed the way I interact with my home. Lighting, security, and automation are now at my fingertips. Excellent work by the LEITECH team.',
    name: 'Patricia Appia',
    role: 'Smart Home Automation',
    initial: 'PA',
    color: '#A78BFA',
    stars: 5,
  },
  {
    text: 'Security was my top priority, and LEITECH exceeded my expectations. The electric fence and alarm system work perfectly and give me complete peace of mind.',
    name: 'James Annor',
    role: 'Electric Fence & Alarm System',
    initial: 'JA',
    color: '#10B981',
    stars: 5,
  },
  {
    text: 'The installation was professional, fast, and well executed. I feel much safer knowing my property is protected by a reliable electric fence system.',
    name: 'Candice Agyemang',
    role: 'Electric Fence Installation',
    initial: 'CA',
    color: '#F59E0B',
    stars: 5,
  },
  {
    text: 'LEITECH provided an integrated solution that improved both our power reliability and communications infrastructure. Their technical expertise and support have been exceptional.',
    name: 'KOP Farms',
    role: 'Commercial Solar & VHF Communication System',
    initial: 'KF',
    color: '#A78BFA',
    stars: 5,
  },
]

function StarRow({ count, color }: { count: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.2rem' }}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} fill={i < count ? color : 'transparent'} color={color} />
      ))}
    </div>
  )
}

function TestiCard({ t, index }: { t: ReviewItem; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`testi-card rev d${(index % 3) as 0 | 1 | 2}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(20,38,66,0.98)' : 'rgba(15,30,53,0.88)',
        border: `1px solid ${hovered ? t.color + '55' : 'rgba(14,165,233,0.12)'}`,
        borderRadius: 20,
        padding: '2rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 70px rgba(0,0,0,0.45), 0 0 0 1px ${t.color}28, 0 8px 40px ${t.color}18`
          : '0 6px 32px rgba(0,0,0,0.28), 0 1px 3px rgba(0,0,0,0.18)',
        transition: 'all 0.38s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${t.color}00, ${t.color}, ${t.color}00)`,
        opacity: hovered ? 1 : 0.35,
        transition: 'opacity 0.35s',
        borderRadius: '20px 20px 0 0',
      }} />

      <div style={{
        position: 'absolute', bottom: -50, left: -50,
        width: 160, height: 160, borderRadius: '50%',
        background: `radial-gradient(circle, ${t.color}12 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      <StarRow count={t.stars} color={t.color} />

      <div className="testi-quote-mark" style={{
        fontSize: '4rem', lineHeight: 0.7, color: t.color,
        opacity: hovered ? 0.18 : 0.1, marginBottom: '0.6rem',
        fontFamily: 'Georgia, serif', fontWeight: 700,
        transition: 'opacity 0.3s', userSelect: 'none',
      }}>"</div>

      <p className="testi-quote" style={{
        fontSize: '0.88rem', fontStyle: 'italic',
        color: hovered ? '#E2E8F0' : '#CBD5E1',
        lineHeight: 1.75, marginBottom: '1.6rem', flex: 1,
        transition: 'color 0.25s',
      }}>{t.text}</p>

      <div style={{
        height: 1, marginBottom: '1.2rem',
        background: `linear-gradient(90deg, ${t.color}33, transparent)`,
        opacity: hovered ? 1 : 0.5, transition: 'opacity 0.3s',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '0.72rem', color: '#050D1A', flexShrink: 0,
          boxShadow: hovered ? `0 0 14px ${t.color}40` : 'none',
          transition: 'box-shadow 0.35s',
          letterSpacing: '0.02em',
        }}>{t.initial}</div>
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F1F5F9' }}>{t.name}</div>
          <div style={{ fontSize: '0.63rem', color: '#475569', marginTop: '0.1rem', letterSpacing: '0.03em' }}>{t.role}</div>
        </div>
      </div>
    </div>
  )
}

function ReviewModal({ onClose, onSubmitted }: { onClose: () => void; onSubmitted: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    if (url && key) {
      await fetch(`${url}/rest/v1/reviews`, {
        method: 'POST',
        headers: { 'apikey': key, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({ name, role, text, stars: rating }),
      }).catch(() => {})
    }
    setSubmitted(true)
    onSubmitted()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(5,13,26,0.88)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }} onClick={onClose}>
      <div style={{
        background: '#0F1E35', border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: 20, padding: '2.5rem', maxWidth: 480, width: '100%',
        position: 'relative', overflow: 'hidden',
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #F59E0B, #0EA5E9, transparent)',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F1F5F9' }}>Share Your Experience</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.2rem',
            }}>
              <Check size={24} color="#10B981" />
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '0.5rem' }}>Thank you for your review!</p>
            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.7 }}>We appreciate your feedback. It helps us serve our clients better.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Your Rating</label>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                {[1,2,3,4,5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(n)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
                  >
                    <Star
                      size={22}
                      fill={n <= (hoverRating || rating) ? '#F59E0B' : 'transparent'}
                      color="#F59E0B"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Your Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Kofi Mensah"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Service Received</label>
              <input
                required
                type="text"
                placeholder="e.g. Home Solar Installation"
                value={role}
                onChange={e => setRole(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <label style={labelStyle}>Your Review</label>
              <textarea
                required
                placeholder="Tell us about your experience with LEITECH..."
                rows={4}
                value={text}
                onChange={e => setText(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
              />
            </div>

            <button
              type="submit"
              disabled={rating === 0}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0.5rem', padding: '0.9rem',
                background: rating === 0 ? 'rgba(245,158,11,0.3)' : 'linear-gradient(90deg, #F59E0B, #D97706)',
                border: 'none', borderRadius: 10, color: '#050D1A',
                fontWeight: 700, fontSize: '0.8rem', cursor: rating === 0 ? 'not-allowed' : 'pointer',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                opacity: rating === 0 ? 0.6 : 1,
              }}
            >
              <Send size={14} /> Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.58rem', textTransform: 'uppercase',
  letterSpacing: '0.12em', color: '#475569', marginBottom: '0.4rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(14,165,233,0.12)', color: '#F1F5F9',
  padding: '0.75rem 1rem', fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontSize: '0.86rem', outline: 'none', borderRadius: 8,
  transition: 'border-color 0.25s', boxSizing: 'border-box',
}

export default function Testimonials() {
  const [reviewOpen, setReviewOpen] = useState(false)
  const [liveReviews, setLiveReviews] = useState<ReviewItem[]>([])

  const fetchReviews = useCallback(() => {
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    if (!url || !key) return
    fetch(`${url}/rest/v1/reviews?order=created_at.desc`, { headers: { 'apikey': key } })
      .then(r => r.json())
      .then((data: Array<{ name: string; role: string; text: string; stars: number }>) => {
        setLiveReviews(data.map((r, i) => ({
          text: r.text,
          name: r.name,
          role: r.role,
          initial: r.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase(),
          color: COLORS[i % COLORS.length],
          stars: r.stars,
        })))
      })
      .catch(() => {})
  }, [])

  useEffect(() => { fetchReviews() }, [fetchReviews])

  const allTestimonials = [...liveReviews, ...testimonials]

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section-header rev">
          <div>
            <div className="eyebrow">Client Reviews</div>
            <h2 className="section-title">What Clients <em>Say</em></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
            <p className="section-desc" style={{ textAlign: 'right' }}>Real feedback from clients across Ghana.</p>
            <button
              onClick={() => setReviewOpen(true)}
              className="btn btn-outline"
              style={{ fontSize: '0.72rem', padding: '0.65rem 1.4rem' }}
            >
              ⭐ Share Your Review
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }} className="testi-grid">
          {allTestimonials.map((t, i) => <TestiCard key={i} t={t} index={i} />)}
        </div>
      </div>

      {reviewOpen && (
        <ReviewModal
          onClose={() => setReviewOpen(false)}
          onSubmitted={fetchReviews}
        />
      )}

      <style>{`
        @media (max-width: 900px) { .testi-grid { grid-template-columns: repeat(2,1fr) !important; gap: 1.25rem !important; } }
        @media (max-width: 560px) { .testi-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .testi-card { padding: 1.6rem 1.4rem !important; } .testi-quote { font-size: 0.84rem !important; } .testi-quote-mark { font-size: 2.5rem !important; } }
      `}</style>
    </section>
  )
}

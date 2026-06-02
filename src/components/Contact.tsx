import { useState } from 'react'
import { Phone, Mail, MapPin, Music2, Send, Check } from 'lucide-react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

const contactItems = [
  {
    icon: <Phone size={18} color="#F59E0B" />,
    label: 'Ghana (WhatsApp)',
    value: '+233 508 096 108   |   +233 247 291 199',
    href: 'tel:+233508096108',
  },
  {
    icon: <Phone size={18} color="#38BDF8" />,
    label: 'Liberia',
    value: '+231 887 919 130',
    href: 'tel:+231887919130',
  },
  {
    icon: <Mail size={18} color="#0EA5E9" />,
    label: 'Email',
    value: 'leitech_systems@outlook.com',
    href: 'mailto:leitech_systems@outlook.com',
  },
  {
    icon: <MapPin size={18} color="#10B981" />,
    label: 'Address',
    value: '79 Fertilizer Road, Teshie Nungua Estate, Accra',
    href: undefined,
  },
  {
    icon: <Music2 size={18} color="#A78BFA" />,
    label: 'TikTok',
    value: '@leitech_systems_s',
    href: 'https://www.tiktok.com/@leitech_systems_s',
  },
  {
    icon: <FaFacebook size={18} color="#1877F2" />,
    label: 'Facebook',
    value: 'Leitech Systems Solution',
    href: 'https://www.facebook.com/share/1BRZRemdQz/',
  },
  {
    icon: <FaInstagram size={18} color="#E1306C" />,
    label: 'Instagram',
    value: '@leitechsystemssolution',
    href: 'https://www.instagram.com/leitechsystemssolution',
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header rev">
          <div>
            <div className="eyebrow">Reach Us</div>
            <h2 className="section-title">Get In <em>Touch</em></h2>
          </div>
          <p className="section-desc">Ready to power up, secure, or automate your property? Let's talk.</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '5rem',
        }} className="contact-grid">
          {/* Left: info */}
          <div className="rev">
            <h3 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 700, marginBottom: '0.8rem', lineHeight: 1.2 }}>
              Request a Consultation<br />or Quote
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Whether you need a solar system, security installation, or expert advice — our
              team is ready to help anywhere in Ghana and West Africa.
            </p>

            {contactItems.map((c, i) => {
              const Wrapper = c.href ? 'a' : 'div'
              return (
                <Wrapper key={i}
                  {...(c.href ? { href: c.href, target: c.href.startsWith('http') ? '_blank' : undefined, rel: c.href.startsWith('http') ? 'noopener noreferrer' : undefined } : {})}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1rem 0',
                    borderBottom: '1px solid rgba(14,165,233,0.08)',
                    ...(i === 0 ? { borderTop: '1px solid rgba(14,165,233,0.08)' } : {}),
                    textDecoration: 'none', color: 'inherit', transition: 'color 0.25s',
                    cursor: c.href ? 'pointer' : 'default',
                  }}
                  onMouseEnter={c.href ? (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = '#F59E0B' } : undefined}
                  onMouseLeave={c.href ? (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.color = '#F1F5F9' } : undefined}
                >
                  <div style={{
                    width: 42, height: 42, flexShrink: 0,
                    background: 'rgba(14,165,233,0.05)',
                    border: '1px solid rgba(14,165,233,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.25s, background 0.25s',
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.56rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', marginBottom: '0.15rem' }}>{c.label}</div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 500 }}>{c.value}</div>
                  </div>
                </Wrapper>
              )
            })}
          </div>

          {/* Right: form */}
          <div className="rev d2">
            <div className="contact-form-card" style={{
              background: '#0F1E35', border: '1px solid rgba(245,158,11,0.18)',
              padding: '2.5rem', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #F59E0B, #0EA5E9, transparent)',
              }} />

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="f-row">
                  {[
                    { label: 'Full Name', placeholder: 'e.g. Kofi Mensah', type: 'text' },
                    { label: 'Phone / Email', placeholder: '0XX XXX XXXX or email', type: 'text' },
                  ].map((f) => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', marginBottom: '0.4rem' }}>{f.label}</label>
                      <input required type={f.type} placeholder={f.placeholder} style={inputStyle} />
                    </div>
                  ))}
                </div>

                {[
                  {
                    label: 'Client Type',
                    type: 'select',
                    options: ['Residential', 'Commercial Enterprise', 'Government / Institution', 'Industrial Facility'],
                  },
                  {
                    label: 'Service Required',
                    type: 'select',
                    options: [
                      'Residential Solar', 'Commercial / Industrial Solar', 'Hybrid / Off-Grid Solar',
                      'Solar Battery Storage', 'CCTV Surveillance', 'Electric Fence',
                      'Access Control', 'Intercom Systems', 'Smart Home Automation',
                      'Communications Infrastructure', 'Multiple Services / Consultation',
                    ],
                  },
                ].map((f) => (
                  <div key={f.label} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', marginBottom: '0.4rem' }}>{f.label}</label>
                    <select required style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select...</option>
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#475569', marginBottom: '0.4rem' }}>Message</label>
                  <textarea required placeholder="Describe your project, location, and requirements..." style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.72rem' }}>
                  {sent ? <><Check size={16} /> Message Sent!</> : <><Send size={14} /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Google Map ── */}
        <div style={{ marginTop: '4rem' }} className="rev">
          <div style={{
            fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.18em',
            color: '#F59E0B', marginBottom: '1rem',
          }}>
            Find Us
          </div>
          <div style={{
            position: 'relative', overflow: 'hidden',
            border: '1px solid rgba(14,165,233,0.18)',
            background: '#0F1E35',
          }}>
            {/* gradient top bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 1,
              background: 'linear-gradient(90deg, transparent, #F59E0B, #0EA5E9, transparent)',
            }} />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3970.742488075416!2d-0.10546599999999999!3d5.605004999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMzYnMTguMCJOIDDCsDA2JzE5LjciVw!5e0!3m2!1sen!2sgh!4v1780425805599!5m2!1sen!2sgh"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Leitech Systems Solution — 79 Fertilizer Road, Teshie Nungua Estate, Accra"
            />
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 768px) {
          .contact-grid { gap: 2.5rem !important; }
          .contact-form-card { padding: 1.8rem !important; }
          .f-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-form-card { padding: 1.4rem !important; }
          .f-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(14,165,233,0.12)',
  color: '#F1F5F9',
  padding: '0.78rem 1rem',
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontSize: '0.86rem',
  outline: 'none',
  transition: 'border-color 0.25s',
}

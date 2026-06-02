import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'

const services = [
  'Solar Power Systems', 'CCTV Surveillance', 'Electric Fence',
  'Access Control', 'Smart Home', 'Communications',
]

const contact = [
  { label: '+233 508 096 108 (Ghana)', href: 'tel:+233508096108' },
  { label: '+233 247 291 199 (Ghana)', href: 'tel:+233247291199' },
  { label: '+231 887 919 130 (Liberia)', href: 'tel:+231887919130' },
  { label: 'leitech_systems@outlook.com', href: 'mailto:leitech_systems@outlook.com' },
  { label: '79 Fertilizer Road, Teshie Nungua Estate, Accra', href: undefined },
  { label: '@leitech_systems_s (TikTok)', href: 'https://www.tiktok.com/@leitech_systems_s' },
  { label: 'Leitech Systems Solution (Facebook)', href: 'https://www.facebook.com/share/1BRZRemdQz/' },
  { label: '@leitech_systems_s (Instagram)', href: 'https://www.instagram.com/leitechsystemssolution' },
]

export default function Footer() {
  return (
    <footer style={{
      background: '#071422',
      borderTop: '1px solid rgba(14,165,233,0.14)',
    }}>
      <div className="footer-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 3rem 2rem' }}>
        {/* Top grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr',
          gap: '3rem', marginBottom: '3rem',
        }} className="footer-top">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '0.75rem' }}>
              <img
                src="/logo6.png"
                alt="Leitech Systems Solution"
                style={{ height: 52, width: 'auto', maxWidth: 180, objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div style={{ fontSize: '0.56rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#F59E0B', marginBottom: '1rem' }}>
              Inspire · Innovate · Secure
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.75, maxWidth: 300 }}>
              Ghana-based engineering and technology company delivering solar, security,
              and smart infrastructure across Ghana and West Africa.
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#F59E0B', marginBottom: '1.2rem' }}>Services</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" style={{
                    fontSize: '0.78rem', color: '#475569', textDecoration: 'none', transition: 'color 0.2s',
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F1F5F9')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
                  >{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#0EA5E9', marginBottom: '1.2rem' }}>Contact</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {contact.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: '0.78rem', color: '#475569', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#F1F5F9')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
                    >{c.label}</a>
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: '#475569' }}>{c.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '2rem', borderTop: '1px solid rgba(14,165,233,0.08)',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <p style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              © 2026 Leitech Systems Solution · All Rights Reserved · Teshie Nungua Estate, Accra
            </p>
            <p style={{ fontSize: '0.55rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Powered by{' '}
              <span style={{ background: 'linear-gradient(90deg,#F59E0B,#0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>
                Softvara
              </span>
            </p>
          </div>
          <div className="footer-social" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            {[
              { icon: <FaTiktok size={16} />, label: 'TikTok', href: 'https://www.tiktok.com/@leitech_systems_s' },
              { icon: <FaFacebook size={16} color="#1877F2" />, label: 'Facebook', href: 'https://www.facebook.com/share/1BRZRemdQz/' },
              { icon: <FaInstagram size={16} color="#E1306C" />, label: 'Instagram', href: 'https://www.instagram.com/leitechsystemssolution' },
            ].map((s) => (
              <a key={s.label} href={s.href}
                target="_blank" rel="noopener noreferrer"
                title={s.label}
                style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
              >{s.icon}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-top { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media (max-width: 768px) {
          .footer-inner { padding: 3rem 1.25rem 1.5rem !important; }
          .footer-top { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 0.75rem !important; }
        }
        @media (max-width: 480px) {
          .footer-inner { padding: 2.5rem 1rem 1.5rem !important; }
          .footer-top { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .footer-bottom { align-items: flex-start !important; }
          .footer-social { flex-wrap: wrap !important; gap: 1rem !important; }
        }
      `}</style>
    </footer>
  )
}

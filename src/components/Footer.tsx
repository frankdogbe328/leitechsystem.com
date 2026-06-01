import { Zap } from 'lucide-react'

const services = [
  'Solar Power Systems', 'CCTV Surveillance', 'Electric Fence',
  'Access Control', 'Smart Home', 'Communications',
]

const contact = [
  { label: '0508 096 108', href: 'tel:0508096108' },
  { label: '0247 291 199', href: 'tel:0247291199' },
  { label: 'leitech_systems@outlook.com', href: 'mailto:leitech_systems@outlook.com' },
  { label: 'Block H, Medolines, Burma Camp, Accra', href: undefined },
  { label: '@leitech_systems_s (TikTok)', href: 'https://www.tiktok.com/@leitech_systems_s' },
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <Zap size={18} color="#F59E0B" strokeWidth={2.5} />
              <div style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.04em' }}>
                <span style={{ color: '#F1F5F9' }}>LEI</span>
                <span style={{
                  background: 'linear-gradient(90deg,#F59E0B,#38BDF8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>TECH</span>
                <span style={{ color: '#F1F5F9', fontSize: '0.85rem', fontWeight: 500 }}> SYSTEMS SOLUTION</span>
              </div>
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
          <p style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            © 2026 Leitech Systems Solution · All Rights Reserved · Accra, Ghana
          </p>
          <div className="footer-social" style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { label: 'TikTok', href: 'https://www.tiktok.com/@leitech_systems_s' },
              { label: 'Email', href: 'mailto:leitech_systems@outlook.com' },
              { label: 'Call Us', href: 'tel:0508096108' },
            ].map((s) => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ fontSize: '0.6rem', color: '#475569', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
              >{s.label}</a>
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

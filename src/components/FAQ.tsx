import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'What areas do you serve?',
    a: 'We are based at 79 Fertilizer Road, Teshie Nungua Estate, Accra and serve clients across Ghana and West Africa — residential, commercial, and government projects alike.',
  },
  {
    q: 'How long does a solar installation take?',
    a: 'A standard residential solar installation takes 1–3 days. Larger commercial or institutional systems may take 1–2 weeks. We provide a detailed project timeline before we begin.',
  },
  {
    q: 'Do you offer after-sales maintenance?',
    a: 'Yes — all installations come with post-installation support. We also offer dedicated maintenance contracts to ensure your systems perform at their best long term.',
  },
  {
    q: 'Can you handle government and institutional projects?',
    a: 'Absolutely. We have experience with large-scale deployments for ministries, military agencies, schools, and industrial facilities — with full documentation and compliance reports.',
  },
  {
    q: 'How do I get a consultation or quote?',
    a: 'Call or WhatsApp us on 0508 096 108 / 0247 291 199, email leitech_systems@outlook.com, or fill in the contact form below. We respond quickly with a fair, detailed quote.',
  },
  {
    q: 'Do you provide customized solutions?',
    a: 'Yes. We assess your specific needs, property, and budget to design a fully bespoke solution — no one-size-fits-all approaches here.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="section section--alt">
      <div className="container">
        <div className="section-header rev">
          <div>
            <div className="eyebrow">Common Questions</div>
            <h2 className="section-title">Frequently <em>Asked</em></h2>
          </div>
          <p className="section-desc">Everything you need to know before getting started.</p>
        </div>

        <div className="rev faq-list" style={{ maxWidth: 820 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{
              borderBottom: '1px solid rgba(14,165,233,0.1)',
              ...(i === 0 ? { borderTop: '1px solid rgba(14,165,233,0.1)' } : {}),
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="faq-btn"
                style={{
                  width: '100%', background: 'none', border: 'none',
                  color: open === i ? '#F59E0B' : '#F1F5F9',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.4rem 0', cursor: 'pointer', textAlign: 'left', gap: '1rem',
                  fontSize: '0.98rem', fontWeight: 600, transition: 'color 0.25s',
                  fontFamily: 'Plus Jakarta Sans, sans-serif', minHeight: 44,
                }}
              >
                {f.q}
                <div style={{
                  width: 30, height: 30, borderRadius: 4, flexShrink: 0,
                  border: `1px solid ${open === i ? 'rgba(245,158,11,0.35)' : 'rgba(14,165,233,0.2)'}`,
                  background: open === i ? 'rgba(245,158,11,0.08)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: open === i ? '#F59E0B' : '#0EA5E9',
                  transition: 'all 0.25s',
                }}>
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              <div style={{
                maxHeight: open === i ? 600 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.45s ease',
              }}>
                <p className="faq-answer" style={{
                  fontSize: '0.88rem', color: '#94A3B8',
                  lineHeight: 1.8, paddingBottom: '1.4rem', paddingRight: '2.5rem',
                }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-list { max-width: 100% !important; }
          .faq-btn { font-size: 0.9rem !important; }
          .faq-answer { padding-right: 1rem !important; }
        }
        @media (max-width: 480px) {
          .faq-btn { font-size: 0.85rem !important; padding: 1.1rem 0 !important; }
          .faq-answer { font-size: 0.82rem !important; padding-right: 0.5rem !important; }
        }
      `}</style>
    </section>
  )
}

import { useNavigate } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import FAQ from '../components/FAQ'

export default function FAQPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter">
      {/* Page hero */}
      <section className="page-hero">
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:`linear-gradient(rgba(14,165,233,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,0.03) 1px,transparent 1px)`,
          backgroundSize:'60px 60px',
          WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',
          maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',
        }} />
        <div className="container">
          <div className="eyebrow">Common Questions</div>
          <h1 style={{ fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:800, lineHeight:1.05, maxWidth:700 }}>
            Frequently{' '}
            <span style={{ background:'linear-gradient(90deg,#F59E0B,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Asked</span>
          </h1>
          <p style={{ fontSize:'clamp(0.85rem,2.5vw,1rem)', color:'#94A3B8', maxWidth:580, lineHeight:1.8, marginTop:'1rem' }}>
            Everything you need to know before getting started with Leitech.
          </p>
        </div>
      </section>

      <FAQ />

      {/* Still have questions CTA */}
      <section className="section section--alt" style={{ borderTop:'1px solid rgba(14,165,233,0.1)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <div className="rev">
            <div style={{ width:60, height:60, borderRadius:12, background:'rgba(14,165,233,0.08)', border:'1px solid rgba(14,165,233,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem' }}>
              <MessageCircle size={26} color="#0EA5E9" />
            </div>
            <h2 className="section-title" style={{ marginBottom:'1rem' }}>Still Have <em>Questions?</em></h2>
            <p style={{ fontSize:'0.95rem', color:'#94A3B8', maxWidth:440, margin:'0 auto 2rem', lineHeight:1.8 }}>
              Our team is ready to help. Reach out directly and we'll respond quickly.
            </p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={() => navigate('/contact')} className="btn btn-primary">
                Contact Us <ArrowRight size={14} />
              </button>
              <a href="https://wa.me/233508096108" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

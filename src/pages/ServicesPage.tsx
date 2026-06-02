import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Services from '../components/Services'

export default function ServicesPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter">
      {/* Page hero */}
      <section className="page-hero" style={{
        backgroundImage:`linear-gradient(rgba(5,10,20,0.80),rgba(5,10,20,0.60)), url('/images/back-services.jpeg')`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
      }}>
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:`linear-gradient(rgba(14,165,233,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,0.04) 1px,transparent 1px)`,
          backgroundSize:'60px 60px',
          WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',
          maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)',
        }} />
        <div className="container">
          <div className="eyebrow">What We Offer</div>
          <h1 style={{ fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:800, lineHeight:1.05, maxWidth:700 }}>
            Our Core{' '}
            <span style={{ background:'linear-gradient(90deg,#F59E0B,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Services</span>
          </h1>
          <p style={{ fontSize:'clamp(0.85rem,2.5vw,1rem)', color:'#94A3B8', maxWidth:580, lineHeight:1.8, marginTop:'1rem' }}>
            Residential, commercial and government technology solutions — solar, security, smart systems and communications.
          </p>
        </div>
      </section>

      {/* All service categories (reuse component, strip its outer padding via wrapper) */}
      <Services />

      {/* CTA */}
      <section className="section section--alt" style={{ borderTop:'1px solid rgba(14,165,233,0.1)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <div className="rev">
            <h2 className="section-title" style={{ marginBottom:'1rem' }}>Need a Custom <em>Solution?</em></h2>
            <p style={{ fontSize:'0.95rem', color:'#94A3B8', maxWidth:480, margin:'0 auto 2rem', lineHeight:1.8 }}>
              Every property is different. We design bespoke systems tailored to your specific needs and budget.
            </p>
            <button onClick={() => navigate('/contact')} className="btn btn-primary">
              Request Consultation <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

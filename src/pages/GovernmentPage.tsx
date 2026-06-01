import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Government from '../components/Government'

export default function GovernmentPage() {
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
          <div className="eyebrow">Public Sector & Institutions</div>
          <h1 style={{ fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:800, lineHeight:1.05, maxWidth:800 }}>
            Government &{' '}
            <span style={{ background:'linear-gradient(90deg,#0EA5E9,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Institutions</span>
          </h1>
          <p style={{ fontSize:'clamp(0.85rem,2.5vw,1rem)', color:'#94A3B8', maxWidth:620, lineHeight:1.8, marginTop:'1rem' }}>
            Specialized energy and infrastructure solutions for ministries, military agencies, educational institutions and industrial facilities.
          </p>
        </div>
      </section>

      <Government />

      {/* CTA */}
      <section className="section" style={{ borderTop:'1px solid rgba(14,165,233,0.1)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <div className="rev">
            <h2 className="section-title" style={{ marginBottom:'1rem' }}>Partner With <em>Leitech</em></h2>
            <p style={{ fontSize:'0.95rem', color:'#94A3B8', maxWidth:500, margin:'0 auto 2rem', lineHeight:1.8 }}>
              We handle large-scale institutional deployments with full documentation and compliance reporting.
            </p>
            <button onClick={() => navigate('/contact')} className="btn btn-primary">
              Start a Conversation <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <div className="page-enter">
      {/* Page hero */}
      <section className="page-hero" style={{
        backgroundImage:`linear-gradient(rgba(5,10,20,0.80),rgba(5,10,20,0.60)), url('/images/back-contact.jpeg')`,
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
          <div className="eyebrow">Reach Us</div>
          <h1 style={{ fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:800, lineHeight:1.05, maxWidth:700 }}>
            Get In{' '}
            <span style={{ background:'linear-gradient(90deg,#F59E0B,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Touch</span>
          </h1>
          <p style={{ fontSize:'clamp(0.85rem,2.5vw,1rem)', color:'#94A3B8', maxWidth:560, lineHeight:1.8, marginTop:'1rem' }}>
            Ready to power up, secure, or automate your property? Let's talk — we respond quickly with a detailed, fair quote.
          </p>
        </div>
      </section>

      <Contact />
    </div>
  )
}

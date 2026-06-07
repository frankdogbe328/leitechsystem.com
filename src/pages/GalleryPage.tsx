import Gallery from '../components/Gallery'

export default function GalleryPage() {
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
          <div className="eyebrow">Our Work</div>
          <h1 style={{ fontSize:'clamp(2rem,5vw,4.5rem)', fontWeight:800, lineHeight:1.05, maxWidth:700 }}>
            Project{' '}
            <span style={{ background:'linear-gradient(90deg,#F59E0B,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Gallery</span>
          </h1>
          <p style={{ fontSize:'clamp(0.85rem,2.5vw,1rem)', color:'#94A3B8', maxWidth:580, lineHeight:1.8, marginTop:'1rem' }}>
            Real installations by our team across Ghana. Click any photo to enlarge.
          </p>
        </div>
      </section>

      <Gallery />
    </div>
  )
}

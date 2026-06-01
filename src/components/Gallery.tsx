import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin, Zap, Plus } from 'lucide-react'

type Tag = 'Solar' | 'Battery' | 'Security' | 'Smart'

interface Item {
  file: string
  location: string
  tag: Tag
  spec?: string
}

const TAG_COLOR: Record<Tag, string> = {
  Solar:    '#F59E0B',
  Battery:  '#0EA5E9',
  Security: '#10B981',
  Smart:    '#8B5CF6',
}

const TAG_BG: Record<Tag, string> = {
  Solar:    'rgba(245,158,11,0.12)',
  Battery:  'rgba(14,165,233,0.12)',
  Security: 'rgba(16,185,129,0.12)',
  Smart:    'rgba(139,92,246,0.12)',
}

// ─── Project locations & specs (derived strictly from filenames) ─────────────
const CC  = 'Cape Coast'              // capecoast* files
const ACC = 'Accra'                   // WhatsApp April + June batches
const WA  = 'Wa, Upper West Region'   // wa* files
const MC  = 'Mando Centra'            // mando* files — 10 images
const TK  = 'Takwa'                   // Takwa* files — 8 images
const KA  = 'Kasoa'                   // kasoa* files — 6 images

const CC_SPEC  = '12kW Solar + 45kWh Storage'   // filename: "12kw 45kw starge"
const ACC_SPEC = 'Solar + Battery System'
const WA_SPEC  = '20kW Solar + 30kWh Storage'   // filename: "20kw 30kw storage"
const MC_SPEC  = '30kW Solar + 45kWh Storage'   // filename: "30kw 45kw storage"
const TK_SPEC  = '15kW Solar + 21kWh Storage'   // user spec (not in filename)

const items: Item[] = [
  // ── Cape Coast · capecoast1/2/3 ─────────────────────────────────────
  { file: 'capecoast1 12kw 45kw starge.jpeg', location: CC, tag: 'Solar', spec: CC_SPEC },
  { file: 'capecoast2 12kw 45kw starge.jpeg', location: CC, tag: 'Solar', spec: CC_SPEC },
  { file: 'capecoast3 12kw 45kw starge.jpeg', location: CC, tag: 'Solar', spec: CC_SPEC },

  // ── Kasoa · Solar Installation ───────────────────────────────────────
  { file: 'kasoa1.jpeg', location: KA, tag: 'Solar' },
  { file: 'kasoa2.jpeg', location: KA, tag: 'Solar' },
  { file: 'kasoa3.jpeg', location: KA, tag: 'Solar' },
  { file: 'kasoa4.jpeg', location: KA, tag: 'Solar' },
  { file: 'kasoa5.jpeg', location: KA, tag: 'Solar' },
  { file: 'kasoa6.jpeg', location: KA, tag: 'Solar' },

  // ── Wa · wa1–wa5 ────────────────────────────────────────────────────
  { file: 'wa1 20kw 30kw storage.jpeg', location: WA, tag: 'Solar', spec: WA_SPEC },
  { file: 'wa2 20kw 30kw storage.jpeg', location: WA, tag: 'Solar', spec: WA_SPEC },
  { file: 'wa3 20kw 30kw storage.jpeg', location: WA, tag: 'Solar', spec: WA_SPEC },
  { file: 'wa4 20kw 30kw storage.jpeg', location: WA, tag: 'Solar', spec: WA_SPEC },
  { file: 'wa5 20kw 30kw storage.jpeg', location: WA, tag: 'Solar', spec: WA_SPEC },

  // ── Mando Centra · 30kW Solar + 45kWh Storage ───────────────────────
  { file: 'mando1 30kw 45kw storage.jpeg',  location: MC, tag: 'Solar',   spec: MC_SPEC },
  { file: 'mando2 30kw 45kw storage.jpeg',  location: MC, tag: 'Solar',   spec: MC_SPEC },
  { file: 'mando3 30kw 45kw storage.jpeg',  location: MC, tag: 'Solar',   spec: MC_SPEC },
  { file: 'mando4 30kw 45kw storage.jpeg',  location: MC, tag: 'Solar',   spec: MC_SPEC },
  { file: 'mando5 30kw 45kw storage.jpeg',  location: MC, tag: 'Solar',   spec: MC_SPEC },
  { file: 'mando6 30kw 45kw storage.jpeg',  location: MC, tag: 'Solar',   spec: MC_SPEC },
  { file: 'mando7 30kw 45kw storage.jpeg',  location: MC, tag: 'Solar',   spec: MC_SPEC },
  { file: 'mando8 30kw 45kw storage.jpeg',  location: MC, tag: 'Battery', spec: MC_SPEC },
  { file: 'mando9 30kw 45kw storage.jpeg',  location: MC, tag: 'Battery', spec: MC_SPEC },
  { file: 'mando10 30kw 45kw storage.jpeg', location: MC, tag: 'Battery', spec: MC_SPEC },

  // ── Takwa · 15kW Solar + 21kWh Storage ──────────────────────────────
  { file: 'Takwa1.jpeg', location: TK, tag: 'Solar',   spec: TK_SPEC },
  { file: 'Takwa2.jpeg', location: TK, tag: 'Solar',   spec: TK_SPEC },
  { file: 'Takwa3.jpeg', location: TK, tag: 'Solar',   spec: TK_SPEC },
  { file: 'Takwa4.jpeg', location: TK, tag: 'Solar',   spec: TK_SPEC },
  { file: 'Takwa5.jpeg', location: TK, tag: 'Solar',   spec: TK_SPEC },
  { file: 'Takwa6.jpeg', location: TK, tag: 'Battery', spec: TK_SPEC },
  { file: 'Takwa7.jpeg', location: TK, tag: 'Battery', spec: TK_SPEC },
  { file: 'Takwa8.jpeg', location: TK, tag: 'Battery', spec: TK_SPEC },

  // ── CCTV Security Installations ──────────────────────────────────────
  { file: 'cctv1.jpeg', location: 'Ghana', tag: 'Security' },
  { file: 'cctv2.jpeg', location: 'Ghana', tag: 'Security' },
  { file: 'cctv3.jpeg', location: 'Ghana', tag: 'Security' },
  { file: 'cctv4.jpeg', location: 'Ghana', tag: 'Security' },

  // ── Cape Coast · WhatsApp April 2026 batch ───────────────────────────
  { file: 'WhatsApp Image 2026-04-15 at 11.30.31 AM.jpeg',     location: CC, tag: 'Battery', spec: CC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.32 AM.jpeg',     location: CC, tag: 'Battery', spec: CC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.32 AM (2).jpeg', location: CC, tag: 'Battery', spec: CC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.38 AM (3).jpeg', location: CC, tag: 'Solar',   spec: CC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.39 AM (1).jpeg', location: CC, tag: 'Solar',   spec: CC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.41 AM (2).jpeg', location: CC, tag: 'Solar',   spec: CC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.42 AM (1).jpeg', location: CC, tag: 'Solar',   spec: CC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.42 AM.jpeg',     location: CC, tag: 'Solar',   spec: CC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.44 AM (2).jpeg', location: CC, tag: 'Solar',   spec: CC_SPEC },

  // ── Accra · WhatsApp April 2026 batch ────────────────────────────────
  { file: 'WhatsApp Image 2026-04-15 at 11.30.32 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.36 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.36 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.37 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.37 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.37 AM (2).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.37 AM (3).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.38 AM.jpeg',     location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.38 AM (2).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.39 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.39 AM (2).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.40 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.40 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.40 AM (2).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.41 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.42 AM (3).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.43 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.43 AM (1).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.44 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.44 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.45 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-04-15 at 11.30.45 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },

  // ── Accra · WhatsApp June 2026 batch ─────────────────────────────────
  { file: 'WhatsApp Image 2026-06-01 at 9.07.57 AM.jpeg',     location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.07.58 AM.jpeg',     location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.07.58 AM (1).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.07.58 AM (2).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.07.58 AM (3).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.07.59 AM.jpeg',     location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.07.59 AM (1).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.07.59 AM (2).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.07.59 AM (3).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.00 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.00 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.00 AM (2).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.00 AM (3).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.00 AM (4).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.01 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.01 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.02 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.02 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.02 AM (2).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.03 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.04 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.05 AM.jpeg',     location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.05 AM (1).jpeg', location: ACC, tag: 'Battery', spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.06 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.06 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.06 AM (2).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.06 AM (3).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.07 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.08 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.08 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.08 AM (2).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.08 AM (3).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.08 AM (4).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.09 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.09 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.09 AM (2).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.09 AM (3).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.10 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.10 AM (1).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.10 AM (2).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.10 AM (3).jpeg', location: ACC, tag: 'Solar',   spec: ACC_SPEC },
  { file: 'WhatsApp Image 2026-06-01 at 9.08.11 AM.jpeg',     location: ACC, tag: 'Solar',   spec: ACC_SPEC },

  // ── General ──────────────────────────────────────────────────────────
  { file: 'img09.jpg', location: ACC,     tag: 'Solar' },
  { file: 'img01.jpg', location: 'Ghana', tag: 'Solar' },
]

const FILTERS: Array<Tag | 'All'> = ['All', 'Solar', 'Battery', 'Security']
const PAGE_SIZE = 24

export default function Gallery() {
  const [filter, setFilter]     = useState<Tag | 'All'>('All')
  const [lb, setLb]             = useState<number | null>(null)
  const [hovering, setHovering] = useState<number | null>(null)
  const [page, setPage]         = useState(1)
  const touchStartX             = useRef<number | null>(null)
  const touchStartY             = useRef<number | null>(null)

  const visible = useMemo(
    () => filter === 'All' ? items : items.filter(i => i.tag === filter),
    [filter]
  )
  const paged   = visible.slice(0, page * PAGE_SIZE)
  const hasMore = paged.length < visible.length

  const nav = useCallback((dir: number) => {
    setLb(prev => prev === null ? null : (prev + dir + visible.length) % visible.length)
  }, [visible.length])

  useEffect(() => { setLb(null); setPage(1) }, [filter])

  // Keyboard nav
  useEffect(() => {
    if (lb === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     setLb(null)
      if (e.key === 'ArrowLeft')  nav(-1)
      if (e.key === 'ArrowRight') nav(1)
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lb, nav])

  // Swipe handlers for lightbox
  const onLbTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onLbTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    // Only swipe if horizontal movement dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      e.stopPropagation()
      nav(dx < 0 ? 1 : -1)
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  const activeItem = lb !== null ? visible[lb] : null

  return (
    <section id="gallery" className="section section--alt">
      <div className="container">
        <div className="section-header rev">
          <div>
            <div className="eyebrow">Our Work</div>
            <h2 className="section-title">Project <em>Gallery</em></h2>
          </div>
          <p className="section-desc">
            Real installations across Ghana — Cape Coast, Accra, and Wa. Tap any photo to enlarge.
          </p>
        </div>

        {/* Filter tabs — horizontal scroll on mobile */}
        <div className="gal-filters rev">
          {FILTERS.map(f => {
            const count  = f === 'All' ? items.length : items.filter(i => i.tag === f).length
            if (count === 0) return null  // hide tags with no images yet
            const active = filter === f
            const color  = f === 'All' ? '#94A3B8' : TAG_COLOR[f as Tag]
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`gal-filter-btn${active ? ' gal-filter-active' : ''}`}
                style={{
                  '--fc': color,
                  '--fb': active ? (TAG_BG[f as Tag] ?? 'rgba(148,163,184,0.1)') : 'rgba(255,255,255,0.02)',
                  '--fs': active ? `0 0 10px ${color}20` : 'none',
                } as React.CSSProperties}
              >
                {f}
                <span className="gal-count">{count}</span>
              </button>
            )
          })}
          <span className="gal-results">{visible.length} photo{visible.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Grid */}
        <div className="rev gal-grid">
          {paged.map((item, i) => {
            const isHov = hovering === i
            return (
              <div
                key={item.file}
                className="gal-card"
                onClick={() => setLb(i)}
                onMouseEnter={() => setHovering(i)}
                onMouseLeave={() => setHovering(null)}
              >
                <img
                  src={`/images/${encodeURIComponent(item.file)}`}
                  alt={item.location}
                  loading={i < 8 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`gal-img${isHov ? ' gal-img-hov' : ''}`}
                />

                {/* Permanent dark gradient at bottom — always readable */}
                <div className="gal-grad" />

                {/* Tag badge — top right */}
                <div
                  className="gal-tag"
                  style={{ color: TAG_COLOR[item.tag], background: TAG_BG[item.tag], borderColor: `${TAG_COLOR[item.tag]}50` }}
                >
                  {item.tag}
                </div>

                {/* Spec pill — top left */}
                {item.spec && (
                  <div className="gal-spec">
                    <Zap size={8} color="#F59E0B" />
                    {item.spec}
                  </div>
                )}

                {/* Info overlay — always visible on touch, hover on desktop */}
                <div className="gal-info">
                  <div className="gal-info-title">{item.location}</div>
                  {item.spec && (
                    <div className="gal-info-spec">{item.spec}</div>
                  )}
                </div>

                {/* Hover border accent — desktop only */}
                <div
                  className="gal-border"
                  style={{ borderColor: TAG_COLOR[item.tag], opacity: isHov ? 0.35 : 0 }}
                />
              </div>
            )
          })}
        </div>

        {visible.length === 0 && (
          <div style={{ textAlign: 'center', color: '#475569', padding: '4rem 0', fontSize: '0.85rem' }}>
            No images in this category yet.
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={() => setPage(p => p + 1)} className="btn btn-outline">
              Load More <Plus size={14} />
            </button>
            <p style={{ fontSize: '0.6rem', color: '#334155', marginTop: '0.6rem', letterSpacing: '0.08em' }}>
              {paged.length} of {visible.length} shown
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="lb-backdrop"
          onClick={() => setLb(null)}
          onTouchStart={onLbTouchStart}
          onTouchEnd={onLbTouchEnd}
        >
          {/* Close */}
          <button className="lb-close" onClick={e => { e.stopPropagation(); setLb(null) }}>
            <X size={18} />
          </button>

          {/* Counter */}
          <div className="lb-counter">
            {(lb! + 1).toString().padStart(2, '0')} / {visible.length.toString().padStart(2, '0')}
          </div>

          {/* Desktop prev — hidden on mobile */}
          <button className="lb-nav lb-prev" onClick={e => { e.stopPropagation(); nav(-1) }}>
            <ChevronLeft size={22} />
          </button>

          {/* Image */}
          <img
            className="lb-img"
            src={`/images/${encodeURIComponent(activeItem.file)}`}
            alt={activeItem.location}
            onClick={e => e.stopPropagation()}
          />

          {/* Caption */}
          <div className="lb-caption" onClick={e => e.stopPropagation()}>
            <div className="lb-caption-title">
              <MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 5 }} />
              {activeItem.location}
            </div>
            {activeItem.spec && (
              <div className="lb-caption-spec">
                <Zap size={11} color="#F59E0B" /> {activeItem.spec}
              </div>
            )}
            <div className="lb-caption-meta">
              <span
                className="lb-tag-pill"
                style={{
                  color: TAG_COLOR[activeItem.tag],
                  background: TAG_BG[activeItem.tag],
                  borderColor: `${TAG_COLOR[activeItem.tag]}40`,
                }}
              >
                {activeItem.tag}
              </span>
            </div>
          </div>

          {/* Mobile nav row — shown below caption on small screens */}
          <div className="lb-mobile-nav" onClick={e => e.stopPropagation()}>
            <button className="lb-nav lb-prev-m" onClick={() => nav(-1)}>
              <ChevronLeft size={20} />
            </button>
            <span className="lb-mobile-counter">
              {lb! + 1} / {visible.length}
            </span>
            <button className="lb-nav lb-next-m" onClick={() => nav(1)}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Desktop next — hidden on mobile */}
          <button className="lb-nav lb-next" onClick={e => { e.stopPropagation(); nav(1) }}>
            <ChevronRight size={22} />
          </button>
        </div>
      )}

      <style>{`
        /* ── Filter bar ── */
        .gal-filters {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-bottom: 2.5rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 2px;
        }
        .gal-filters::-webkit-scrollbar { display: none; }

        .gal-filter-btn {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.42rem 1.1rem;
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          border: 1px solid rgba(255,255,255,0.07);
          background: var(--fb);
          color: #475569;
          cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: var(--fs);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .gal-filter-active { color: var(--fc) !important; border-color: var(--fc) !important; }

        .gal-count {
          font-size: 0.52rem;
          font-weight: 700;
          padding: 0.08rem 0.4rem;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
          color: #334155;
          min-width: 22px;
          text-align: center;
        }
        .gal-filter-active .gal-count {
          background: rgba(255,255,255,0.1);
          color: var(--fc);
        }
        .gal-results {
          margin-left: auto;
          flex-shrink: 0;
          font-size: 0.58rem;
          color: #334155;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        /* ── Grid ── */
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 230px;
          gap: 3px;
        }

        /* ── Card ── */
        .gal-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #0A1628;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .gal-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease;
          filter: brightness(0.62);
          will-change: transform;
        }
        .gal-img-hov {
          transform: scale(1.08);
          filter: brightness(0.85);
        }

        .gal-grad {
          position: absolute; bottom: 0; left: 0; right: 0; height: 60%;
          background: linear-gradient(to top, rgba(5,10,20,0.95) 0%, transparent 100%);
          pointer-events: none;
        }

        .gal-tag {
          position: absolute; top: 8px; right: 8px;
          padding: 0.2rem 0.55rem;
          font-size: 0.46rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          border: 1px solid;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          pointer-events: none;
        }

        .gal-spec {
          position: absolute; top: 8px; left: 8px;
          display: flex; align-items: center; gap: 0.28rem;
          padding: 0.2rem 0.5rem;
          font-size: 0.44rem; font-weight: 600; letter-spacing: 0.06em;
          background: rgba(5,10,20,0.78);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94A3B8;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          pointer-events: none;
        }

        /* Info overlay — hidden on desktop until hover, always visible on touch */
        .gal-info {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 0.75rem;
          opacity: 0;
          transition: opacity 0.28s ease;
          pointer-events: none;
        }
        .gal-card:hover .gal-info { opacity: 1; }

        .gal-info-title {
          font-size: 0.72rem; font-weight: 700; color: #F1F5F9;
          line-height: 1.2; margin-bottom: 0.22rem;
          text-shadow: 0 1px 6px rgba(0,0,0,0.9);
        }
        .gal-info-spec {
          font-size: 0.56rem; color: #F59E0B; font-weight: 500;
          text-shadow: 0 1px 4px rgba(0,0,0,0.8);
        }

        .gal-border {
          position: absolute; inset: 0;
          border: 1px solid;
          transition: opacity 0.28s ease;
          pointer-events: none;
        }

        /* ── Lightbox ── */
        .lb-backdrop {
          position: fixed; inset: 0; z-index: 9500;
          background: rgba(3,8,18,0.97);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 1.5rem 4.5rem;
        }

        .lb-close {
          position: absolute; top: 1.25rem; right: 1.25rem;
          background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.25);
          color: #F59E0B; width: 42px; height: 42px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 2;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .lb-counter {
          position: absolute; top: 1.5rem; left: 1.5rem;
          font-family: 'JetBrains Mono', monospace; font-size: 0.58rem;
          color: #334155; letter-spacing: 0.12em;
        }

        .lb-nav {
          background: rgba(14,165,233,0.06); border: 1px solid rgba(14,165,233,0.18);
          color: #38BDF8; width: 46px; height: 46px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .lb-prev {
          position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%);
        }
        .lb-next {
          position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%);
        }

        .lb-img {
          max-width: 100%; max-height: 68vh;
          object-fit: contain;
          border: 1px solid rgba(14,165,233,0.12);
          box-shadow: 0 20px 70px rgba(0,0,0,0.75);
          display: block;
        }

        .lb-caption {
          margin-top: 1.2rem; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
        }
        .lb-caption-title { font-size: 0.92rem; font-weight: 700; color: #F1F5F9; display: flex; align-items: center; gap: 0.3rem; }
        .lb-caption-spec { display: flex; align-items: center; gap: 0.3rem; font-size: 0.7rem; color: #F59E0B; font-weight: 500; }
        .lb-caption-meta {
          display: flex; align-items: center; gap: 0.7rem;
          flex-wrap: wrap; justify-content: center; margin-top: 0.2rem;
        }
        .lb-tag-pill {
          padding: 0.16rem 0.55rem;
          font-size: 0.48rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          border: 1px solid;
        }

        /* Mobile nav row — hidden on desktop */
        .lb-mobile-nav { display: none; }
        .lb-mobile-counter { font-size: 0.62rem; color: #475569; min-width: 60px; text-align: center; }

        /* ── Responsive breakpoints ── */
        @media (max-width: 1100px) {
          .gal-grid { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 700px) {
          .gal-grid { grid-template-columns: repeat(2,1fr) !important; grid-auto-rows: 160px !important; }
          .gal-info-title { font-size: 0.62rem; }
          .gal-results { display: none; }
        }
        @media (max-width: 420px) {
          .gal-grid { grid-template-columns: repeat(2,1fr) !important; grid-auto-rows: 140px !important; }
          .gal-tag { font-size: 0.4rem; padding: 0.15rem 0.4rem; }
          .gal-spec { display: none; }
        }

        /* Touch devices — always show info, disable hover scale */
        @media (hover: none) {
          .gal-info { opacity: 1 !important; }
          .gal-img { filter: brightness(0.55) !important; }
          .gal-img-hov { transform: none !important; filter: brightness(0.55) !important; }
          .gal-border { display: none; }
        }

        /* Lightbox mobile */
        @media (max-width: 640px) {
          .lb-backdrop { padding: 1rem 1rem 0.75rem; justify-content: flex-start; padding-top: 4rem; }
          .lb-prev, .lb-next { display: none; }
          .lb-img { max-height: 52vh; border: none; box-shadow: none; }
          .lb-caption { margin-top: 0.8rem; }
          .lb-caption-title { font-size: 0.78rem; }
          .lb-mobile-nav {
            display: flex; align-items: center; gap: 1rem;
            margin-top: 1.2rem;
          }
          .lb-counter { display: none; }
          .lb-close { top: 0.9rem; right: 0.9rem; width: 38px; height: 38px; }
        }
      `}</style>
    </section>
  )
}

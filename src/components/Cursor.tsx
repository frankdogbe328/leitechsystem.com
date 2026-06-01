import { useEffect, useRef } from 'react'

// Custom amber cursor — desktop/mouse only (pointer: fine)
// Uses direct DOM manipulation + rAF to avoid 60fps React re-renders
export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: -300, y: -300 })
  const ringPos = useRef({ x: -300, y: -300 })
  const rafId   = useRef(0)
  const isHover = useRef(false)

  useEffect(() => {
    // Only activate on mouse-primary devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    // Tell CSS to hide native cursors everywhere
    document.documentElement.classList.add('custom-cursor')

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, summary'

    // ── Dot: instant follow ────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        // translate so dot centre = cursor position
        dotRef.current.style.transform =
          `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`
      }
    }

    // ── Ring: lerp-lagged follow ───────────────────────────────
    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.11)
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.11)
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%))`
      }
      rafId.current = requestAnimationFrame(animateRing)
    }
    rafId.current = requestAnimationFrame(animateRing)

    // ── Hover state via delegation (works on dynamic content) ──
    const onOver = (e: MouseEvent) => {
      if (isHover.current) return
      if ((e.target as Element).closest(INTERACTIVE)) {
        isHover.current = true
        dotRef.current?.classList.add('ch')
        ringRef.current?.classList.add('ch')
      }
    }
    const onOut = (e: MouseEvent) => {
      if (!isHover.current) return
      const to = e.relatedTarget as Element | null
      if (!to || !to.closest(INTERACTIVE)) {
        isHover.current = false
        dotRef.current?.classList.remove('ch')
        ringRef.current?.classList.remove('ch')
      }
    }

    // ── Click pulse ────────────────────────────────────────────
    const onDown = () => {
      dotRef.current?.classList.add('cc')
      ringRef.current?.classList.add('cc')
    }
    const onUp = () => {
      dotRef.current?.classList.remove('cc')
      ringRef.current?.classList.remove('cc')
    }

    // ── Visibility when cursor leaves / enters window ──────────
    const hide  = () => { dotRef.current?.classList.add('cur-hidden');  ringRef.current?.classList.add('cur-hidden') }
    const show  = () => { dotRef.current?.classList.remove('cur-hidden'); ringRef.current?.classList.remove('cur-hidden') }

    document.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)
    document.documentElement.addEventListener('mouseleave', hide)
    document.documentElement.addEventListener('mouseenter', show)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.documentElement.removeEventListener('mouseleave', hide)
      document.documentElement.removeEventListener('mouseenter', show)
    }
  }, [])

  return (
    <>
      {/* Dot — instant, amber filled circle */}
      <div ref={dotRef} className="cur-dot cur-hidden" />
      {/* Ring — lagged, amber border circle */}
      <div ref={ringRef} className="cur-ring cur-hidden" />

      <style>{`
        /* Hide all native cursors when custom cursor is active */
        .custom-cursor, .custom-cursor * { cursor: none !important; }

        /* ── Dot ── */
        .cur-dot {
          position: fixed; top: 0; left: 0; z-index: 99990;
          width: 10px; height: 10px; border-radius: 50%;
          background: #F59E0B;
          pointer-events: none;
          will-change: transform;
          mix-blend-mode: screen;
          transition:
            width  0.2s cubic-bezier(0.22,1,0.36,1),
            height 0.2s cubic-bezier(0.22,1,0.36,1),
            opacity 0.25s ease;
        }
        .cur-dot.cur-hidden { opacity: 0; }

        /* Hover: dot shrinks & dims (ring takes over visual focus) */
        .cur-dot.ch { width: 5px !important; height: 5px !important; opacity: 0.45 !important; }
        /* Click: dot expands briefly */
        .cur-dot.cc { width: 16px !important; height: 16px !important; }

        /* ── Ring ── */
        .cur-ring {
          position: fixed; top: 0; left: 0; z-index: 99989;
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(245,158,11,0.45);
          pointer-events: none;
          will-change: transform;
          transition:
            width       0.4s cubic-bezier(0.22,1,0.36,1),
            height      0.4s cubic-bezier(0.22,1,0.36,1),
            border-color 0.3s ease,
            box-shadow   0.3s ease,
            opacity      0.25s ease;
        }
        .cur-ring.cur-hidden { opacity: 0; }

        /* Hover: ring expands and glows */
        .cur-ring.ch {
          width: 54px !important; height: 54px !important;
          border-color: rgba(245,158,11,0.75) !important;
          box-shadow: 0 0 16px rgba(245,158,11,0.18) !important;
        }
        /* Click: ring contracts */
        .cur-ring.cc { width: 28px !important; height: 28px !important; }

        /* No custom cursor on touch/stylus screens */
        @media (pointer: coarse) {
          .cur-dot, .cur-ring { display: none !important; }
        }
      `}</style>
    </>
  )
}

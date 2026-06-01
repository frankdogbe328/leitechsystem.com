import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

interface Props {
  value: string        // "5+", "8+", "100%", "24/7", "GH"
  delay?: number       // ms to wait after entering viewport before counting
  style?: CSSProperties
}

const NUMERIC_RE = /^(\d+)([+%]?)$/

export default function StatNumber({ value, delay = 0, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(() => {
    const m = value.match(NUMERIC_RE)
    return m ? `0${m[2]}` : value
  })

  useEffect(() => {
    const match = value.match(NUMERIC_RE)
    if (!match) return  // Non-numeric (24/7, GH): show as-is

    const target = parseInt(match[1])
    const suffix = match[2]
    const el = ref.current
    if (!el) return

    let rafId: number
    let timeoutId: ReturnType<typeof setTimeout>

    const startCount = () => {
      timeoutId = setTimeout(() => {
        const duration = 1600
        const startTime = performance.now()
        const tick = (now: number) => {
          const elapsed = now - startTime
          const t = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)  // ease-out cubic
          setDisplay(`${Math.round(eased * target)}${suffix}`)
          if (t < 1) rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)
      }, delay)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          startCount()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      clearTimeout(timeoutId)
      cancelAnimationFrame(rafId)
    }
  }, [value, delay])

  return <div ref={ref} style={style}>{display}</div>
}

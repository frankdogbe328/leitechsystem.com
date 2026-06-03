import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import WhatsAppBtn from './WhatsAppBtn'
import FloatingCTA from './FloatingCTA'

interface Props { loaded: boolean }

export default function Layout({ loaded }: Props) {
  const location = useLocation()

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  // Re-run scroll-reveal on every route change (and after initial load)
  useEffect(() => {
    if (!loaded) return

    const t = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('on')
              observer.unobserve(e.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )

      const els = document.querySelectorAll('.rev:not(.on)')
      els.forEach((el) => {
        // Immediately reveal elements already in viewport (avoids flash on refresh)
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('on')
        } else {
          observer.observe(el)
        }
      })

      return () => observer.disconnect()
    }, 60)

    return () => clearTimeout(t)
  }, [location.pathname, loaded])

  const hideFooter = location.pathname === '/contact'

  return (
    <>
      <Nav loaded={loaded} />
      <main>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      <WhatsAppBtn />
      <FloatingCTA />
    </>
  )
}

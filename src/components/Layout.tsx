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

    // Short delay so the new page's DOM is painted before we observe
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
        { threshold: 0.1 }
      )
      document.querySelectorAll('.rev:not(.on)').forEach((el) => observer.observe(el))
      return () => observer.disconnect()
    }, 120)

    return () => clearTimeout(t)
  }, [location.pathname, loaded])

  return (
    <>
      <Nav loaded={loaded} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppBtn />
      <FloatingCTA />
    </>
  )
}

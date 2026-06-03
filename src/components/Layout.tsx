import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import WhatsAppBtn from './WhatsAppBtn'
import FloatingCTA from './FloatingCTA'

interface Props { loaded: boolean }

const seoMeta: Record<string, { title: string; description: string; url: string; image: string }> = {
  '/': {
    title: 'Leitech Systems Solution | Solar, Security, and Smart Infrastructure in Ghana',
    description: 'Leitech Systems Solution provides solar energy systems, CCTV installation, structured cabling, and intelligent automation across Ghana and West Africa.',
    url: 'https://leitechsystem.com/',
    image: 'https://leitechsystem.com/images/back-contact.jpeg',
  },
  '/about': {
    title: 'About Leitech Systems Solution | Ghana Solar & Security Experts',
    description: 'Learn how Leitech Systems Solution delivers solar installations, security systems, and smart infrastructure services for homes, businesses and institutions.',
    url: 'https://leitechsystem.com/about',
    image: 'https://leitechsystem.com/images/back-services.jpeg',
  },
  '/services': {
    title: 'Services | Solar, CCTV, Networking and Automation — Leitech',
    description: 'Explore Leitech Systems Solution services for solar power, telecommunications infrastructure, CCTV security, structured cabling, and intelligent control systems.',
    url: 'https://leitechsystem.com/services',
    image: 'https://leitechsystem.com/images/back-services.jpeg',
  },
  '/gallery': {
    title: 'Gallery | Leitech Systems Solution Projects in Ghana',
    description: 'See completed solar and security installations by Leitech Systems Solution across Ghana, featuring commercial, residential, and government projects.',
    url: 'https://leitechsystem.com/gallery',
    image: 'https://leitechsystem.com/images/img09.jpg',
  },
  '/institutions': {
    title: 'Government & Institutional Solutions | Leitech Systems Solution',
    description: 'Leitech Systems Solution supports government and institutional projects with network infrastructure, security systems, and reliable power solutions.',
    url: 'https://leitechsystem.com/institutions',
    image: 'https://leitechsystem.com/images/back-government.jpeg',
  },
  '/faq': {
    title: 'FAQ | Leitech Systems Solution — Solar, Security, and Smart Infrastructure',
    description: 'Find answers about Leitech Systems Solution services, installations, maintenance, and project planning for solar and security systems.',
    url: 'https://leitechsystem.com/faq',
    image: 'https://leitechsystem.com/images/back2.jpg',
  },
  '/contact': {
    title: 'Contact Leitech Systems Solution | Request a Quote in Ghana',
    description: 'Contact Leitech Systems Solution for solar power, CCTV security, and automation services in Ghana and West Africa. Request a consultation or quote today.',
    url: 'https://leitechsystem.com/contact',
    image: 'https://leitechsystem.com/images/back-contact.jpeg',
  },
}

function upsertMeta(name: string, content: string, attr = 'name') {
  const selector = `${attr}="${name}"`
  let element = document.head.querySelector(`meta[${selector}]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, name)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export default function Layout({ loaded }: Props) {
  const location = useLocation()

  useEffect(() => {
    const meta = seoMeta[location.pathname] || seoMeta['/']
    document.title = meta.title
    upsertMeta('description', meta.description)
    upsertMeta('og:title', meta.title, 'property')
    upsertMeta('og:description', meta.description, 'property')
    upsertMeta('og:url', meta.url, 'property')
    upsertMeta('og:image', meta.image, 'property')
    upsertMeta('twitter:title', meta.title)
    upsertMeta('twitter:description', meta.description)
    upsertMeta('twitter:image', meta.image)
    upsertLink('canonical', meta.url)
  }, [location.pathname])

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

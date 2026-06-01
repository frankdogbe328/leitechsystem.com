import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import GalleryPage from './pages/GalleryPage'
import GovernmentPage from './pages/GovernmentPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <BrowserRouter>
      <Cursor />
      <Preloader onDone={() => setLoaded(true)} />
      <Routes>
        <Route element={<Layout loaded={loaded} />}>
          <Route index           element={<HomePage />} />
          <Route path="about"        element={<AboutPage />} />
          <Route path="services"     element={<ServicesPage />} />
          <Route path="gallery"      element={<GalleryPage />} />
          <Route path="institutions" element={<GovernmentPage />} />
          <Route path="faq"          element={<FAQPage />} />
          <Route path="contact"      element={<ContactPage />} />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

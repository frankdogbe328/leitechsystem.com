import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Layout from './components/Layout'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import GalleryPage from './pages/GalleryPage'
import GovernmentPage from './pages/GovernmentPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'

function AppRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  const [loaded, setLoaded] = useState(isAdmin)

  return (
    <>
      <Cursor />
      {!isAdmin && <Preloader onDone={() => setLoaded(true)} />}
      <Routes>
        <Route element={<Layout loaded={loaded} />}>
          <Route index             element={<HomePage />} />
          <Route path="about"        element={<AboutPage />} />
          <Route path="services"     element={<ServicesPage />} />
          <Route path="gallery"      element={<GalleryPage />} />
          <Route path="institutions" element={<GovernmentPage />} />
          <Route path="faq"          element={<FAQPage />} />
          <Route path="contact"      element={<ContactPage />} />
          <Route path="*"            element={<Navigate to="/" replace />} />
        </Route>
        <Route path="admin" element={<AdminPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App

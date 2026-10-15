import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  // Scroll to top on every route change (expected for multi-page navigation).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}

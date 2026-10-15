import { useEffect, useRef, useState } from 'react'
import styles from './Section.module.css'

// A full-width section with generous vertical rhythm and a subtle
// scroll-reveal (fade + rise) powered by IntersectionObserver.
export default function Section({ id, children, className = '', reveal = true }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(!reveal)

  useEffect(() => {
    if (!reveal) return
    const node = ref.current
    if (!node) return

    // Respect reduced-motion: show immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    // threshold: 0 reveals as soon as any part of the section enters the
    // viewport. (A ratio-based threshold never fires for a section taller
    // than the viewport until the user scrolls.)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reveal])

  return (
    <section
      id={id}
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : styles.hidden} ${className}`}
    >
      {children}
    </section>
  )
}

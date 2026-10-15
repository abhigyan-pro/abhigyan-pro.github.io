import { useEffect, useState } from 'react'
import styles from './ReadingProgress.module.css'

// Thin accent bar fixed at the top that fills as the reader scrolls the page.
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.fill} style={{ width: `${progress}%` }} />
    </div>
  )
}

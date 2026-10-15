import { useEffect, useCallback } from 'react'
import styles from './Lightbox.module.css'

// Fullscreen image viewer. `photos` is an array of src strings; `index` is the
// currently shown photo. Controlled by the parent via onClose / onNavigate.
export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const count = photos.length

  const goPrev = useCallback(
    () => onNavigate((index - 1 + count) % count),
    [index, count, onNavigate],
  )
  const goNext = useCallback(
    () => onNavigate((index + 1) % count),
    [index, count, onNavigate],
  )

  // Keyboard controls + scroll lock while open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <button className={styles.close} aria-label="Close" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      {count > 1 && (
        <button
          className={`${styles.nav} ${styles.prev}`}
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
      )}

      <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
        <img src={photos[index]} alt={`Photo ${index + 1} of ${count}`} />
        <figcaption className={styles.counter}>
          {index + 1} / {count}
        </figcaption>
      </figure>

      {count > 1 && (
        <button
          className={`${styles.nav} ${styles.next}`}
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  )
}

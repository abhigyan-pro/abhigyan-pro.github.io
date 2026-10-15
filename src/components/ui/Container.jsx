import styles from './Container.module.css'

// Centered, max-width wrapper used by every page/section.
export default function Container({ children, className = '' }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>
}

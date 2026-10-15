import Container from './Container.jsx'
import styles from './PageHeader.module.css'

// Large page intro used at the top of inner routed pages (About, Publications…).
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className={styles.header}>
      <Container>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </Container>
    </header>
  )
}

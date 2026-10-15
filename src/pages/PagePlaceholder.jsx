import Container from '../components/ui/Container.jsx'
import styles from './PagePlaceholder.module.css'

// Temporary placeholder for sections not yet remodeled. Each will be replaced
// by its real page in a later iteration (About → Publications → Blogs → …).
export default function PagePlaceholder({ title, blurb }) {
  return (
    <Container>
      <div className={styles.wrap}>
        <span className={styles.badge}>Coming soon</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.blurb}>{blurb}</p>
      </div>
    </Container>
  )
}

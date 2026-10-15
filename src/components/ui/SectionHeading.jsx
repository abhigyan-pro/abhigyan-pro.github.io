import styles from './SectionHeading.module.css'

// Consistent section header: small accent eyebrow over a large title,
// optional supporting subtitle. Centered by default.
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`${styles.wrap} ${styles[align]}`}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}

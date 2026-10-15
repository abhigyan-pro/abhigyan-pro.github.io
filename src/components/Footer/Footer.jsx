import Container from '../ui/Container.jsx'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <p className={styles.copy}>&copy; {year} Abhigyan Chakraborty</p>
          <p className={styles.license}>
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY 4.0
            </a>
            <span aria-hidden="true"> · </span>
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apache 2.0
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}

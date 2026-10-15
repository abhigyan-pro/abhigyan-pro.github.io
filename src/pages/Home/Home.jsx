import { Link } from 'react-router-dom'
import Container from '../../components/ui/Container.jsx'
import Button from '../../components/ui/Button.jsx'
import SocialLinks from '../../components/ui/SocialLinks.jsx'
import NeuralBackground from '../../components/Home/NeuralBackground.jsx'
import { profile, socials, highlights, spotlight } from '../../data/profile.js'
import styles from './Home.module.css'

export default function Home() {
  const { headline, tagline, heroImage, affiliation } = profile

  return (
    <div className={styles.home}>
      <NeuralBackground />
      <div className={styles.bgGlow} aria-hidden="true" />
      <Container>
        <div className={styles.hero}>
          {/* Left: copy */}
          <div className={styles.copy}>
            <span className={styles.chip}>
              <span className={styles.chipDot} aria-hidden="true" />
              {affiliation}
            </span>

            <h1 className={styles.name}>{profile.name}</h1>

            <p className={styles.role}>
              {headline.lead}{' '}
              <span className={styles.accent}>{headline.accent}</span>{' '}
              {headline.trail}
            </p>

            <p className={styles.tagline}>{tagline}</p>

            <div className={styles.actions}>
              <Button to="/publications" variant="primary">
                View my work
              </Button>
              <Link to="/contact" className={styles.ghost}>
                Get in touch <span aria-hidden="true">›</span>
              </Link>
            </div>

            {/* Highlights strip */}
            <ul className={styles.highlights}>
              {highlights.map((h) => (
                <li key={h.label} className={styles.highlight}>
                  <span className={styles.highlightValue}>{h.value}</span>
                  <span className={styles.highlightLabel}>{h.label}</span>
                </li>
              ))}
            </ul>

            <div className={styles.social}>
              <SocialLinks items={socials} size="lg" />
            </div>
          </div>

          {/* Right: portrait + floating glass spotlight card */}
          <div className={styles.portrait}>
            <div className={styles.portraitGlow} aria-hidden="true" />
            <div className={styles.portraitFrame}>
              <img src={heroImage} alt={profile.name} loading="eager" />
            </div>

            <Link to={spotlight.to} className={styles.spotlight}>
              <span className={styles.spotlightLabel}>
                <span className={styles.availDot} aria-hidden="true" />
                {spotlight.label}
              </span>
              <span className={styles.spotlightTitle}>{spotlight.title}</span>
              <span className={styles.spotlightSub}>{spotlight.sub}</span>
              <span className={styles.spotlightCta}>
                {spotlight.cta} <span aria-hidden="true">›</span>
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

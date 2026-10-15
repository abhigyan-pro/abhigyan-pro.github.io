import Container from '../../components/ui/Container.jsx'
import Section from '../../components/ui/Section.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { publications } from '../../data/publications.js'
import { socials } from '../../data/profile.js'
import styles from './Publications.module.css'

const scholarUrl =
  socials.find((s) => s.icon === 'scholar')?.href ||
  'https://scholar.google.com/'

function PublicationCard({ item }) {
  return (
    <a
      className={styles.card}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.media}>
        <img src={item.image} alt="" loading="lazy" />
        <span className={styles.badge}>
          Read article
          <Icon name="external" size={14} />
        </span>
      </div>
      <div className={styles.body}>
        <span className={styles.venue}>{item.venue}</span>
        <h2 className={styles.title}>{item.title}</h2>
        <span className={styles.cta}>
          Read article <span aria-hidden="true">›</span>
        </span>
      </div>
    </a>
  )
}

export default function Publications() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Publications"
        subtitle="Peer-reviewed papers, conference proceedings, and preprints across precipitation science, remote sensing, and Explainable AI."
      />

      <Section>
        <Container>
          <div className={styles.grid}>
            {publications.map((item) => (
              <PublicationCard key={item.href} item={item} />
            ))}
          </div>

          {/* Google Scholar call-to-action */}
          <div className={styles.scholar}>
            <div className={styles.scholarText}>
              <span className={styles.scholarIcon}>
                <Icon name="graduation" size={24} />
              </span>
              <div>
                <h2 className={styles.scholarTitle}>Explore the full list</h2>
                <p className={styles.scholarSub}>
                  For the complete, always up-to-date list of my papers and
                  citations, visit my Google Scholar profile.
                </p>
              </div>
            </div>
            <Button href={scholarUrl} variant="primary">
              Google Scholar
              <Icon name="external" size={15} />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}

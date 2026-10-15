import Container from '../../components/ui/Container.jsx'
import Section from '../../components/ui/Section.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { publications } from '../../data/publications.js'
import styles from './Publications.module.css'

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
        </Container>
      </Section>
    </>
  )
}

import Container from '../../components/ui/Container.jsx'
import Section from '../../components/ui/Section.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { publicationGroups, AUTHOR } from '../../data/publications.js'
import { socials } from '../../data/profile.js'
import styles from './Publications.module.css'

const scholarUrl =
  socials.find((s) => s.icon === 'scholar')?.href ||
  'https://scholar.google.com/'

// Bold the site owner's name within the author list.
function Authors({ text }) {
  const parts = text.split(AUTHOR)
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <strong className={styles.me}>{AUTHOR}</strong>}
        </span>
      ))}
    </>
  )
}

function statusClass(status) {
  const s = (status || '').toLowerCase()
  if (s === 'accepted') return styles.accepted
  if (s === 'under review') return styles.review
  return styles.submitted
}

function PublicationItem({ item }) {
  return (
    <li className={styles.item}>
      <div className={styles.itemMain}>
        <h3 className={styles.itemTitle}>{item.title}</h3>
        <p className={styles.itemAuthors}>
          <Authors text={item.authors} /> ({item.year})
        </p>
        <p className={styles.itemVenue}>{item.venue}</p>
      </div>
      <div className={styles.itemAside}>
        {item.status && (
          <span className={`${styles.badge} ${statusClass(item.status)}`}>
            {item.status}
          </span>
        )}
        {item.href && (
          <a
            className={styles.doi}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read <Icon name="external" size={14} />
          </a>
        )}
      </div>
    </li>
  )
}

export default function Publications() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Publications"
        subtitle="Peer-reviewed journal articles, conference proceedings, and work in progress across precipitation science, remote sensing, and Explainable AI."
      />

      <Section>
        <Container>
          {publicationGroups.map((group) => (
            <div key={group.heading} className={styles.group}>
              <h2 className={styles.groupHeading}>
                {group.heading}
                <span className={styles.count}>{group.items.length}</span>
              </h2>
              <ol className={styles.list}>
                {group.items.map((item) => (
                  <PublicationItem key={item.title} item={item} />
                ))}
              </ol>
            </div>
          ))}

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

import { useState } from 'react'
import Container from '../../components/ui/Container.jsx'
import Section from '../../components/ui/Section.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Icon from '../../components/ui/Icon.jsx'
import Lightbox from '../../components/gallery/Lightbox.jsx'
import { events } from '../../data/gallery.js'
import styles from './Gallery.module.css'

function EventEntry({ event, onOpenPhoto }) {
  return (
    <article className={styles.entry}>
      <h2 className={styles.title}>{event.title}</h2>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Icon name="calendar" size={16} />
          {event.dates}
        </span>
        <a
          className={styles.metaItem}
          href={event.location.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="pin" size={16} />
          {event.location.label}
        </a>
        {event.links.map((link) => (
          <a
            key={link.href}
            className={styles.metaItem}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="external" size={15} />
            {link.label}
          </a>
        ))}
      </div>

      <div className={styles.description}>
        {event.description.map((block, i) => (
          <p key={i}>
            <strong>{block.label}</strong>
            <br />
            {block.text}
          </p>
        ))}
      </div>

      <div className={styles.photos}>
        {event.photos.map((src, i) => (
          <button
            key={src}
            type="button"
            className={styles.thumb}
            onClick={() => onOpenPhoto(event.photos, i)}
            aria-label={`Open photo ${i + 1}`}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </article>
  )
}

export default function Gallery() {
  // Lightbox state: which photo set is open and the active index.
  const [active, setActive] = useState(null) // { photos, index } | null

  const openPhoto = (photos, index) => setActive({ photos, index })
  const closePhoto = () => setActive(null)
  const navigate = (index) => setActive((cur) => ({ ...cur, index }))

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Conferences, summer schools, and workshops — the people, places, and ideas behind the research."
      />

      <Section>
        <Container>
          <div className={styles.entries}>
            {events.map((event) => (
              <EventEntry key={event.id} event={event} onOpenPhoto={openPhoto} />
            ))}
          </div>
        </Container>
      </Section>

      {active && (
        <Lightbox
          photos={active.photos}
          index={active.index}
          onClose={closePhoto}
          onNavigate={navigate}
        />
      )}
    </>
  )
}

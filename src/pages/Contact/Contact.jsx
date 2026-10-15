import { useState } from 'react'
import Container from '../../components/ui/Container.jsx'
import Section from '../../components/ui/Section.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Icon from '../../components/ui/Icon.jsx'
import SocialLinks from '../../components/ui/SocialLinks.jsx'
import NeuralBackground from '../../components/Home/NeuralBackground.jsx'
import { profile, socials } from '../../data/profile.js'
import styles from './Contact.module.css'

// Google Maps embed (keyless) + a human-readable map link.
const MAP_QUERY = 'IIT Hyderabad, Kandi, Sangareddy, Telangana 502284'
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=14&output=embed`
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}` // fallback
    }
  }

  return (
    <div className={styles.page}>
      <NeuralBackground showy />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      <div className={styles.content}>
      <PageHeader
        eyebrow="Say hello"
        title="Get in touch"
        subtitle="Open to research collaborations, talks, and conversations about atmospheric science, machine learning, and open science."
      />

      <Section>
        <Container>
          <div className={styles.cards}>
            {/* Email — copies to clipboard; also offers a mail link */}
            <div className={styles.card}>
              <span className={styles.icon}>
                <Icon name="envelope" size={22} />
              </span>
              <span className={styles.cardLabel}>Email</span>
              <span className={styles.cardValue}>{profile.email}</span>
              <div className={styles.cardActions}>
                <a className={styles.mailBtn} href={`mailto:${profile.email}`}>
                  <Icon name="envelope" size={16} />
                  Send email
                </a>
                <button type="button" className={styles.mailLink} onClick={copyEmail}>
                  {copied ? 'Copied!' : 'Copy address'}
                </button>
              </div>
            </div>

            {/* Location */}
            <a
              className={`${styles.card} ${styles.cardLink}`}
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.icon}>
                <Icon name="pin" size={22} />
              </span>
              <span className={styles.cardLabel}>Location</span>
              <span className={styles.cardValue}>{profile.location}</span>
              <span className={styles.cardCta}>
                Open in Google Maps <span aria-hidden="true">›</span>
              </span>
            </a>
          </div>

          {/* Inline map with a frosted glass location pill */}
          <div className={styles.map}>
            <iframe
              title="IIT Hyderabad location map"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className={styles.mapPill} aria-hidden="true">
              <Icon name="pin" size={16} />
              IIT Hyderabad · Sangareddy
            </div>
          </div>

          {/* Connect */}
          <div className={styles.connect}>
            <h2 className={styles.connectTitle}>Connect with me</h2>
            <SocialLinks items={socials} size="lg" />
          </div>
        </Container>
      </Section>
      </div>
    </div>
  )
}

import Container from '../../components/ui/Container.jsx'
import Section from '../../components/ui/Section.jsx'
import SectionHeading from '../../components/ui/SectionHeading.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { about, skills } from '../../data/about.js'
import { timeline } from '../../data/timeline.js'
import { awards, roles } from '../../data/awards.js'
import { profile } from '../../data/profile.js'
import styles from './About.module.css'

// A single timeline entry (vertical rail with a dot).
function TimelineItem({ item }) {
  return (
    <li className={styles.tlItem}>
      <span className={styles.tlDot}>
        <Icon name={item.icon} size={18} />
      </span>
      <div className={styles.tlBody}>
        <span className={styles.tlDate}>{item.date}</span>
        <h3 className={styles.tlTitle}>{item.title}</h3>
        <span className={styles.tlOrg}>{item.org}</span>
        <p className={styles.tlDesc}>{item.description}</p>
      </div>
    </li>
  )
}

// A credential card used for awards/grants and roles.
function CredentialCard({ item }) {
  return (
    <div className={styles.cred}>
      <span className={styles.credIcon}>
        <Icon name={item.icon} size={20} />
      </span>
      <div className={styles.credBody}>
        <span className={styles.credDate}>{item.date}</span>
        <h3 className={styles.credTitle}>{item.title}</h3>
        <span className={styles.credOrg}>{item.org}</span>
        {item.description && <p className={styles.credDesc}>{item.description}</p>}
        {item.link && (
          <a
            className={styles.credLink}
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.link.label}
            <Icon name="external" size={14} />
          </a>
        )}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      <div className={styles.content}>
      <PageHeader
        title="About me"
        subtitle="Researcher at the intersection of atmospheric science, machine learning, and high-performance computing."
      />

      {/* Intro + skills */}
      <Section className={styles.introSection}>
        <Container>
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <a
                className={styles.labLink}
                href={about.lab.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={about.lab.logo} alt="" className={styles.labLogo} />
                {about.lab.name}
                <Icon name="external" size={14} />
              </a>
              <div className={styles.introActions}>
                <Button href={profile.cvUrl} variant="secondary">
                  Download CV
                </Button>
              </div>
            </div>

            <aside className={styles.skills} aria-label="Focus areas">
              {skills.map((s) => (
                <div key={s.title} className={styles.skillCard}>
                  <span className={styles.skillIcon}>
                    <Icon name={s.icon} size={22} />
                  </span>
                  <div>
                    <h3 className={styles.skillTitle}>{s.title}</h3>
                    <p className={styles.skillDetail}>{s.detail}</p>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section className={styles.block}>
        <Container>
          <SectionHeading title="My timeline" />
          <ol className={styles.timeline}>
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </ol>
        </Container>
      </Section>

      {/* Awards */}
      <Section className={styles.block}>
        <Container>
          <SectionHeading title="Awards, grants & features" />
          <div className={styles.credGrid}>
            {awards.map((item, i) => (
              <CredentialCard key={i} item={item} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Roles */}
      <Section className={styles.block}>
        <Container>
          <SectionHeading title="Roles of responsibility" />
          <div className={styles.credGrid}>
            {roles.map((item, i) => (
              <CredentialCard key={i} item={item} />
            ))}
          </div>
        </Container>
      </Section>
      </div>
    </div>
  )
}

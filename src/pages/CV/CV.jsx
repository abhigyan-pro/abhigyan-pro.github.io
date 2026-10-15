import Container from '../../components/ui/Container.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Button from '../../components/ui/Button.jsx'
import { profile } from '../../data/profile.js'
import styles from './CV.module.css'

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  )
}

export default function CV() {
  return (
    <>
      <PageHeader
        eyebrow="Curriculum Vitae"
        title="My CV"
        subtitle="Read my full CV below, or download the PDF."
      />

      <section className={styles.wrap}>
        <Container>
          <div className={styles.actions}>
            <Button href={profile.cvUrl} variant="primary">
              <DownloadIcon />
              Download PDF
            </Button>
          </div>

          <div className={styles.viewer}>
            <iframe
              src={`${profile.cvUrl}#view=FitH`}
              title="Curriculum Vitae"
              loading="lazy"
            />
          </div>

          <p className={styles.fallback}>
            Can&apos;t see the document?{' '}
            <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
              Open the PDF in a new tab
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  )
}

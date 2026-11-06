import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/ui/Container.jsx'
import Section from '../../components/ui/Section.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { seriesList, postBySlug } from '../../data/blogs.js'
import styles from './Blogs.module.css'

function PostCard({ post }) {
  const badge = post.badge || (post.slug === 'preface' ? '✦' : '•')
  return (
    <Link to={`/blogs/${post.slug}`} className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.badge}>{badge}</span>
        <span className={styles.cardLabel}>{post.label}</span>
      </div>
      <h3 className={styles.cardTitle}>{post.title}</h3>
      <p className={styles.cardDesc}>{post.description}</p>
      <span className={styles.cardCta}>
        Read <span aria-hidden="true">›</span>
      </span>
    </Link>
  )
}

function SeriesSection({ series }) {
  const [expanded, setExpanded] = useState(false)
  const count = series.phases
    ? series.phases.reduce((n, p) => n + p.slugs.length, 0)
    : (series.postSlugs?.length ?? 0)

  return (
    <div className={styles.series}>
      <button
        type="button"
        className={styles.seriesBanner}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className={styles.seriesMedia}>
          <img src={series.cover} alt="" />
        </div>
        <div className={styles.seriesText}>
          <span className={styles.seriesKicker}>{series.kicker}</span>
          <h2 className={styles.seriesTitle}>{series.title}</h2>
          <p className={styles.seriesDesc}>{series.description}</p>
          <span className={styles.seriesToggle}>
            {expanded
              ? 'Collapse series'
              : `Explore all ${count} part${count === 1 ? '' : 's'}`}
            <svg
              className={`${styles.chevron} ${expanded ? styles.chevronUp : ''}`}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
      </button>

      {expanded && (
        <div className={styles.seriesContent}>
          {series.prefaceSlug && (
            <div className={styles.prefaceRow}>
              <PostCard post={postBySlug[series.prefaceSlug]} />
            </div>
          )}

          {series.phases ? (
            series.phases.map((phase, i) => (
              <div key={phase.title} className={styles.phase}>
                <div className={styles.phaseHead}>
                  <span className={styles.phaseNum}>Phase {i + 1}</span>
                  <h3 className={styles.phaseTitle}>{phase.title}</h3>
                  <span className={styles.phaseRange}>{phase.range}</span>
                </div>
                <div className={styles.grid}>
                  {phase.slugs.map((slug) => (
                    <PostCard key={slug} post={postBySlug[slug]} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.grid}>
              {series.postSlugs.map((slug) => (
                <PostCard key={slug} post={postBySlug[slug]} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Blogs() {
  return (
    <>
      <PageHeader
        title="Blogs"
        subtitle="Tutorials, research insights, and computational workflows — from building a reproducible research environment to downloading and using scientific data."
      />

      <Section>
        <Container>
          {seriesList.map((series) => (
            <SeriesSection key={series.id} series={series} />
          ))}
        </Container>
      </Section>
    </>
  )
}

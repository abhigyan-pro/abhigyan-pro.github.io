import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../../components/ui/Container.jsx'
import Section from '../../components/ui/Section.jsx'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { series, phases, posts, postBySlug } from '../../data/blogs.js'
import styles from './Blogs.module.css'

function PostCard({ post }) {
  const badge =
    post.slug === 'preface'
      ? '✦'
      : post.slug.replace('part', '').padStart(2, '0')

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

export default function Blogs() {
  const preface = postBySlug.preface
  const [expanded, setExpanded] = useState(false)
  const partCount = posts.filter((p) => p.slug !== 'preface').length

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Blogs"
        subtitle="Tutorials, research insights, and computational workflows — from building a reproducible research environment to notes from the field."
      />

      <Section>
        <Container>
          {/* Collapsible featured series */}
          <div className={styles.series}>
            {/* Banner — always visible, click to toggle */}
            <button
              type="button"
              className={styles.seriesBanner}
              aria-expanded={expanded}
              aria-controls="series-content"
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
                  {expanded ? 'Collapse series' : `Explore all ${partCount} parts`}
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

            {/* Expandable content */}
            {expanded && (
              <div id="series-content" className={styles.seriesContent}>
                {/* Preface */}
                <div className={styles.prefaceRow}>
                  <PostCard post={preface} />
                </div>

                {/* Phases */}
                {phases.map((phase, i) => (
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
                ))}
              </div>
            )}
          </div>

          {/* Future articles */}
          <div className={styles.future}>
            <h3>Future Series &amp; Articles</h3>
            <p>One-off tutorials, research updates, and personal insights — coming soon.</p>
          </div>
        </Container>
      </Section>
    </>
  )
}

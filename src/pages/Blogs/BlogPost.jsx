import { useParams, Link, Navigate } from 'react-router-dom'
import Container from '../../components/ui/Container.jsx'
import SocialLinks from '../../components/ui/SocialLinks.jsx'
import MarkdownArticle from '../../components/blog/MarkdownArticle.jsx'
import ReadingProgress from '../../components/blog/ReadingProgress.jsx'
import { postBySlug, getAdjacentPosts } from '../../data/blogs.js'
import { getBlogMarkdown } from '../../utils/blogContent.js'
import { prepareArticle } from '../../utils/articlePrep.js'
import { socials } from '../../data/profile.js'
import styles from './BlogPost.module.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = postBySlug[slug]

  // Unknown slug -> back to the blog index.
  if (!post) return <Navigate to="/blogs" replace />

  const raw = getBlogMarkdown(post.file)
  const { body, minutes } = prepareArticle(raw || '')
  const { prev, next } = getAdjacentPosts(slug)

  return (
    <article className={styles.article}>
      <ReadingProgress />
      <Container>
        <div className={styles.inner}>
          <Link to="/blogs" className={styles.back}>
            <span aria-hidden="true">‹</span> All blogs
          </Link>

          {/* Clean article header (replaces the Markdown's own title block) */}
          <header className={styles.header}>
            <span className={styles.label}>{post.label}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>Abhigyan Chakraborty</span>
              <span className={styles.dot} aria-hidden="true">
                ·
              </span>
              <span>{minutes} min read</span>
            </div>
          </header>

          {raw ? (
            <MarkdownArticle markdown={body} />
          ) : (
            <p className={styles.missing}>This article could not be loaded.</p>
          )}

          {/* Author / social footer */}
          <footer className={styles.footer}>
            <span className={styles.followLabel}>Follow me</span>
            <SocialLinks items={socials} size="md" />
          </footer>

          {/* Prev / next navigation */}
          <nav className={styles.pager} aria-label="Series navigation">
            {prev ? (
              <Link to={`/blogs/${prev.slug}`} className={styles.pagerLink}>
                <span className={styles.pagerDir}>‹ Previous</span>
                <span className={styles.pagerTitle}>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/blogs/${next.slug}`}
                className={`${styles.pagerLink} ${styles.pagerNext}`}
              >
                <span className={styles.pagerDir}>Next ›</span>
                <span className={styles.pagerTitle}>{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </Container>
    </article>
  )
}

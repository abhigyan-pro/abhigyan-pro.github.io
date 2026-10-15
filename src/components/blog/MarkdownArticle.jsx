import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { rewriteAssetUrl, resolveBlogLink } from '../../utils/blogLinks.js'
import CodeBlock from './CodeBlock.jsx'
import 'highlight.js/styles/github-dark.css'
import styles from './MarkdownArticle.module.css'

// Custom anchor: in-app routes use react-router <Link>, external links open
// in a new tab.
function Anchor({ href = '', children, ...rest }) {
  const resolved = resolveBlogLink(href)
  if (resolved.to) {
    if (resolved.to.startsWith('#')) {
      return (
        <a href={resolved.to} {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link to={resolved.to} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={resolved.href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

function Img({ src = '', alt = '', ...rest }) {
  return <img src={rewriteAssetUrl(src)} alt={alt} loading="lazy" {...rest} />
}

const components = {
  a: Anchor,
  img: Img,
  pre: CodeBlock,
}

export default function MarkdownArticle({ markdown }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        urlTransform={(url) => url}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

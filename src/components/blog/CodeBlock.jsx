import { useState } from 'react'
import styles from './CodeBlock.module.css'

// Recursively pull plain text out of a hast node (for the copy button),
// since rehype-highlight has already split the code into colored spans.
function nodeText(node) {
  if (!node) return ''
  if (node.type === 'text') return node.value || ''
  if (node.value) return node.value
  if (node.children) return node.children.map(nodeText).join('')
  return ''
}

// Custom <pre> renderer: wraps the highlighted code with a header bar that
// shows the language and a copy button.
export default function CodeBlock({ node, children }) {
  const [copied, setCopied] = useState(false)

  const codeEl = node?.children?.find((c) => c.tagName === 'code')
  const classNames = codeEl?.properties?.className || []
  const langClass = classNames.find((c) => c.startsWith('language-'))
  const lang = langClass ? langClass.replace('language-', '') : 'code'
  const text = nodeText(codeEl)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard may be blocked; ignore */
    }
  }

  return (
    <div className={styles.block}>
      <div className={styles.bar}>
        <span className={styles.lang}>{lang}</span>
        <button type="button" className={styles.copy} onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={styles.pre}>{children}</pre>
    </div>
  )
}

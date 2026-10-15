// Prepares a raw blog Markdown string for in-app rendering.
//
// 1. Every post opens with a title, subtitle, and a "Follow me" social block,
//    all terminated by the first `---`. We strip that header chrome
//    (BlogPost renders its own clean header).
// 2. Every post ends with hand-written navigation (**Next:** / **Previous:** /
//    [All Blogs]). That duplicates BlogPost's pager + back link, so we drop
//    just those lines while keeping any surrounding prose (summaries, further
//    reading, sign-offs).
// It also returns an estimated reading time.

// Lines that make up the redundant trailing navigation.
function isNavLine(line) {
  const t = line.trim()
  return (
    /^\*\*Next:\*\*/.test(t) ||
    /^\*\*Previous:\*\*/.test(t) ||
    /^\[All Blogs\]\(/i.test(t) ||
    t === '|'
  )
}

export function prepareArticle(raw = '') {
  const lines = raw.split('\n')

  // Strip the opening header block (everything up to and including the first ---).
  const ruleIdx = lines.findIndex((l) => l.trim() === '---')
  const afterHeader = ruleIdx >= 0 ? lines.slice(ruleIdx + 1) : lines

  // Strip the redundant hand-written nav links.
  let body = afterHeader
    .filter((l) => !isNavLine(l))
    .join('\n')
    .replace(/^\s+/, '')
    .replace(/\n{3,}/g, '\n\n') // collapse blank gaps left behind
    .trimEnd()

  const words = body
    .replace(/```[\s\S]*?```/g, ' ') // drop code blocks from the count
    .replace(/<[^>]+>/g, ' ') // drop raw HTML tags
    .replace(/[#>*`_~[\]()!]/g, ' ') // drop markdown punctuation
    .split(/\s+/)
    .filter(Boolean).length

  const minutes = Math.max(1, Math.round(words / 200))
  return { body, minutes }
}

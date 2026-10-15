// Eagerly load every blog Markdown file as a raw string at build time.
// Keys look like "../content/blogs/Part1.md".
const modules = import.meta.glob('../content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Map bare filename -> raw markdown string.
const byFile = {}
for (const [path, raw] of Object.entries(modules)) {
  const name = path.split('/').pop()
  byFile[name] = raw
}

export function getBlogMarkdown(file) {
  return byFile[file] || null
}

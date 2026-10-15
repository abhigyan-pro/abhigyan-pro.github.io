// Rewrites links/images found inside blog Markdown so they work in the SPA.

// Image/asset paths: "../img/x.png" (and similar) -> "/img/x.png".
export function rewriteAssetUrl(url = '') {
  if (!url) return url
  const m = url.match(/(?:\.\.?\/)*img\/(.+)$/)
  if (m) return `/img/${m[1]}`
  return url
}

// Resolve an anchor href. Returns { to } for an in-app route, or
// { href } for an external link that should open in a new tab.
export function resolveBlogLink(href = '') {
  if (!href) return { href }

  // Anchor-only or already-relative in-app links pass through.
  if (href.startsWith('#') || href.startsWith('/')) return { to: href }

  let url
  try {
    url = new URL(href)
  } catch {
    return { href }
  }

  const isOwnSite = /(^|\.)abhigyan-pro\.github\.io$/i.test(url.hostname)
  if (!isOwnSite) return { href }

  // Same-site blog post links: /Blogs/PartN.html, /Blogs/Preface.html,
  // and the stray /Blogs/5.html (numeric -> partN).
  const blogMatch = url.pathname.match(/\/Blogs\/([^/]+)\.html$/i)
  if (blogMatch) {
    const name = blogMatch[1]
    if (/^preface$/i.test(name)) return { to: '/blogs/preface' }
    const partMatch = name.match(/^(?:Part)?(\d+)$/i)
    if (partMatch) return { to: `/blogs/part${partMatch[1]}` }
    return { to: `/blogs/${name.toLowerCase()}` }
  }

  // Links back to the blogs section or the home page.
  if (url.hash === '#blogs') return { to: '/blogs' }
  if ((url.pathname === '/' || url.pathname === '') && !url.hash) {
    return { to: '/' }
  }

  return { href }
}

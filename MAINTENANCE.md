# Maintenance Guide

A practical "how to change things" guide for this portfolio website. For the
full redesign background, see `../website-js/PROJECT_OVERVIEW.md`.

---

## 1. What this is

- **Stack:** [Vite](https://vitejs.dev) + **React** (JavaScript/JSX, not TypeScript),
  plain **CSS Modules**, and **React Router** for pages.
- **No backend** — a fully static site. All content lives in plain JS data files
  under `src/data/` and Markdown under `src/content/blogs/`.
- `../website-js/` is the **old** HTML/CSS/JS site, kept only for reference. The
  live site is built from **this** folder (`website-react/`).

## 2. Commands

Run these from `website-react/`:

```bash
npm install      # once, to install dependencies
npm run dev      # local dev server at http://localhost:5173 (hot-reloads)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

The dev server only runs while the terminal is open; restart it with
`npm run dev` after a reboot.

## 3. Folder map

```
website-react/
├── index.html              # app entry + GitHub Pages SPA redirect decoder
├── vite.config.js          # base path lives here
├── public/                 # static files served as-is
│   ├── CV.pdf              # the CV (replace this file to update)
│   ├── 404.html           # SPA redirect shim for GitHub Pages
│   └── img/               # all images (hero, logos, publications, gallery…)
└── src/
    ├── main.jsx            # React root + Router + ThemeProvider
    ├── App.jsx             # route table (add new routes here)
    ├── styles/
    │   ├── tokens.css      # ★ design tokens: colors, spacing, glass, fonts
    │   └── global.css      # reset + base typography
    ├── context/ThemeContext.jsx   # light/dark toggle (persists to localStorage)
    ├── components/
    │   ├── Layout, Navbar, Footer, ThemeToggle
    │   ├── ui/             # Button, Container, Section, SectionHeading,
    │   │                   #   PageHeader, Icon, SocialLinks
    │   ├── Home/NeuralBackground.jsx   # animated galaxy / neural background
    │   ├── blog/           # MarkdownArticle, CodeBlock, ReadingProgress
    │   └── gallery/Lightbox.jsx
    ├── data/               # ★ all editable content (see §4)
    ├── content/blogs/      # ★ blog post Markdown files
    └── pages/              # one folder per route (Home, About, Blogs, …)
```

★ = the files you'll usually edit.

## 4. How do I… (common edits)

> Tip: edit the relevant file, keep `npm run dev` running, and the change shows
> live in the browser.

### Edit the hero / profile
`src/data/profile.js` — your name, role line (`headline`), the `affiliation`
chip, `tagline`, `heroImage`, `email`, `location`, social links, the **hero
highlights** strip, and the floating **spotlight** card (the "Open to
collaborations" glass card → links to `/contact`).

### Edit the About page
- Bio + research group + skills → `src/data/about.js`
- Education/career timeline → `src/data/timeline.js`
- Awards & grants and Roles → `src/data/awards.js` (two exports: `awards`, `roles`)

Each timeline/award/role entry has an `icon` field; valid icon names are the
keys in `src/components/ui/Icon.jsx` (e.g. `graduation`, `briefcase`, `trophy`,
`plane`, `star`, `users`). Add a new icon by adding a `<path>` there.

### Add or edit a publication
`src/data/publications.js` — grouped into `Peer-Reviewed Journal Articles`,
`Peer-Reviewed Conference Proceedings`, and `Under Review / Submitted`.
Add an object to the right group's `items`:

```js
{
  authors: 'Surname, A., Chakraborty, A., & Upadhyaya, S.',
  year: '2026',
  title: 'Paper title',
  venue: 'Journal or Conference name',
  status: 'Accepted',          // optional: Accepted | Under Review | Submitted
  href: 'https://doi.org/...', // optional: adds a "Read ↗" link
  note: '*Equal contribution', // optional: small line under the venue
}
```

- Your name (`Chakraborty, A.`) is auto-bolded in the author list.
- The **Home "Publications" count** auto-counts items with **no `status`**
  (i.e. published). Accepted/Under Review/Submitted are not counted.
- To turn an Accepted paper into a published one later, add its `href` and
  remove the `status`.

### Add a blog post

Every post, regardless of whether it belongs to a series, needs two things:

1. The Markdown file in `src/content/blogs/` (e.g. `MyPost.md`).
2. An entry in the `posts` array in `src/data/blogs.js`:

```js
{ slug: 'my-post', file: 'MyPost.md', label: 'Article',
  title: '…', description: '…', image: '/img/blog1.png' }
```

Any post in `posts` automatically gets a working article page at
`/blogs/<slug>` (slug must be unique). What differs is **where it shows on the
`/blogs` index**:

**A. Another part of the existing series** — also add its slug to the right
group in the `phases` array. It then appears under that phase in the series.

**B. A standalone / one-off article, or a whole new series (future)** — the
`/blogs` index page is currently built around the one featured series plus a
"Future Series & Articles" placeholder, so a standalone post or a second series
won't appear on the index on its own yet. To surface them you extend
`src/data/blogs.js` and `src/pages/Blogs/Blogs.jsx`, for example:
- add a `standalonePosts` array (or a second `series` + `phases` set) to the
  data file, and
- render it in `Blogs.jsx` where the "Future Series & Articles" block is (reuse
  the existing `PostCard` component).

This is a small, additive change — the article pages, routing, and rendering
pipeline already handle any number of posts; only the index listing is wired to
a single series today. *(Ask to generalize the blog data model if you expect to
add several series — it can be made fully data-driven so future series need no
code change.)*

Notes (apply to every post):
- The article header (title, read time) is generated; the Markdown's own top
  title + "Follow me" block and its bottom Next/Previous links are **stripped
  automatically** (`src/utils/articlePrep.js`) — no need to remove them.
- Image paths like `../img/x.png` and links to the old
  `abhigyan-pro.github.io/Blogs/*.html` are rewritten to work in-app
  (`src/utils/blogLinks.js`).
- Code blocks get a language label + copy button automatically.
- `getAdjacentPosts` (the Prev/Next pager) currently walks the single `posts`
  order; revisit it if you split posts into separate series.

### Add a gallery event
`src/data/gallery.js` — add an object to `events` (most recent first) with
`title`, `dates`, `location {label, href}`, `links[]`, `description[] {label,
text}`, and `photos[]`. Put the photos in `public/img/gallery/<EventName>/` and
list their full paths. Clicking a photo opens the lightbox.

### Replace the CV
Replace `public/CV.pdf` with a new file of the **same name**. It shows on the
`/cv` page and in the "Download PDF" button. (All "Download CV" links point at
`/CV.pdf` via `profile.cvUrl`.)

### Edit contact info / the map
Text/email/location → `src/data/profile.js`. The embedded Google Map location
is the `MAP_QUERY` constant near the top of `src/pages/Contact/Contact.jsx`.

### Add a new page / route
1. Create `src/pages/MyPage/MyPage.jsx` (+ a `.module.css`).
2. Register it in `src/App.jsx` (`<Route path="/mypage" element={<MyPage />} />`).
3. Add a nav link in the `links` array in `src/components/Navbar/Navbar.jsx`.

## 5. Theming & design tokens

Everything visual is driven by CSS variables in **`src/styles/tokens.css`**,
defined for light mode on `:root` and overridden under `[data-theme="dark"]`.

- **Recolor the whole site:** change `--accent` (and `--accent-hover`).
- **Spacing:** the `--space-*` scale (always use an existing token; if you need a
  new step, define it here first, or it silently resolves to nothing).
- **Glass effect:** `--glass-bg`, `--glass-border`, `--glass-blur`.
- **Light/dark** is toggled by the header button; the choice persists in
  `localStorage` and sets `data-theme` on `<html>`.

## 6. The animated background

`src/components/Home/NeuralBackground.jsx` renders a `<canvas>` that is a
**spinning galaxy in light mode** and a **neural-network of drifting nodes in
dark mode**. It's used on Home, Contact, and CV.

Props (per instance):
- `showy` — bold both modes. `showyGalaxy` / `showyNeural` — bold one mode only.
- `neuralSpeed` / `galaxySpeed` — motion multipliers (1 = default).

Current settings: Home = `showyGalaxy neuralSpeed={1.8}` (showy galaxy, subtle
but faster neural); Contact & CV = `showy`. It is disabled (static frame) when
the visitor prefers reduced motion.

## 7. Images

All images live in `public/img/`. Reference them with an **absolute path from
the site root**, e.g. `/img/hero.jpeg` — not a relative `../img/...` path.

## 8. Deploy (GitHub Pages)

The site auto-deploys on every push to `main` via
`.github/workflows/deploy.yml` (build → upload `dist/` → publish).

**One-time setup** (already done, but if it ever resets): in the repo on
GitHub, **Settings → Pages → Source → "GitHub Actions"**.

- Live URL: **https://abhigyan-pro.github.io**
- Routing uses clean URLs; `base: '/'` in `vite.config.js` suits the root user
  site. For a project repo (`username.github.io/<repo>/`) change it to
  `/<repo>/`.
- To ship changes:

```bash
git add -A && git commit -m "describe the change" && git push
```

Watch the **Actions** tab until the run is green, then hard-refresh the site.

## 9. Gotchas (learned the hard way)

- **Blank white page after deploy** usually means one of:
  1. Pages **Source** is "Deploy from a branch" instead of "GitHub Actions"
     (it then serves the source `index.html`, which loads `/src/main.jsx` and
     fails). Fix: set Source to GitHub Actions.
  2. **CDN / browser cache** — the new build has new asset filenames; wait 1–2
     min and **hard-refresh** (`Ctrl/Cmd+Shift+R`) or use an incognito window.
- **Push rejected ("workflow scope")** — your GitHub token needs the
  **`workflow`** permission (plus `repo`) to push files under `.github/`.
- **CSS Modules:** to style a nested/library element or use a theme selector,
  wrap it in `:global(...)`; plain class names are scoped/renamed.
- **Spacing tokens:** only use `--space-*` values defined in `tokens.css`. An
  undefined one (e.g. a stray `--space-7`) silently produces no spacing.
- **Markdown libraries** (`react-markdown`, `highlight.js`) are code-split into
  the blog-post chunk, so Vite's "chunk > 500 kB" warning on that chunk is
  expected and fine.

# Abhigyan Chakraborty — Portfolio

Personal academic portfolio built with **React + Vite** (JavaScript) and plain
CSS Modules, with an Apple-inspired design, light/dark theme, and in-app
Markdown blog rendering.

## Develop

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Content

All content lives in `src/data/`:

- `profile.js` — name, hero copy, social links, hero highlights
- `about.js`, `timeline.js`, `awards.js` — About page
- `publications.js` — publications (the Home "Publications" count derives from this)
- `blogs.js` + `src/content/blogs/*.md` — blog series and posts
- `gallery.js` — events and photos

Images live in `public/img/`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app
and publishes `dist/` to GitHub Pages. In the repo, set
**Settings → Pages → Source → GitHub Actions**.

`base` is `/` in `vite.config.js` (for the user site at the domain root). For a
project repo served at `username.github.io/<repo>/`, set it to `/<repo>/`.

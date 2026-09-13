# Johan Vaz — portfolio

A small, static portfolio built around real project previews and direct links.

**Live:** [johan-vaz-site.vercel.app](https://johan-vaz-site.vercel.app)

## Run locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. No install step, build pipeline, web fonts, analytics, or client-side JavaScript is required.

## Contents

- `index.html`: project descriptions, links, contact information, and metadata.
- `styles.css`: layout, responsive styles, keyboard focus, and reduced-motion support.
- `assets/demos/`: compressed screenshots captured from the actual public projects on 13 September 2026.
- `assets/portfolio-social.png`: social preview.
- `vercel.json`: security and cache headers.

The page links to nine live project sites and three recorded walkthroughs. Interactive demos, generated-data demos, reports, and early prototypes are labeled separately. The smaller audio landing prototype does not expose conversion controls; the evaluation report is a deterministic comparison without an LLM.

## Updating projects

Edit the semantic project articles in `index.html`. Keep the visible project count, descriptions, preview alt text, and demo labels consistent. Capture screenshots from the actual app; do not replace them with simulated results.

All content and navigation must work with JavaScript disabled. If the JSON-LD changes, regenerate its SHA-256 CSP hash in `vercel.json`, including the exact whitespace inside the script element.

See [DEPLOY.md](DEPLOY.md) for the existing Vercel project and verification steps.

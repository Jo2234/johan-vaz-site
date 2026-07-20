# Deploying the portfolio to Vercel

> **Production is connected.** Pushes to `main` auto-deploy through the existing Vercel Git integration.

## Architecture

The site is dependency-free and zero-build:

- `index.html` — semantic content and metadata
- `styles.css` — visual system and responsive layout
- `script.js` — progressive interactions
- `assets/` — favicon and social preview
- `vercel.json` — security and caching headers

Vercel framework preset: **Other**. There is no install command, build command, or output directory.

## Approval-gated release flow

Do not push a branch or run `vercel` commands until the local build has been reviewed and explicit deployment approval has been given. A branch push may create a public Vercel preview.

1. Work and test on a local feature branch.
2. Review local desktop/mobile screenshots, interactions, links, metadata, and accessibility checks.
3. Ask for approval to create a Vercel preview.
4. After approval, push only the feature branch and review the generated preview URL.
5. Ask separately for production-deployment approval.
6. Only after production approval, merge into `main` and push `origin/main`.
7. Verify the production URL, social image, security headers, anchor navigation, and external links.

The existing Git integration should be used rather than creating a duplicate Vercel project with the CLI.

## Local preview

Serve the directory with any static server, for example:

```bash
python3 -m http.server 4173 --directory .
```

Then open <http://localhost:4173>.

Opening `index.html` directly also works because CSS and JavaScript use relative paths.

## Post-release checklist

- [ ] Confirm `https://johan-vaz-site.vercel.app/` loads without console errors.
- [ ] Check the four interactive project previews by keyboard and pointer.
- [ ] Check 390px mobile, tablet, and desktop layouts.
- [ ] Confirm the Open Graph image resolves at `/assets/johan-vaz-og.png`.
- [ ] Confirm `robots.txt` and `sitemap.xml` resolve.
- [ ] Confirm CSP and other response headers in browser developer tools.
- [ ] Add the final URL to the résumé, GitHub profile, and LinkedIn featured section.

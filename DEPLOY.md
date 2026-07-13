# Deploying this site to Vercel

> **Status: connected.** Pushes to `main` auto-deploy via the Vercel GitHub App.
> Everything below is kept for reference / re-setup.

This is a zero-build static site — one `index.html`, no dependencies, no framework.
That makes deployment trivial. Three options, easiest first.

---

## Option A — Drag and drop (60 seconds, no terminal)

1. Go to <https://vercel.com/new> and log in (use "Continue with GitHub" → Jo2234).
2. Drag the entire `johan-site` folder onto the upload area
   (or click "Browse" and select the folder).
3. Vercel detects it as a static site. Click **Deploy**.
4. Done — you get a URL like `johan-site.vercel.app`.

## Option B — Vercel CLI (best for quick redeploys)

```bash
cd johan-site
npx vercel          # first run: log in, accept defaults, deploy to preview
npx vercel --prod   # promote to production URL
```

When it asks questions, the defaults are all correct:
- Set up and deploy? → Y
- Which scope? → your account
- Link to existing project? → N
- Project name? → johan-site (or whatever you like)
- In which directory is your code? → ./
- Modify settings? → N (there is no build step)

Every future update: edit `index.html`, then `npx vercel --prod` again.

## Option C — GitHub-connected (recommended long-term)

This gives you automatic deploys on every push, which is the professional setup:

```bash
cd johan-site
git init && git add -A && git commit -m "Personal site"
gh repo create johan-vaz-site --public --source=. --push
```

Then on <https://vercel.com/new>: **Import** the `johan-vaz-site` repo → Deploy.
From then on, `git push` = live site update. No build settings needed
(Framework Preset: "Other", no build command, output directory: leave blank).

---

## Custom domain (optional but worth it)

1. Buy `johanvaz.com` / `johanvaz.dev` (~US$10–12/yr on Namecheap, Porkbun, or Vercel itself).
2. Vercel dashboard → your project → **Settings → Domains** → add the domain.
3. Follow the DNS instructions it shows (usually just an A record or nameserver change).
4. HTTPS is automatic.

A custom domain on your resume/GitHub profile reads far better than `*.vercel.app`.

---

## After it's live — checklist

- [ ] Add the URL to your GitHub profile (github.com/Jo2234 → Edit profile → Website).
- [ ] Add it to your LinkedIn header and your resume.
- [ ] Update the "Featured builds" table in your profile README to link to the site.
- [ ] The email address (v.johan2234@gmail.com) is in the Contact section — if you'd
      rather not expose it to scrapers, delete the mailto button in `index.html`
      (search for `mailto:`) and rely on LinkedIn instead.

## Editing notes

- Everything is in `index.html` — styles are embedded in the `<style>` block, content
  is plain HTML below it. No build step means no tooling can break.
- Colors live in the `:root` CSS variables at the top (`--accent` is the green).
- Project cards are in the `<section id="work">` block — copy a `<a class="card">`
  block to add one, delete to remove. Keep it at 4–6 cards; curation is the message.
- When you deploy a live project (e.g., the regime dashboard), change that card's
  link from the GitHub repo to the live URL and add a "LIVE" badge — swap the
  `flag-badge` markup from the flagship card.

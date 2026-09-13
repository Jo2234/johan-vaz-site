# Deploying the portfolio

Production: **https://johan-vaz-site.vercel.app**

Use the existing Vercel project `johan-vaz-site` in `johans-projects-b72145b2`. The Git integration deploys changes to `main`; do not create a duplicate project.

## Architecture

Static HTML and CSS, with local images. Vercel framework preset: **Other**. There is no install command, build command, or output directory.

## Local review

1. Serve the repository with `python3 -m http.server 4173`.
2. Review desktop, tablet, and mobile layouts, including 320px width and 200% zoom.
3. Check keyboard focus, skip link, section navigation, and every project link.
4. Verify all preview images load and all content remains visible with JavaScript disabled.
5. Check metadata and the social preview. The canonical domain is `johan-vaz-site.vercel.app`.
6. If changing JSON-LD, update the matching script hash in the CSP.

## Release

Use the deployment authorization established for the task. Publish a reviewed feature branch and inspect the Vercel preview. Merge only the reviewed commit after its checks pass. Verify the production alias serves the merged commit.

If a manual deployment is necessary, link the checkout to the existing project, inspect any generated local environment files without exposing secrets, and deploy the clean merged revision with its Git commit metadata.

## Production checks

- Confirm the homepage, stylesheet, six project previews, favicon, social image, robots file, and sitemap return successfully.
- Confirm production desktop/mobile layouts and keyboard navigation.
- Check security headers and browser console for CSP or resource errors.
- Check the eight live project URLs and three narrated video players, caption tracks, and downloads.
- Compare the served HTML and assets with the merged revision.

Verify that videos load only on demand, play with audible narration, expose captions, and pause each other when JavaScript is enabled.

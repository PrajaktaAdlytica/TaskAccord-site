# Manual Vercel connection

1. Open [vercel.com/new](https://vercel.com/new) and sign in.
2. Choose **Import Third-Party Git Repository**, connect GitHub if prompted, and select `PrajaktaAdlytica/TaskAccord-site`.
3. Keep the production branch as `main`.
4. In the project settings use:
   - **Framework preset:** Vite
   - **Root directory:** `./` (the repository root)
   - **Install command:** `npm ci`
   - **Build command:** `npm run build`
   - **Output directory:** `dist/client`
5. Leave environment variables empty. This build does not require secrets or a backend service.
6. Deploy. Vercel will read `vercel.json`, which contains the SPA rewrites for public, product and synthetic-demo routes.
7. After deployment, open the production URL directly and hard-refresh these representative routes: `/`, `/product/authority`, `/preview-access`, `/sign-in`, `/demo/tasks/M-DEMO-1`, `/limits`, `/contact` and `/privacy`.
8. Check the homepage intro handoff, **Back to intro**, mobile navigation, the demo Reset control, form status states, Pause/Replay controls and the footer links.
9. To add a domain, open **Project Settings → Domains**, enter a domain you own, then apply the exact DNS records Vercel provides. Verify the apex, `www`, HTTPS and redirects before publishing the domain.

The site is a research-stage concept. Forms are local-only drafts, the demo data is fictional, and no authentication, payment, legal signature, analytics receiver or lead service is connected.

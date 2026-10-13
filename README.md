# TaskAccord website

A complete, responsive research-stage company website and isolated synthetic demo, rebuilt on 13 October 2026 around the original brief and information architecture. The homepage covers the buyer, problem, six-step workflow, all five proposed modules, rejected change, actual prototype evidence, owners, protocol boundaries, limitations, pilot hypotheses, FAQ and joint application.

Approved identity: Accord Span logo, TaskAccord wordmark, Newsreader / Public Sans, ivory, paper, sage, clay, limestone, brass and ink. Conventional page layouts use original brand-kit diagrams and shutter-label interactions. The camera journey, full-screen landscape and cropped mockup cards are removed from the active application. The initial rebuild reused existing assets. The subsequent browser-comment refinement adds one original survey-paper hero texture, distinct section materials, shutter reveals, controlled SVG animations and a walkthrough of genuine prototype captures. The complete approved brand kit is included in `docs/brand-kit`; intro visual research and concept frames are included in `docs/intro-concepts`.

## Preview

The verified local preview is served at http://localhost:4173/ .

The current application prepares a local draft only. Nothing is sent or persisted. The contact address is hello@taskaccord.example; LinkedIn and Crunchbase icons are inactive as requested. There is no authentication, live lead service, legal e-signature, escrow, payment, KYC, customer data or agent integration.

## Pages

Home; product overview; five module detail pages; how it works; intended teams; pilot and hypothetical pricing; joint application; limits and legal; resource checklist; protocol boundaries; about; contact; privacy; terms; accessibility; preview access; demo boundary; ten-record queue; opened records with seven tabs; evidence report and sample JSON export; data dictionary.

## Implementation

- `src/company-site.css`: company website presentation.
- `src/product-pages.css`: module-specific section materials and explicit finite product stories.
- `src/material-motion.css` and `src/Motion.jsx`: textured materials, shutter/focus effects and visibility/reduced-motion-aware illustrative sequences. Archived camera components are not imported or mounted.
- `src/App.jsx`: navigation, public pages, two-step local application and synthetic workspace.
- `src/data.js`: ten canonical fictional records, chronological timelines and explicit dictionary.
- `src/logic.mjs`: integer-cent spending check, sample export and consented in-memory event queue.
- `src/styles.css`: responsive brand system, shutter transitions, visible focus and reduced motion.
- `public/assets`: approved brand assets, licensed fonts / icons, generated textures and original animated diagrams.
- `screenshots`: genuine browser captures; not generated product mockups.
- `docs`: deployment runbook, source register, coverage, instrumentation and experiment handoff.
- `design-qa.md`: recorded visual review and functional verification; current browser evidence supersedes earlier revision checks.

## Commands

Tested with Node 24.19.0 and npm 8.15.0. Dependencies are pinned in package-lock.json.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
npm run build
npm test
npm run test:sites
```

Build produces `dist/client` plus the preserved Sites worker packaging in `dist/server` and `dist/.openai`. Vercel configuration points at `dist/client`. No environment variables or external credentials are required for the preview.

Website implementation, publication, production service activation and customer validation are separate milestones. This build does not demonstrate commercial demand or legal enforceability. See `docs/DEPLOYMENT-RUNBOOK.md` for the Vercel handoff and final hosted QA checklist.

Product detail pages now share four-stage module-specific motion stories and a full genuine-capture walkthrough. Latest captures: screenshots/product-refinement.

How it works now uses a textured hero, an explicit authority sequence and a pausable four-stage protocol-boundary explanation. Current captures: screenshots/how-refinement.

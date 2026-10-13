# Deployment and operation

## Current status

The source is ready for the GitHub repository `PrajaktaAdlytica/TaskAccord-site`. No Vercel deployment, domain connection or production collection is claimed yet. The preview has no secrets and no outbound agent, contract, payment or analytics calls.

## Reproduce

1. Use the source root containing package.json, index.html and vite.config.mjs.
2. Run npm ci, npm run build and npm test. Run npm run test:sites for worker packaging.
3. Start npm run dev -- --host 127.0.0.1 --port 4173 --strictPort for local editing. Use npm run preview -- --host 127.0.0.1 for a compiled preview.
4. Keep the fixture-only boundaries intact. Do not replace simulated identifiers with real signatures or connect live payment rails as a routine website change.

## GitHub / Vercel handoff

The repository root is this folder. Commit this source without node_modules, dist, credentials or private records, then connect the GitHub repository to the intended Vercel project. Configure the website folder as project root; build command `npm run build`; output `dist/client`. `vercel.json` supplies known SPA route rewrites and basic response headers. Existing worker and Sites packaging remain available independently.

Vite SPA deep links require routing configuration on Vercel. The supplied rewrites use the documented same-application pattern; unknown API paths are deliberately not mapped to the website. Confirm direct navigation and reload on every public and demo route after deployment. [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [rewrite configuration](https://vercel.com/docs/routing/rewrites).

A final hosted browser review is required. Local tests do not prove Vercel or domain behavior.

## Domain

TaskAccord name/domain ownership and trademark clearance are not established by this website. Once a cleared, owned domain is selected, add it to the correct hosting project and apply the DNS records that project supplies. Do not guess or reuse records from another project. Verify apex, www, redirects, TLS and contact routes, then add canonical and absolute Open Graph URLs.

## Replace provisional contact details

Update hello@taskaccord.example in contact, privacy and application copy when the real address is supplied. Replace inactive LinkedIn / Crunchbase buttons only with verified profile URLs. Use actual operator details in a counsel-reviewed privacy notice before collecting leads.

## Before live lead collection

Publish the operator, purposes, processors, retention schedule, deletion route and applicable lawful basis. A proposed minimum is unqualified inquiries deleted after 90 days and consent withdrawn promptly, subject to counsel's applicable requirements; this is not an active policy. Connect a secured server-side endpoint with consent validation, rate limits, abuse controls and explicit error states. Collect only required business context; exclude uploaded contracts, logs, credentials, payment details and secrets. Implement double opt-in where required. Only then replace local draft language with real submission confirmation.

Current form data is React session state and disappears on navigation away or reload. Preferences ta-still and ta-measurement are the only localStorage values. Privacy choices revoke and clear the in-memory event queue. No server receives leads or events in this build.

## Analytics activation

Use EVENT-SCHEMA.json as the contract. Add a consent-aware receiver, validate the allow-list and deduplicate event_id server-side with an appropriate retention window. Store synthetic demo events separately from leads. Never fire verified_signup or interview_booked from a local draft. Verify UTM mapping, revocation, duplicate submissions and deletion end to end before an ad campaign.

## Demo boundary

Ten fictional records restore from Reset demo. Read-only canonical fixtures; explicit local mock transitions only. Sample exports contain DEMO, SYNTHETIC DATA, CONCEPT PREVIEW and SIMULATED; NON-BINDING. Authority, agent identity, limit checks, delivery, human acceptance and settlement remain separate states. No actual money, escrow, KYC or legal e-signature is connected.

## Release checks

Check all CTAs, direct routes, errors and success, keyboard focus, mobile menu, reduced motion, reset, filtering, export, privacy choices, metadata and favicon. Inspect network requests for unintended third parties. Keep hypothesis pricing labels and demo watermark. Recapture desktop 1440px and mobile 390px shots when layout or fixtures change.

## Performance and rollback

The active website uses conventional responsive HTML and original brand SVG diagrams. No WebGL/camera component is imported or mounted. Background study files and raster image masters are historical assets only.

The production bundle is approximately 91 KB JavaScript gzip and 24 KB CSS gzip, excluding local fonts and images. These are build sizes, not Lighthouse or real-device performance scores. Hero content is native HTML; diagrams are small local SVGs; noncritical prototype captures load lazily.

Rollback to the last verified Git commit / hosting deployment if navigation, consent or synthetic isolation fails. Reset demo is unrelated to deployment rollback and deletes no real data.

Current motion layer uses visibility-aware native CSS/inline SVG and a pausable actual-capture walkthrough. Check Pause/Replay, manual view selection, off-screen suspension and reduced-motion still states on release. Hero texture runtime is about 407 KB.

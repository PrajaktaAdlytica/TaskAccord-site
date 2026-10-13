# TaskAccord implementation instructions

## Current governing decision — 13 October 2026
The user rejected the prior visual implementation and explicitly canceled scrolling/camera design. Build a conventional premium SaaS company website from the original brief, outputs/taskaccord-research-and-ia.html and approved brand kit. This supersedes every earlier 3D, panorama, mockup-composition and camera instruction.

- Approved logo A / Accord Span; exact TaskAccord casing. Newsreader and Public Sans; paper/ivory/sage/clay/limestone/brass/ink. Reuse original brand diagrams; native HTML and visible product evidence.
- Clear buyer and scope, six-step bounded workflow, all five separate proposed offers, real prototype captures, owners, adjacent protocols/substitutes, limitations, price hypotheses, pilot gates, FAQ and qualified CTA.
- Full multi-page IA and visible footer map. Ordinary native scrolling; no cinematic camera background or montage cards. Motion is local and purposeful; shutter labels and reduced-motion support.
- Research-stage concept only. No operating product, real contracts/signatures/escrow/payments/KYC, invented customers, revenue, certifications or integration status.
- Canonical sample: fictional Alder Analytics / Pine Research; M-DEMO-1 Research summary; $120 ceiling; $180 rejected change; receipt awaits human acceptance. Ten consistent fixtures; persistent synthetic/non-binding demo marks; reversible local simulation/reset only.
- Contact hello@taskaccord.example without extra email labels. LinkedIn and Crunchbase icons inactive until supplied. Application prepares local draft; do not claim sending/persistence or real signup.
- App lives in src. company-site.css is the active public design override. Keep Sites worker/build scripts/tests intact. Build and test; run local preview yourself; verify desktop 1440 and mobile 390 captures. Latest screenshots: screenshots/brief-rebuild.
- Publication, custom domain, operational service and legal/customer validation are separate milestones. Do not claim a visual QA check is user approval.

## Browser-comment refinement
- All 18 comments implemented: original survey-paper hero texture, fixed-fact hero animation, six textured shutter workflow links, animated native brand diagrams, genuine-capture walkthrough, sage owners, sand ecosystem with controlled path emphasis, clay commercial background and restrained pricing hovers.
- Motion remains local; never reinstate a camera journey. Preserve all synthetic/non-binding labels and human acceptance pending. MotionSurface shares Pause, respects live reduced-motion changes and stops while off-screen/hidden. Direct walkthrough selection holds its view; Replay resumes from authority; automatic progression ends at mock invoice mismatch.
- Hero asset survey-paper-hero-v2.webp; material-motion.css is the latest layer. Current evidence: screenshots/material-motion. Research: docs/MATERIAL-MOTION-RESEARCH.txt.

## Product-detail refinement
Apply the seven product-page comments to all five detail routes. product-pages.css defines module-specific job/steps/evidence materials, a deep-sage closing CTA and matching capture background. ProductMotionSequence has four explicit stages, auto advances only while visible, holds at the final gate/rejection/mismatch, supports direct selection and Pause/Replay. ProductCapture fullSequence starts at Authority on every module, including reconciliation. No new generated artwork is needed. Current evidence: screenshots/product-refinement.

## How-it-works refinement
The How it works hero uses the survey-paper background and explicit authority sequence. The protocol section retains its copy/source links and adds ProtocolMotionSequence: existing agreements → A2A communication → AP2/x402 payment evidence → separate human authority/jurisdiction review. Auto progression holds at review; direct stages, Pause/Replay, reduced motion and visibility suspension remain available. No live integrations or settlement are implied. Latest evidence: screenshots/how-refinement.

## For teams refinement
The /use-cases hero uses the existing survey-paper texture with sage tint and a four-stage authority sequence. Pause, Replay, direct stage selection, reduced-motion and visibility suspension reuse the shared system. Current evidence: screenshots/teams-refinement.

## Pilot refinement
Pilot gates use sage paper; the decision section uses clay paper. Pricing cards have a pointer-only 2px lift, brass border/top rule, subtle texture reveal, stationary keyboard focus and visible CTA outline. Touch/reduced motion preserve a stable layout. Evidence: screenshots/pilot-refinement; research: docs/PILOT-HOVER-RESEARCH.txt.

## Limits & legal refinement
The limits-page hero uses archive survey paper and the explicit authority sequence. Boundary cards sit on limestone paper; the final preview section uses sage paper. Preserve all six disclosures and source links. Motion retains Pause, Replay, direct stages, reduced motion and visibility suspension. Evidence: screenshots/limits-refinement.

## Preview access refinement
Preview access has its own clay drafting-paper hero and native sample workspace diagram (Sample → Boundary → Review), replacing the shared authority diagram. Auto progression holds at review; direct stages, Pause, Replay and shared reduced-motion/visibility handlers retained. Preserve fixed $120 ceiling, rejected $180 proposal and human acceptance pending. Evidence: screenshots/preview-refinement.

## Account entry
Preview access is in the main navigation. Sign in (/sign-in) is in header actions, mobile menu and footer. Email-only form is a local frontend preview: no account authentication, email sending or persistence. Submission reports that honestly; open synthetic workspace remains available. No password collection. Evidence: screenshots/signin-refinement.

## Scroll reveals
useScrollReveal in src/ScrollReveal.jsx applies native IntersectionObserver/WAAPI alternating left/right entries to static public page groups, staggered 100ms (capped 300ms), 650ms duration. Re-entry replays both directions. Existing MotionSurface diagrams, forms and demo are excluded. Shared Pause and live reduced-motion preference cancel animation. Content is never hidden outside an active entry animation; keyboard focus cancels its animation. No Lenis/GSAP dependency or scroll hijacking. Evidence: screenshots/scroll-refinement.

Limits cards use explicit icon, heading and body spacing with equal desktop/tablet heading space. Preserve left alignment and responsive padding. Evidence: screenshots/card-spacing.

## Homepage video intro — current user direction
The user supplied a Palomar landing-page prompt and asked to add its intro above the homepage hero. HomeIntro uses the exact supplied CloudFront video, full viewport/minimum 700px, muted autoplay/loop/playsInline, object-cover/bottom positioning, frosted announcement and light left-aligned heading. Adapted for TaskAccord: original navigation, approved fonts, honest research-stage announcement, no Palomar investor/credit claims. Original company hero and all content remain below. No video overlay or visible controls, as requested in the supplied prompt. Shared pause, reduced motion, hidden-tab and off-screen suspension apply. This supersedes earlier no-intro decisions only for this added section. Source video was user supplied; authorship/license was not independently established. Evidence: screenshots/video-intro.

Intro playback now runs once (no loop), then scrolls to #homepage-hero with a 76px header offset. The hero includes Back to intro, which resets the video, returns to the top and replays. Automatic handoff only occurs while the intro is visible. Manual reduced-motion replay is allowed; scrolling is instant under reduced motion.

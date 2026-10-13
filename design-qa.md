# Intro completion and replay QA — 13 October 2026

Video now plays once and hands off to the existing hero. Natural browser playback confirmed duration 10.041667 seconds, ended=true, paused=true, hero top=76px and scrollY=728 at the annotated 775px width. Back to intro confirmed ended=false and currentTime=0; subsequent natural completion returned to the hero again. No horizontal overflow at 775px. Build and all 10 tests passed. Evidence: screenshots/video-intro/hero-after-intro.png.

# Homepage video intro QA — 13 October 2026

Added the supplied full-viewport video treatment above the existing hero. Exact supplied CloudFront URL retained; TaskAccord brand/navigation/copy retained rather than Palomar launch/investor claims. Browser confirmed loaded media (readyState 4), advancing playback time, muted loop/inline markup, cover/bottom framing and off-screen pause. At desktop 1440 × 1000, tablet 775 × 804 and mobile 390 × 844 the intro fills the viewport, the original hero starts immediately beneath, and there is no horizontal overflow. Desktop/mobile screenshots visually inspected; no console errors. Build and all 10 tests passed. Reduced-motion/hidden-tab handlers implemented; OS preferences not altered. No footage was generated or downloaded; the remote user-supplied asset is streamed. Evidence: screenshots/video-intro.

# Limits card spacing QA — 13 October 2026

All six disclosure cards now have consistent responsive padding, explicit icon/heading/body gaps, left alignment and equal heading space for aligned body starts in paired rows. At the annotated 775px width all six body insets measured 152px, with 28px padding and 63px heading height. Desktop 1440 and mobile 390 showed no horizontal overflow; mobile uses 26px vertical/24px horizontal padding and natural heading height. Build passed. Evidence: screenshots/card-spacing.

# Scroll reveal QA — 13 October 2026

Added reusable native scroll reveals across static public sections, alternating left/right with stagger. Existing motion diagrams and form controls excluded. Verified actual entry/re-entry counters on product record groups: counts progressed from one to two after scrolling down, up and down. Verified hero text upward re-entry on For teams. Browser checked 1440 and 390 widths with no overflow or console errors. Build and all 10 tests passed. Shared pause and reduced-motion changes disconnect observer/cancel animations; focused elements cancel their animation. Reduced-motion preference was not changed at OS level. Evidence: screenshots/scroll-refinement.

# Sign-in and navigation QA — 13 October 2026

Added /sign-in, main-navigation Preview access, header Sign in, mobile Sign in and footer entry. Branded responsive email-only sign-in preview with explicit unconnected authentication notice and direct sample access. Verified local submission status with fictional reviewer@example.com, then cleared by reload. No credential persistence or transmission implemented. Desktop 1440 × 1000 and mobile 390 × 844 had no overflow; both mobile navigation links visible, Sign in navigation verified. No console errors. Build and all 10 tests passed. Evidence: screenshots/signin-refinement. Backend authentication remains unimplemented.

# Preview access refinement QA — 13 October 2026

Requested distinct hero diagram and background implemented. Clay drafting-paper uses the existing ivory texture. Native HTML sample workspace sequence explains the sample, ceiling/rejected proposal and pending human review in three stages; no authority-diagram reuse. Build and all 10 tests passed. Browser checked at 775 × 804, 1440 × 1000 and 390 × 844 with no horizontal overflow or console errors. Verified direct review selection, Pause and Replay reset/running. Shared reduced-motion and offscreen/hidden handlers retained. Genuine desktop hero and full mobile screenshots: screenshots/preview-refinement. User visual acceptance and deployment remain separate.

# Limits & legal refinement QA — 13 October 2026

All four browser comments implemented: archive-paper hero, four-stage authority motion sequence, limestone disclosure background and sage preview background. Existing six disclosures and sources retained. Build and all 10 tests passed. Browser checked at 775 × 804, 1440 × 1000 and 390 × 844 with no horizontal overflow or console errors. Verified all three computed backgrounds, direct final-stage selection, Pause (paused) and Replay (stage zero/running). Shared reduced-motion and visibility logic retained. Actual screenshots: screenshots/limits-refinement. User visual acceptance and deployment remain separate.

# Pilot refinement QA — 13 October 2026

All three comments implemented. Sage paper gates and clay decision backgrounds use existing brand textures. Pricing hover adds a 2px pointer lift, brass emphasis and faded texture; keyboard focus keeps cards stationary with a clear CTA outline. Reduced-motion and touch overrides retained. Build and all 10 tests passed. Browser checked at 775 × 804, 1440 × 1000 and 390 × 844; no horizontal overflow, no console errors. Verified actual section background images and keyboard focus-within. Screenshots: screenshots/pilot-refinement. Research uses configured Perplexity high preset and official MDN/web.dev/W3C sources. Visual approval and deployment remain separate.

# For teams refinement QA — 13 October 2026

Both browser comments implemented: sage survey-paper hero background and the explicit four-stage authority sequence. Browser checked at 1440 × 1000, 775 × 804 and 390 × 844 with no horizontal overflow. Direct final-stage selection, Pause and Replay verified; console inspection returned no errors. Shared reduced-motion and visibility behavior retained. Build and all 10 tests passed. Actual desktop/mobile screenshots saved in screenshots/teams-refinement. User visual acceptance and deployment remain separate.

# How it works refinement QA — 13 October 2026

All three browser comments implemented. The hero now has an existing local survey-paper texture and a four-stage authority motion sequence. The protocol section retains the original copy, source links and boundary CTA and adds an independent four-stage explanation of existing agreements, communication, payment evidence and separate human review.

Build and all 10 tests passed. Browser tested at the annotated 775 × 804 width, desktop 1440 × 1000 and mobile 390 × 844. No horizontal overflow at tested narrow widths; console inspection returned no errors. Verified protocol direct final-stage selection, Pause (data-motion paused), Replay (stage zero/running), automatic final review hold and off-screen hero suspension. The same reduced-motion/hidden-tab handlers are reused; no operating-system preference changes were made.

Genuine screenshots: screenshots/how-refinement (desktop hero, protocol panel, full page, mobile hero/protocol). Visual review opened desktop hero and mobile protocol capture. Original six-step workflow, synthetic labels and primary-source links retained. No new image generation, WebGL, actual integration, operational writes or payments added.

User visual acceptance and deployment remain separate from these implementation checks.

# Product-detail refinement QA — 13 October 2026

Implementation checks passed. User visual acceptance remains separate.

All seven requested changes applied to all five product detail routes: authority, scope, mandates, receipts and reconciliation. Hero and main job diagrams now have explicit four-stage stories rather than only ambient connector emphasis. Each story ends at a human gate, rejection, pending acceptance or mismatch and holds there. Direct stage selection, shared Pause and Replay work. The genuine-capture walkthrough begins at Authority on every module and retains all five views.

Distinct material backgrounds now cover hero, job, numbered steps, inputs/exceptions and product evidence; closing CTA uses deep sage with high-contrast ivory copy. Module-specific sage, ruled ivory, clay, limestone and mushroom palettes reuse existing local textures. No additional image generation, external animation library, camera or operational calls were added.

Build and all 10 tests passed. At the commented 775px width all five pages report zero horizontal overflow, two ProductMotionSequence surfaces, textured job/steps/input backgrounds, deep-sage closing surface and Authority as the initial capture view. At 390 × 844 all five pages report zero horizontal overflow; stage buttons are 48px high. Five desktop and five mobile genuine hero captures saved. Desktop Authority full-page capture also saved and reported no broken completed images; browser console returned no errors.

Browser verified Authority final-stage selection (Human approval remains required), Pause (data-motion paused), Replay (stage zero/running), and reconciliation automatic completion at Mismatch with explicit no-payment/no-settlement wording. Existing off-screen, hidden-tab and reduced-motion handling reused. Operating-system reduced-motion preference was not changed for testing.

Latest evidence: screenshots/product-refinement. Existing homepage material-motion captures remain valid for that prior refinement. Product module copy, IA, synthetic fixture boundary, price hypotheses, forms and legal routes retained. No deployment or operating-product claim.

# TaskAccord material and motion QA — 13 October 2026

Implementation checks passed. User visual acceptance remains separate.

All 18 browser comments addressed: hero texture, task animation, six material shutters, three specifically requested diagrams (plus the other brand diagrams), product evidence background/walkthrough, owners and ecosystem backgrounds, ecosystem path animation, warm commercial surface and pricing hover/focus treatment.

Production build passed; all 10 existing meaningful tests passed. Browser checked at the user’s 775px viewport, desktop 1440 × 1000 and mobile 390 × 844. No horizontal overflow at tested sizes; no browser console errors. Genuine current captures: screenshots/material-motion.

Pause/Resume verified via actual animation-play-state and data-motion. Hero facts remained unchanged, with Human acceptance pending. Off-screen hero paused when a receipt diagram ran. Keyboard focus fully revealed the shutter texture (scaleX 0 → 1); pricing focus lifted the card 3px. Prototype automatic progression reached Reconciliation, held at mock mismatch, paused successfully, and allowed direct Receipt selection with pending acceptance. Replay restarts from authority. All linked screenshots remain actual prototype renders, visibly synthetic and non-binding.

Visual review inspected textured hero, mobile hero, workflow focus reveal, SVG diagrams, ecosystem and pricing surfaces. A sparse mobile hero crop protects headline readability; controls meet 44px height on mobile. Reduced-motion CSS and reactive media handling reviewed in source; the operating-system preference was not changed for testing. No Lighthouse score or accessibility certification claimed.

One new original background image (407 KB runtime); other materials reuse local textures. No WebGL, camera, external animation library, live agent calls, payments, operational writes or real form transmission added. Existing brief, IA, synthetic fixtures, lead boundaries and hypothesis pricing retained.

Research/rationale: docs/MATERIAL-MOTION-RESEARCH.txt. Asset prompt/provenance: docs/MATERIAL-MOTION-ASSET.txt. Previous screenshot folders are historical revisions.

Intro copy updated to: Clear boundaries for agent tasks. Human authority at every step. Announcement: Research-stage concept · Explore a bounded task. Build passed; current browser wording verified. Evidence: screenshots/video-intro/intro-copy-v2.png.

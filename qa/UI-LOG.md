# UI and release log

Final material review completed on 2026-08-17 against the deployed Cloudflare
Pages site at `https://deans-quality-transmissions-concept.pages.dev/`.

## Coverage

- Two routes, two visual directions, and twenty in-page states.
- Desktop 1440×900, tablet 820×900, and mobile 390×844.
- 61 captured viewport states, including the expanded mobile FAQ, the
  person-free AI placeholder section, the licensed transmission gallery, and
  all three new AI concept-photo placements.
- Keyboard skip-link visibility and focus treatment checked.
- Horizontal geometry, heading structure, image loading, and critical 44px tap
  targets checked at every viewport.
- Browser console warnings/errors, page exceptions, failed requests, and HTTP
  error responses checked in fresh sessions.
- All 19 customer-facing links to Dean's current website and the Google review
  source link fetched successfully.

## Findings and disposition

- A missing site icon produced one browser 404. Added the original mechanical
  gear icon and reran the full matrix; the 404 is gone.
- Early development runs exposed a stale `next/image` optimizer reference after
  the starter dependency changed. The page now uses the local generated image
  directly; fresh browser sessions are clear.
- Mobile review found one long-heading overflow and overly dense hero artwork.
  The type scale and mobile composition were repaired and rechecked at 390px.
- Outlined display text inherited a transparent fill color in one section. Its
  stroke colors are now explicit and visible in all tested viewports.
- The `/shade` route was absent at baseline. It now provides a distinct
  service-first direction with its own metadata, disclosure, responsive layout,
  family-shop proof, and the complete Dean's customer-link matrix.
- A first-pass focus check sampled the animated root skip link before its
  transition completed. The gate now waits for the visible focus state and both
  routes pass at every viewport.
- The first public `/shade` pass exposed static-host RSC prefetch errors from
  internal framework links. The two cross-direction links now use deliberate
  native navigation; the rebuilt static export is console-clean.
- A user screenshot exposed the original direction's embedded hero typography
  behind the `/shade` headline. The hero now isolates a clean mechanical crop,
  uses an opaque service-direction content panel, and keeps the headline to
  three intentional desktop lines with a compact four-line mobile reflow.
- The named Dean and Deena portrait cards were removed at the user's request.
  Two person-free, AI-generated mechanical placeholders now appear with
  explicit AI concept labels and descriptive alternative text.
- Three transmission cutaway photographs were sourced from Wikimedia Commons,
  optimized locally as WebP, and added in a dedicated educational gallery.
  Each photo has a visible creator/source/license link, and the page explicitly
  says the images do not depict Dean's shop, technicians, or customer work.
- The large PNG hero/preview asset was re-encoded as a visually equivalent JPEG,
  reducing it from 1.89 MB to 288 KB without changing its crop or dimensions.
- Three original, person-free automotive photographs were generated with the
  built-in image tool and optimized locally as WebP: a diagnostic service bay,
  a transmission rebuild bench, and an underbody drivetrain inspection. Each
  placement carries a visible `AI concept image` label plus a statement that it
  does not depict Dean's actual shop.
- Dean's public Google Maps listing was checked on 2026-08-17. Both directions
  now include a 4.8 / 5 rating snapshot from 184 reviews, three short five-star
  excerpts, a direct Google source link, and a visible freshness disclaimer.
  Tablet review cards in the service-first direction were widened after visual
  inspection to prevent one-word staircase wrapping.

## Final result

- Automated visual score: **100 / 100**
- P1 findings: **0**
- P2 findings: **0**
- Build: **pass**
- Render test: **pass**
- ESLint: **pass**
- Production dependency audit: **0 vulnerabilities**
- Decision: **ready for the labeled, noindex demo deployment**

Machine-readable evidence is saved in `qa/visual/gradecard.json`. Screenshots
remain in the local QA artifact directory and are intentionally excluded from
the deployment and repository.

## Native form update · 2026-08-17

- Replaced links to the old appointment, rapid quote, technician question,
  contact, referral, and survey pages with concept-native routes.
- Added all six forms to both directions for 12 request routes total.
- Verified every request route through production builds and server-rendered
  HTTP tests, including route-specific fields, noindex metadata, email address,
  acknowledgment, and the no-storage/no-silent-send message.
- Expanded the local link checker to cover all 14 public routes while retaining
  checks for the remaining informational links to Dean's current website.
- No new browser screenshot or visual-review run was requested for this form
  change; the prior 100/100 score applies to the earlier two landing routes.
- A retained development-server log exposed a duplicate-React hydration error
  from framework link components after the form routes were added. The landing
  page calls now use intentional native navigation, matching the static Pages
  export and avoiding RSC prefetch requests; build and route checks were rerun.

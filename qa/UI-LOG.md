# UI and release log

Final material review completed on 2026-08-17 against the static Cloudflare
artifact at `http://127.0.0.1:4173/`.

## Coverage

- One route, one visual direction, and eight in-page states.
- Desktop 1440×900, tablet 820×900, and mobile 390×844.
- 25 captured viewport states, including the expanded mobile FAQ.
- Keyboard skip-link visibility and focus treatment checked.
- Horizontal geometry, heading structure, image loading, and critical 44px tap
  targets checked at every viewport.
- Browser console warnings/errors, page exceptions, failed requests, and HTTP
  error responses checked in fresh sessions.
- All 19 customer-facing links to Dean's current website fetched successfully.

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

# Shade direction gradecard

Baseline recorded 2026-08-17 from revision `a426e1d` before implementation.
Release target: `/shade` on the existing Cloudflare Pages and owner-only Sites
deployments. The existing `/` direction must remain unchanged.

| Route and state | Evidence | Severity | Finding | Why it matters | Fix | Recheck |
|---|---|---|---|---|---|---|
| `/shade`, all viewports | Route absent at baseline | P1 | Requested service-focused direction does not exist. | The requested customer experience cannot be reviewed or used. | Added a distinct, labeled `/shade` route with functional Dean's customer paths and route-specific metadata. | Resolved: 55-state automated matrix and manual desktop/mobile review pass |
| `/shade`, transmission gallery | Generic service art only | P2 | The concept lacked reusable real-world transmission photography. | Technical photography makes the specialist service easier to understand and gives the page more visual credibility. | Added three optimized Commons cutaway photos with visible provenance, reuse terms, and a clear reference-image disclaimer. | Resolved: gallery checked at 1440×900, 820×900, and 390×844 |
| `/shade`, capabilities | Text and icon treatment only | P2 | The service process needed a stronger visual anchor. | A close underbody view helps visitors connect the written capability list to real drivetrain inspection work. | Added an original, optimized AI underbody inspection image with a visible concept-image disclosure and no-shop-identity disclaimer. | Resolved: placement checked at 1440×900, 820×900, and 390×844 |
| `/shade`, Google reviews | Existing-site testimonials only | P2 | The trust section did not include the shop's current third-party review proof. | Recent, externally verifiable feedback answers the buyer's trust question before the location and contact section. | Added the observed Google rating/count, three short five-star excerpts, a direct source link, and a freshness disclaimer. | Resolved: source verified and review panel checked at 1440×900, 820×900, and 390×844 |

## Scorecard

| Category | Weight | Baseline | Final |
|---|---:|---:|---:|
| Visual composition and whitespace | 20 | 0 | 20 |
| Theme continuity | 15 | 0 | 15 |
| Responsive behavior | 15 | 0 | 15 |
| Conversion and trust | 15 | 0 | 15 |
| Pricing and checkout | 10 | 10 | 10 |
| Examples and content integrity | 10 | 0 | 10 |
| SEO and accessibility | 10 | 0 | 10 |
| Reliability evidence | 5 | 0 | 5 |
| **Total** | **100** | **10** | **100** |

The pricing/checkout category is not applicable to this informational service
concept, so its points are retained when the route makes no checkout claims.

## Final gate

- Distinctness: pass; the original dark machined direction and the new
  service-first blue/red/yellow direction remain visually and structurally
  independent.
- Responsive and interaction matrix: pass at 1440×900, 820×900, and 390×844.
- Screenshots: 61 across both routes; no horizontal overflow, broken images,
  undersized critical targets, console errors, failed requests, or HTTP errors.
- Customer paths: all 19 unique Dean's links and the Google review source link
  returned successful responses.
- Metadata: route-specific title and description, no inherited root social
  artwork, and `noindex, nofollow` retained.
- Decision: ready for the labeled concept deployment with 0 open P1/P2 issues.

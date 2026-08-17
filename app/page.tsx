const source = "https://www.deans-quality-transmissions.com";

const services = [
  ["01", "Automatic transmissions", "Diagnosis, repair, in-house rebuilds, remanufactured units, fluid exchange and band adjustments."],
  ["02", "Manual & clutch", "Manual transmission repair, clutch service, flywheel work and standard clutch kit replacement."],
  ["03", "4×4 & transfer cases", "Transfer-case diagnosis, custom 4×4 transmissions and drivetrain problem solving."],
  ["04", "Heavy duty", "High-performance and diesel builds, billet torque converters, shift kits and transmission coolers."],
  ["05", "Differentials & axles", "Differential service, driveshaft work and CV axle rebuild or replacement."],
  ["06", "Computer diagnostics", "Electrical and non-electrical diagnosis for leaks, warning lights, shift issues and driveability."],
];

const team = [
  ["TB", "Tyson Bills", "General manager · Service writer"],
  ["KB", "Kayleb Bills", "Office manager · Customer service"],
  ["GD", "Greg Doran", "Transmission rebuilder"],
  ["HP", "Hilario Perez-Cervantes", "R&R technician"],
  ["DL", "Deena Lab", "Co-owner · Service consultant"],
  ["DL", "Dean Lab", "Founder · Retired, still involved"],
];

const originalPages = [
  ["Appointment", "/appointment.aspx"],
  ["Contact", "/locations.aspx#contact"],
  ["Location", "/locations.aspx"],
  ["About", "/about/default.aspx"],
  ["Affiliations", "/about/affiliations.aspx"],
  ["Testimonials", "/about/testimonials.aspx"],
  ["Staff", "/about/staff.aspx"],
  ["Services", "/services/default.aspx"],
  ["Ask a technician", "/services/ask.aspx"],
  ["Specials", "/services/specials.aspx"],
  ["Warranties", "/services/warranties.aspx"],
  ["Rapid quote", "/rapidquote.aspx"],
  ["Refer a friend", "/referfriend.aspx"],
  ["Community links", "/links.aspx"],
  ["Customer survey", "/survey.aspx"],
  ["Site map", "/sitemap.aspx"],
  ["Privacy", "/privacypolicy.aspx"],
  ["Terms", "/termsofservice.aspx"],
];

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#content">Skip to content</a>

      <div className="concept-bar">
        <p><strong>Independent concept redesign</strong><span> · </span>Customer actions open Dean&apos;s current website.</p>
        <a href={source}>View current site <span aria-hidden="true">↗</span></a>
      </div>

      <section className="hero" aria-labelledby="hero-title">
        <nav className="hero-nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Dean's Quality Transmissions concept home">
            <span className="wordmark-deans">DEAN&apos;S</span>
            <span>Quality Transmissions</span>
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#standards">Standards</a>
            <a href="#team">People</a>
            <a href="#location">Visit</a>
          </div>
          <a className="nav-call" href="tel:+18017981664"><span>Call</span> 801 798 1664</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Spanish Fork, Utah · Family owned since 1988</p>
            <h1 id="hero-title">Built to shift.<br /><span>Rebuilt to last.</span></h1>
            <p className="hero-lede">
              Straight answers, precise diagnostics, and transmission work handled in-house by specialists who only recommend the repair you need.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={`${source}/appointment.aspx`}>Book a diagnosis <span aria-hidden="true">↗</span></a>
              <a className="button button-ghost" href={`${source}/rapidquote.aspx`}>Get a rapid quote</a>
            </div>
          </div>

          <div className="hero-machine" aria-hidden="true">
            <div className="machine-ring ring-one" />
            <div className="machine-ring ring-two" />
            <div className="machine-core">38</div>
            <p>years<br />in gear</p>
          </div>

          <div className="hero-proof" aria-label="Service highlights">
            <div><strong>Free</strong><span>Local towing</span></div>
            <div><strong>Nationwide</strong><span>ATRA warranty options</span></div>
            <div><strong>On-site</strong><span>Rebuilds & repair</span></div>
          </div>
        </div>

        <a className="scroll-cue" href="#content"><span>Explore the shop</span><span aria-hidden="true">↓</span></a>
      </section>

      <div id="content">
        <section className="quick-actions" aria-label="Quick actions">
          <a href={`${source}/services/ask.aspx`}><span>01</span> Ask a technician <b aria-hidden="true">↗</b></a>
          <a href={`${source}/services/specials.aspx`}><span>02</span> Current specials <b aria-hidden="true">↗</b></a>
          <a href={`${source}/services/warranties.aspx`}><span>03</span> Warranty details <b aria-hidden="true">↗</b></a>
          <a href={`${source}/referfriend.aspx`}><span>04</span> Refer a friend <b aria-hidden="true">↗</b></a>
        </section>

        <section className="services section-shell" id="services" aria-labelledby="services-title">
          <header className="section-heading">
            <p className="section-index">01 / Capabilities</p>
            <div>
              <h2 id="services-title">The complete<br /><em>drivetrain.</em></h2>
              <p>From a warning light to a complete rebuild, Dean&apos;s works across the full drivetrain—then explains which repair actually makes sense.</p>
            </div>
          </header>
          <div className="service-grid">
            {services.map(([number, title, description]) => (
              <article className="service-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <a className="text-link" href={`${source}/services/default.aspx`}>Explore the full service list <span aria-hidden="true">↗</span></a>
        </section>

        <section className="precision" id="standards" aria-labelledby="standards-title">
          <div className="precision-image">
            {/* The source asset is compressed and must keep its exact crop. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/og.jpg" width="1676" height="943" alt="An opened automatic transmission assembly on a clean steel workbench" />
            <p>Inside the work</p>
          </div>
          <div className="precision-copy">
            <p className="section-index">02 / The standard</p>
            <h2 id="standards-title">Diagnose first.<br /><em>Pull last.</em></h2>
            <p className="precision-lede">Dean&apos;s public pledge is simple: a transmission does not come out unless it truly needs to. Most units are rebuilt or repaired right in the Spanish Fork shop.</p>
            <ol className="process-list">
              <li><span>01</span><div><h3>Listen & diagnose</h3><p>Start with the symptom, road-test when appropriate, then isolate the mechanical or electrical cause.</p></div></li>
              <li><span>02</span><div><h3>Explain the options</h3><p>Understand the repair, alternatives and warranty before work moves forward.</p></div></li>
              <li><span>03</span><div><h3>Repair with purpose</h3><p>Fix what is needed, document the coverage and get the vehicle moving again.</p></div></li>
            </ol>
            <div className="inline-actions">
              <a className="button button-light" href={`${source}/appointment.aspx`}>Schedule service <span aria-hidden="true">↗</span></a>
              <a className="text-link dark-link" href={`${source}/services/warranties.aspx`}>Compare warranties</a>
            </div>
          </div>
        </section>

        <section className="warranty-band" aria-label="Warranty and payment highlights">
          <div><strong>12 / 12</strong><p>ATRA 12-month / 12,000-mile nationwide coverage on qualifying in-house complete automatic rebuilds.</p></div>
          <div><strong>3 / 100</strong><p>Remanufactured units may carry coverage up to 3 years / 100,000 miles, depending on the unit purchased.</p></div>
          <div><strong>90 days</strong><p>Same-as-cash financing is advertised by the shop. Confirm current eligibility and terms directly with Dean&apos;s.</p></div>
        </section>

        <section className="reviews section-shell" id="reviews" aria-labelledby="reviews-title">
          <header className="section-heading compact-heading">
            <p className="section-index">03 / Word of mouth</p>
            <div>
              <h2 id="reviews-title">Honest work.<br /><em>People remember.</em></h2>
            </div>
          </header>
          <div className="review-layout">
            <blockquote>
              <p>“He was so honest. We thought the transmission was broken, and he could have easily taken advantage of us.”</p>
              <footer>Reed H. · South Jordan, Utah</footer>
            </blockquote>
            <div className="review-notes">
              <article><span>01</span><p>A traveler credited Tyson with finding parts and getting a damaged diesel truck back on the road before a holiday weekend.</p></article>
              <article><span>02</span><p>A Spanish Fork family remembered a loose shift cable being fixed without charge instead of being sold a major repair.</p></article>
              <article><span>03</span><p>An Orem customer described a referral, a smaller electronic repair, and a car that was still working well more than a year later.</p></article>
            </div>
          </div>
          <a className="text-link" href={`${source}/about/testimonials.aspx`}>Read original customer testimonials <span aria-hidden="true">↗</span></a>
        </section>

        <section className="team section-shell" id="team" aria-labelledby="team-title">
          <header className="section-heading">
            <p className="section-index">04 / Family & craft</p>
            <div>
              <h2 id="team-title">Family run.<br /><em>Craft led.</em></h2>
              <p>Dean and Deena&apos;s family shop continues with their sons managing day-to-day work, supported by experienced rebuilding, installation and customer-service specialists.</p>
            </div>
          </header>
          <div className="team-grid">
            {team.map(([initials, name, role], index) => (
              <article className="team-card" key={name}>
                <div className="initials" aria-hidden="true">{initials}<span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{name}</h3>
                <p>{role}</p>
              </article>
            ))}
          </div>
          <div className="credentials">
            <div><span>ATRA</span><p>Member shop operating under the association&apos;s service definitions and code of ethics.</p></div>
            <div><span>ASE</span><p>The current site identifies ASE-trained and certified service experience within the family operation.</p></div>
            <a href={`${source}/about/affiliations.aspx`}>Review affiliations <b aria-hidden="true">↗</b></a>
          </div>
        </section>

        <section className="faq section-shell" id="faq" aria-labelledby="faq-title">
          <header className="section-heading compact-heading">
            <p className="section-index">05 / Before you call</p>
            <div><h2 id="faq-title">Good questions.<br /><em>Straight answers.</em></h2></div>
          </header>
          <div className="faq-list">
            <details>
              <summary>Can I keep driving with a transmission leak?<span aria-hidden="true">+</span></summary>
              <p>Dean&apos;s recommends fixing leaks promptly. Losing fluid or pressure can turn a smaller repair into serious transmission damage.</p>
            </details>
            <details>
              <summary>Do you rebuild transmissions in-house?<span aria-hidden="true">+</span></summary>
              <p>Yes. The shop says most transmission rebuilds and repairs are completed on-site in Spanish Fork.</p>
            </details>
            <details>
              <summary>What vehicles and systems do you work on?<span aria-hidden="true">+</span></summary>
              <p>Automatic and manual transmissions, diesel and high-performance applications, 4×4 systems, transfer cases, clutches, differentials, driveshafts and related diagnostics.</p>
            </details>
            <details>
              <summary>Is towing available?<span aria-hidden="true">+</span></summary>
              <p>The current shop website advertises free local towing. Call first to confirm your vehicle and pickup location qualify.</p>
            </details>
          </div>
          <a className="text-link" href={`${source}/services/ask.aspx`}>Ask Dean&apos;s technician your question <span aria-hidden="true">↗</span></a>
        </section>

        <section className="location" id="location" aria-labelledby="location-title">
          <div className="location-copy">
            <p className="section-index">06 / Spanish Fork</p>
            <h2 id="location-title">Pull in.<br /><em>Leave with a plan.</em></h2>
            <div className="address-grid">
              <div><span>Shop</span><address>590 N. Main<br />Spanish Fork, UT 84660</address></div>
              <div><span>Hours</span><p>Monday–Friday<br />8:00 AM–5:00 PM<br />Saturday & Sunday closed</p></div>
              <div><span>Contact</span><p><a href="tel:+18017981664">801 798 1664</a><br /><a href="mailto:deansqt@gmail.com">deansqt@gmail.com</a></p></div>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href={`${source}/appointment.aspx`}>Request an appointment <span aria-hidden="true">↗</span></a>
              <a className="button button-ghost" href="https://maps.google.com/?q=590+N+Main+Spanish+Fork+UT+84660">Driving directions</a>
            </div>
          </div>
          <div className="location-graphic" aria-hidden="true">
            <span className="route route-a" />
            <span className="route route-b" />
            <div className="map-pin"><b><i>D</i></b><span>590 N Main</span></div>
            <p>40.121° N<br />111.655° W</p>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <p>Transmission warning light? Slip? Leak? Noise?</p>
          <h2 id="final-title">Start with<br /><em>a straight answer.</em></h2>
          <div className="hero-actions">
            <a className="button button-primary" href={`${source}/rapidquote.aspx`}>Request a rapid quote <span aria-hidden="true">↗</span></a>
            <a className="button button-ghost" href="tel:+18017981664">Call 801 798 1664</a>
          </div>
        </section>
      </div>

      <footer className="site-footer" id="source-pages">
        <div className="footer-brand">
          <a className="wordmark" href="#top"><span className="wordmark-deans">DEAN&apos;S</span><span>Quality Transmissions</span></a>
          <p>Independent redesign concept. Business information and customer action links are sourced from Dean&apos;s current public website.</p>
        </div>
        <div className="source-links" aria-label="Original Dean's website pages">
          <h2>Original site pages</h2>
          <div>
            {originalPages.map(([label, path]) => <a key={label} href={`${source}${path}`}>{label}<span aria-hidden="true">↗</span></a>)}
          </div>
        </div>
        <div className="footer-meta">
          <p>Concept built for demonstration · No form data is collected here.</p>
          <div>
            <a href="https://www.atra.com/">ATRA</a>
            <a href="https://members.atra.com/?page=ATRA_ByLaws">Code of ethics</a>
            <a href="https://www.ssrfanatic.com/">SSR Fanatic</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

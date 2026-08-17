/* eslint-disable @next/next/no-html-link-for-pages -- native links keep the static Pages export free of RSC prefetch requests */
import { googleListingUrl, googleReviewExcerpts, googleReviewSnapshot } from "../review-data";

const source = "https://www.deans-quality-transmissions.com";

const localFormPaths: Record<string, string> = {
  "/appointment.aspx": "/shade/forms/appointment",
  "/locations.aspx#contact": "/shade/forms/contact",
  "/services/ask.aspx": "/shade/forms/question",
  "/rapidquote.aspx": "/shade/forms/quote",
  "/referfriend.aspx": "/shade/forms/referral",
  "/survey.aspx": "/shade/forms/feedback",
};

const services = [
  { code: "A/T", title: "Automatic transmissions", body: "Diagnosis, repair, fluid service, remanufactured units and complete in-house rebuilds.", href: "/services/default.aspx" },
  { code: "DTC", title: "Computer diagnostics", body: "Electrical and mechanical testing for warning lights, shift concerns, leaks and driveability issues.", href: "/services/default.aspx" },
  { code: "M/T", title: "Manual & clutch", body: "Manual transmission repair, clutch kits, flywheel work and hydraulic clutch diagnosis.", href: "/services/default.aspx" },
  { code: "4×4", title: "Transfer cases", body: "Four-wheel-drive diagnostics, transfer-case repair and custom drivetrain problem solving.", href: "/services/default.aspx" },
  { code: "AXL", title: "Differentials & axles", body: "Differential service, driveshaft work, CV axles and related vibration or noise diagnosis.", href: "/services/default.aspx" },
  { code: "HD", title: "Heavy duty & performance", body: "Diesel and performance builds, billet torque converters, shift kits and added cooling.", href: "/services/default.aspx" },
];

const originalPages = [
  ["Appointment", "/appointment.aspx"], ["Rapid quote", "/rapidquote.aspx"], ["Ask a technician", "/services/ask.aspx"],
  ["Services", "/services/default.aspx"], ["Specials", "/services/specials.aspx"], ["Warranties", "/services/warranties.aspx"],
  ["About", "/about/default.aspx"], ["Staff", "/about/staff.aspx"], ["Affiliations", "/about/affiliations.aspx"],
  ["Testimonials", "/about/testimonials.aspx"], ["Location", "/locations.aspx"], ["Contact", "/locations.aspx#contact"],
  ["Refer a friend", "/referfriend.aspx"], ["Customer survey", "/survey.aspx"], ["Community links", "/links.aspx"],
  ["Site map", "/sitemap.aspx"], ["Privacy", "/privacypolicy.aspx"], ["Terms", "/termsofservice.aspx"],
];

const referencePhotos = [
  {
    src: "/shade/reference-hyundai-dct.webp",
    alt: "Cutaway display of a Hyundai seven-speed dual-clutch transmission",
    title: "Seven-speed dual clutch",
    detail: "Hyundai cutaway · photographed by Spielvogel",
    license: "CC0 1.0",
    width: 1400,
    height: 933,
    source: "https://commons.wikimedia.org/wiki/File:Hyundai_7_speed_dual_clutch_transmission._Spielvogel.jpg",
  },
  {
    src: "/shade/reference-aisin-a440.webp",
    alt: "Cutaway display of an Aisin A440 four-speed automatic transmission",
    title: "Heavy-duty automatic",
    detail: "Aisin A440 cutaway · photographed by TTTNIS",
    license: "CC0 1.0",
    width: 1400,
    height: 743,
    source: "https://commons.wikimedia.org/wiki/File:Aisin_A440_transmission.jpg",
  },
  {
    src: "/shade/reference-jatco-e4n71b.webp",
    alt: "Cutaway display of a Jatco E4N71B four-speed automatic transmission",
    title: "Four-speed automatic",
    detail: "Jatco E4N71B cutaway · photographed by OSX",
    license: "Public domain",
    width: 1280,
    height: 856,
    source: "https://commons.wikimedia.org/wiki/File:4-speed_Jatco_E4N71B_automatic_transmission_(2015-08-29).jpg",
  },
];

export default function ShadeDirection() {
  return (
    <main className="shade-concept" id="shade-top">
      <a className="shade-skip" href="#shade-content">Skip to content</a>
      <div className="shade-disclosure">
        <p><strong>Independent concept direction</strong> · Shade Tree-inspired structure; request forms stay in this concept.</p>
        <a href="https://www.shadetreeautomotive.net/">View layout reference <span aria-hidden="true">↗</span></a>
      </div>

      <header className="shade-masthead">
        <a className="shade-mark" href="#shade-top" aria-label="Dean's Quality Transmissions shade direction home">
          <strong>Dean&apos;s</strong><span>Quality Transmissions</span>
        </a>
        <div className="shade-contact"><strong><a href="tel:+18017981664">801-798-1664</a></strong><span>590 N Main · Spanish Fork, UT</span></div>
        <a className="shade-appointment" href="/shade/forms/appointment">Book a diagnosis <span aria-hidden="true">→</span></a>
      </header>

      <nav className="shade-nav" aria-label="Shade direction navigation">
        {/* A native link keeps the independently exported static directions free of RSC prefetch requests. */}
        <a href="/">Original direction</a><a href="#shade-services">Services</a><a href="#shade-standard">Why Dean&apos;s</a><a href="#shade-reviews">Reviews</a><a href="#shade-location">Directions</a>
      </nav>

      <section className="shade-hero" aria-labelledby="shade-title">
        <div className="shade-hero-copy">
          <p>Friendly service · Honest diagnosis · No surprise repair</p>
          <h1 id="shade-title"><span>Serving Spanish</span><span>Fork drivers</span><span>since 1988</span></h1>
          <a className="shade-hero-button" href="/shade/forms/appointment">Book a diagnosis</a>
        </div>
      </section>

      <div id="shade-content">
        <section className="shade-service-intro" id="shade-services" aria-labelledby="shade-services-title">
          <p>What we do</p><h2 id="shade-services-title">Transmission diagnosis, repair and rebuilding</h2><span>Automatic, manual, diesel, 4×4 and related drivetrain systems</span>
        </section>

        <section className="shade-services" aria-label="Transmission and drivetrain services">
          <div className="shade-service-grid">
            {services.map((service, index) => (
              <a className={`shade-service-card shade-service-${index + 1}`} href={`${source}${service.href}`} key={service.title}>
                <div className="shade-service-art" aria-hidden="true"><span>{service.code}</span><i /></div>
                <div className="shade-service-copy"><h3>{service.title}</h3><p>{service.body}</p><b>Learn more <span aria-hidden="true">↗</span></b></div>
              </a>
            ))}
          </div>
          <a className="shade-outline-button" href={`${source}/services/default.aspx`}>View every Dean&apos;s service <span aria-hidden="true">↗</span></a>
        </section>

        <section className="shade-reference" id="shade-reference" aria-labelledby="shade-reference-title">
          <div className="shade-reference-heading">
            <div><p className="shade-kicker">Inside the transmission</p><h2 id="shade-reference-title">Complex systems. Clearer conversations.</h2></div>
            <p>Licensed reference photography shows the kinds of internal systems a transmission specialist works with. These are educational images—not photos of Dean&apos;s shop, technicians or customer work.</p>
          </div>
          <div className="shade-reference-grid">
            {referencePhotos.map((photo, index) => (
              <figure className={`shade-reference-photo shade-reference-photo-${index + 1}`} key={photo.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
                <figcaption>
                  <div><strong>{photo.title}</strong><span>{photo.detail}</span></div>
                  <a href={photo.source}>Source · {photo.license} <span aria-hidden="true">↗</span></a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="shade-benefits" aria-label="Dean's service highlights">
          <article><span aria-hidden="true">38</span><div><strong>Years in Spanish Fork</strong><p>Family owned since 1988</p></div></article>
          <article><span aria-hidden="true">LOC</span><div><strong>Free local towing</strong><p>Call to confirm eligibility</p></div></article>
          <article><span aria-hidden="true">USA</span><div><strong>Nationwide coverage</strong><p>ATRA warranty options</p></div></article>
          <article><span aria-hidden="true">IN</span><div><strong>Rebuilt on site</strong><p>Most work stays in the shop</p></div></article>
        </section>

        <section className="shade-standard" id="shade-standard" aria-labelledby="shade-standard-title">
          <div className="shade-standard-photo">
            {/* Business-owned portrait sourced from Dean's current public staff page. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/shade/tyson.jpg" alt="Tyson Bills with his family" width="900" height="1355" />
            <a href={`${source}/about/staff.aspx`}><span>Meet the team</span><b aria-hidden="true">↗</b></a>
          </div>
          <div className="shade-standard-copy">
            <p className="shade-kicker">How Dean&apos;s works</p>
            <h2 id="shade-standard-title">A major repair should start with a careful diagnosis.</h2>
            <p className="shade-lede">Dean&apos;s public repair pledge says the transmission does not come out unless it truly needs to. The team starts with the symptom, explains the options and keeps most transmission rebuild work in-house.</p>
            <ul className="shade-values">
              <li><span aria-hidden="true">✓</span><strong>Diagnose before removing</strong></li><li><span aria-hidden="true">✓</span><strong>Set clear expectations</strong></li>
              <li><span aria-hidden="true">✓</span><strong>Repair what is needed</strong></li><li><span aria-hidden="true">✓</span><strong>Document warranty coverage</strong></li>
              <li><span aria-hidden="true">✓</span><strong>Keep the conversation direct</strong></li>
            </ul>
            <div className="shade-inline-actions"><a className="shade-red-button" href="/shade/forms/quote">Request a rapid quote</a><a className="shade-text-link" href="/shade/forms/question">Ask a technician <span aria-hidden="true">→</span></a></div>
          </div>
        </section>

        <section className="shade-family" aria-labelledby="shade-family-title">
          <div className="shade-family-copy">
            <p className="shade-kicker">Built by family · Carried forward by family</p>
            <h2 id="shade-family-title">A neighborhood shop with transmission work at its center.</h2>
            <p>The shop opened in 1988. Today, its day-to-day operation brings together experienced rebuilding, installation and customer-service specialists.</p>
            <a className="shade-yellow-button" href={`${source}/about/default.aspx`}>Read Dean&apos;s story <span aria-hidden="true">↗</span></a>
          </div>
          <div className="shade-founder-grid">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/shade/ai-transmission-placeholder.jpg" alt="AI-generated rebuilt transmission on a workshop bench" width="800" height="1000" />
              <figcaption><strong>AI concept image</strong><span>Placeholder · Transmission rebuilding</span></figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/shade/ai-diagnostics-placeholder.jpg" alt="AI-generated transmission diagnostic parts and tools" width="800" height="1000" />
              <figcaption><strong>AI concept image</strong><span>Placeholder · Diagnostics and inspection</span></figcaption>
            </figure>
          </div>
        </section>

        <section className="shade-capabilities" aria-labelledby="shade-capabilities-title">
          <div><p className="shade-kicker">Drivetrains we understand</p><h2 id="shade-capabilities-title">From the daily commute to diesel and performance builds.</h2></div>
          <div className="shade-capability-list" aria-label="Vehicle and drivetrain specialties"><span>Automatic</span><span>Manual</span><span>Diesel</span><span>4×4</span><span>Performance</span><span>Fleet</span><span>Transfer cases</span><span>Differentials</span></div>
          <figure className="shade-capability-photo" id="shade-capability-photo">
            {/* AI-generated concept photography; this does not depict Dean's shop. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/shade/ai-underbody-inspection.webp" width="1200" height="800" alt="AI-generated underbody view of a transmission and four-wheel-drive components during inspection" loading="lazy" />
            <figcaption><strong>AI concept image</strong><span>Underbody drivetrain inspection · Not Dean&apos;s actual shop</span></figcaption>
          </figure>
        </section>

        <section className="shade-process" aria-label="Service process">
          <article><span>01</span><div><h3>Tell us what changed</h3><p>Slip, leak, noise, warning light or a vehicle that simply does not feel right.</p></div></article>
          <article><span>02</span><div><h3>See the diagnosis</h3><p>Understand what the team found and which repair paths make sense before approving work.</p></div></article>
          <article><span>03</span><div><h3>Leave with coverage</h3><p>Get the repair and its applicable warranty explained before the vehicle goes home.</p></div></article>
        </section>

        <section className="shade-reviews" id="shade-reviews" aria-labelledby="shade-reviews-title">
          <div className="shade-review-heading"><p className="shade-kicker">Customer stories</p><h2 id="shade-reviews-title">The repair people remember is often the one they did not need.</h2><a className="shade-outline-button shade-outline-light" href={`${source}/about/testimonials.aspx`}>Read original testimonials <span aria-hidden="true">↗</span></a></div>
          <div className="shade-review-cards">
            <blockquote><p>“He was so honest. We thought the transmission was broken, and he could have easily taken advantage of us.”</p><footer>Reed H. · South Jordan, Utah</footer></blockquote>
            <article><span>01</span><p>A Spanish Fork family recalled a loose shift cable being fixed without charge instead of being sold a major repair.</p></article>
            <article><span>02</span><p>An Orem customer described a smaller electronic repair and a car still working well more than a year later.</p></article>
          </div>
          <div className="shade-google-reviews" id="shade-google-reviews">
            <div className="shade-google-summary">
              <p>Google reviews · checked {googleReviewSnapshot.checked}</p>
              <div><strong>{googleReviewSnapshot.rating}</strong><span aria-label={`${googleReviewSnapshot.rating} out of 5 stars`}>★★★★★</span></div>
              <h3>{googleReviewSnapshot.count} Google reviews</h3>
              <small>Google ratings and review counts can change.</small>
              <a className="shade-outline-button shade-outline-light" href={googleListingUrl}>Read all Google reviews <span aria-hidden="true">↗</span></a>
            </div>
            <div className="shade-google-review-grid">
              {googleReviewExcerpts.map((review) => (
                <blockquote key={review.name}>
                  <span className="shade-google-stars" aria-label="5 out of 5 stars">★★★★★</span>
                  <p>“{review.quote}”</p>
                  <footer>{review.name}<span>Google review excerpt</span></footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="shade-location" id="shade-location" aria-labelledby="shade-location-title">
          <div className="shade-location-copy">
            <p className="shade-kicker">Visit the shop</p><h2 id="shade-location-title">One Spanish Fork location. One direct way to start.</h2>
            <div className="shade-location-details">
              <div><span>Address</span><address>590 N Main<br />Spanish Fork, UT 84660</address></div>
              <div><span>Hours</span><p>Monday–Friday · 8 AM–5 PM<br />Saturday & Sunday · Closed</p></div>
              <div><span>Contact</span><p><a href="tel:+18017981664">801-798-1664</a><br /><a href="mailto:deansqt@gmail.com">deansqt@gmail.com</a></p></div>
            </div>
            <div className="shade-inline-actions"><a className="shade-yellow-button" href="/shade/forms/appointment">Schedule an appointment</a><a className="shade-text-link shade-text-light" href="https://maps.google.com/?q=590+N+Main+Spanish+Fork+UT+84660">Get directions <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="shade-map" aria-hidden="true"><div className="shade-map-grid" /><span className="shade-road shade-road-a" /><span className="shade-road shade-road-b" /><div className="shade-map-pin"><b><i>D</i></b><span>590 N Main</span></div></div>
        </section>

        <section className="shade-final" aria-labelledby="shade-final-title">
          <p>Warning light? Slip? Leak? Noise?</p><h2 id="shade-final-title">Start with a straight answer.</h2>
          <div><a className="shade-yellow-button" href="/shade/forms/quote">Request a rapid quote</a><a className="shade-outline-button shade-outline-light" href="tel:+18017981664">Call 801-798-1664</a></div>
        </section>
      </div>

      <footer className="shade-footer">
        <div className="shade-footer-top"><a className="shade-mark shade-footer-mark" href="#shade-top"><strong>Dean&apos;s</strong><span>Quality Transmissions</span></a><p>Independent concept direction. Business information comes from Dean&apos;s current public website; forms open the visitor&apos;s email app and are not stored here.</p></div>
        <div className="shade-source-links" aria-label="Dean's information and request pages">{originalPages.map(([label, path]) => <a href={localFormPaths[path] ?? `${source}${path}`} key={label}>{label}<span aria-hidden="true">{localFormPaths[path] ? "→" : "↗"}</span></a>)}</div>
        <div className="shade-footer-bottom"><p>Layout study references Shade Tree Automotive; no Shade Tree assets, logo or copy are used.</p><div>
          <a href="/">Ferrari direction</a><a href="https://www.shadetreeautomotive.net/">Shade Tree reference</a><a href={source}>Dean&apos;s current site</a>
        </div></div>
      </footer>
    </main>
  );
}

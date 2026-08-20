import assert from "node:assert/strict";
import test from "node:test";

async function getWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function render(worker, pathname) {
  return worker.fetch(
    new Request(`https://deans-concept.example${pathname}`, {
      headers: { accept: "text/html", host: "deans-concept.example", "x-forwarded-proto": "https" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders both completed transmission concepts", async () => {
  const worker = await getWorker();
  const rootResponse = await render(worker, "/");
  assert.equal(rootResponse.status, 200);
  assert.match(rootResponse.headers.get("content-type") ?? "", /^text\/html\b/i);
  const rootHtml = await rootResponse.text();
  const rootText = rootHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  assert.match(rootHtml, /<title>Dean(?:'|&#x27;)s Quality Transmissions \| Concept Redesign<\/title>/i);
  assert.match(rootHtml, /Independent concept redesign/i);
  assert.match(rootHtml, /Built to shift/i);
  assert.match(rootHtml, /hero-gears-38\.webp/i);
  assert.match(rootHtml, /hero-machine-caption/i);
  assert.match(rootText, /38\s+Years in gear/i);
  assert.match(rootHtml, /ai-diagnostic-bay\.webp/i);
  assert.match(rootHtml, /ai-rebuild-bench\.webp/i);
  assert.match(rootHtml, /service-automatic\.webp/i);
  assert.match(rootHtml, /service-diagnostics\.webp/i);
  assert.match(rootHtml, /service-manual-clutch\.webp/i);
  assert.match(rootHtml, /service-transfer-case\.webp/i);
  assert.match(rootHtml, /service-differential\.webp/i);
  assert.match(rootHtml, /service-heavy-duty\.webp/i);
  assert.equal((rootText.match(/AI concept image/gi) ?? []).length >= 8, true);
  assert.match(rootHtml, /Diagnostic service bay · Not Dean(?:'|&#x27;)s actual shop/i);
  assert.match(rootHtml, /In-house rebuilding · Not Dean(?:'|&#x27;)s actual shop/i);
  assert.match(rootText, /4\.8.*184 Google reviews/i);
  assert.match(rootText, /Bowdy N.*Nolan Blackhurst.*Valerie Mills/i);
  assert.match(rootHtml, /google\.com\/maps\/search/i);
  assert.match(rootHtml, /name="robots" content="noindex, nofollow"/i);
  assert.match(rootHtml, /property="og:image" content="https:\/\/deans-quality-transmissions-concept\.pages\.dev\/og\.jpg"/i);
  assert.match(rootHtml, /href="\/forms\/appointment"/i);
  assert.match(rootHtml, /href="\/forms\/quote"/i);
  assert.match(rootHtml, /href="\/forms\/question"/i);
  assert.match(rootHtml, /href="\/forms\/referral"/i);
  assert.doesNotMatch(rootHtml, /deans-quality-transmissions\.com\/(?:appointment\.aspx|rapidquote\.aspx|services\/ask\.aspx|referfriend\.aspx|survey\.aspx)/i);

  const shadeResponse = await render(worker, "/shade");
  assert.equal(shadeResponse.status, 200);
  assert.match(shadeResponse.headers.get("content-type") ?? "", /^text\/html\b/i);
  const shadeHtml = await shadeResponse.text();
  const shadeText = shadeHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  assert.match(shadeHtml, /<title>Dean(?:'|&#x27;)s Quality Transmissions \| Service Direction<\/title>/i);
  assert.match(shadeHtml, /Independent concept direction/i);
  assert.match(shadeText, /Serving Spanish Fork drivers since 1988/i);
  assert.match(shadeHtml, /Transmission diagnosis, repair and rebuilding/i);
  assert.match(shadeHtml, /service-automatic\.webp/i);
  assert.match(shadeHtml, /service-diagnostics\.webp/i);
  assert.match(shadeHtml, /service-manual-clutch\.webp/i);
  assert.match(shadeHtml, /service-transfer-case\.webp/i);
  assert.match(shadeHtml, /service-differential\.webp/i);
  assert.match(shadeHtml, /service-heavy-duty\.webp/i);
  assert.equal((shadeText.match(/AI concept image/gi) ?? []).length >= 9, true);
  assert.match(shadeHtml, /ai-transmission-placeholder\.jpg/i);
  assert.match(shadeHtml, /ai-diagnostics-placeholder\.jpg/i);
  assert.match(shadeText, /Licensed reference photography/i);
  assert.match(shadeHtml, /reference-hyundai-dct\.webp/i);
  assert.match(shadeHtml, /reference-aisin-a440\.webp/i);
  assert.match(shadeHtml, /reference-jatco-e4n71b\.webp/i);
  assert.match(shadeHtml, /ai-underbody-inspection\.webp/i);
  assert.match(shadeText, /Underbody drivetrain inspection · Not Dean(?:'|&#x27;)s actual shop/i);
  assert.match(shadeText, /4\.8.*184 Google reviews/i);
  assert.match(shadeText, /Bowdy N.*Nolan Blackhurst.*Valerie Mills/i);
  assert.match(shadeText, /not photos of Dean(?:'|&#x27;)s shop, technicians or customer work/i);
  assert.match(shadeHtml, /commons\.wikimedia\.org\/wiki\/File:Hyundai_7_speed_dual_clutch_transmission/i);
  assert.match(shadeHtml, /commons\.wikimedia\.org\/wiki\/File:Aisin_A440_transmission/i);
  assert.match(shadeText, /CC0 1\.0/i);
  assert.match(shadeText, /Public domain/i);
  assert.doesNotMatch(shadeHtml, /Dean Lab|Deena Lab|Dean and Deena/i);
  assert.match(shadeHtml, /forms open the visitor(?:'|&#x27;)s email app and are not stored here/i);
  assert.match(shadeHtml, /name="robots" content="noindex, nofollow"/i);
  assert.doesNotMatch(shadeHtml, /property="og:image"/i);
  assert.match(shadeHtml, /href="\/shade\/forms\/appointment"/i);
  assert.match(shadeHtml, /href="\/shade\/forms\/quote"/i);
  assert.match(shadeHtml, /href="\/shade\/forms\/question"/i);
  assert.match(shadeHtml, /href="\/shade\/forms\/referral"/i);
  assert.doesNotMatch(shadeHtml, /deans-quality-transmissions\.com\/(?:appointment\.aspx|rapidquote\.aspx|services\/ask\.aspx|referfriend\.aspx|survey\.aspx)/i);
  assert.doesNotMatch(shadeHtml, /shade tree|shadetreeautomotive\.net/i);
  assert.doesNotMatch(shadeHtml, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("server-renders every native form in both concept directions", async () => {
  const worker = await getWorker();
  const cases = [
    ["appointment", "Request an appointment", "What changed?"],
    ["quote", "Request a rapid quote", "Concern and quote request"],
    ["question", "Ask a technician", "Your question"],
    ["contact", "Contact the shop", "Preferred reply"],
    ["referral", "Refer a friend", "Friend’s name"],
    ["feedback", "Share customer feedback", "Overall experience"],
  ];

  for (const theme of ["dark", "shade"]) {
    for (const [kind, heading, fieldLabel] of cases) {
      const prefix = theme === "shade" ? "/shade/forms" : "/forms";
      const response = await render(worker, `${prefix}/${kind}`);
      assert.equal(response.status, 200, `${prefix}/${kind} should render`);
      assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
      const html = await response.text();
      const text = html.replace(/<[^>]+>/g, " ").replace(/&(?:#x27|apos);/g, "'").replace(/\s+/g, " ");

      assert.match(html, new RegExp(`data-form-theme="${theme}"`, "i"));
      assert.match(text, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
      assert.match(text, new RegExp(fieldLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
      assert.match(html, /id="request-form"/i);
      assert.match(html, /Email handoff/i);
      assert.match(text, /does not store or silently send form data/i);
      assert.match(html, /deansqt@gmail\.com/i);
      assert.match(text, /does not reserve an appointment or confirm service until Dean's replies/i);
      assert.match(html, /<input(?=[^>]*type="checkbox")(?=[^>]*name="emailHandoffAcknowledged")(?=[^>]*required)[^>]*>/i);
      assert.match(html, /name="robots" content="noindex, nofollow"/i);
      assert.doesNotMatch(html, /property="og:image"/i);
    }
  }
});

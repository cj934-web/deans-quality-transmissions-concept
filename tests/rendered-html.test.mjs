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
  assert.match(rootHtml, /<title>Dean(?:'|&#x27;)s Quality Transmissions \| Concept Redesign<\/title>/i);
  assert.match(rootHtml, /Independent concept redesign/i);
  assert.match(rootHtml, /Built to shift/i);
  assert.match(rootHtml, /name="robots" content="noindex, nofollow"/i);
  assert.match(rootHtml, /property="og:image" content="https:\/\/deans-quality-transmissions-concept\.pages\.dev\/og\.jpg"/i);

  const shadeResponse = await render(worker, "/shade");
  assert.equal(shadeResponse.status, 200);
  assert.match(shadeResponse.headers.get("content-type") ?? "", /^text\/html\b/i);
  const shadeHtml = await shadeResponse.text();
  const shadeText = shadeHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  assert.match(shadeHtml, /<title>Dean(?:'|&#x27;)s Quality Transmissions \| Shade Tree Direction<\/title>/i);
  assert.match(shadeHtml, /Independent concept direction/i);
  assert.match(shadeText, /Serving Spanish Fork drivers since 1988/i);
  assert.match(shadeHtml, /Transmission diagnosis, repair and rebuilding/i);
  assert.match(shadeHtml, /ai-transmission-placeholder\.jpg/i);
  assert.match(shadeHtml, /ai-diagnostics-placeholder\.jpg/i);
  assert.match(shadeText, /Licensed reference photography/i);
  assert.match(shadeHtml, /reference-hyundai-dct\.webp/i);
  assert.match(shadeHtml, /reference-aisin-a440\.webp/i);
  assert.match(shadeHtml, /reference-jatco-e4n71b\.webp/i);
  assert.match(shadeText, /not photos of Dean(?:'|&#x27;)s shop, technicians or customer work/i);
  assert.match(shadeHtml, /commons\.wikimedia\.org\/wiki\/File:Hyundai_7_speed_dual_clutch_transmission/i);
  assert.match(shadeHtml, /commons\.wikimedia\.org\/wiki\/File:Aisin_A440_transmission/i);
  assert.match(shadeText, /CC0 1\.0/i);
  assert.match(shadeText, /Public domain/i);
  assert.doesNotMatch(shadeHtml, /Dean Lab|Deena Lab|Dean and Deena/i);
  assert.match(shadeHtml, /No form data is collected here/i);
  assert.match(shadeHtml, /name="robots" content="noindex, nofollow"/i);
  assert.doesNotMatch(shadeHtml, /property="og:image"/i);
  assert.match(shadeHtml, /https:\/\/www\.deans-quality-transmissions\.com\/appointment\.aspx/i);
  assert.match(shadeHtml, /https:\/\/www\.deans-quality-transmissions\.com\/rapidquote\.aspx/i);
  assert.doesNotMatch(shadeHtml, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

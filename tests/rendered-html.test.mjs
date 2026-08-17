import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://deans-concept.example/", {
      headers: {
        accept: "text/html",
        host: "deans-concept.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the completed transmission concept", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Dean(?:'|&#x27;)s Quality Transmissions \| Concept Redesign<\/title>/i);
  assert.match(html, /Independent concept redesign/i);
  assert.match(html, /Built to shift/i);
  assert.match(html, /The complete/i);
  assert.match(html, /drivetrain/i);
  assert.match(html, /No form data is collected here/i);
  assert.match(html, /name="robots" content="noindex, nofollow"/i);
  assert.match(html, /property="og:image" content="https:\/\/deans-quality-transmissions-concept\.pages\.dev\/og\.png"/i);
  assert.match(html, /https:\/\/www\.deans-quality-transmissions\.com\/appointment\.aspx/i);
  assert.match(html, /https:\/\/www\.deans-quality-transmissions\.com\/rapidquote\.aspx/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

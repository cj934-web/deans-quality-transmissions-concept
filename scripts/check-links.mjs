const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:3000/";
const deanOrigin = "https://www.deans-quality-transmissions.com";
const routes = ["/", "/shade"];
const hrefs = [];

for (const route of routes) {
  const pageUrl = new URL(route, baseUrl);
  const response = await fetch(pageUrl, { headers: { accept: "text/html" } });
  if (!response.ok) throw new Error(`${pageUrl} returned ${response.status}`);
  const html = await response.text();
  hrefs.push(...[...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1].replaceAll("&amp;", "&")));
}

const links = [...new Set(hrefs.filter((href) => href.startsWith(deanOrigin)))];
const results = [];
for (const url of links) {
  try {
    const result = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; DeanConceptLinkCheck/1.0)" },
      signal: AbortSignal.timeout(15000),
    });
    results.push({ url, status: result.status, ok: result.ok });
  } catch (error) {
    results.push({ url, status: null, ok: false, error: error instanceof Error ? error.message : String(error) });
  }
}

const failed = results.filter((result) => !result.ok);
console.log(JSON.stringify({ routes, checked: results.length, failed: failed.length, results }, null, 2));
if (failed.length) process.exitCode = 1;

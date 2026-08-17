import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:3000/";
const outputRoot = path.resolve("qa", "visual");
const screenshotRoot = path.join(outputRoot, "screenshots");
const routes = [
  { path: "/", slug: "root", direction: "machined-night", checkpoints: ["top", "services", "standards", "reviews", "team", "faq", "location", "source-pages"] },
  { path: "/shade", slug: "shade", direction: "shade-tree-service", checkpoints: ["shade-top", "shade-services", "shade-standard", "shade-family-title", "shade-reviews", "shade-location"] },
];
const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-820", width: 820, height: 900 },
  { name: "mobile-390", width: 390, height: 844 },
];

await mkdir(screenshotRoot, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const evidence = [];
const browserLogs = [];

try {
  for (const route of routes) {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      const localLogs = [];
      page.on("console", (message) => {
        if (["warning", "error"].includes(message.type())) localLogs.push({ type: message.type(), text: message.text() });
      });
      page.on("pageerror", (error) => localLogs.push({ type: "pageerror", text: error.message }));
      page.on("requestfailed", (request) => localLogs.push({ type: "requestfailed", text: `${request.method()} ${request.url()} ${request.failure()?.errorText ?? ""}` }));
      page.on("response", (response) => {
        if (response.status() >= 400) localLogs.push({ type: "http", text: `${response.status()} ${response.url()}` });
      });

      const pageUrl = new URL(route.path, baseUrl).href;
      const response = await page.goto(pageUrl, { waitUntil: "load" });
      if (!response?.ok()) localLogs.push({ type: "document", text: `${response?.status() ?? "no response"} ${pageUrl}` });
      await page.waitForTimeout(350);

      for (const id of route.checkpoints) {
        await page.evaluate((sectionId) => document.getElementById(sectionId)?.scrollIntoView({ block: "start", behavior: "instant" }), id);
        await page.waitForTimeout(80);
        const screenshot = path.join(screenshotRoot, `${route.slug}-${viewport.name}-${id}.png`);
        await page.screenshot({ path: screenshot, fullPage: false });
        evidence.push({ route: route.path, direction: route.direction, viewport: viewport.name, state: id, screenshot: path.relative(process.cwd(), screenshot) });
      }

      if (route.path === "/" && viewport.width <= 720) {
        await page.evaluate(() => document.getElementById("faq")?.scrollIntoView({ block: "start", behavior: "instant" }));
        await page.locator("details summary").first().click();
        const screenshot = path.join(screenshotRoot, `${route.slug}-${viewport.name}-faq-open.png`);
        await page.screenshot({ path: screenshot, fullPage: false });
        evidence.push({ route: route.path, direction: route.direction, viewport: viewport.name, state: "faq-open", screenshot: path.relative(process.cwd(), screenshot) });
      }

      const geometry = await page.evaluate(() => {
        const root = document.documentElement;
        const smallTargets = [...document.querySelectorAll("a, button, summary")]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            if (style.display === "none" || style.visibility === "hidden" || rect.width === 0 || rect.height === 0) return false;
            const critical = innerWidth <= 720 || element.matches(".button, .nav-call, .quick-actions a, .faq-list summary, .shade-appointment, .shade-nav a");
            return critical && (rect.width < 44 || rect.height < 44);
          })
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return { text: (element.textContent ?? "").trim().slice(0, 60), width: rect.width, height: rect.height };
          });
        const headings = [...document.querySelectorAll("h1, h2")].map((element) => {
          const rect = element.getBoundingClientRect();
          const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight) || 0;
          return { text: (element.textContent ?? "").trim().replace(/\s+/g, " "), lines: lineHeight ? Math.round(rect.height / lineHeight) : null };
        });
        return {
          clientWidth: root.clientWidth,
          scrollWidth: root.scrollWidth,
          brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
          h1Count: document.querySelectorAll("h1").length,
          smallTargets,
          headings,
        };
      });

      await page.goto(pageUrl, { waitUntil: "load" });
      await page.keyboard.press("Tab");
      await page.waitForTimeout(250);
      const focus = await page.evaluate(() => {
        const active = document.activeElement;
        if (!(active instanceof HTMLElement)) return null;
        const rect = active.getBoundingClientRect();
        const style = getComputedStyle(active);
        return { text: active.textContent?.trim().slice(0, 60), top: rect.top, bottom: rect.bottom, outlineWidth: style.outlineWidth };
      });

      evidence.push({ route: route.path, direction: route.direction, viewport: viewport.name, state: "geometry", geometry, focus });
      browserLogs.push({ route: route.path, viewport: viewport.name, entries: localLogs });
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const p1 = [];
const p2 = [];
for (const row of evidence.filter((item) => item.geometry)) {
  const geometry = row.geometry;
  const label = `${row.route} ${row.viewport}`;
  if (geometry.scrollWidth > geometry.clientWidth) p1.push(`${label}: horizontal overflow ${geometry.scrollWidth}/${geometry.clientWidth}`);
  if (geometry.smallTargets.length) p1.push(`${label}: ${geometry.smallTargets.length} undersized critical targets`);
  if (geometry.brokenImages.length) p1.push(`${label}: ${geometry.brokenImages.length} broken images`);
  if (geometry.h1Count !== 1) p1.push(`${label}: expected one H1, found ${geometry.h1Count}`);
  if (!row.focus || row.focus.top < 0 || row.focus.bottom > viewports.find((viewport) => viewport.name === row.viewport).height || Number.parseFloat(row.focus.outlineWidth) < 2) {
    p1.push(`${label}: skip link is not visibly focused`);
  }
  for (const heading of geometry.headings) {
    if (row.viewport === "mobile-390" && heading.lines > 6) p2.push(`${label}: long heading (${heading.lines} lines): ${heading.text}`);
  }
}
for (const group of browserLogs) {
  for (const entry of group.entries) p1.push(`${group.route} ${group.viewport}: ${entry.type}: ${entry.text}`);
}

const score = Math.max(0, 100 - p1.length * 20 - p2.length * 4);
const gradecard = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  routes: routes.map((route) => route.path),
  directions: routes.map((route) => route.direction),
  viewports: viewports.map(({ name, width, height }) => ({ name, width, height })),
  screenshotCount: evidence.filter((item) => item.screenshot).length,
  browserLogs,
  findings: { p1, p2 },
  score,
  decision: p1.length === 0 && score >= 92 ? "pass" : "fail",
  evidence,
};

await writeFile(path.join(outputRoot, "gradecard.json"), `${JSON.stringify(gradecard, null, 2)}\n`);
console.log(JSON.stringify({ decision: gradecard.decision, score, p1: p1.length, p2: p2.length, screenshots: gradecard.screenshotCount, gradecard: path.join(outputRoot, "gradecard.json") }, null, 2));
if (gradecard.decision !== "pass") process.exitCode = 1;

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.QA_BASE_URL ?? "http://localhost:3000/";
const outputRoot = path.resolve("qa", "visual");
const screenshotRoot = path.join(outputRoot, "screenshots");
const checkpoints = ["top", "services", "standards", "reviews", "team", "faq", "location", "source-pages"];
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
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    const localLogs = [];

    page.on("console", (message) => {
      if (["warning", "error"].includes(message.type())) {
        localLogs.push({ type: message.type(), text: message.text() });
      }
    });
    page.on("pageerror", (error) => localLogs.push({ type: "pageerror", text: error.message }));
    page.on("requestfailed", (request) => localLogs.push({ type: "requestfailed", text: `${request.method()} ${request.url()} ${request.failure()?.errorText ?? ""}` }));
    page.on("response", (response) => {
      if (response.status() >= 400) localLogs.push({ type: "http", text: `${response.status()} ${response.url()}` });
    });

    const response = await page.goto(baseUrl, { waitUntil: "load" });
    if (!response?.ok()) localLogs.push({ type: "document", text: `${response?.status() ?? "no response"} ${baseUrl}` });
    await page.waitForTimeout(350);

    for (const id of checkpoints) {
      await page.evaluate((sectionId) => document.getElementById(sectionId)?.scrollIntoView({ block: "start", behavior: "instant" }), id);
      await page.waitForTimeout(80);
      const screenshot = path.join(screenshotRoot, `${viewport.name}-${id}.png`);
      await page.screenshot({ path: screenshot, fullPage: false });
      evidence.push({ route: "/", viewport: viewport.name, state: id, screenshot: path.relative(process.cwd(), screenshot) });
    }

    if (viewport.width <= 720) {
      await page.evaluate(() => document.getElementById("faq")?.scrollIntoView({ block: "start", behavior: "instant" }));
      await page.locator("details summary").first().click();
      const screenshot = path.join(screenshotRoot, `${viewport.name}-faq-open.png`);
      await page.screenshot({ path: screenshot, fullPage: false });
      evidence.push({ route: "/", viewport: viewport.name, state: "faq-open", screenshot: path.relative(process.cwd(), screenshot) });
    }

    const geometry = await page.evaluate(() => {
      const root = document.documentElement;
      const smallTargets = [...document.querySelectorAll("a, button, summary")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          if (style.display === "none" || style.visibility === "hidden" || rect.width === 0 || rect.height === 0) return false;
          const critical = innerWidth <= 720 || element.matches(".button, .nav-call, .quick-actions a, .faq-list summary");
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

    evidence.push({ route: "/", viewport: viewport.name, state: "geometry", geometry });
    browserLogs.push({ route: "/", viewport: viewport.name, entries: localLogs });
    await page.close();
  }
} finally {
  await browser.close();
}

const p1 = [];
const p2 = [];
for (const row of evidence.filter((item) => item.geometry)) {
  const geometry = row.geometry;
  if (geometry.scrollWidth > geometry.clientWidth) p1.push(`${row.viewport}: horizontal overflow ${geometry.scrollWidth}/${geometry.clientWidth}`);
  if (geometry.smallTargets.length) p1.push(`${row.viewport}: ${geometry.smallTargets.length} undersized critical targets`);
  if (geometry.brokenImages.length) p1.push(`${row.viewport}: ${geometry.brokenImages.length} broken images`);
  if (geometry.h1Count !== 1) p1.push(`${row.viewport}: expected one H1, found ${geometry.h1Count}`);
  for (const heading of geometry.headings) {
    if (row.viewport === "mobile-390" && heading.lines > 6) p2.push(`${row.viewport}: long heading (${heading.lines} lines): ${heading.text}`);
  }
}
for (const group of browserLogs) {
  for (const entry of group.entries) p1.push(`${group.viewport}: ${entry.type}: ${entry.text}`);
}

const score = Math.max(0, 100 - p1.length * 20 - p2.length * 4);
const gradecard = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  routes: ["/"],
  directions: ["machined-night"],
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

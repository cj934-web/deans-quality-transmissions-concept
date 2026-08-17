import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const workspace = process.cwd();
const output = path.resolve(workspace, "static-dist");
if (path.dirname(output) !== workspace || path.basename(output) !== "static-dist") {
  throw new Error(`Refusing to rebuild unexpected output directory: ${output}`);
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.resolve("dist", "client"), output, { recursive: true });
await cp(path.resolve("app", "icon.svg"), path.join(output, "icon.svg"));

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static-export", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const routes = [
  { route: "/", file: "index.html", marker: "Independent concept redesign" },
  { route: "/shade", file: path.join("shade", "index.html"), marker: "Independent concept direction" },
];
const exported = [];

for (const route of routes) {
  const url = new URL(route.route, "https://deans-quality-transmissions-concept.pages.dev");
  const response = await worker.fetch(
    new Request(url, {
      headers: {
        accept: "text/html",
        host: "deans-quality-transmissions-concept.pages.dev",
        "x-forwarded-proto": "https",
      },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) throw new Error(`Static export for ${route.route} returned ${response.status}`);
  const html = await response.text();
  if (!html.includes(route.marker) || !html.includes("noindex, nofollow")) {
    throw new Error(`Static export for ${route.route} is missing its concept label or noindex guard`);
  }

  const destination = path.join(output, route.file);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
  exported.push({ route: route.route, file: route.file, bytes: Buffer.byteLength(html) });
}

await writeFile(path.join(output, "_redirects"), "/shade /shade/index.html 200\n/shade/* /shade/index.html 200\n/* /index.html 200\n");
const headersPath = path.join(output, "_headers");
const generatedHeaders = await readFile(headersPath, "utf8");
await writeFile(
  headersPath,
  `${generatedHeaders.trimEnd()}\n\n/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`,
);

console.log(JSON.stringify({ output, exported }, null, 2));

#!/usr/bin/env node
// Copies the static build (dist/client) into transip-deploy/ and verifies it.
// Run via: npm run build:transip
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const source = join(root, "dist", "client");
const target = join(root, "transip-deploy");

const requiredFiles = [
  ".htaccess",
  "index.html",
  "_shell.html",
  "aanmelden.html",
  "adhd-behandeling.html",
  "adhd-diagnostiek.html",
  "bedankt.html",
  "contact.html",
  "kosten-en-vergoeding.html",
  "over-ons.html",
  "veelgestelde-vragen.html",
  "voor-verwijzers.html",
  "sitemap.xml",
  "robots.txt",
  "favicon.svg",
];

function fail(message) {
  console.error(`\n[prepare-transip] FAILED: ${message}\n`);
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

if (!existsSync(source)) fail(`${relative(root, source)} not found. Run "vite build" first.`);

const missing = requiredFiles.filter((file) => !existsSync(join(source, file)));
if (missing.length) fail(`missing in build output: ${missing.join(", ")}`);

const files = walk(source);
for (const file of files) {
  if (!/\.(html|js|css|xml|txt|json)$/.test(file)) continue;
  const text = readFileSync(file, "utf8");
  if (/lovable/i.test(text)) fail(`"lovable" reference found in ${relative(source, file)}`);
  if (/ADHD Punt/.test(text))
    fail(`brand spelled "ADHD Punt" in ${relative(source, file)} (must be "ADHDPunt")`);
}

const sitemap = readFileSync(join(source, "sitemap.xml"), "utf8");
if (!sitemap.includes("<loc>https://adhdpunt.nl/</loc>"))
  fail("sitemap.xml does not list https://adhdpunt.nl/");
if (sitemap.includes("/bedankt")) fail("sitemap.xml must not list /bedankt");

for (const page of requiredFiles.filter((f) => f.endsWith(".html") && f !== "_shell.html")) {
  const html = readFileSync(join(source, page), "utf8");
  if (!/<link[^>]+rel="canonical"/.test(html))
    fail(`${page} has no canonical link (prerender incomplete?)`);
  if (!/<h1/.test(html)) fail(`${page} has no prerendered <h1>`);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });

console.log(`[prepare-transip] OK – ${files.length} files copied to transip-deploy/`);
console.log(
  "[prepare-transip] Upload the CONTENTS of transip-deploy/ (including the hidden .htaccess) to the web root.",
);

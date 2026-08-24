import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pages = {
  home: "index.html",
  about: "about/index.html",
  treatments: "treatments/index.html",
  "new-patients": "new-patients/index.html",
  contact: "contact/index.html",
};

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

test("all five required pages exist with a main landmark and one H1", () => {
  for (const [name, relativePath] of Object.entries(pages)) {
    assert.ok(fs.existsSync(path.join(root, relativePath)), `${name} page is missing`);
    const html = read(relativePath);
    assert.match(html, /<main\s+id="main-content">/i, `${name} lacks main landmark`);
    assert.equal((html.match(/<h1(?:\s|>)/gi) || []).length, 1, `${name} must have one H1`);
  }
});

test("contact data and reliable conversion paths are present", () => {
  const combined = Object.values(pages).map(read).join("\n") + read("assets/js/site.js");
  assert.match(combined, /604-266-5313/);
  assert.match(combined, /smile@oakridgeparkdental\.ca/);
  assert.match(combined, /#305\s*[–-]\s*650 West 41st Avenue/);
  assert.match(combined, /tel:\+16042665313/);
  assert.match(combined, /mailto:smile@oakridgeparkdental\.ca/);
  assert.match(combined, /google\.com\/maps\/search/);
});

test("the static continuity site has no form or Manus runtime dependency", () => {
  const files = [...Object.values(pages), "assets/js/site.js"];
  for (const relativePath of files) {
    const content = read(relativePath);
    assert.doesNotMatch(content, /<form\b/i, `${relativePath} contains a form`);
    assert.doesNotMatch(content, /manus\.(space|computer)|\/api\/contact|BUILT_IN_FORGE/i, `${relativePath} depends on Manus runtime`);
  }
});

test("no reviews, ratings, or fabricated testimonials are present", () => {
  const combined = Object.values(pages).map(read).join("\n");
  assert.doesNotMatch(combined, /testimonial|aggregateRating|star rating|five[- ]star|google reviews/i);
});

test("every local image referenced by HTML and shared JavaScript exists", () => {
  const files = [...Object.values(pages), "404.html", "assets/js/site.js"];
  for (const relativePath of files) {
    const content = read(relativePath);
    for (const match of content.matchAll(/(?:src|content)=["'](assets\/images\/[^"']+)["']/g)) {
      assert.ok(fs.existsSync(path.join(root, match[1])), `${relativePath} references missing ${match[1]}`);
    }
  }
});

test("all pages include titles, descriptions, and local styles/scripts", () => {
  for (const [name, relativePath] of Object.entries(pages)) {
    const html = read(relativePath);
    assert.match(html, /<title>[^<]+<\/title>/i, `${name} lacks title`);
    assert.match(html, /<meta\s+name="description"\s+content="[^"]+"/i, `${name} lacks description`);
    assert.match(html, /assets\/css\/styles\.css/);
    assert.match(html, /assets\/js\/site\.js/);
    assert.match(html, /<script\s+type="application\/ld\+json">/i, `${name} lacks Dentist JSON-LD`);
  }
});

test("doctor names exactly match the approved About page source", () => {
  const about = read("about/index.html");
  for (const name of ["Dr. Amad Chaudhry", "Dr. Scarlett Yoo", "Dr. Noa Albanese", "Dr. Marcy Schwartzman"]) {
    assert.match(about, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("GitHub Pages support files exist", () => {
  for (const relativePath of [".nojekyll", "404.html", "robots.txt", "sitemap.xml"]) {
    assert.ok(fs.existsSync(path.join(root, relativePath)), `${relativePath} is missing`);
  }
});

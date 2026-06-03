import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("public contract memo has the required mom-facing title", () => {
  assert.match(html, /<title>\s*동현이가 엄마에게\s*<\/title>/u);
  assert.match(html, /<h1[^>]*>\s*동현이가 엄마에게\s*<\/h1>/u);
});

test("public contract memo includes the fee split proposal", () => {
  assert.match(html, /4,000,000원/u);
  assert.match(html, /착수금/u);
  assert.match(html, /결과보수/u);
  assert.match(html, /성공보수/u);
  assert.match(html, /변호사에게 이렇게 제안해보자/u);
});

test("public contract memo visualizes the four priority clauses", () => {
  for (const clause of ["제7조", "제6조 제4항", "제13조", "제14조"]) {
    assert.match(html, new RegExp(clause, "u"));
  }
});

test("public contract memo stays safe for GitHub publishing", () => {
  assert.doesNotMatch(html, /\.omo/u);
  assert.doesNotMatch(html, /010-/u);
  assert.doesNotMatch(html, /주민등록번호/u);
  assert.doesNotMatch(html, /Downloads/u);
  assert.doesNotMatch(html, /윤선애/u);
});

test("public contract memo includes GitHub Pages sharing guidance", () => {
  assert.match(html, /GitHub Pages/u);
  assert.match(html, /index\.html/u);
});

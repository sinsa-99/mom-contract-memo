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
  assert.match(html, /원고 기준/u);
  assert.match(html, /인정액/u);
  assert.match(html, /회수/u);
  assert.doesNotMatch(html, /감액이나 유리한 결과/u);
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

test("public contract memo removes publishing instructions from the page", () => {
  assert.doesNotMatch(html, /GitHub Pages로 공유하기/u);
  assert.doesNotMatch(html, /https:\/\/사용자명\.github\.io\/저장소명/u);
});

test("public contract memo uses the requested mom-facing reassurance", () => {
  assert.match(html, /엄마 궁금한거 있으면 또 물어봐 바로 체크해줄게/u);
  assert.doesNotMatch(html, /이 계약서는 전부 나쁜 계약이라는 뜻은 아니야/u);
});

test("public contract memo explains why each question is reasonable", () => {
  const reasonCount = (html.match(/왜 물어보냐면/g) ?? []).length;
  const validCount = (html.match(/변호사가 들어도 타당한 이유/g) ?? []).length;

  assert.equal(reasonCount, 5);
  assert.equal(validCount, 5);
  assert.match(html, /터무니없는 요구가 아니라/u);
});

test("public contract memo includes Galaxy Fold mobile tuning", () => {
  assert.match(html, /Galaxy Fold7/u);
  assert.match(html, /max-width:\s*430px/u);
  assert.match(html, /max-width:\s*374px/u);

  const foldCoverBlock = html.match(
    /\/\* Galaxy Fold7 cover display tuning \*\/[\s\S]*?(?=\/\* Galaxy Fold7 narrow folded reading guard \*\/)/u,
  )?.[0] ?? "";

  assert.match(foldCoverBlock, /\.metric\s*\{[\s\S]*grid-template-columns:\s*1fr/u);
});

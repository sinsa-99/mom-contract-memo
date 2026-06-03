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
  assert.match(html, /성공보수/u);
  assert.match(html, /변호사에게 이렇게 제안해보자/u);
  assert.match(html, /원고 기준/u);
  assert.match(html, /회수/u);
  assert.match(html, /착수보수 분납/u);
  assert.match(html, /계약 시 200만원/u);
  assert.match(html, /성공보수 기준 정정/u);
  assert.match(html, /회수금액의 10%/u);
  assert.doesNotMatch(html, /감액이나 유리한 결과/u);
  assert.doesNotMatch(html, /기본 착수금은 따로 정하고/u);
  assert.doesNotMatch(html, /결과보수 \/ 성공보수/u);
});

test("public contract memo keeps the top-to-bottom proposal context aligned", () => {
  const summaryPanel = html.match(/<aside class="summary-panel"[\s\S]*?<\/aside>/u)?.[0] ?? "";
  const proposalSection = html.match(/<section id="proposal"[\s\S]*?<\/section>/u)?.[0] ?? "";

  assert.match(summaryPanel, /핵심 제안/u);
  assert.match(summaryPanel, /2가지/u);
  assert.match(summaryPanel, /착수보수 분납과 성공보수 회수금액 기준 정정/u);
  assert.match(proposalSection, /착수보수 400만원을 한 번에 내야 하는 부담을 분납으로 줄이고/u);
  assert.match(proposalSection, /성공보수 기준 정정/u);
  assert.doesNotMatch(summaryPanel, /분리/u);
  assert.doesNotMatch(summaryPanel, /착수금과 결과보수\/성공보수를 따로 정하기/u);
  assert.doesNotMatch(html, /결과보수는 실제 경제적 이득이 생겼을 때만/u);
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
  assert.doesNotMatch(html, /광주지법\s*2026가단32111/u);
  assert.doesNotMatch(html, /서울 서초구/u);
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

test("public contract memo provides a copy-ready lawyer request", () => {
  assert.match(html, /id="lawyer-message"/u);
  assert.match(html, /id="client-name"/u);
  assert.match(html, /readonly/u);
  assert.match(html, /\[성함\]입니다/u);
  assert.match(html, /계약 시: 200만원/u);
  assert.match(html, /변론 진행 중: 100만원/u);
  assert.match(html, /변론종결 무렵: 100만원/u);
  assert.match(html, /회수금액의 10%/u);
  assert.match(html, /data-copy-target="lawyer-message"/u);
  assert.ok(html.includes('replaceAll("[성함]"'));
  assert.match(html, /navigator\.clipboard\.writeText/u);
  assert.match(html, /document\.execCommand\("copy"\)/u);
});

test("public contract memo includes plaintiff-side poison-clause cross review", () => {
  for (const phrase of [
    "교차검증 결론",
    "제7조 성공보수 기준",
    "선고시",
    "제6조 제4항 시간당 보수율",
    "제7조 나③ + 제9조",
    "제8조 실비",
    "제11조 보수지급 지체",
    "제12조 자료 폐기",
    "제13조 지급보장",
    "제2조 위임한계",
    "심각도: 상",
    "심각도: 중",
    "반드시 고쳐야 할 것",
    "고치면 좋은 것",
    "그냥 알아두면 될 것",
  ]) {
    assert.ok(html.includes(phrase), `Expected page to include: ${phrase}`);
  }
});

test("public contract memo lists the top five correction requests", () => {
  const topFive = html.match(/class="priority-line"/g) ?? [];

  assert.equal(topFive.length, 5);
  assert.match(html, /변호사에게 정정 요청할 조항 우선순위 top 5/u);
  assert.match(html, /성공보수는 회수금액 기준/u);
  assert.match(html, /성공보수 지급시기는 실제 회수 시/u);
  assert.match(html, /시간당 보수율과 시간기록표/u);
  assert.match(html, /원본 증거와 소송 필수 문서/u);
  assert.match(html, /인장 조각과 사용은 서류별 사전승인/u);
});

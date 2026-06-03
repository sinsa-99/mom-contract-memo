# 동현이가 엄마에게

소송위임계약서 검토 내용을 엄마에게 보여주기 쉽게 정리한 단일 HTML 페이지입니다.

## 공유 링크

- GitHub Pages: https://sinsa-99.github.io/mom-contract-memo/
- 저장소: https://github.com/sinsa-99/mom-contract-memo

## 로컬에서 보기

```bash
python3 -m http.server 4173
```

브라우저에서 `http://127.0.0.1:4173/index.html`을 열면 됩니다.

## 테스트

```bash
/Users/dddhhh5137/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/contract-html.test.mjs
```

## GitHub Pages로 공유

이 프로젝트는 단일 `index.html` 파일이라 GitHub Pages에 바로 올리기 좋습니다. 현재 배포본은 아래 링크로 열립니다.

```bash
https://sinsa-99.github.io/mom-contract-memo/
```

새 저장소에서 같은 방식으로 공유하려면 `index.html`을 루트에 두고 Pages 소스를 `main` 브랜치 `/`로 지정하면 됩니다. 링크 형식은 보통 아래와 같습니다.

```text
https://<github-user>.github.io/mom-contract-memo/
```

개인정보가 들어 있는 로컬 증거 폴더는 `.gitignore`로 제외되어 있습니다.

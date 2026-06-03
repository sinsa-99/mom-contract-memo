# 동현이가 엄마에게

소송위임계약서 검토 내용을 엄마에게 보여주기 쉽게 정리한 단일 HTML 페이지입니다.

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

현재 이 폴더에는 원격 저장소가 없고, `gh auth status`에서 기존 GitHub 토큰이 invalid로 확인됐습니다. 먼저 인증을 새로 해야 합니다.

```bash
gh auth login -h github.com
gh repo create mom-contract-memo --public --source=. --remote=origin --push
gh api -X POST repos/:owner/mom-contract-memo/pages -f source.branch=main -f source.path=/
```

Pages가 켜지면 링크는 보통 아래 형식입니다.

```text
https://<github-user>.github.io/mom-contract-memo/
```

개인정보가 들어 있는 로컬 증거 폴더는 `.gitignore`로 제외되어 있습니다.

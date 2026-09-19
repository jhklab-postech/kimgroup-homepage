# 변경 기록 (CHANGELOG)

새 버전은 위에 추가합니다. 각 버전은 GitHub 태그(`v1.0` 등)로도 남겨 두어, 언제든 그 시점의 파일을 받거나 되돌릴 수 있습니다.

## 되돌리는 방법

**방법 1: Pull Request 되돌리기 (권장, 클릭 두 번)**
1. 저장소의 **Pull requests → Closed**에서 되돌릴 버전의 PR을 엽니다.
2. PR 아래쪽의 **Revert** 버튼을 누르면 되돌리는 PR이 새로 만들어집니다.
3. 그 PR을 **Merge**합니다.
4. 1~2분 뒤 사이트가 이전 모습으로 자동 배포됩니다.

**방법 2: 특정 파일만 이전 버전으로**
1. 파일 화면에서 **History**를 눌러 원하는 시점을 고릅니다.
2. 그 시점의 내용을 복사해서 현재 파일에 붙여 넣고 저장합니다.

**방법 3: 태그 시점 전체 확인·다운로드**
**Releases**(또는 Tags)에서 `v1.0` 등을 고르면 그 시점의 전체 파일을 ZIP으로 받을 수 있습니다.

---

## v1.1 — 2026-09-19 · Kim Group 색상, 스크롤 진행 바, 숫자 통계

레이아웃, 타이포그래피, 여백, Hero 구성은 그대로 두고, 아래만 바꿨습니다.

### 색상: BMOL의 검정+노랑 → 기존 Kim Group Weebly 색
- 흰 배경의 밝은 테마로 바꿨습니다.
- 청록 `#3D7C89`(primary): Weebly의 링크 색 `#5199A8`/`#44818E`를 흰 배경 글자 대비 4.5:1 이상이 되도록 약간 진하게 조정했습니다.
- 라즈베리 `#B8285F`(accent): Weebly 로고의 "at POSTECH" 색입니다.
- 웜 그레이 `#605B5B`(secondary): Weebly 푸터 색입니다.
- 상단 로고의 "at POSTECH"을 라즈베리로 표시해 Weebly 로고와 같은 구성으로 맞췄습니다.
- 파비콘을 노란 K에서 라즈베리 K(`assets/img/favicon.svg`)로 바꿨습니다.

### 색상 중앙화 (디자인 토큰)
- `assets/css/tokens.css`를 새로 만들었습니다. 사이트의 모든 색은 여기서만 정의합니다.
  - 기본 8개: primary, secondary, accent, bg, surface, text, muted, border
  - 대비 색 2개: on-primary, on-secondary
  - 자동 계산 파생 색: hover, 반투명 헤더 등
- `base.css`와 `style.css`에 직접 적혀 있던 색상 값을 모두 변수로 바꿨습니다 (남은 하드코딩 0개).
- `bmol-style.css`의 이름을 `style.css`로 바꿨습니다 (내용은 색 변수화 외에는 그대로).

### 스크롤 진행 바
- 모든 페이지 맨 위에 2px 두께의 얇은 막대로, 읽은 비율만큼 늘어납니다 (`_layouts/default.liquid`, `site.js`).
- 스크롤할 내용이 없는 짧은 페이지에서는 자동으로 숨깁니다.

### 숫자 통계 (홈 Hero 아래)
- Publications: `_bibliography/papers.bib` 항목 수를 자동으로 셉니다 (현재 48).
- Current Members: `_data/members.yml` 인원 수를 자동으로 셉니다 (현재 10).
- 항목은 `_pages/about.md`의 `stats:`에서 정합니다. 숫자는 HTML에 직접 적지 않습니다.
- 화면에 들어오면 1.2초 동안 0부터 올라갑니다. 기기의 "움직임 줄이기" 설정이 켜져 있으면 애니메이션 없이 바로 표시합니다.
- 각 숫자를 누르면 해당 페이지로 이동합니다.

### 버그 수정
- 문단 규칙이 상단 라벨(eyebrow)의 색과 크기를 덮어쓰던 문제를 고쳤습니다.
  - 해당 위치: 홈의 "FROM THE LAB", Research와 Positions 페이지의 "KIM GROUP · POSTECH"
  - v1.0에서는 이 라벨들이 어둡거나 크게 보였습니다.

### 바뀐 파일
- **새 파일:** `assets/css/tokens.css`, `assets/img/favicon.svg`, `CHANGELOG.md`
- **이름 변경:** `assets/css/bmol-style.css` → `assets/css/style.css`
- **수정:** `assets/css/base.css`, `assets/js/site.js`, `_includes/head.liquid`, `_layouts/default.liquid`, `_layouts/about.liquid`, `_pages/about.md`, `README.md`

---

## v1.0 — 2026-09-19 · 첫 Jekyll 버전 (커밋 `7a2abfc`)
- bmol-preview의 정적 HTML을 al-folio/Jekyll 구조로 옮겼습니다.
  - 콘텐츠를 `_data/*.yml`, `_bibliography/papers.bib`, `_news/`, `_projects/`로 분리했습니다.
- GitHub Actions로 자동 배포합니다.
- 디자인은 BMOL을 참고한 검정 배경과 노랑 포인트였습니다.

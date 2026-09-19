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

## v1.3 — 2026-09-19 · Lab Life 이벤트 갤러리

Lab Life의 배치만 바꿨습니다. 글꼴, 간격, 색은 그대로입니다.

### 사진 단위에서 이벤트 단위로
- **데이터:** `_data/lablife.yml`을 사진 13장 목록에서 **이벤트 10개**(`title`, `date`, `photos`, 선택 `cover_position`)로 바꿨습니다.
  - 기존 캡션을 기준으로 같은 행사 사진을 묶었습니다 (ALTA 학회, 겨울방학 연구참여 프로그램, 구룡포는 각 2장).
  - 날짜는 캡션에 적힌 정보만 썼습니다.
    - 스승의 날 → May 2022
    - ICAMD → Dec 2017 (사진 속 현수막 "December 5~8, 2017")
    - 월을 알 수 없는 이벤트는 연도만 표시합니다.
  - 구룡포는 가로 사진(`lablife-08`)을 대표 사진으로 했습니다.
  - 세로 사진이 대표인 스승의 날과 ICAMD는 인물이 보이도록 자르는 위치를 지정했습니다.

### 규칙적인 갤러리
- **정렬과 묶음:** 날짜 최신순으로 자동 정렬하고, 연도별 제목(2022, 2021, 2019, 2017)으로 묶습니다 (`_pages/lab-life.md`의 `group_by_year`).
- **카드:** 대표 사진은 모두 **4:3, `object-fit: cover`**입니다. 그 아래 같은 위치에 날짜(작은 대문자 라벨)와 제목(최대 2줄)을 둡니다.
  - 카드 테두리와 그림자는 쓰지 않았습니다.
- **여러 장 표시:** 사진이 여러 장인 이벤트는 대표 사진 오른쪽 아래에 `+N`을 표시합니다.
- **열 수:** 데스크톱 3열, 태블릿(1000px 이하) 2열, 모바일(767px 이하) 1열
- **사진 보기 창(lightbox):** 원본 비율로 표시합니다.
  - 넘기기: ←/→ 키, 좌우 버튼, 터치 밀기
  - 닫기: Esc, 바깥 클릭, 닫기 버튼
  - 닫으면 누른 카드로 포커스가 돌아갑니다.
  - JS가 없으면 대표 사진 파일이 바로 열립니다.
- **새 디자인 값** (`tokens.css`): `--color-overlay`, `--color-on-overlay(-muted)`, `--color-badge-bg`, `--radius-pill`
- **새 화면 문구** (`strings.yml`): `common.months`, `lablife.*`

### 바뀐 파일
- **수정:** `_data/lablife.yml`, `_data/strings.yml`, `_layouts/gallery.liquid`, `_pages/lab-life.md`, `assets/css/tokens.css`, `assets/css/main.css`, `assets/js/site.js`, `docs/CONTENT_MODEL.md`, `README.md`, `CHANGELOG.md`

## v1.2.1 — 2026-09-19 · Current Members 갱신, 사진 없는 구성원용 기본 모양
- **구성원 변경** (`_data/members.yml`)
  - 뺐음: Dongwon Seo
  - 추가: Wootack Lim, Seunghyun Mun, Myeongsoo Seo (모두 Graduate Student)
  - 홈의 Current Members 숫자는 10 → 12로 자동으로 바뀝니다.
  - Dongwon Seo의 사진 파일 `assets/img/people/dongwon-seo.jpg`는 저장소에 그대로 두었습니다.
- **기본 사람 모양:** 사진(`image`)이 없는 구성원과 졸업생에게 원형 배경에 머리·어깨 모양을 표시합니다.
  - 사진과 같은 크기의 틀을 씁니다.
  - 파일: `_includes/person-placeholder.liquid`
  - 색: `tokens.css`의 `--color-avatar-bg` / `--color-avatar-fg`
- **바뀐 파일**
  - 새 파일: `_includes/person-placeholder.liquid`
  - 수정: `_data/members.yml`, `_layouts/members.liquid`, `_layouts/alumni.liquid`, `assets/css/tokens.css`, `assets/css/main.css`, `docs/CONTENT_MODEL.md`, `README.md`, `CHANGELOG.md`

## v1.2 — 2026-09-19 · 콘텐츠·디자인 구조 정리 (화면 변화 없음)

AI가 수정하기 쉽고 나중에 관리자 페이지(CMS)를 붙이기 쉽도록 구조만 정리했습니다. 화면은 그대로입니다.
확인 방법: 8페이지 × 5가지 화면 폭에서 옛/새 CSS의 모든 요소 위치·크기를 비교했고, 차이가 없었습니다.

### 콘텐츠와 화면 틀 분리 (single source of truth)
- **`_data/lab.yml` 신설**: 연구실 이름·소속·학과·위치·대표 이메일을 모았습니다.
  - 전에는 `_config.yml`, 홈 문구, 푸터에 흩어져 있었습니다.
  - 이제 탭 제목, 로고, 라벨, 홈 소개, 푸터가 모두 여기서 가져옵니다.
- **`_data/strings.yml` 신설**: 레이아웃과 JS에 직접 적혀 있던 화면 문구를 옮겼습니다.
  - 예: Related publications, Professional Experience, Pause/Play, 메뉴 열기/닫기
- **이메일**: 3곳에 적혀 있던 것을 한 곳으로 모았습니다 (`lab.yml`이 비어 있으면 `pi.yml`).
- **홈 소개**: "Directed by Prof. …"와 소속을 `pi.yml`·`lab.yml`에서 가져옵니다.
- **Research의 Related publications**: 논문 제목·학술지를 다시 적던 방식을 `papers.bib` 키 참조로 바꿨습니다.
  - 표기는 논문 목록과 같은 형식으로 통일했습니다 (예: `Science (2026)` → `Science 391, 6791 (2026)`).
- **Publications 페이지**: 틀을 `_layouts/publications.liquid`로 옮겼습니다.
  - "2010 ~ 2016" 묶음 기준 연도와 제목은 페이지 설정(`archive:`)에서 바꿀 수 있습니다.
- **사람 데이터 형식 통일**: `lab_authors.yml`을 다른 사람 파일과 같은 형식(`name` + `aliases`)으로 바꿨습니다.
- **`_config.yml`**: 빌드 설정만 남겼습니다.

### 디자인 값 중앙화
- **`tokens.css` 확장**: 색에 더해 글꼴, 역할별 글자 크기(모바일 값 포함), 줄 간격, 자간, 간격, 레이아웃 폭·여백, 모서리, 움직임, 겹침 순서를 넣었습니다. 웹 글꼴도 여기서 불러옵니다.
- **CSS 통합**: `base.css`(옛 Weebly 구조)와 `style.css`(한 줄로 압축된 파일)를 읽기 쉬운 **`main.css`** 하나로 합쳤습니다.
  - 쓰지 않던 규칙은 지웠습니다.
- **모서리 정리**: 모서리 값을 4단계로 통일해 일부가 1px 달라졌습니다 (드롭다운·관련 논문 상자 8→7px, 구성원 사진 6→7px, Lab Life 사진 9→10px).

### 기타
- **PR 빌드 검사**: Pull Request에서 자동 빌드 검사를 합니다 (배포는 main에 Merge될 때만).
- **`docs/CONTENT_MODEL.md` 신설**: 콘텐츠 유형별 형식, 단일 원본 표, CMS 연결 시 대응 방법을 정리했습니다.
- **사이트에서 제외**: `CHANGELOG.md`와 `docs/`는 사이트 파일에서 뺐습니다 (저장소에서만 보임).

### 바뀐 파일
- **새 파일:** `_data/lab.yml`, `_data/strings.yml`, `_includes/lab-label.liquid`, `_includes/lab-email-link.liquid`, `_includes/publication-venue.liquid`, `_layouts/bib_related.liquid`, `_layouts/publications.liquid`, `_pages/publications.md`, `assets/css/main.css`, `docs/CONTENT_MODEL.md`
- **삭제:** `assets/css/base.css`, `assets/css/style.css` (→ `main.css`), `_pages/publications.html` (→ `.md`)
- **수정:**
  - 설정·데이터: `_config.yml`, `_data/lab_authors.yml`, `_pages/about.md`, `_pages/positions.md`, `_projects/*.md`(3개)
  - 틀: `_includes/head·header·footer·page-heading.liquid`, `_layouts/default·about·research·pi·members·alumni·bib.liquid`
  - 디자인·동작: `assets/css/tokens.css`, `assets/js/site.js`
  - 배포·문서: `.github/workflows/deploy.yml`, `README.md`

## v1.1.1 — 2026-09-19 · 파비콘 수정
- `assets/img/favicon.svg`의 주석에 `--`가 들어 있어 SVG가 깨지고 탭 아이콘이 표시되지 않던 문제를 고쳤습니다 (XML 주석에는 `--`를 쓸 수 없음).

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

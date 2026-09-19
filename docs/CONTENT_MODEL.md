# 콘텐츠 구조 (Content Model)

이 사이트의 모든 콘텐츠가 **어디에, 어떤 형식으로** 저장되는지 정리한 문서입니다.
AI에게 수정을 요청할 때나, 나중에 관리자 페이지(CMS)를 붙일 때 이 문서를 기준으로 삼습니다.

## 1. 원칙

1. **콘텐츠와 화면 틀을 분리합니다.** 콘텐츠는 `_data/`, `_bibliography/`, `_news/`, `_projects/`, `_pages/`(front matter와 본문)에만 둡니다. `_layouts/`와 `_includes/`는 화면 틀이라 콘텐츠를 적지 않습니다.
2. **한 가지 사실은 한 곳에만 둡니다 (single source of truth).** 다른 곳에서 필요하면 가져다 씁니다 (3번 표 참고).
3. **같은 종류의 데이터는 같은 형식을 씁니다.** 예를 들어 사람은 어느 파일에 있든 `name`, `aliases`, `image`, `email`을 같은 의미로 씁니다.
4. **디자인 값은 `assets/css/tokens.css` 한 곳에 모읍니다.** `main.css`는 변수만 가져다 씁니다.
5. **화면 문구**(버튼, 라벨, 소제목)는 `_data/strings.yml`에 둡니다. JS도 문구를 직접 갖지 않습니다.

## 2. 폴더 역할

| 구분 | 위치 | 내용 |
|---|---|---|
| 콘텐츠 | `_data/*.yml` | 연구실 정보, 사람, 메뉴, 슬라이드, 사진, 화면 문구 |
| 콘텐츠 | `_bibliography/papers.bib` | 논문 |
| 콘텐츠 | `_news/*.md` | 소식 (파일 1개 = 소식 1개) |
| 콘텐츠 | `_projects/*.md` | 연구 주제 (파일 1개 = 주제 1개) |
| 콘텐츠 | `_pages/*.md` | 각 페이지의 주소·제목·문구(front matter)와 본문 |
| 이미지 | `assets/img/people/`, `highlights/`, `lab-life/` | 데이터 파일에는 파일 이름만 적습니다 |
| 화면 틀 | `_layouts/*.liquid`, `_includes/*.liquid` | HTML 구조. 콘텐츠를 적지 않습니다 |
| 디자인 | `assets/css/tokens.css` → `main.css` | 디자인 값 → 규칙 |
| 동작 | `assets/js/site.js` | 메뉴, 슬라이드, 진행 바, 숫자 애니메이션 |
| 빌드 | `_config.yml`, `Gemfile`, `.github/workflows/` | 빌드·배포 설정 (콘텐츠 없음) |

## 3. 단일 원본 표 (어떤 사실이 어디에 있는가)

| 사실 | 원본 | 이 값을 가져다 쓰는 곳 |
|---|---|---|
| 연구실 이름·약칭·소속·학과·위치 | `_data/lab.yml` | 탭 제목, 상단 로고, 페이지 위 라벨, 홈 소개, 푸터, 검색 설명 |
| 연구실 이메일 | `_data/lab.yml`의 `email` (비어 있으면 `_data/pi.yml`의 `email`) | 푸터, Positions (`_includes/lab-email-link.liquid`) |
| 교수님 이름·연락처·경력 | `_data/pi.yml` | PI 페이지, 홈 "Directed by", 논문 저자 굵게 표시 |
| 구성원·졸업생 | `_data/members.yml`, `_data/alumni.yml` | 각 페이지, 홈 숫자 통계, 논문 저자 굵게 표시 |
| 논문 | `_bibliography/papers.bib` | Publications, 홈 숫자 통계, Research의 Related publications |
| 연구 주제 | `_projects/*.md` | Research 페이지, 홈 연구 카드 |
| 소식 | `_news/*.md` | 홈 Latest news |
| 메뉴 | `_data/navigation.yml` | 상단 메뉴 |
| 화면 문구 | `_data/strings.yml` | 모든 레이아웃, `site.js`(HTML `data-*` 속성을 거쳐 전달) |
| 색·글꼴·크기·간격 | `assets/css/tokens.css` | `main.css` (파비콘 색만 예외로 `favicon.svg`에 직접 적음) |

## 4. 콘텐츠 유형별 형식

표기: **필수**는 굵게, 나머지는 선택 항목입니다. 이미지 항목에는 파일 이름만 적습니다 (폴더는 유형마다 정해져 있음).

### 사람 (공통 형식)
모든 사람 파일은 아래 항목을 같은 의미로 씁니다.

| 항목 | 형식 | 설명 |
|---|---|---|
| **name** | 문자열 | 화면에 표시되는 이름. 논문 저자 굵게 표시의 기준 |
| aliases | 문자열 목록 | 논문에 다른 표기로 적힌 이름 (예: `[Su-Beom Song]`) |
| image | 파일 이름 | `assets/img/people/` |
| email | 문자열 | 표시용 (예: `name (at) postech.ac.kr`) |

- **PI** `_data/pi.yml` (항목 1개)
  - 공통 항목
  - `address`(줄 목록), `office`, `phone`
  - `experience[] {role, organization, period}`
  - `education[] {degree, detail, date}`
- **구성원** `_data/members.yml` (목록, 적힌 순서대로 표시): 공통 항목 + **role**
- **졸업생** `_data/alumni.yml` (목록): 공통 항목 + `program`, `degrees`(줄 목록), `present`
- **기타 연구실 출신 저자** `_data/lab_authors.yml` (목록): **name**, aliases. 페이지에는 나오지 않고 논문 굵게 표시에만 쓰입니다.

### 논문 `_bibliography/papers.bib` (BibTeX)
- 파일에 적힌 순서대로 표시되므로 **새 논문은 맨 위에** 추가합니다.

| 필드 | 설명 |
|---|---|
| 키 (`@article{키,`) | 고유 ID. Research의 `related`에서 이 키로 참조합니다 |
| **title**, **author**, **year** | 저자는 `성, 이름 and ...`. 공동 제1저자는 성 뒤에 `*`, 교신저자는 `†` |
| journal, volume, number, pages | 학술지 표기 "학술지 권(호), 쪽 (연도)" |
| note | pages가 없을 때 대신 표시 (예: `Accepted`). journal이 없으면 note만 표시 (예: `Under Review`, `@unpublished`) |
| url | 학술지 표기에 링크로 연결 |
| press | 보도 링크 `이름\|주소; 이름\|주소` |
| highlight_skip | 동명이인 때문에 굵게 표시하지 않을 저자 순번 (예: `{4}`) |

### 소식 `_news/YYYY-MM-DD-짧은-제목.md` (파일 1개 = 소식 1개)
- **date** (front matter)
- 본문: Markdown 한 문단
- 홈에는 최신순으로 `_pages/about.md`의 `news_section.limit`개만 표시합니다.

### 연구 주제 `_projects/이름.md` (파일 1개 = 주제 1개)

| 항목 | 설명 |
|---|---|
| **title** | Research 페이지 소제목 |
| **anchor** | 페이지 안 위치 (`research.html#anchor`) |
| **importance** | 표시 순서 (작을수록 먼저) |
| featured | `true`면 홈 카드를 강조색으로 표시 |
| **card** `{label, title, summary}` | 홈 연구 카드 문구 |
| related | `papers.bib` 키 목록. 논문 제목과 학술지는 자동으로 표시되므로 다시 적지 않습니다 |
| 본문 | 설명 문단 (Markdown) |

### 페이지 `_pages/*.md`
- 공통 항목: **layout**, **title**, **permalink**
- 페이지별 추가 항목

| 페이지 | 추가 항목 |
|---|---|
| 홈 (`about.md`) | `hero{title[2], subtitle, lede, buttons[]{label,url,style}}`, `highlights_caption`, `stats[]{label, source, link}`, `research_section`, `news_section{eyebrow,title,limit,date_format}`, `join` |
| `research.md` | `overview_heading` + 본문 |
| `publications.md` | `archive{until, label}` |
| `positions.md` | 본문 |
| 사람·사진 페이지 | 추가 항목 없음. 내용은 모두 `_data/`에서 가져옵니다 |

`stats[].source`에 쓸 수 있는 값:
- `publications`: 논문 수
- `members`: 구성원 수
- `alumni`: 졸업생 수
- `projects`: 연구 주제 수

### 기타 목록 (`_data/`)

| 파일 | 형식 |
|---|---|
| `highlights.yml` | `[{image, alt}]`, 이미지는 `assets/img/highlights/` |
| `lablife.yml` | `[{image, caption}]`, 이미지는 `assets/img/lab-life/` |
| `navigation.yml` | `[{title, url, children[]{title,url}}]` |
| `strings.yml` | 화면 문구. 페이지별로 묶여 있음 (`common`, `home`, `research`, `people`, `pi`) |

## 5. 디자인 토큰 (`assets/css/tokens.css`)

| 구분 | 변수 |
|---|---|
| 색상 | `--color-primary/secondary/accent/bg/surface/text/muted/border` (+ 자동 계산 파생 색) |
| 글꼴 | `--font-serif`, `--font-sans`, `--weight-*` (웹 글꼴 불러오기도 이 파일에서) |
| 글자 크기 | 역할별 `--text-*` (모바일 값은 `-sm`, 1000px 이하는 `-md`), `--leading-*`, `--tracking-*` |
| 간격 | `--space-1`~`--space-20` (4px 단위), 레이아웃 `--container`, `--gutter`, `--page-space-*`, `--section-space` |
| 모양 | `--radius-xs/sm/md/lg`, `--border-width` |
| 움직임·겹침 | `--motion-*`, `--z-*` |

- 반응형 기준 폭(1400/1000/767/440px)은 CSS 변수를 쓸 수 없어서 `main.css`의 `@media`에 적혀 있습니다.

## 6. 향후 관리자 페이지(CMS)를 붙일 때

지금 구조는 Decap CMS, Pages CMS 같은 Git 기반 CMS가 바로 읽을 수 있는 형태입니다. 연결할 때는 CMS 설정 파일만 추가하면 되고, 콘텐츠 파일은 바꾸지 않아도 됩니다.

**CMS 설정에 대응시키는 방법**
- `_news/`, `_projects/` → 폴더 컬렉션 (항목마다 파일 1개, 4장의 항목이 입력 필드)
- `_data/*.yml` → 파일 컬렉션 (목록 입력 필드)
- `_pages/*.md` → 파일 컬렉션 (front matter 입력 필드 + 본문)
- 이미지 → 각 유형 폴더(`assets/img/people/` 등)를 업로드 폴더로 지정

**주의할 점**
- **논문(BibTeX)**은 대부분의 CMS에서 입력 폼으로 편집할 수 없습니다. 다음 중 하나를 고릅니다.
  - `papers.bib`를 텍스트로 편집한다.
  - 논문을 `_data/publications.yml`로 옮기고 표시 템플릿을 바꾼다. 이때는 `bib.liquid`와 `publication-venue.liquid`만 바꾸면 되고, 논문을 참조하는 `related` 키는 그대로 쓸 수 있습니다.
- 사람 이름을 바꾸면 논문 저자 굵게 표시가 이름 기준이라 영향을 받습니다. 이름을 바꿀 때는 이전 표기를 `aliases`에 남기세요.
- 저장소는 main에 직접 올리지 말고 PR로 올리는 흐름을 유지하는 것이 좋습니다. PR에서는 자동 빌드 검사가 먼저 돌아갑니다.

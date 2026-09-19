# Kim Group at POSTECH 홈페이지

Jekyll(al-folio 방식 콘텐츠 관리) + GitHub Pages 자동 배포.
**HTML을 고칠 필요 없이** 아래 콘텐츠 파일만 수정하면, main에 반영되는 순간 자동으로 빌드·배포됩니다(약 1~2분).
콘텐츠의 전체 구조와 각 항목의 형식은 [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md)에 있습니다.

## 무엇을 어디서 고치나요?

| 바꾸고 싶은 것 | 수정할 파일 |
|---|---|
| 연구실 이름·소속·학과·위치·대표 이메일 | `_data/lab.yml` |
| 교수님 정보·경력 | `_data/pi.yml` |
| 구성원 추가/수정 | `_data/members.yml` + 사진은 `assets/img/people/` |
| 졸업생 | `_data/alumni.yml` (졸업하면 members.yml에서 옮기기) |
| 논문 | `_bibliography/papers.bib` (**새 논문은 맨 위에**) |
| 소식 (홈 Latest news) | `_news/`에 Markdown 파일 추가 |
| 연구 주제 (Research 페이지 + 홈 카드) | `_projects/`의 Markdown 파일 |
| 홈 문구, 버튼, 숫자 통계 항목 | `_pages/about.md` 앞부분 |
| 홈 슬라이드 이미지 | `_data/highlights.yml` + `assets/img/highlights/` |
| Lab Life 사진 | `_data/lablife.yml` + `assets/img/lab-life/` |
| Research 소개, Positions 문구 | `_pages/research.md`, `_pages/positions.md` |
| 상단 메뉴 | `_data/navigation.yml` |
| 버튼·라벨·소제목 같은 화면 문구 | `_data/strings.yml` |
| **색, 글꼴, 글자 크기, 간격, 모서리** | `assets/css/tokens.css` (디자인 값은 여기만) |
| 배치 같은 세부 디자인 규칙 | `assets/css/main.css` |

## 자주 하는 작업

### 새 구성원
1. 사진을 `assets/img/people/`에 올립니다 (예: `gildong-hong.jpg`).
2. `_data/members.yml`에 추가합니다.
```yaml
- name: Gildong Hong
  role: Graduate Student
  email: gildong (at) postech.ac.kr
  image: gildong-hong.jpg
```
홈의 Current Members 숫자는 자동으로 바뀝니다.

### 새 논문
`_bibliography/papers.bib` **맨 위**에 추가합니다. 번호, 연도 구분, 홈의 Publications 숫자는 자동입니다.
- 저자는 `성, 이름` 형식으로 쓰고 `and`로 구분합니다.
- 공동 제1저자는 성 뒤에 `*`, 교신저자는 `†`를 붙입니다 (예: `Hong*, Chengyun`, `Kim†, Jonghwan`).
- 연구실 구성원 이름은 자동으로 굵게 표시됩니다. 논문에 다른 표기로 적혀 있으면 그 사람의 `aliases`에 추가하세요.
```bibtex
@article{hong2027example,
  title   = {Paper title},
  author  = {Hong*, Gildong and Park, Chulsoo and Kim†, Jonghwan},
  journal = {Nature Communications},
  volume  = {18},
  pages   = {1234},
  year    = {2027},
  url     = {https://doi.org/...}
}
```
- 심사 중인 논문: `@unpublished{...}` + `note = {Under Review}` (journal 생략)
- 보도 링크: `press = {전자신문|https://...; Eurekalert!|https://...}`

### 새 소식
`_news/2027-03-01-short-title.md` 파일을 만듭니다. 홈에는 최신 6개가 보입니다 (`_pages/about.md`의 `limit`).
```markdown
---
date: 2027-03-01
---
Gildong's work is accepted to _**Nature Physics**_. _Congratulations!_
```

### 새 연구 주제
`_projects/`의 기존 파일을 복사해서 `title`, `anchor`, `importance`(순서), `card`(홈 카드 문구)를 고치고 본문을 씁니다.
관련 논문은 `related:`에 **papers.bib의 키만** 적습니다. 제목과 학술지는 자동으로 표시됩니다.
```yaml
related:
  - hong2026hbnmoire
  - kim2025hhgws2
```

### 색·디자인 바꾸기
`assets/css/tokens.css`의 값을 고치면 사이트 전체에 반영됩니다. `main.css`에는 색이나 글꼴 값을 직접 쓰지 마세요.

| 변수 | 쓰이는 곳 |
|---|---|
| `--color-primary` | 링크, 버튼, 현재 메뉴, 논문 연도, 강조 연구 카드 |
| `--color-secondary` | 하단 Join 띠 같은 어두운 면 |
| `--color-accent` | 로고 "at POSTECH", 작은 라벨, 숫자 통계, 스크롤 진행 바 |
| `--color-bg` / `--color-surface` | 페이지 배경 / 카드 배경 |
| `--color-text` / `--color-muted` | 본문 글자 / 보조 글자 |
| `--color-border` | 구분선, 테두리 |
| `--text-*`, `--space-*`, `--radius-*` | 글자 크기, 간격, 모서리 |

브라우저 탭 아이콘은 `assets/img/favicon.svg`에서 따로 바꿉니다 (CSS 변수 사용 불가).

## 폴더 구조

```
_config.yml            빌드 설정만 (콘텐츠 없음)
_data/                 연구실·사람·메뉴·슬라이드·사진·화면 문구 (YAML)
_bibliography/         papers.bib
_news/                 소식 (Markdown, 1파일 = 1소식)
_projects/             연구 주제 (Markdown, 1파일 = 1주제)
_pages/                각 페이지의 주소·문구
_layouts/, _includes/  화면 틀 (콘텐츠 없음)
assets/css/            tokens.css(디자인 값) → main.css(규칙)
assets/js, img/        동작, 이미지
docs/                  콘텐츠 구조 문서
.github/workflows/     자동 빌드·배포
```

## 배포

- **PR로 올리기**: 변경 사항은 브랜치에 올린 뒤 Pull Request를 만듭니다.
  - PR에서는 자동 빌드 검사만 하고, 배포는 하지 않습니다.
  - 초록 체크가 뜨면 Merge합니다. Merge하면 1~2분 뒤 사이트에 반영됩니다.
- **오류 확인**: 진행 상황과 오류는 **Actions** 탭에서 봅니다. 빨간 X가 뜨면 방금 수정한 파일의 형식(들여쓰기, 따옴표, 중괄호)을 확인하세요.
- **최초 1회 설정**: Settings → Pages → Source를 **GitHub Actions**로 둡니다.
- **학교 도메인 연결**: Settings → Pages → Custom domain에 주소를 입력하고, 학교 전산팀에 DNS(CNAME) 설정을 요청합니다. 코드는 수정할 필요 없습니다.

## 버전 기록과 되돌리기

변경 내역과 되돌리는 방법은 [`CHANGELOG.md`](CHANGELOG.md)에 있습니다.

색은 기존 Kim Group Weebly 홈페이지의 색을 바탕으로 했습니다. 레이아웃과 인터랙션은 KAIST BMOL 홈페이지(https://bmol.kaist.ac.kr/)를 참고해 새로 작성했고, 콘텐츠 관리 구조는 al-folio(https://github.com/alshedivat/al-folio)의 방식을 따랐습니다.

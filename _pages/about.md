---
# 홈 화면 콘텐츠. 화면 틀은 _layouts/about.liquid 입니다.
# 여기에 없는 값은 자동으로 가져옵니다:
#   첫 화면 위 라벨·소속·교수님 이름 → _data/lab.yml, _data/pi.yml
#   슬라이드 이미지 → _data/highlights.yml, 연구 카드 → _projects/, 소식 → _news/
layout: about
title: Home
permalink: /
main_class: home

# ── 첫 화면 (Hero) ──────────────────────────────────────────
hero:
  title:
    - Quantum materials.
    - Seen in a new light.
  subtitle: Ultrafast imaging & spectroscopy
  lede: We study optical and electronic phenomena in low-dimensional van der Waals materials, exploring emergent quantum and light–matter interactions with ultrafast lasers.
  buttons:
    - label: Explore research
      url: /research.html
      style: primary        # primary(채운 버튼) / secondary(테두리 버튼)
    - label: Meet the group
      url: /current-members.html
      style: secondary

# 슬라이드 아래 설명
highlights_caption: Exploring light–matter interactions in atomically thin materials.

# ── 숫자 통계 (Hero 아래) ──────────────────────────────────
# 숫자는 적지 않습니다. source에 따라 자동 계산:
#   publications = papers.bib 항목 수, members = members.yml 인원 수
#   (alumni, projects 도 사용 가능)
stats:
  - label: Publications
    source: publications
    link: /publications.html
  - label: Current Members
    source: members
    link: /current-members.html

# ── 연구 카드 영역 ─────────────────────────────────────────
research_section:
  eyebrow: Research
  title:
    - Small structures.
    - Extraordinary possibilities.
  link_label: Research overview →

# ── Latest news ────────────────────────────────────────────
news_section:
  eyebrow: From the lab
  title: Latest news
  limit: 6              # 홈에 보여 줄 최신 소식 개수
  date_format: "%b %Y"  # 날짜 표시 형식 (예: Jan 2026)

# ── 하단 Join 띠 ───────────────────────────────────────────
join:
  eyebrow: Join the group
  title:
    - Explore the next questions
    - in quantum materials.
  button_label: Open positions →
  button_url: /positions.html
---

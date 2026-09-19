---
layout: about
title: Home
permalink: /
main_class: home

# ── 첫 화면 (Hero) ──────────────────────────────────────────
hero:
  eyebrow: KIM GROUP · POSTECH
  title:
    - Quantum materials.
    - Seen in a new light.
  subtitle: Ultrafast imaging & spectroscopy
  lede: We study optical and electronic phenomena in low-dimensional van der Waals materials, exploring emergent quantum and light–matter interactions with ultrafast lasers.
  buttons:
    - label: Explore research
      url: /research.html
      style: primary
    - label: Meet the group
      url: /current-members.html
      style: secondary
  affiliation:
    - Directed by Prof. Jonghwan Kim
    - Materials Science & Engineering, POSTECH

# 슬라이드 아래 설명 (슬라이드 이미지는 _data/highlights.yml)
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

# ── 연구 카드 영역 (카드 내용은 _projects/*.md) ─────────────
research_section:
  eyebrow: Research
  title:
    - Small structures.
    - Extraordinary possibilities.
  link_label: Research overview →

# ── Latest news (소식은 _news/*.md) ─────────────────────────
news_section:
  eyebrow: From the lab
  title: Latest news
  limit: 6          # 홈에 보여 줄 최신 소식 개수

# ── 하단 노란 띠 ───────────────────────────────────────────
join:
  eyebrow: Join the group
  title:
    - Explore the next questions
    - in quantum materials.
  button_label: Open positions →
  button_url: /positions.html
---

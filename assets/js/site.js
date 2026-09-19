// 화면 문구는 HTML의 data-* 속성에서 읽습니다 (원본: _data/strings.yml). 이 파일에는 문구를 적지 않습니다.

// 모바일 메뉴 열기/닫기
const nav = document.querySelector('.topnav');
const toggle = document.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', toggle.dataset.labelOpen); toggle.focus();
  }
});

// 홈 연구 이미지 슬라이드
const slides = [...document.querySelectorAll('#slideshow .frame img')];
if (slides.length) {
  const controls = document.querySelector('.nav-numbers');
  const pause = document.querySelector('.pause-slides');
  let current = 0, timer, playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const buttons = slides.map((slide, i) => {
    const button = document.createElement('button');
    button.textContent = String(i + 1).padStart(2, '0');
    button.setAttribute('aria-label', `${controls.dataset.label} ${i + 1}`);
    button.addEventListener('click', () => { show(i); restart(); });
    controls.append(button); return button;
  });
  function show(index) {
    current = index;
    slides.forEach((slide,i) => {
      slide.classList.toggle('active',i === index);
      slide.setAttribute('aria-hidden', String(i !== index));
      buttons[i].classList.toggle('active',i === index);
      buttons[i].setAttribute('aria-pressed',String(i === index));
    });
  }
  function restart() {
    clearInterval(timer);
    if (playing && !document.hidden) timer = setInterval(() => show((current + 1) % slides.length), 6000);
    pause.textContent = playing ? pause.dataset.labelPause : pause.dataset.labelPlay;
    pause.setAttribute('aria-label', playing ? pause.dataset.ariaPause : pause.dataset.ariaPlay);
  }
  pause.addEventListener('click', () => { playing = !playing; restart(); });
  document.addEventListener('visibilitychange', restart);
  show(0); restart();
}

// 스크롤 진행 바: 읽은 비율만큼 상단 막대를 늘림. 스크롤할 내용이 없으면 숨김
const progress = document.querySelector('.scroll-progress');
if (progress) {
  const bar = progress.firstElementChild;
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.classList.toggle('is-hidden', max <= 0);
    bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  };
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  if ('ResizeObserver' in window) new ResizeObserver(request).observe(document.body); // 이미지 로딩으로 길이가 바뀔 때
  update();
}

// 숫자 통계: 화면에 들어오면 0부터 실제 값까지 부드럽게 올림 (움직임 줄이기 설정이면 바로 표시)
const counters = [...document.querySelectorAll('.stat-value[data-count]')];
if (counters.length && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const countUp = el => {
    const target = Number(el.dataset.count), start = performance.now(), duration = 1200;
    const step = now => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { observer.unobserve(entry.target); countUp(entry.target); }
  }), { threshold: 0.6 });
  counters.forEach(el => { el.textContent = '0'; observer.observe(el); });
}

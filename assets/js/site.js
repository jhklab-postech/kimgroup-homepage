const nav = document.querySelector('.topnav');
const toggle = document.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu'); toggle.focus();
  }
});
const slides = [...document.querySelectorAll('#slideshow .frame img')];
if (slides.length) {
  const controls = document.querySelector('.nav-numbers');
  const pause = document.querySelector('.pause-slides');
  let current = 0, timer, playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const buttons = slides.map((slide, i) => {
    const button = document.createElement('button');
    button.textContent = String(i + 1).padStart(2, '0');
    button.setAttribute('aria-label', `Show research image ${i + 1}`);
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
    pause.textContent = playing ? 'Pause' : 'Play';
    pause.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
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

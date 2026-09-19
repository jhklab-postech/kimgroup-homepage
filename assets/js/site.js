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

// Lab Life 사진 보기 창: 카드를 누르면 그 이벤트의 사진을 원본 비율로 넘겨 봄
// (카드의 data-photos = 사진 주소 목록, data-title = 이벤트 제목. JS가 없으면 대표 사진 파일이 그냥 열림)
const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const image = lightbox.querySelector('.lightbox-image');
  const title = lightbox.querySelector('.lightbox-title');
  const count = lightbox.querySelector('.lightbox-count');
  const prev = lightbox.querySelector('.lightbox-prev');
  const next = lightbox.querySelector('.lightbox-next');
  let photos = [], index = 0, trigger = null, startX = null, swiped = false;
  const render = () => {
    image.src = photos[index];
    image.alt = `${title.textContent} ${index + 1}`;
    count.textContent = photos.length > 1 ? `${index + 1} / ${photos.length}` : '';
    prev.hidden = next.hidden = photos.length < 2;
    if (photos.length > 1) new Image().src = photos[(index + 1) % photos.length];  // 다음 사진 미리 불러오기
  };
  const go = step => { if (photos.length > 1) { index = (index + step + photos.length) % photos.length; render(); } };
  document.querySelectorAll('.event-cover').forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    photos = JSON.parse(link.dataset.photos); index = 0; trigger = link;
    title.textContent = link.dataset.title;
    render(); lightbox.showModal();
  }));
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  const finish = () => { image.removeAttribute('src'); trigger?.focus(); };  // 닫은 뒤: 사진 비우고 누른 카드로 포커스 되돌리기
  const close = () => { lightbox.close(); finish(); };
  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  lightbox.addEventListener('click', e => {  // 사진 바깥을 누르면 닫기 (밀어 넘긴 직후의 클릭은 무시)
    if (swiped) { swiped = false; return; }
    if (e.target === lightbox) close();
  });
  lightbox.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
  lightbox.addEventListener('pointerdown', e => { startX = e.clientX; swiped = false; });
  lightbox.addEventListener('pointerup', e => {  // 터치 화면에서 좌우로 밀어 넘기기
    swiped = startX !== null && Math.abs(e.clientX - startX) > 50;
    if (swiped) go(e.clientX < startX ? 1 : -1);
    startX = null;
  });
  lightbox.addEventListener('close', finish);  // Esc로 닫은 경우
}

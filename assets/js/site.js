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

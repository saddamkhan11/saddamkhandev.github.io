document.addEventListener('DOMContentLoaded', () => {

  /* Loader */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 400));
  setTimeout(() => loader?.classList.add('hidden'), 3000);

  /* Typing */
  const el = document.getElementById('typingText');
  if (el) {
    const words = ['Software Engineer', 'Agentic AI Developer', 'C# / .NET Developer', 'Avionics Specialist'];
    let wi = 0, ci = 0, deleting = false, paused = false;

    function loop() {
      const w = words[wi];
      if (paused) { paused = false; deleting = true; setTimeout(loop, 1500); return; }
      if (!deleting) {
        el.textContent = w.substring(0, ci + 1); ci++;
        if (ci === w.length) { paused = true; setTimeout(loop, 2000); return; }
        setTimeout(loop, 60 + Math.random() * 40);
      } else {
        el.textContent = w.substring(0, ci - 1); ci--;
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(loop, 400); return; }
        setTimeout(loop, 30 + Math.random() * 20);
      }
    }
    loop();
  }

  /* Counter animation */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    if (!target) return;
    let current = 0;
    const step = Math.ceil(target / 35);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      el.textContent = current;
    }, 40);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.hero-stat-num').forEach(n => animateCounter(n));
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  const stats = document.querySelector('.hero-stats');
  if (stats) counterObs.observe(stats);

  /* Scroll reveal */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const h = this.getAttribute('href');
      if (h === '#') return;
      e.preventDefault();
      const t = document.querySelector(h);
      if (t) {
        t.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navLinks')?.classList.remove('active');
        document.getElementById('hamburger')?.classList.remove('active');
      }
    });
  });

  /* Header hide on scroll */
  const header = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const cur = window.pageYOffset;
    header.style.transform = cur > lastScroll && cur > 200 ? 'translateY(-100%)' : 'translateY(0)';
    lastScroll = cur;
  });

  /* Back to top */
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => backBtn.classList.toggle('visible', window.pageYOffset > 400));

  /* Hamburger */
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  ham.addEventListener('click', () => { ham.classList.toggle('active'); nav.classList.toggle('active'); });

  /* Contact form */
  document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.textContent = '✓ Sent!';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.borderColor = '';
      this.reset();
    }, 2500);
  });

});

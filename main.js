document.addEventListener('DOMContentLoaded', () => {

  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 300));
    setTimeout(() => loader.classList.add('hidden'), 2500);
  }

  const el = document.getElementById('typingText');
  if (el) {
    const words = ['Software Engineer', 'Agentic AI Developer', 'C# / .NET Developer', 'Avionics Specialist'];
    let wi = 0, ci = 0, deleting = false, paused = false;

    function loop() {
      const w = words[wi];
      if (paused) { paused = false; deleting = true; setTimeout(loop, 1200); return; }
      if (!deleting) {
        el.textContent = w.substring(0, ci + 1); ci++;
        if (ci === w.length) { paused = true; setTimeout(loop, 1800); return; }
        setTimeout(loop, 50 + Math.random() * 30);
      } else {
        el.textContent = w.substring(0, ci - 1); ci--;
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(loop, 300); return; }
        setTimeout(loop, 20 + Math.random() * 15);
      }
    }
    loop();
  }

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  const stats = document.querySelector('.hero-stats');
  if (stats) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.hero-stat-num').forEach(n => {
            const target = parseInt(n.getAttribute('data-count'));
            if (!target) return;
            let cur = 0;
            const step = Math.ceil(target / 30);
            const interval = setInterval(() => {
              cur += step;
              if (cur >= target) { cur = target; clearInterval(interval); }
              n.textContent = cur;
            }, 40);
          });
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counterObs.observe(stats);
  }

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

  const header = document.querySelector('.header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const cur = window.pageYOffset;
    header.style.transform = cur > lastScroll && cur > 200 ? 'translateY(-100%)' : 'translateY(0)';
    lastScroll = cur;
  });

  const topBtn = document.getElementById('topBtn');
  window.addEventListener('scroll', () => topBtn.classList.toggle('visible', window.pageYOffset > 400));

  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  if (ham && nav) {
    ham.addEventListener('click', () => { ham.classList.toggle('active'); nav.classList.toggle('active'); });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button');
      const orig = btn.textContent;
      btn.textContent = '✓ Sent!';
      btn.style.background = '#22c55e';
      btn.style.borderColor = '#22c55e';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.borderColor = '';
        this.reset();
      }, 2500);
    });
  }

});

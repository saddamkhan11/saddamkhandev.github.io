document.addEventListener('DOMContentLoaded', () => {

  /* ========== LOADER ========== */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });
  setTimeout(() => { if (loader) loader.classList.add('hidden'); }, 3000);

  /* ========== TYPING EFFECT ========== */
  const el = document.getElementById('typingText');
  if (el) {
    const words = [
      'Software Engineer',
      'Agentic AI Developer',
      'C# / .NET Developer',
      'Avionics Specialist',
      'Problem Solver'
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeLoop() {
      const current = words[wordIdx];
      if (isPaused) {
        setTimeout(typeLoop, 1500);
        isPaused = false;
        isDeleting = true;
        return;
      }
      if (!isDeleting) {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          isPaused = true;
          setTimeout(typeLoop, 2000);
          return;
        }
        setTimeout(typeLoop, 60 + Math.random() * 40);
      } else {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          setTimeout(typeLoop, 400);
          return;
        }
        setTimeout(typeLoop, 30 + Math.random() * 20);
      }
    }
    typeLoop();
  }

  /* ========== COUNTER ANIMATION ========== */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    if (!target) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 50);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.hero-stat-num');
        nums.forEach(n => animateCounter(n));
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);

  /* ========== SCROLL REVEAL ========== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ========== SMOOTH SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navLinks')?.classList.remove('active');
        document.getElementById('hamburger')?.classList.remove('active');
      }
    });
  });

  /* ========== HEADER HIDE ON SCROLL ========== */
  const header = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (current > lastScroll && current > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = current;
  });

  /* ========== BACK TO TOP ========== */
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.pageYOffset > 400);
  });

  /* ========== HAMBURGER ========== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  /* ========== CONTACT FORM ========== */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#22c55e';
    btn.style.borderColor = '#22c55e';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 2500);
  });

});

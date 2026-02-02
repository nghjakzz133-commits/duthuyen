/* =========================================================
   MAIN.JS – EMPIRE CLUB
   Clean • Stable • Luxury Interaction
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================
     1. MOBILE MENU TOGGLE (FIXED)
  ============================= */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuToggle && nav) {

    // Toggle open / close
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    // Close when click menu link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Close when click outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  /* =============================
     2. LANGUAGE SWITCH
  ============================= */
  const langButtons = document.querySelectorAll('[data-lang-switch]');
  const langElements = document.querySelectorAll('[data-lang]');

  function setLanguage(lang) {
    document.body.className = `lang-${lang}`;

    langElements.forEach(el => {
      el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });

    langButtons.forEach(btn => {
      btn.classList.toggle(
        'active',
        btn.getAttribute('data-lang-switch') === lang
      );
    });
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang-switch');
      setLanguage(lang);
      localStorage.setItem('empire_lang', lang);
    });
  });

  const savedLang = localStorage.getItem('empire_lang') || 'vi';
  setLanguage(savedLang);

  /* =============================
     3. HEADER SCROLL EFFECT
  ============================= */
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* =============================
     4. SMOOTH SCROLL
  ============================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  /* =============================
     5. SCROLL ANIMATION (OPTIONAL)
  ============================= */
  const animatedItems = document.querySelectorAll('[data-animate]');

  if (animatedItems.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedItems.forEach(item => observer.observe(item));
  }

});

/* ============================================
   GLOBAL MAIN.JS
   Khớp với HTML + global.css hiện tại
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     1. LANGUAGE SWITCH (EN / VI)
     ============================================ */

  const LANG_KEY = 'site_lang';
  const defaultLang = 'vi';

  let currentLang = localStorage.getItem(LANG_KEY) || defaultLang;

  function applyLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });

    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(LANG_KEY, lang);
    currentLang = lang;
  }

  // Init language
  applyLanguage(currentLang);

  // Language toggle buttons
  document.querySelectorAll('[data-switch-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-switch-lang');
      if (lang && lang !== currentLang) {
        applyLanguage(lang);
      }
    });
  });


  /* ============================================
     2. HEADER HIDE / SHOW ON SCROLL
     ============================================ */

  const header = document.querySelector('.site-header');
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 120) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }

      lastScrollY = currentScroll;
    });
  }


  /* ============================================
     3. MOBILE MENU TOGGLE
     ============================================ */

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close menu when click nav link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }


  /* ============================================
     4. ACTIVE NAV LINK ON SCROLL
     ============================================ */

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  function setActiveNav() {
    let scrollY = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollY >= sectionTop &&
        scrollY < sectionTop + sectionHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();


  /* ============================================
     5. OPTIONAL: SMOOTH SCROLL
     ============================================ */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const offset = 80;

      const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });

});

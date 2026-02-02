/* =========================================================
   MAIN.JS – EMPIRE CLUB
   Clean • Stable • Luxury Interaction
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================
     1. MOBILE MENU TOGGLE
  ============================= */
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // close menu when click link
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }


  /* =============================
     2. STICKY HEADER ON SCROLL
  ============================= */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();


  /* =============================
     3. SCROLL TO TOP BUTTON
  ============================= */
  const scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* =============================
     4. SMOOTH SCROLL ANCHOR
  ============================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });


  /* =============================
     5. MENU TABS (DRINK MENU)
  ============================= */
  const tabBtns = document.querySelectorAll('.menu__tab');
  const categories = document.querySelectorAll('.menu__category');

  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('menu__tab--active'));
        btn.classList.add('menu__tab--active');

        categories.forEach(cat => {
          cat.classList.remove('menu__category--active');
        });

        const activeCat = document.getElementById(`menu-${tab}`);
        if (activeCat) activeCat.classList.add('menu__category--active');
      });
    });
  }


  /* =============================
     6. GALLERY LIGHTBOX SIMPLE
  ============================= */
  const galleryBtns = document.querySelectorAll('.gallery__btn');

  if (galleryBtns.length) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `<span class="lightbox__close">&times;</span><img class="lightbox__img">`;
    document.body.appendChild(overlay);

    const overlayImg = overlay.querySelector('img');
    const closeBtn = overlay.querySelector('.lightbox__close');

    galleryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const img = btn.closest('.gallery__item').querySelector('img');
        if (!img) return;
        overlayImg.src = img.src;
        overlay.classList.add('show');
      });
    });

    closeBtn.addEventListener('click', () => overlay.classList.remove('show'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('show');
    });
  }


  /* =============================
     7. ACTIVE NAV ON SCROLL
  ============================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function setActiveNav() {
    let scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);


  /* =============================
     8. BOOKING FORM (DEMO SUBMIT)
  ============================= */
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = new FormData(bookingForm);
      const name = data.get('name');
      const phone = data.get('phone');

      if (!name || !phone) {
        alert('Vui lòng nhập đầy đủ thông tin bắt buộc.');
        return;
      }

      alert('Gửi yêu cầu thành công! CLB sẽ liên hệ bạn sớm.');
      bookingForm.reset();
    });
  }


  /* =============================
     9. MENU ADD BUTTON EFFECT
  ============================= */
  document.querySelectorAll('.menu__item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('added');
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = '<i class="fas fa-plus"></i>';
      }, 1200);
    });
  });

});
/* ================= MOBILE MENU LUXURY BALANCE ================= */

@media (max-width: 992px) {

  #nav {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle at 30% 20%, #111 0%, #05070a 60%);
    z-index: 9999;

    display: none;
    padding: 140px 36px 60px;

    /* luxury fade */
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity .25s ease, transform .25s ease;
  }

  #nav.active {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }

  .nav__list {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .nav__link {
    font-size: 22px;
    letter-spacing: .5px;
    color: #d8d8d8;
    position: relative;
  }

  /* luxury underline */
  .nav__link.active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 64px;
    height: 2px;
    background: linear-gradient(90deg,#d4af37,#fff3b0);
    box-shadow: 0 0 12px rgba(212,175,55,.5);
  }

  /* hover glow */
  .nav__link:active {
    color: #fff;
    text-shadow: 0 0 12px rgba(212,175,55,.35);
  }

}

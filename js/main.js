/* ============================================
   MAIN.JS - BOOKING DU THUYỀN
   Full functionality với hiệu năng tối ưu
   ============================================ */

(function() {
    'use strict';

    /* ============================================
       1. APP INIT & DOM READY
       ============================================ */
    
    const App = {
        init: function() {
            this.setupEventListeners();
            this.initHeader();
            this.initMobileMenu();
            this.initSmoothScroll();
            this.initScrollSpy();
            this.initScrollAnimations();
            this.initStickyCTA();
            this.initGallery();
            
            console.log('🚢 Du thuyền app initialized');
        },

        setupEventListeners: function() {
            window.addEventListener('load', () => {
                document.body.classList.add('loaded');
            });

            window.addEventListener('scroll', throttle(() => {
                this.handleScroll();
            }, 16)); // ~60fps

            window.addEventListener('resize', debounce(() => {
                this.handleResize();
            }, 250));
        },

        handleScroll: function() {
            this.updateHeader();
            this.updateActiveMenu();
            this.revealAnimations();
        },

        handleResize: function() {
            this.closeMobileMenu();
        }
    };

    /* ============================================
       2. HEADER STICKY + SCROLL EFFECT
       ============================================ */

    App.initHeader = function() {
        this.header = document.querySelector('header');
        this.lastScroll = 0;
        this.scrollThreshold = 100;
    };

    App.updateHeader = function() {
        if (!this.header) return;

        const currentScroll = window.pageYOffset;

        // Add sticky class after threshold
        if (currentScroll > this.scrollThreshold) {
            this.header.classList.add('is-sticky');
        } else {
            this.header.classList.remove('is-sticky');
        }

        // Hide/show on scroll
        if (currentScroll > this.lastScroll && currentScroll > 300) {
            this.header.classList.add('is-hidden');
        } else {
            this.header.classList.remove('is-hidden');
        }

        this.lastScroll = currentScroll;
    };

    /* ============================================
       3. MOBILE MENU TOGGLE
       ============================================ */

    App.initMobileMenu = function() {
        const menuToggle = document.querySelector('[data-menu-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        const menuClose = document.querySelector('[data-menu-close]');
        const menuLinks = document.querySelectorAll('[data-mobile-menu] a');

        if (!menuToggle || !mobileMenu) return;

        // Toggle menu
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        // Close button
        if (menuClose) {
            menuClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMobileMenu();
            });
        }

        // Close on link click
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    };

    App.toggleMobileMenu = function() {
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (!mobileMenu) return;

        const isOpen = mobileMenu.classList.contains('is-open');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    };

    App.openMobileMenu = function() {
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (!mobileMenu) return;

        mobileMenu.classList.add('is-open');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    };

    App.closeMobileMenu = function() {
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        if (!mobileMenu) return;

        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    };

    /* ============================================
       4. SMOOTH SCROLL ANCHOR
       ============================================ */

    App.initSmoothScroll = function() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip empty or just # links
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const headerHeight = this.header ? this.header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    };

    /* ============================================
       5. ACTIVE MENU THEO SCROLL
       ============================================ */

    App.initScrollSpy = function() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('[data-nav-link]');
    };

    App.updateActiveMenu = function() {
        if (!this.sections || this.sections.length === 0) return;

        const scrollPos = window.pageYOffset + 200;

        this.sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                this.setActiveNavLink(id);
            }
        });
    };

    App.setActiveNavLink = function(id) {
        if (!this.navLinks) return;

        this.navLinks.forEach(link => {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('is-active');
            }
        });
    };

    /* ============================================
       6. SCROLL ANIMATION (DATA-ATTR)
       ============================================ */

    App.initScrollAnimations = function() {
        this.animatedElements = document.querySelectorAll('[data-animate]');
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Optional: unobserve after animation
                        // this.observer.unobserve(entry.target);
                    }
                });
            }, this.observerOptions);

            this.animatedElements.forEach(el => {
                this.observer.observe(el);
            });
        } else {
            // Fallback for older browsers
            this.animatedElements.forEach(el => {
                el.classList.add('is-visible');
            });
        }
    };

    App.revealAnimations = function() {
        // Fallback manual check if needed
        if (!('IntersectionObserver' in window)) {
            this.animatedElements.forEach(el => {
                if (isInViewport(el)) {
                    el.classList.add('is-visible');
                }
            });
        }
    };

    /* ============================================
       7. STICKY CTA MOBILE
       ============================================ */

    App.initStickyCTA = function() {
        const stickyCTA = document.querySelector('.sticky-contact');
        if (!stickyCTA) return;

        let lastScroll = 0;
        const hideThreshold = 100;

        window.addEventListener('scroll', throttle(() => {
            const currentScroll = window.pageYOffset;

            // Show when scrolling up, hide when scrolling down fast
            if (currentScroll < lastScroll || currentScroll < hideThreshold) {
                stickyCTA.classList.remove('is-hidden');
            } else if (currentScroll > lastScroll + 5) {
                stickyCTA.classList.add('is-hidden');
            }

            lastScroll = currentScroll;
        }, 100));

        // Analytics tracking (optional)
        const callBtn = stickyCTA.querySelector('.sticky-call');
        const zaloBtn = stickyCTA.querySelector('.sticky-zalo');

        if (callBtn) {
            callBtn.addEventListener('click', () => {
                console.log('📞 Call button clicked');
                // Add analytics here: gtag, fbq, etc.
            });
        }

        if (zaloBtn) {
            zaloBtn.addEventListener('click', () => {
                console.log('💬 Zalo button clicked');
                // Add analytics here
            });
        }
    };

    /* ============================================
       8. GALLERY / SLIDER NHẸ
       ============================================ */

    App.initGallery = function() {
        const gallery = document.querySelector('.gallery-slider');
        if (!gallery) return;

        const items = gallery.querySelectorAll('.gallery-item');
        if (items.length === 0) return;

        // Lazy load images
        this.lazyLoadImages(items);

        // Optional: Add lightbox functionality
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openLightbox(items, index);
            });
        });
    };

    App.lazyLoadImages = function(items) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('img');
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(entry.target);
                    }
                }
            });
        });

        items.forEach(item => imageObserver.observe(item));
    };

    App.openLightbox = function(items, startIndex) {
        // Simple lightbox implementation
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close">&times;</button>
                <button class="lightbox-prev" aria-label="Previous">&lt;</button>
                <img src="" alt="">
                <button class="lightbox-next" aria-label="Next">&gt;</button>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        let currentIndex = startIndex;
        const img = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        const showImage = (index) => {
            const targetImg = items[index].querySelector('img');
            img.src = targetImg.src;
            currentIndex = index;
        };

        showImage(currentIndex);

        // Close
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });

        lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });

        // Navigation
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showImage(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            showImage(currentIndex);
        });

        // Keyboard
        document.addEventListener('keydown', function handleKeyboard(e) {
            if (e.key === 'Escape') {
                lightbox.remove();
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleKeyboard);
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                showImage(currentIndex);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % items.length;
                showImage(currentIndex);
            }
        });

        // Animation
        setTimeout(() => lightbox.classList.add('is-open'), 10);
    };

    /* ============================================
       9. UTILITY FUNCTIONS CHUNG
       ============================================ */

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            const args = arguments;
            const context = this;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Format phone number
    function formatPhoneNumber(phone) {
        return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    }

    // Validate phone number (Vietnam)
    function isValidPhone(phone) {
        const phoneRegex = /^(0|\+84)[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    /* ============================================
       10. FAILSAFE & TỐI ƯU HIỆU NĂNG
       ============================================ */

    // Error handling
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        // Send to error tracking service
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('⚡ Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }, 0);
        });
    }

    // Prefetch on hover (for better UX)
    const links = document.querySelectorAll('a[href^="tel:"], a[href^="https://zalo.me"]');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.setAttribute('data-prefetched', 'true');
        }, { once: true });
    });

    // Prevent double-tap zoom on iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('Page hidden - pause heavy tasks');
        } else {
            console.log('Page visible - resume tasks');
        }
    });

    // Service Worker registration (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // navigator.serviceWorker.register('/sw.js')
            //     .then(reg => console.log('SW registered'))
            //     .catch(err => console.log('SW registration failed'));
        });
    }

    // Add CSS for lightbox dynamically
    const lightboxStyles = `
        .lightbox {
            position: fixed;
            inset: 0;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .lightbox.is-open {
            opacity: 1;
        }
        .lightbox-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
        }
        .lightbox-content {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .lightbox-content img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
        }
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
        }
        .lightbox-close {
            top: 20px;
            right: 20px;
        }
        .lightbox-prev {
            left: 20px;
        }
        .lightbox-next {
            right: 20px;
        }
        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: #D4AF37;
            color: white;
            transform: scale(1.1);
        }
        @media (max-width: 768px) {
            .lightbox-content {
                padding: 1rem;
            }
            .lightbox-close,
            .lightbox-prev,
            .lightbox-next {
                width: 40px;
                height: 40px;
                font-size: 20px;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = lightboxStyles;
    document.head.appendChild(styleSheet);

    /* ============================================
       INITIALIZE APP
       ============================================ */

    // DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => App.init());
    } else {
        App.init();
    }

    // Export to global scope if needed
    window.YachtApp = App;

})();

/* ============================================
   END MAIN.JS
   ============================================ */

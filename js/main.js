// ===========================
// Main JavaScript
// ===========================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    loadEvents();
    
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});

// ===========================
// Header Functionality
// ===========================
function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===========================
// Mobile Menu Toggle
// ===========================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ===========================
// Smooth Scrolling
// ===========================
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero scroll button
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const nextSection = document.querySelector('.hero').nextElementSibling;
            if (nextSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                window.scrollTo({
                    top: nextSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ===========================
// Scroll Animations
// ===========================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// ===========================
// Load Events from JSON
// ===========================
async function loadEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    
    if (!eventsContainer) return;
    
    try {
        const response = await fetch('data/events.json');
        const events = await response.json();
        
        // Display only first 3 events on home page
        const displayEvents = events.slice(0, 3);
        
        eventsContainer.innerHTML = displayEvents.map(event => createEventCard(event)).join('');
        
    } catch (error) {
        console.error('Error loading events:', error);
        eventsContainer.innerHTML = '<p>Không thể tải sự kiện. Vui lòng thử lại sau.</p>';
    }
}

// ===========================
// Create Event Card HTML
// ===========================
function createEventCard(event) {
    return `
        <div class="event-card">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}" 
                     onerror="this.src='https://via.placeholder.com/400x250/1a1a2e/d4af37?text=${encodeURIComponent(event.title)}'">
                <div class="event-date">${event.date}</div>
            </div>
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-info">
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                    <span><i class="fas fa-ticket-alt"></i> ${event.price}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <a href="pages/events.html#${event.id}" class="btn btn-outline">Chi Tiết</a>
            </div>
        </div>
    `;
}

// ===========================
// Utilities
// ===========================

// Format date to Vietnamese
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
}

// Format currency to VND
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
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

// ===========================
// Form Validation Helper
// ===========================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/[\s-]/g, ''));
}

// ===========================
// Local Storage Helper
// ===========================
const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }
};

// ===========================
// Export functions for use in other files
// ===========================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        formatCurrency,
        validateEmail,
        validatePhone,
        debounce,
        isInViewport,
        Storage
    };
}

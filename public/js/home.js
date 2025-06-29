// Enhanced Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Import main functionality
    if (window.portfolioJS) {
        const {
            initThemeToggle,
            initScrollAnimations,
            initBackToTop,
            initMobileMenu,
            initTypingAnimation,
            initParticles,
            initSmoothScrolling,
            initStatsCounter,
            hideLoadingScreen
        } = window.portfolioJS;
        
        // Initialize all components
        initThemeToggle();
        initScrollAnimations();
        initBackToTop();
        initMobileMenu();
        initTypingAnimation();
        initParticles();
        initSmoothScrolling();
        initStatsCounter();
        hideLoadingScreen();
    }
    
    // Home page specific enhancements
    initProjectCardAnimations();
    initHeroParallax();
    initContactFormEnhancements();
    initPerformanceTracking();
    initSectionReveals();
});

// Enhanced Project Card Animations
function initProjectCardAnimations() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach((item, index) => {
        // Staggered animation on load
        item.style.setProperty('--animation-delay', `${index * 0.1}s`);
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Animate tags
            const tags = this.querySelectorAll('.tags span');
            tags.forEach((tag, i) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                }, i * 50);
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset tags
            const tags = this.querySelectorAll('.tags span');
            tags.forEach(tag => {
                tag.style.transform = 'scale(1)';
            });
        });
        
        // Click to open project
        item.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                const link = this.querySelector('h4 a');
                if (link) {
                    // Add click animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-10px) scale(1.02)';
                        window.open(link.href, '_blank');
                    }, 150);
                }
            }
        });
    });
}

// Hero Parallax Effect
function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || window.innerWidth <= 768) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const opacity = 1 - scrolled / window.innerHeight;
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = Math.max(opacity, 0);
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Enhanced Contact Form
function initContactFormEnhancements() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Performance Tracking
function initPerformanceTracking() {
    // Track page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`🚀 Portfolio loaded in ${Math.round(loadTime)}ms`);
        
        // Track largest contentful paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log(`📊 LCP: ${Math.round(entry.startTime)}ms`);
                    }
                }
            });
            
            try {
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                // Fallback for browsers that don't support LCP
                console.log('📊 Performance tracking not supported');
            }
        }
    });
}

// Smooth reveal animations for sections
function initSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Special animations for different sections
                if (entry.target.id === 'recent-projects') {
                    const projectItems = entry.target.querySelectorAll('.project-item');
                    projectItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        revealObserver.observe(section);
    });
}

// Mobile menu toggle function (legacy support)
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.querySelector('.menu-icon i');
    
    if (navLinks) {
        navLinks.classList.toggle('active');
        
        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        }
    }
}

// Make toggleMenu available globally for onclick handlers
window.toggleMenu = toggleMenu;

// Enhanced scroll effects
let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show navigation on scroll
    if (nav) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
}, false);

// Add loading states for external links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="https://"]');
    if (link && link.target === '_blank') {
        const originalText = link.innerHTML;
        link.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
        
        setTimeout(() => {
            link.innerHTML = originalText;
        }, 2000);
    }
});

// Keyboard navigation enhancements
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('nav-links');
        const menuIcon = document.querySelector('.menu-icon i');
        
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuIcon) {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
            }
        }
    }
    
    // Space or Enter to activate focused buttons
    if (e.key === ' ' || e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('cta-button') || 
            focusedElement.classList.contains('project-item')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Add focus indicators for accessibility
const focusableElements = document.querySelectorAll('a, button, .project-item');
focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--accent-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Intersection Observer for animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe all elements that should animate
document.querySelectorAll('.scroll-animate').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// Add custom cursor effect (optional)
function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Scale cursor on hover
    document.querySelectorAll('a, button, .project-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize custom cursor (optional - can be heavy)
// initCustomCursor();

console.log('🎨 Enhanced home page initialized successfully!');
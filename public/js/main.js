// Modern JavaScript for Enhanced Portfolio

// Enhanced toggleMenu function with better mobile handling
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    const menuIconElement = document.querySelector('.menu-icon i');
    const body = document.body;
    
    if (navLinks && menuIcon && menuIconElement) {
        const isActive = navLinks.classList.contains('active');
        
        if (!isActive) {
            // Open menu
            navLinks.classList.add('active');
            menuIcon.classList.add('active');
            body.classList.add('menu-open');
            menuIconElement.classList.remove('fa-bars');
            menuIconElement.classList.add('fa-times');
            
            // Prevent scroll on body
            body.style.overflow = 'hidden';
            
            // Add escape key listener
            document.addEventListener('keydown', closeMenuOnEscape);
            
        } else {
            // Close menu
            closeMenu();
        }
    } else {
        console.warn('Mobile menu elements not found', {
            navLinks: !!navLinks,
            menuIcon: !!menuIcon,
            menuIconElement: !!menuIconElement
        });
    }
}

// Function to close menu
function closeMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    const menuIconElement = document.querySelector('.menu-icon i');
    const body = document.body;
    
    if (navLinks && menuIcon && menuIconElement) {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
        body.classList.remove('menu-open');
        menuIconElement.classList.remove('fa-times');
        menuIconElement.classList.add('fa-bars');
        
        // Restore scroll on body
        body.style.overflow = '';
        
        // Remove escape key listener
        document.removeEventListener('keydown', closeMenuOnEscape);
    }
}

// Function to handle escape key
function closeMenuOnEscape(e) {
    if (e.key === 'Escape') {
        closeMenu();
    }
}

// Make functions available globally immediately
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;

document.addEventListener('DOMContentLoaded', function() {
    // Ensure toggleMenu is available
    window.toggleMenu = toggleMenu;
    
    // Initialize all components
    initThemeToggle();
    initScrollAnimations();
    initBackToTop();
    initMobileMenu();
    initTypingAnimation();
    initParticles();
    initSmoothScrolling();
    initStatsCounter();
    initActiveNavigation();
    hideLoadingScreen();
});

// Theme Toggle Functionality
function initThemeToggle() {
    // Create theme toggle button
    const nav = document.querySelector('.nav-container');
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // Insert before menu icon or at the end
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        nav.insertBefore(themeToggle, menuIcon);
    } else {
        nav.appendChild(themeToggle);
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeToggle, savedTheme);
    
    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeToggle, newTheme);
    });
}

function updateThemeIcon(button, theme) {
    button.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for stats counter
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.scroll-animate, .project-item, .stat-item').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Stats Counter Animation
function initStatsCounter() {
    // Add stats section if it doesn't exist
    const highlight = document.querySelector('#highlight');
    if (highlight && !document.querySelector('.stats-section')) {
        const statsHTML = `
            <section class="stats-section">
                <div class="stats-container">
                    <h3 style="text-align: center; color: white; margin-bottom: 3rem;">Achievements & Impact</h3>
                    <div class="stats-grid">
                        <div class="stat-item" data-count="99.9">
                            <i class="fas fa-chart-line"></i>
                            <h3><span class="counter">0</span>%</h3>
                            <p>Uptime Achieved</p>
                        </div>
                        <div class="stat-item" data-count="50000">
                            <i class="fas fa-users"></i>
                            <h3><span class="counter">0</span>+</h3>
                            <p>Users Supported</p>
                        </div>
                        <div class="stat-item" data-count="40">
                            <i class="fas fa-rocket"></i>
                            <h3><span class="counter">0</span>%</h3>
                            <p>Deployment Time Reduced</p>
                        </div>
                        <div class="stat-item" data-count="4">
                            <i class="fas fa-calendar-alt"></i>
                            <h3><span class="counter">0</span>+</h3>
                            <p>Years Experience</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        highlight.insertAdjacentHTML('afterend', statsHTML);
        
        // Immediately trigger animation for all stat items
        setTimeout(() => {
            const statItems = document.querySelectorAll('.stat-item');
            statItems.forEach(item => {
                animateCounter(item);
            });
        }, 500);
    }
}

function animateCounter(statItem) {
    const counter = statItem.querySelector('.counter');
    const target = parseFloat(statItem.dataset.count);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Handle different number formats
        if (target >= 1000) {
            counter.textContent = Math.floor(current).toLocaleString();
        } else if (target % 1 !== 0) {
            // Decimal number like 99.9
            counter.textContent = current.toFixed(1);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced Mobile Menu Toggle
function initMobileMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.getElementById('nav-links');
    
    if (menuIcon && navLinks) {
        // Ensure global functions are available
        window.toggleMenu = toggleMenu;
        window.closeMenu = closeMenu;
        
        // Add click listener as backup
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking on navigation links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Add a slight delay for better UX
                setTimeout(() => {
                    closeMenu();
                }, 150);
            });
        });
        
        // Close menu when clicking on overlay (but not on menu content)
        navLinks.addEventListener('click', (e) => {
            // Only close if clicking on the overlay itself, not menu items
            if (e.target === navLinks) {
                closeMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
        
        // Prevent default touch behaviors on mobile menu
        navLinks.addEventListener('touchmove', (e) => {
            if (navLinks.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        console.log('Enhanced mobile menu initialized successfully');
    } else {
        console.warn('Mobile menu elements not found during initialization');
    }
}



// Typing Animation for Hero Title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero h2');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.classList.add('typing-animation');

    let i = 0;
    const typeTimer = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeTimer);
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.classList.remove('typing-animation');
            }, 1000);
        }
    }, 100);
}

// Floating Particles Effect
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Add floating tech icons
    const icons = ['fab fa-docker', 'fab fa-aws', 'fas fa-server', 'fab fa-github', 'fas fa-cloud'];
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-icons';

    icons.forEach((iconClass, index) => {
        const icon = document.createElement('i');
        icon.className = `floating-icon ${iconClass}`;
        floatingContainer.appendChild(icon);
    });

    hero.appendChild(floatingContainer);
}

// Active Navigation State
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        link.classList.remove('active');
        
        // Check if current page matches link
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Update active navigation link
    const navLinks = document.querySelectorAll('#nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Loading Screen
function hideLoadingScreen() {
    // Create loading screen if it doesn't exist
    if (!document.querySelector('.loading-screen')) {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loadingScreen);
    }

    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after a delay
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 1500);
}

// Project Card Interactions
function initProjectInteractions() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        // Add hover sound effect (optional)
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });

        // Add click animation
        item.addEventListener('click', (e) => {
            // Don't trigger if clicking on a link
            if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                const link = item.querySelector('h4 a');
                if (link) {
                    // Add click animation
                    item.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        item.style.transform = 'translateY(-8px) scale(1.02)';
                        // Open link after animation
                        setTimeout(() => {
                            window.open(link.href, '_blank');
                        }, 100);
                    }, 100);
                }
            }
        });
    });
}

// Call project interactions after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initProjectInteractions, 100);
});

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    });
}

// Initialize parallax (optional - can be heavy on mobile)
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', initParallax);
}

// Enhanced form handling (if contact forms exist)
function initFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add floating labels effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Track Core Web Vitals (optional)
        if ('web-vital' in window) {
            // Implementation would go here
        }
    });
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', () => {
    initFormEnhancements();
    initPerformanceMonitoring();
});

// Export functions for use in other scripts
window.portfolioJS = {
    initThemeToggle,
    initScrollAnimations,
    initBackToTop,
    initMobileMenu,
    initTypingAnimation,
    initParticles,
    initSmoothScrolling,
    initStatsCounter,
    initActiveNavigation,
    hideLoadingScreen
};
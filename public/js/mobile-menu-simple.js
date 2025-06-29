// BULLETPROOF MOBILE MENU JAVASCRIPT
// Simple, reliable, works everywhere

(function() {
    'use strict';
    
    // Browser detection functions
    function isiOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    
    function isAndroid() {
        return /Android/.test(navigator.userAgent);
    }
    
    function isMobileSafari() {
        return isiOS() && /Safari/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
    }
    
    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Simple toggle function with iOS/Android fixes
    function toggleMobileMenu() {
        console.log('🍔 Mobile menu toggle called');
        
        const navLinks = document.getElementById('nav-links');
        const menuIcon = document.querySelector('.menu-icon');
        const menuIconI = document.querySelector('.menu-icon i');
        const body = document.body;
        
        if (!navLinks) {
            console.error('❌ nav-links not found');
            return;
        }
        if (!menuIcon) {
            console.error('❌ menu-icon not found');
            return;
        }
        if (!menuIconI) {
            console.error('❌ menu icon i not found');
            return;
        }
        
        const isOpen = navLinks.classList.contains('active');
        
        if (isOpen) {
            // Close menu
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
            body.classList.remove('menu-open');
            menuIconI.className = 'fas fa-bars';
            
            // iOS Safari specific fixes
            if (isiOS()) {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    document.documentElement.style.height = '';
                    body.style.height = '';
                }, 100);
            }
            
            console.log('🔒 Menu closed');
        } else {
            // Open menu
            navLinks.classList.add('active');
            menuIcon.classList.add('active');
            body.classList.add('menu-open');
            menuIconI.className = 'fas fa-times';
            
            // iOS Safari specific fixes
            if (isiOS()) {
                document.documentElement.style.height = '100%';
                body.style.height = '100%';
            }
            
            console.log('🔓 Menu opened');
        }
    }
    
    // Close menu function
    function closeMobileMenu() {
        const navLinks = document.getElementById('nav-links');
        const menuIcon = document.querySelector('.menu-icon');
        const menuIconI = document.querySelector('.menu-icon i');
        const body = document.body;
        
        if (navLinks) navLinks.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('active');
        if (body) body.classList.remove('menu-open');
        if (menuIconI) menuIconI.className = 'fas fa-bars';
    }
    
    // Make functions global
    window.toggleMobileMenu = toggleMobileMenu;
    window.closeMobileMenu = closeMobileMenu;
    window.toggleMenu = toggleMobileMenu; // Backward compatibility
    
    // Initialize when DOM loads
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Simple mobile menu loaded on:', window.location.pathname);
        
        // Set initial viewport height
        setViewportHeight();
        
        // Browser detection logging
        console.log('📱 Browser detection:', {
            iOS: isiOS(),
            Android: isAndroid(),
            MobileSafari: isMobileSafari(),
            UserAgent: navigator.userAgent
        });
    
    // Hide loading screen if it exists to prevent interference
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('🔧 Forced loading screen hidden for mobile menu');
        }, 100);
    }
        
        // Find menu icon and add event listener
        const menuIcon = document.querySelector('.menu-icon');
        if (menuIcon) {
            console.log('✅ Menu icon found');
            
            // Remove any existing onclick
            menuIcon.removeAttribute('onclick');
            
            // Add both click and touch listeners for cross-browser compatibility
            menuIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Menu icon clicked');
                toggleMobileMenu();
            });
            
            // Add touch event for better mobile responsiveness
            menuIcon.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('👆 Menu icon touched');
                toggleMobileMenu();
            }, { passive: false });
        } else {
            console.error('❌ Menu icon not found');
        }
        
        // Add click listeners to menu links
        const menuLinks = document.querySelectorAll('#nav-links a');
        console.log('🔗 Found', menuLinks.length, 'menu links');
        
        menuLinks.forEach(function(link, index) {
            link.addEventListener('click', function() {
                console.log('🔗 Menu link', index + 1, 'clicked');
                setTimeout(function() {
                    closeMobileMenu();
                }, 100);
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // Close on window resize and update viewport height
        window.addEventListener('resize', function() {
            setViewportHeight();
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
        
        // Handle orientation change for mobile devices
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                setViewportHeight();
                closeMobileMenu();
            }, 100);
        });
        
        // Close when clicking outside menu
        document.addEventListener('click', function(e) {
            const navLinks = document.getElementById('nav-links');
            const menuIcon = document.querySelector('.menu-icon');
            
            if (navLinks && navLinks.classList.contains('active')) {
                if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });
        
        console.log('✅ Simple mobile menu initialized');
    });
    
})();

// Debug function
window.debugMobileMenu = function() {
    console.log('🔍 Mobile Menu Debug:', {
        navLinks: !!document.getElementById('nav-links'),
        menuIcon: !!document.querySelector('.menu-icon'),
        menuIconI: !!document.querySelector('.menu-icon i'),
        toggleFunction: typeof window.toggleMobileMenu,
        isMenuOpen: document.getElementById('nav-links')?.classList.contains('active')
    });
};

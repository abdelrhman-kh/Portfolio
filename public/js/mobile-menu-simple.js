// BULLETPROOF MOBILE MENU JAVASCRIPT
// Simple, reliable, works everywhere

(function() {
    'use strict';
    
    // Simple toggle function
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
            console.log('🔒 Menu closed');
        } else {
            // Open menu
            navLinks.classList.add('active');
            menuIcon.classList.add('active');
            body.classList.add('menu-open');
            menuIconI.className = 'fas fa-times';
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
            
            // Add click listener
            menuIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Menu icon clicked');
                toggleMobileMenu();
            });
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
        
        // Close on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
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

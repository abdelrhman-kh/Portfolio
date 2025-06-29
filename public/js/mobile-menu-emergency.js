// EMERGENCY MOBILE MENU JAVASCRIPT FIX
// This overrides all existing mobile menu functionality

// Simple, robust toggle function
function toggleMenu() {
    console.log('Toggle menu called');
    
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    const menuIconI = document.querySelector('.menu-icon i');
    const body = document.body;
    
    if (!navLinks || !menuIcon || !menuIconI) {
        console.error('Menu elements not found');
        return;
    }
    
    const isActive = navLinks.classList.contains('active');
    console.log('Menu is currently:', isActive ? 'active' : 'inactive');
    
    if (!isActive) {
        // OPEN MENU
        console.log('Opening menu');
        
        // Store scroll position
        const scrollY = window.pageYOffset;
        body.setAttribute('data-scroll-y', scrollY.toString());
        
        // Add classes
        navLinks.classList.add('active');
        menuIcon.classList.add('active');
        body.classList.add('menu-open');
        
        // Change icon
        menuIconI.classList.remove('fa-bars');
        menuIconI.classList.add('fa-times');
        
        // Lock body scroll
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        
        // Add escape listener
        document.addEventListener('keydown', handleEscapeKey);
        
    } else {
        // CLOSE MENU
        closeMenu();
    }
}

function closeMenu() {
    console.log('Closing menu');
    
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    const menuIconI = document.querySelector('.menu-icon i');
    const body = document.body;
    
    if (!navLinks || !menuIcon || !menuIconI) return;
    
    // Remove classes
    navLinks.classList.remove('active');
    menuIcon.classList.remove('active');
    body.classList.remove('menu-open');
    
    // Change icon back
    menuIconI.classList.remove('fa-times');
    menuIconI.classList.add('fa-bars');
    
    // Restore scroll
    const scrollY = body.getAttribute('data-scroll-y');
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    
    if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        body.removeAttribute('data-scroll-y');
    }
    
    // Remove escape listener
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeMenu();
    }
}

// Make functions globally available
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Emergency mobile menu script loaded');
    
    // Ensure functions are available
    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
    
    // Add backup click handler to menu icon
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        // Remove existing listeners
        menuIcon.onclick = null;
        
        // Add new listener
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu icon clicked');
            toggleMenu();
        });
    }
    
    // Add click handlers to menu links
    const navLinks = document.querySelectorAll('#nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Menu link clicked');
            // Don't prevent default for actual navigation
            setTimeout(() => {
                closeMenu();
            }, 100);
        });
    });
    
    // Close menu when clicking on overlay
    const navLinksContainer = document.getElementById('nav-links');
    if (navLinksContainer) {
        navLinksContainer.addEventListener('click', function(e) {
            // Only close if clicking the container itself, not the links
            if (e.target === navLinksContainer) {
                closeMenu();
            }
        });
    }
    
    // Close menu on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    console.log('Emergency mobile menu initialized');
});

// Debug function to check menu state
window.debugMenu = function() {
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    console.log('Menu debug:', {
        navLinksExists: !!navLinks,
        menuIconExists: !!menuIcon,
        menuActive: navLinks ? navLinks.classList.contains('active') : false,
        iconActive: menuIcon ? menuIcon.classList.contains('active') : false,
        bodyMenuOpen: document.body.classList.contains('menu-open')
    });
};

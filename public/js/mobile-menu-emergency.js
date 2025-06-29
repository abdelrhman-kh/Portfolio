// EMERGENCY MOBILE MENU JAVASCRIPT FIX
// This overrides all existing mobile menu functionality

// Simple, robust toggle function
function toggleMenu() {
    console.log('🔧 Toggle menu called');
    
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    const menuIconI = document.querySelector('.menu-icon i');
    const body = document.body;
    
    console.log('🔍 Elements found:', {
        navLinks: !!navLinks,
        menuIcon: !!menuIcon,
        menuIconI: !!menuIconI
    });
    
    if (!navLinks || !menuIcon || !menuIconI) {
        console.error('❌ Menu elements not found:', {
            navLinks: !!navLinks,
            menuIcon: !!menuIcon,
            menuIconI: !!menuIconI
        });
        return;
    }
    
    const isActive = navLinks.classList.contains('active');
    console.log('📱 Menu is currently:', isActive ? 'active' : 'inactive');
    
    if (!isActive) {
        // OPEN MENU
        console.log('🚀 Opening menu');
        
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
        
        console.log('✅ Menu opened successfully');
        
    } else {
        // CLOSE MENU
        closeMenu();
    }
}

function closeMenu() {
    console.log('🔒 Closing menu');
    
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.querySelector('.menu-icon');
    const menuIconI = document.querySelector('.menu-icon i');
    const body = document.body;
    
    if (!navLinks || !menuIcon || !menuIconI) {
        console.error('❌ Cannot close menu - elements not found');
        return;
    }
    
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
    
    console.log('✅ Menu closed successfully');
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
    console.log('🚀 Emergency mobile menu script loaded');
    console.log('📍 Page:', window.location.pathname);
    
    // Ensure functions are available
    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
    
    // Check if elements exist
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.getElementById('nav-links');
    
    console.log('🔍 Initial element check:', {
        menuIcon: !!menuIcon,
        navLinks: !!navLinks,
        menuIconOnClick: menuIcon ? menuIcon.getAttribute('onclick') : 'none'
    });
    
    // Add backup click handler to menu icon
    if (menuIcon) {
        // Remove existing listeners
        menuIcon.onclick = null;
        
        // Add new listener
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Menu icon clicked via event listener');
            toggleMenu();
        });
        
        console.log('✅ Menu icon event listener added');
    } else {
        console.error('❌ Menu icon not found on page load');
    }
    
    // Add click handlers to menu links
    if (navLinks) {
        const menuLinks = navLinks.querySelectorAll('a');
        console.log(`🔗 Found ${menuLinks.length} menu links`);
        
        menuLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                console.log(`🔗 Menu link ${index + 1} clicked:`, link.textContent.trim());
                // Don't prevent default for actual navigation
                setTimeout(() => {
                    closeMenu();
                }, 100);
            });
        });
    }
    
    // Close menu when clicking on overlay
    if (navLinks) {
        navLinks.addEventListener('click', function(e) {
            // Only close if clicking the container itself, not the links
            if (e.target === navLinks) {
                console.log('🔗 Overlay clicked - closing menu');
                closeMenu();
            }
        });
    }
    
    // Close menu on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            console.log('📱 Window resized to desktop - closing menu');
            closeMenu();
        }
    });
    
    console.log('✅ Emergency mobile menu initialized successfully');
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

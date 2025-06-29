// Mobile Menu Debug Script
// This script helps debug mobile menu issues

console.log('Mobile Menu Debug Script Loaded');

// Check if toggleMenu function exists
console.log('toggleMenu function exists:', typeof window.toggleMenu === 'function');

// Check DOM elements
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.getElementById('nav-links');
    
    console.log('DOM Elements Check:');
    console.log('- Menu Icon:', !!menuIcon);
    console.log('- Nav Links:', !!navLinks);
    
    if (menuIcon) {
        console.log('- Menu Icon onclick:', menuIcon.getAttribute('onclick'));
        
        // Add backup click listener
        menuIcon.addEventListener('click', function(e) {
            console.log('Menu icon clicked');
            e.preventDefault();
            
            if (typeof window.toggleMenu === 'function') {
                console.log('Calling toggleMenu function');
                window.toggleMenu();
            } else {
                console.error('toggleMenu function not found!');
                
                // Manual fallback
                if (navLinks) {
                    navLinks.classList.toggle('active');
                    const icon = menuIcon.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('fa-bars');
                        icon.classList.toggle('fa-times');
                    }
                    console.log('Manual menu toggle executed');
                }
            }
        });
    }
    
    // Test the function
    if (typeof window.toggleMenu === 'function') {
        console.log('✅ toggleMenu function is ready');
    } else {
        console.error('❌ toggleMenu function is NOT available');
    }
});

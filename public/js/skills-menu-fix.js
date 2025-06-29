// SKILLS PAGE MOBILE MENU FIX
// Emergency override for Skills page specifically

console.log('🛠️ Skills page mobile menu override loaded');

// Force fix immediately when script loads
(function() {
    function applySkillsFix() {
        console.log('🔧 Applying Skills page menu fix...');
        
        // Find the menu icon
        const menuIcon = document.querySelector('.menu-icon');
        const navLinks = document.getElementById('nav-links');
        const body = document.body;
        
        if (!menuIcon) {
            console.error('❌ Menu icon not found on Skills page');
            return false;
        }
        
        if (!navLinks) {
            console.error('❌ Nav links not found on Skills page');
            return false;
        }
        
        console.log('✅ Elements found, setting up Skills page menu');
        
        // Force the correct icon class
        const iconElement = menuIcon.querySelector('i');
        if (iconElement) {
            iconElement.className = 'fas fa-bars';
            console.log('🔧 Forced icon to fa-bars');
        }
        
        // Remove ALL existing event handlers by cloning
        const newMenuIcon = menuIcon.cloneNode(true);
        menuIcon.parentNode.replaceChild(newMenuIcon, menuIcon);
        
        // Remove onclick attribute
        newMenuIcon.removeAttribute('onclick');
        
        // Ensure the icon is still correct after cloning
        const newIconElement = newMenuIcon.querySelector('i');
        if (newIconElement) {
            newIconElement.className = 'fas fa-bars';
        }
        
        // Simple toggle function for Skills page
        function skillsToggleMenu() {
            console.log('🎯 Skills menu toggle called');
            
            const isOpen = navLinks.classList.contains('active');
            const iconEl = newMenuIcon.querySelector('i');
            
            if (isOpen) {
                // Close
                navLinks.classList.remove('active');
                newMenuIcon.classList.remove('active');
                body.classList.remove('menu-open');
                if (iconEl) {
                    iconEl.className = 'fas fa-bars';
                    console.log('🔧 Set icon to bars (close)');
                }
                console.log('🔒 Skills menu closed');
            } else {
                // Open
                navLinks.classList.add('active');
                newMenuIcon.classList.add('active');
                body.classList.add('menu-open');
                if (iconEl) {
                    iconEl.className = 'fas fa-times';
                    console.log('🔧 Set icon to times (open)');
                }
                console.log('🔓 Skills menu opened');
            }
        }
        
        // Add fresh click listener
        newMenuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Skills menu icon clicked');
            skillsToggleMenu();
        });
        
        // Add listeners to menu links
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                setTimeout(function() {
                    navLinks.classList.remove('active');
                    newMenuIcon.classList.remove('active');
                    body.classList.remove('menu-open');
                    const iconEl = newMenuIcon.querySelector('i');
                    if (iconEl) iconEl.className = 'fas fa-bars';
                }, 100);
            });
        });
        
        console.log('✅ Skills page mobile menu fixed and ready!');
        return true;
    }
    
    // Try immediate fix
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applySkillsFix);
    } else {
        applySkillsFix();
    }
    
    // Also try after window load
    window.addEventListener('load', function() {
        setTimeout(applySkillsFix, 100);
    });
    
    // Final fallback - try after 1 second
    setTimeout(function() {
        const menuIcon = document.querySelector('.menu-icon');
        if (menuIcon && !menuIcon.hasAttribute('data-skills-fixed')) {
            console.log('🔄 Final fallback attempt for Skills menu');
            if (applySkillsFix()) {
                menuIcon.setAttribute('data-skills-fixed', 'true');
            }
        }
    }, 1000);
})();

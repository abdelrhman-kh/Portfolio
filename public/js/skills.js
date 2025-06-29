// Enhanced Skills Page JavaScript

$(document).ready(function() {
    // Hide loading screen
    setTimeout(function() {
        $('.loading-screen').addClass('hidden');
    }, 1000);

    // Initialize skill animations
    initSkillAnimations();
    
    // Initialize skill interactions
    initSkillInteractions();
    

});

// Skill item animations
function initSkillAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill dots
                const skillDots = entry.target.querySelectorAll('.skill-dot.filled');
                skillDots.forEach((dot, index) => {
                    setTimeout(() => {
                        dot.style.animation = 'skillDotPulse 0.5s ease-out forwards';
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe skill items
    document.querySelectorAll('.skill-item, .skills-summary').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Skill interactions
function initSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Animate tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05)';
                    tag.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
                }, index * 50);
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1)';
                tag.style.boxShadow = '';
            });
        });

        // Click to expand/collapse (optional feature)
        const skillIcon = item.querySelector('.skill-icon');
        if (skillIcon) {
            skillIcon.addEventListener('click', function() {
                const techCategories = item.querySelectorAll('.tech-category');
                const isExpanded = item.classList.contains('expanded');
                
                if (isExpanded) {
                    item.classList.remove('expanded');
                    techCategories.forEach(category => {
                        category.style.maxHeight = '0';
                        category.style.opacity = '0';
                    });
                } else {
                    item.classList.add('expanded');
                    techCategories.forEach(category => {
                        category.style.maxHeight = category.scrollHeight + 'px';
                        category.style.opacity = '1';
                    });
                }
            });
        }

        // Tag click interactions
        const techTags = item.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    left: ${e.offsetX - 10}px;
                    top: ${e.offsetY - 10}px;
                    width: 20px;
                    height: 20px;
                `;
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
                
                // Optional: Search for related skills
                const tagText = this.textContent.trim();
                highlightRelatedSkills(tagText);
            });
        });
    });
}



// Highlight related skills
function highlightRelatedSkills(searchTerm) {
    const allTags = document.querySelectorAll('.tech-tag');
    
    // Reset all tags
    allTags.forEach(tag => {
        tag.style.background = '';
        tag.style.transform = 'scale(1)';
    });
    
    // Highlight related tags
    allTags.forEach(tag => {
        if (tag.textContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
            searchTerm.toLowerCase().includes(tag.textContent.toLowerCase())) {
            tag.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            tag.style.transform = 'scale(1.1)';
        }
    });
    
    // Reset after 3 seconds
    setTimeout(() => {
        allTags.forEach(tag => {
            tag.style.background = '';
            tag.style.transform = 'scale(1)';
        });
    }, 3000);
}

// Enhanced mobile menu functionality
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.querySelector('.menu-icon i');
    
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `

    
    .tech-category {
        transition: all 0.3s ease;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes skillDotPulse {
        0% { transform: scale(0); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
    
    .skill-tag {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .skill-tag:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    }
`;

document.head.appendChild(style);

// Initialize event tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track skill interactions
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            console.log(`Skill interaction: ${this.textContent.trim()}`);
        });
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('#nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navLinksContainer = document.getElementById('nav-links');
            const menuIcon = document.querySelector('.menu-icon i');
            
            navLinksContainer.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });
    
    // Keyboard shortcuts for skill navigation
    document.addEventListener('keydown', function(e) {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    document.querySelector('.skill-item:nth-child(1)').scrollIntoView({behavior: 'smooth'});
                    break;
                case '2':
                    document.querySelector('.skill-item:nth-child(2)').scrollIntoView({behavior: 'smooth'});
                    break;
                case '3':
                    document.querySelector('.skill-item:nth-child(3)').scrollIntoView({behavior: 'smooth'});
                    break;
            }
        }
    });
});
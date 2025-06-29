// Enhanced Experience Page JavaScript

$(document).ready(function() {
    // Hide loading screen
    setTimeout(function() {
        $('.loading-screen').addClass('hidden');
    }, 1000);

    // Initialize experience animations
    initExperienceAnimations();
    
    // Initialize experience interactions
    initExperienceInteractions();
    
    // Initialize stats counter
    initStatsCounter();
    
    // Initialize timeline effects
    initTimelineEffects();
});

// Experience animations
function initExperienceAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for stats
                if (entry.target.classList.contains('career-stats')) {
                    animateStats();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe experience elements
    document.querySelectorAll('.experience-item, .career-stats, .experience-cta').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Experience interactions
function initExperienceInteractions() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Animate skill badges
            const skillBadges = this.querySelectorAll('.skill-badge');
            skillBadges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.transform = 'scale(1.1)';
                    badge.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
                }, index * 50);
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset skill badges
            const skillBadges = this.querySelectorAll('.skill-badge');
            skillBadges.forEach(badge => {
                badge.style.transform = 'scale(1)';
                badge.style.boxShadow = '';
            });
        });

        // Skill badge interactions
        const skillBadges = item.querySelectorAll('.skill-badge');
        skillBadges.forEach(badge => {
            badge.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Add click effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.1)';
                }, 100);
                
                // Highlight related skills across all experience items
                highlightRelatedSkills(this.textContent.trim());
            });
        });

        // Company icon animation
        const companyIcon = item.querySelector('.company-icon');
        if (companyIcon) {
            companyIcon.addEventListener('click', function() {
                this.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            });
        }
    });
}

// Stats counter animation
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            const number = this.querySelector('h3');
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
            
            if (number) {
                number.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            const number = this.querySelector('h3');
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            if (number) {
                number.style.transform = 'scale(1)';
            }
        });
    });
}

// Animate stats numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-card h3');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, '')) || 0;
        
        if (number > 0) {
            let current = 0;
            const increment = number / 50; // 50 steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                
                if (text.includes('+')) {
                    stat.textContent = Math.floor(current) + '+';
                } else if (text.includes('K+')) {
                    stat.textContent = Math.floor(current) + 'K+';
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 40);
        }
    });
}

// Timeline effects
function initTimelineEffects() {
    const timelineItems = document.querySelectorAll('.experience-item');
    
    // Add progressive disclosure
    timelineItems.forEach((item, index) => {
        // Stagger animations
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effect to timeline dots
        item.addEventListener('mouseenter', function() {
            this.style.setProperty('--timeline-dot-scale', '1.5');
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.setProperty('--timeline-dot-scale', '1');
        });
    });
}

// Highlight related skills across experience items
function highlightRelatedSkills(skillName) {
    const allSkillBadges = document.querySelectorAll('.skill-badge');
    
    // Reset all badges
    allSkillBadges.forEach(badge => {
        badge.style.background = '';
        badge.style.transform = 'scale(1)';
    });
    
    // Highlight matching skills
    allSkillBadges.forEach(badge => {
        if (badge.textContent.toLowerCase().includes(skillName.toLowerCase()) ||
            skillName.toLowerCase().includes(badge.textContent.toLowerCase())) {
            badge.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            badge.style.transform = 'scale(1.1)';
            badge.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
        }
    });
    
    // Reset after 3 seconds
    setTimeout(() => {
        allSkillBadges.forEach(badge => {
            badge.style.background = '';
            badge.style.transform = 'scale(1)';
            badge.style.boxShadow = '';
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

// Add CSS for enhanced interactions
const style = document.createElement('style');
style.textContent = `
    .experience-item {
        --timeline-dot-scale: 1;
        transition: all 0.3s ease;
    }
    
    .experience-item::after {
        transform: translate(-50%, -50%) scale(var(--timeline-dot-scale));
        transition: transform 0.3s ease;
    }
    
    .skill-badge {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .company-icon {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .stat-card i,
    .stat-card h3 {
        transition: all 0.3s ease;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;

document.head.appendChild(style);

// Initialize event tracking and additional features
document.addEventListener('DOMContentLoaded', function() {
    // Track experience interactions
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            console.log(`Experience skill clicked: ${this.textContent.trim()}`);
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
    
    // Add keyboard shortcuts for navigation
    document.addEventListener('keydown', function(e) {
        // Alt + number for quick navigation to experience items
        if (e.altKey) {
            const num = parseInt(e.key);
            if (num >= 1 && num <= 5) {
                const targetItem = document.querySelector(`.experience-item:nth-child(${num})`);
                if (targetItem) {
                    targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    });
});
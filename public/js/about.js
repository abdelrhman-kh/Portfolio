// Enhanced About Page JavaScript

$(document).ready(function() {
    // Hide loading screen
    setTimeout(function() {
        $('.loading-screen').addClass('hidden');
    }, 1000);

    // Initialize about page animations
    initAboutAnimations();
    
    // Initialize about page interactions
    initAboutInteractions();
    
    // Initialize timeline animations
    initTimelineAnimations();
    
    // Initialize skill tags
    initSkillTags();
});

// About page animations
function initAboutAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different sections
                if (entry.target.classList.contains('journey-timeline')) {
                    animateTimelineItems();
                }
                
                if (entry.target.classList.contains('skills-summary')) {
                    animateSkillTags();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe about elements
    document.querySelectorAll('.about-content, .journey-timeline, .skills-summary').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// About page interactions
function initAboutInteractions() {
    // About highlights interactions
    const highlightItems = document.querySelectorAll('.about-highlights li');
    
    highlightItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.color = 'var(--primary-color)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '';
            }
        });
    });

    // About text interactions
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        // Add reading progress indicator
        addReadingProgress();
        
        // Highlight key terms
        highlightKeyTerms();
    }
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Add entrance animation delay
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        // Hover effects
        item.addEventListener('mouseenter', function() {
            const timelineDate = this.querySelector('.timeline-date');
            const timelineContent = this.querySelector('.timeline-content');
            
            if (timelineDate) {
                timelineDate.style.transform = 'scale(1.1)';
                timelineDate.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.3)';
            }
            
            if (timelineContent) {
                timelineContent.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const timelineDate = this.querySelector('.timeline-date');
            const timelineContent = this.querySelector('.timeline-content');
            
            if (timelineDate) {
                timelineDate.style.transform = 'scale(1)';
                timelineDate.style.boxShadow = '';
            }
            
            if (timelineContent) {
                timelineContent.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Animate timeline items when in view
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.6s ease-out';
        }, index * 200);
    });
}

// Skill tags interactions
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '';
        });

        tag.addEventListener('click', function() {
            // Add ripple effect
            addRippleEffect(this);
            
            // Optional: Navigate to skills page with filter
            const skillName = this.textContent.trim();
            console.log(`Skill tag clicked: ${skillName}`);
        });
    });
}

// Animate skill tags
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
            tag.style.animation = 'bounceIn 0.6s ease-out';
        }, index * 100);
    });
}

// Add reading progress indicator
function addReadingProgress() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-gradient);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        const sectionStart = sectionTop - windowHeight;
        const sectionEnd = sectionTop + sectionHeight;
        
        if (scrollTop >= sectionStart && scrollTop <= sectionEnd) {
            const progress = ((scrollTop - sectionStart) / (sectionEnd - sectionStart)) * 100;
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        } else {
            progressBar.style.width = '0%';
        }
    });
}

// Highlight key terms in about text
function highlightKeyTerms() {
    const aboutText = document.querySelector('.about-text');
    if (!aboutText) return;

    const keyTerms = [
        'DevOps', 'DevSecOps', 'Kubernetes', 'Azure', 'AWS', 
        'zero-trust', 'government', 'infrastructure', 'automation'
    ];
    
    keyTerms.forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        aboutText.innerHTML = aboutText.innerHTML.replace(regex, 
            `<span class="key-term" data-term="${term}">$&</span>`
        );
    });
    
    // Add hover effects to key terms
    const highlightedTerms = document.querySelectorAll('.key-term');
    highlightedTerms.forEach(term => {
        term.addEventListener('mouseenter', function() {
            this.style.background = 'var(--primary-gradient)';
            this.style.color = 'white';
            this.style.padding = '2px 4px';
            this.style.borderRadius = '4px';
            this.style.cursor = 'pointer';
        });
        
        term.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.color = '';
            this.style.padding = '';
            this.style.borderRadius = '';
        });
    });
}

// Add ripple effect
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${rect.width / 2 - size / 2}px;
        top: ${rect.height / 2 - size / 2}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
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
    .about-highlights li {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .about-highlights li i {
        transition: all 0.3s ease;
    }
    
    .timeline-item {
        transition: all 0.6s ease;
    }
    
    .timeline-date,
    .timeline-content {
        transition: all 0.3s ease;
    }
    
    .skill-tag {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .key-term {
        transition: all 0.3s ease;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// Initialize event tracking and additional features
document.addEventListener('DOMContentLoaded', function() {
    // Track about page interactions
    const highlightItems = document.querySelectorAll('.about-highlights li');
    highlightItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log(`About highlight clicked: ${this.textContent.trim()}`);
        });
    });
    
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            console.log(`About skill tag clicked: ${this.textContent.trim()}`);
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
    
    // Add smooth reveal for about content
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        const paragraphs = aboutContent.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                p.style.transition = 'all 0.6s ease';
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
});
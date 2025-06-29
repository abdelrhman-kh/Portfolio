// Contact page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initContactAnimations();
});

// Enhanced form validation and submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            e.preventDefault();
            showFormMessage('Please fill in all required fields.', 'error');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            showFormMessage('Please enter a valid email address.', 'error');
            return false;
        }
        
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    });
}

// Contact card animations
function initContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    // Stagger animation for contact cards
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-fade-in');
    });

    // Add click animations for contact cards
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.querySelector('.contact-link');
            if (link && !link.contains(event.target)) {
                link.click();
            }
        });
    });
}

// Form message display
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    // Insert message before form
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(messageEl, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

// Add floating labels functionality
function initFloatingLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    group.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value.trim()) {
                group.classList.add('focused');
            }
        }
    });
}

// Initialize floating labels
document.addEventListener('DOMContentLoaded', initFloatingLabels);

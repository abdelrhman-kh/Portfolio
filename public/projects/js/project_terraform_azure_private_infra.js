// Azure Private Infrastructure Project Page JavaScript

$(document).ready(function() {
    // Hide loading screen
    setTimeout(function() {
        $('.loading-screen').addClass('hidden');
    }, 1000);

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Scroll animations
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScrollAnimations() {
        $('.overview-item, .tech-category, .result-item').each(function() {
            if (isElementInViewport(this)) {
                $(this).addClass('animate-in');
            }
        });
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .overview-item, .tech-category, .result-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .overview-item.animate-in, .tech-category.animate-in, .result-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Initial check
    handleScrollAnimations();

    // Check on scroll
    $(window).on('scroll', handleScrollAnimations);

    // Tech tag hover effects
    $('.tech-tag').hover(
        function() {
            $(this).css({
                'transform': 'scale(1.05)',
                'box-shadow': '0 5px 15px rgba(0, 0, 0, 0.2)'
            });
        },
        function() {
            $(this).css({
                'transform': 'scale(1)',
                'box-shadow': 'none'
            });
        }
    );

    // Project link tracking (optional analytics)
    $('.project-link, .cta-button').on('click', function() {
        const linkText = $(this).text().trim();
        console.log(`Project link clicked: ${linkText}`);
        // Add analytics tracking here if needed
    });

    // Copy code functionality (if needed for code blocks)
    $('.code-block').each(function() {
        const codeBlock = $(this);
        const copyButton = $('<button class="copy-btn"><i class="fas fa-copy"></i> Copy</button>');
        
        copyButton.css({
            'position': 'absolute',
            'top': '10px',
            'right': '10px',
            'background': 'var(--primary-color)',
            'color': 'white',
            'border': 'none',
            'padding': '5px 10px',
            'border-radius': '5px',
            'cursor': 'pointer',
            'font-size': '0.8rem'
        });

        codeBlock.css('position', 'relative');
        codeBlock.append(copyButton);

        copyButton.on('click', function() {
            const code = codeBlock.find('code').text();
            navigator.clipboard.writeText(code).then(function() {
                copyButton.html('<i class="fas fa-check"></i> Copied!');
                setTimeout(function() {
                    copyButton.html('<i class="fas fa-copy"></i> Copy');
                }, 2000);
            });
        });
    });
});
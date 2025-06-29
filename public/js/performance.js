// Performance optimizations for portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Optimize images for different devices
    optimizeImages();
    
    // Lazy load images
    lazyLoadImages();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Monitor performance
    monitorPerformance();
});

// Image optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading="lazy" for non-critical images
        if (!img.hasAttribute('loading') && !isCriticalImage(img)) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add responsive image attributes
        if (!img.hasAttribute('sizes')) {
            img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
        }
        
        // Error handling for broken images
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
}

function isCriticalImage(img) {
    // Profile pictures and hero images are critical
    return img.classList.contains('nav-profile-pic') || 
           img.closest('.hero') || 
           img.classList.contains('profile-pic');
}

// Lazy loading for project images
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Performance monitoring
function monitorPerformance() {
    // Track Core Web Vitals
    if ('web-vital' in window) {
        // This would integrate with web-vitals library if available
        return;
    }
    
    // Basic performance tracking
    window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        // Log performance metrics (in production, send to analytics)
        console.log('Performance Metrics:', {
            loadTime: Math.round(loadTime),
            domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
            firstPaint: getFirstPaint(),
            largestContentfulPaint: getLCP()
        });
    });
}

function getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? Math.round(firstPaint.startTime) : null;
}

function getLCP() {
    // Simplified LCP tracking
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', Math.round(lastEntry.startTime));
            });
            observer.observe({entryTypes: ['largest-contentful-paint']});
        } catch (e) {
            console.log('LCP tracking not supported');
        }
    }
    return null;
}

// Service Worker registration for caching (optional)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }
    
    // Ensure all images have alt text
    document.querySelectorAll('img:not([alt])').forEach(img => {
        img.alt = 'Portfolio image';
        console.warn('Image missing alt text:', img.src);
    });
    
    // Ensure all links have accessible names
    document.querySelectorAll('a:not([aria-label]):not([title])').forEach(link => {
        if (!link.textContent.trim()) {
            link.setAttribute('aria-label', 'Link');
            console.warn('Link missing accessible name:', link.href);
        }
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Export for use in other modules
window.performanceOptimizations = {
    optimizeImages,
    lazyLoadImages,
    preloadCriticalResources,
    monitorPerformance,
    registerServiceWorker,
    enhanceAccessibility
};
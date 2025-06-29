// Enhanced Projects Page JavaScript

$(document).ready(function() {
    // Hide loading screen
    setTimeout(function() {
        $('.loading-screen').addClass('hidden');
    }, 1000);

    // Initialize all project functionality
    initProjectAnimations();
    initProjectInteractions();
    initModernProjectFiltering();
    initProjectSearch();
    initProjectStats();
});

// Project animations
function initProjectAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe project items
    document.querySelectorAll('.project-item, .project-stats').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Enhanced project interactions
function initProjectInteractions() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            
            // Add glow effect to tags
            const tags = this.querySelectorAll('.project-tag');
            tags.forEach(tag => {
                tag.style.boxShadow = '0 0 20px rgba(79, 70, 229, 0.3)';
            });
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Remove glow effect
            const tags = this.querySelectorAll('.project-tag');
            tags.forEach(tag => {
                tag.style.boxShadow = '';
            });
        });

        // Click animation and navigation
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                const link = this.querySelector('h4 a');
                if (link) {
                    // Add click animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-12px) scale(1.02)';
                        // Navigate after animation
                        setTimeout(() => {
                            if (link.target === '_blank') {
                                window.open(link.href, '_blank');
                            } else {
                                window.location.href = link.href;
                            }
                        }, 100);
                    }, 150);
                }
            }
        });

        // Tag interactions
        const tags = item.querySelectorAll('.project-tag');
        tags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.stopPropagation();
                const tagText = this.textContent.trim();
                filterProjectsByTag(tagText);
            });
        });
    });
}

// Modern project filtering functionality
function initModernProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            
            projectItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    // Re-animate visible items
                    setTimeout(() => {
                        item.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s forwards`;
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Update project count
            updateProjectCount();
            
            // Show notification
            const visibleCount = document.querySelectorAll('.project-item:not(.hidden)').length;
            const categoryName = filter === 'all' ? 'all projects' : `${filter} projects`;
            showNotification(`Showing ${visibleCount} ${categoryName}`, 'success');
        });
    });
}

function createFilterButtons() {
    const projectsSection = document.querySelector('#projects');
    const projectsContainer = document.querySelector('.projects-container');
    
    // Extract unique categories from projects
    const categories = new Set(['all']);
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const tags = item.querySelectorAll('.project-tag');
        tags.forEach(tag => categories.add(tag.textContent.trim().toLowerCase()));
    });
    
    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-categories';
    
    // Create filter buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `category-filter ${category === 'all' ? 'active' : ''}`;
        button.dataset.filter = category;
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        filterContainer.appendChild(button);
    });
    
    // Insert before projects container
    projectsSection.insertBefore(filterContainer, projectsContainer);
}

function filterProjects(filter) {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        } else {
            const tags = Array.from(item.querySelectorAll('.project-tag'))
                .map(tag => tag.textContent.trim().toLowerCase());
            
            if (tags.includes(filter)) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.opacity = '0.3';
                item.style.transform = 'scale(0.8)';
            }
        }
    });
    
    // Update project count
    updateProjectCount();
}

function filterProjectsByTag(tagText) {
    filterProjects(tagText.toLowerCase());
    
    // Update active filter button
    const filterButtons = document.querySelectorAll('.category-filter');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === tagText.toLowerCase()) {
            btn.classList.add('active');
        }
    });
}

// Search functionality
function initProjectSearch() {
    // Create search if it doesn't exist
    if (!document.querySelector('.projects-search')) {
        createSearchBox();
    }
    
    const searchInput = document.querySelector('.projects-search input');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = this.value.toLowerCase().trim();
                searchProjects(query);
            }, 300);
        });
    }
}

function createSearchBox() {
    const projectsSection = document.querySelector('#projects');
    const h3 = projectsSection.querySelector('h3');
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'projects-search';
    searchContainer.innerHTML = `
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search projects..." aria-label="Search projects">
    `;
    
    // Insert after h3
    h3.insertAdjacentElement('afterend', searchContainer);
}

function searchProjects(query) {
    const projectItems = document.querySelectorAll('.project-item');
    let visibleCount = 0;
    
    projectItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(item.querySelectorAll('.project-tag'))
            .map(tag => tag.textContent.toLowerCase()).join(' ');
        
        const searchContent = `${title} ${description} ${tags}`;
        
        if (query === '' || searchContent.includes(query)) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show "no results" message if needed
    showNoResultsMessage(visibleCount === 0 && query !== '');
    updateProjectCount();
}

function showNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (show && !noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h4>No projects found</h4>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
        document.querySelector('.projects-container').appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Project statistics
function initProjectStats() {
    if (!document.querySelector('.project-stats')) {
        createProjectStats();
    }
    
    // Animate counters when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.project-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function createProjectStats() {
    const projectsSection = document.querySelector('#projects');
    const h3 = projectsSection.querySelector('h3');
    
    const statsHTML = `
        <div class="project-stats">
            <h4>Project Portfolio Overview</h4>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number" data-count="8">0</span>
                    <span class="stat-label">Total Projects</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-count="4">0</span>
                    <span class="stat-label">Live Projects</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-count="15">0</span>
                    <span class="stat-label">Technologies Used</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-count="50">0</span>
                    <span class="stat-label">K+ Users Impacted</span>
                </div>
            </div>
        </div>
    `;
    
    h3.insertAdjacentHTML('afterend', statsHTML);
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (stat.parentElement.querySelector('.stat-label').textContent.includes('K+')) {
                stat.textContent = Math.floor(current) + 'K+';
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Update project count display
function updateProjectCount() {
    const visibleProjects = document.querySelectorAll('.project-item[style*="opacity: 1"], .project-item:not([style*="opacity"])');
    const totalProjects = document.querySelectorAll('.project-item');
    
    // Update count in stats if it exists
    const totalStat = document.querySelector('.stat-number[data-count="8"]');
    if (totalStat && visibleProjects.length !== totalProjects.length) {
        totalStat.textContent = visibleProjects.length;
    }
}



// Notification system
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Initialize event tracking and mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Track project clicks
    const projectLinks = document.querySelectorAll('.project-item h4 a');
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            const projectTitle = this.textContent.trim();
            console.log(`Project interaction: click on ${projectTitle}`);
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
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Clear search with Escape
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('.projects-search input');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            searchProjects('');
        }
    }
});
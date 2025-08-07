// Main JavaScript for Child Safety Education Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality (navigation is handled by navigation.js)
    initScrollAnimations();
    initCounterAnimations();
    initParticles();
    initFormHandling();
    initInteractiveElements();
    initSmoothScrolling();
});

// Smooth scrolling for same-page hash links only
function initSmoothScrolling() {
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const href = e.target.getAttribute('href');

            // Only handle pure hash links that don't include .html
            if (href && href.startsWith('#') && !href.includes('.html')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation to children if container has stagger class
                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections and category cards
    const sections = document.querySelectorAll('section');
    const categoryCards = document.querySelectorAll('.category-card');
    const resourceItems = document.querySelectorAll('.resource-item');

    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    categoryCards.forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });

    resourceItems.forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Particle system for hero section
function initParticles() {
    const hero = document.querySelector('.hero-slider') || document.querySelector('.hero');

    if (!hero) {
        return; // Exit if no hero section is found
    }

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    if (!container) {
        return; // Exit if container doesn't exist
    }

    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random size and position
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }

    // Newsletter signup (if exists)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSignup(this);
        });
    }
}

function handleFormSubmission(form) {
    // Add loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Thank you! We\'ll contact you soon about scheduling a school visit.', 'success');
        
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleNewsletterSignup(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing to our safety tips newsletter!', 'success');
        form.reset();
    }
}

// Interactive elements
function initInteractiveElements() {
    // Download buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleDownload(this);
        });
    });

    // Category cards hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Interactive safety quiz (placeholder)
    initSafetyQuiz();
}

function handleDownload(button) {
    const originalText = button.textContent;
    button.textContent = 'Downloading...';
    button.disabled = true;

    // Simulate download
    setTimeout(() => {
        button.textContent = 'Downloaded!';
        button.style.background = '#2ecc71';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 2000);
    }, 1000);
}

// Safety quiz functionality
function initSafetyQuiz() {
    // This would be expanded for each safety category page
    const quizData = {
        gun: [
            {
                question: "What should you do if you find a gun?",
                options: ["Pick it up", "Stop, Don't Touch, Run Away, Tell a Grown-up", "Hide it", "Play with it"],
                correct: 1
            }
        ],
        swimming: [
            {
                question: "What should you always wear in a pool?",
                options: ["Sunglasses", "Life jacket or know how to swim", "Heavy clothes", "Nothing special"],
                correct: 1
            }
        ]
    };

    // Quiz functionality would be implemented here
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
const debouncedScroll = debounce(function() {
    // Scroll-based animations that need debouncing
}, 10);

const throttledResize = throttle(function() {
    // Resize handlers
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with keyboard
    if (e.key === 'Tab' && e.shiftKey === false) {
        const firstFocusable = document.querySelector('a, button, input, textarea, select');
        if (document.activeElement === document.body && firstFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

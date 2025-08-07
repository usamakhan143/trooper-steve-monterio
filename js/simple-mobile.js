// Mobile menu with auto-close functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile navigation script loaded');

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        // Hamburger toggle
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent background scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Auto-close menu when clicking nav links
        document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
            link.addEventListener('click', function(e) {
                // Close menu when link is clicked
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }

                // Let the link navigate normally - don't prevent default
            });
        });

        // Handle dropdown functionality for mobile
        document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();

                    const dropdown = this.closest('.nav-dropdown');
                    dropdown.classList.toggle('open');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)) {

                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

    }

    // Disable any auto-scrolling animations/behaviors
    disableAutoScrolling();
});

// Function to disable background auto-scrolling
function disableAutoScrolling() {
    // Stop any automatic scrolling intervals
    const intervals = [];
    const originalSetInterval = window.setInterval;

    window.setInterval = function(fn, delay) {
        const id = originalSetInterval(fn, delay);
        intervals.push(id);
        return id;
    };

    // Clear existing intervals that might be causing auto-scroll
    for (let i = 0; i < 1000; i++) {
        clearInterval(i);
    }

    // Disable smooth scrolling behaviors during menu usage
    window.disableAutoBehaviors = true;

}

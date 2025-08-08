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

        // Handle dropdown toggle functionality for mobile
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                console.log('Dropdown toggle clicked', window.innerWidth);
                e.preventDefault();
                e.stopPropagation();

                const dropdown = this.closest('.nav-dropdown');
                const wasOpen = dropdown.classList.contains('open');

                // Close all other dropdowns first
                document.querySelectorAll('.nav-dropdown').forEach(dd => {
                    dd.classList.remove('open');
                });

                // Toggle this dropdown
                if (!wasOpen) {
                    dropdown.classList.add('open');
                    console.log('Dropdown opened');
                } else {
                    console.log('Dropdown closed');
                }
            });
        });

        // Also handle touch events for better mobile compatibility
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.click();
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

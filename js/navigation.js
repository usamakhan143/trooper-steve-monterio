// Mobile Navigation - Allow all links to work properly
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation loaded - mobile links enabled');
    
    initMobileMenu();
    initMobileDropdowns();
    initDesktopDropdowns();
    initScrollEffects();
});

// Mobile hamburger menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        console.log('Mobile menu initialized');
        
        // Toggle mobile menu
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
                console.log('Mobile menu opened');
            } else {
                body.style.overflow = '';
                console.log('Mobile menu closed');
                // Close all dropdowns when menu closes
                document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
        });

        // ONLY close menu for specific scenarios - NOT on all link clicks
        
        // Close menu when clicking outside menu area (but not on links inside menu)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                
                console.log('Clicked outside menu, closing');
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                console.log('Escape pressed, closing menu');
                closeMobileMenu();
            }
        });

        // Close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        // Function to close mobile menu
        function closeMobileMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
            
            // Close all dropdowns
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }

        // Make close function available globally
        window.closeMobileMenu = closeMobileMenu;
    }
}

// Mobile dropdown functionality (click to toggle)
function initMobileDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.nav-dropdown');
                const isOpen = dropdown.classList.contains('open');
                
                console.log('Dropdown trigger clicked:', this.textContent);
                
                // Close all other dropdowns
                document.querySelectorAll('.nav-dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('open');
                    }
                });
                
                // Toggle current dropdown
                if (isOpen) {
                    dropdown.classList.remove('open');
                    console.log('Mobile dropdown closed');
                } else {
                    dropdown.classList.add('open');
                    console.log('Mobile dropdown opened');
                }
            }
        });
    });
}

// Desktop dropdown functionality (hover)
function initDesktopDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        // Mouse enter
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('active');
            }
        });
        
        // Mouse leave
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('active');
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Debug function
window.testMobileNav = function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('=== MOBILE NAV DEBUG ===');
    console.log('Hamburger:', hamburger);
    console.log('Nav menu:', navMenu);
    console.log('Menu active:', navMenu?.classList.contains('active'));
    console.log('Window width:', window.innerWidth);
    console.log('Is mobile:', window.innerWidth <= 768);
    
    // Test all nav links
    document.querySelectorAll('.nav-link, .dropdown-link').forEach((link, index) => {
        console.log(`Link ${index}:`, link.textContent, '|', link.href);
    });
    
    document.querySelectorAll('.nav-dropdown').forEach((dropdown, index) => {
        console.log(`Dropdown ${index} open:`, dropdown.classList.contains('open'));
    });
};

console.log('Navigation script loaded - all links should work in mobile menu!');

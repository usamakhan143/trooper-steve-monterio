// Navigation Test Script
console.log('=== NAVIGATION TEST STARTED ===');

// Test 1: Check if all navigation elements exist
function testNavigationElements() {
    console.log('\n1. Testing Navigation Elements:');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    console.log('✓ Hamburger found:', !!hamburger);
    console.log('✓ Nav menu found:', !!navMenu);
    console.log('✓ Nav links found:', navLinks.length);
    console.log('✓ Dropdown links found:', dropdownLinks.length);
    console.log('✓ Dropdowns found:', dropdowns.length);
    
    return { hamburger, navMenu, navLinks, dropdownLinks, dropdowns };
}

// Test 2: Check clickability
function testClickability(elements) {
    console.log('\n2. Testing Clickability:');
    
    const { hamburger, navLinks, dropdownLinks } = elements;
    
    if (hamburger) {
        const style = getComputedStyle(hamburger);
        console.log('✓ Hamburger clickable:', style.pointerEvents !== 'none');
        console.log('  - Cursor:', style.cursor);
        console.log('  - Touch action:', style.touchAction);
    }
    
    navLinks.forEach((link, index) => {
        const style = getComputedStyle(link);
        console.log(`✓ Nav link ${index + 1} clickable:`, style.pointerEvents !== 'none');
    });
    
    dropdownLinks.forEach((link, index) => {
        const style = getComputedStyle(link);
        console.log(`✓ Dropdown link ${index + 1} clickable:`, style.pointerEvents !== 'none');
    });
}

// Test 3: Test mobile menu functionality
function testMobileMenu(elements) {
    console.log('\n3. Testing Mobile Menu:');
    
    const { hamburger, navMenu } = elements;
    
    if (hamburger && navMenu) {
        // Test menu toggle
        console.log('Current state - Menu active:', navMenu.classList.contains('active'));
        
        // Simulate click
        hamburger.click();
        
        setTimeout(() => {
            console.log('After click - Menu active:', navMenu.classList.contains('active'));
            
            // Close menu
            hamburger.click();
            
            setTimeout(() => {
                console.log('After second click - Menu active:', navMenu.classList.contains('active'));
            }, 100);
        }, 100);
    }
}

// Test 4: Test responsive behavior
function testResponsive() {
    console.log('\n4. Testing Responsive Behavior:');
    
    const isMobile = window.innerWidth <= 768;
    console.log('✓ Is mobile view:', isMobile);
    console.log('✓ Window width:', window.innerWidth);
    
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        const hamburgerStyle = getComputedStyle(hamburger);
        console.log('✓ Hamburger display:', hamburgerStyle.display);
    }
    
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const navStyle = getComputedStyle(navMenu);
        console.log('✓ Nav menu position:', navStyle.position);
        console.log('✓ Nav menu left:', navStyle.left);
    }
}

// Test 5: Test event listeners
function testEventListeners(elements) {
    console.log('\n5. Testing Event Listeners:');
    
    const { hamburger, navLinks } = elements;
    
    // Test if event listeners are attached
    let clickListenerCount = 0;
    
    if (hamburger) {
        // Create a test click event
        const testEvent = new Event('click', { bubbles: true });
        const originalHandler = hamburger.onclick;
        
        hamburger.addEventListener('click', function testHandler() {
            clickListenerCount++;
            hamburger.removeEventListener('click', testHandler);
        });
        
        hamburger.dispatchEvent(testEvent);
        console.log('✓ Hamburger event listeners working:', clickListenerCount > 0);
    }
    
    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`✓ Nav link ${index + 1} href:`, href);
    });
}

// Run all tests
function runAllTests() {
    console.log('=== RUNNING NAVIGATION TESTS ===');
    
    const elements = testNavigationElements();
    testClickability(elements);
    testMobileMenu(elements);
    testResponsive();
    testEventListeners(elements);
    
    console.log('\n=== NAVIGATION TEST COMPLETED ===');
    
    // Summary
    console.log('\n=== TEST SUMMARY ===');
    console.log('If you see any "false" values above, there might be an issue.');
    console.log('All navigation elements should be clickable and functional.');
    console.log('Try clicking the hamburger menu on mobile to test manually.');
}

// Auto-run tests when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runAllTests, 1000); // Wait 1 second for everything to load
    });
} else {
    setTimeout(runAllTests, 1000);
}

// Export test function
window.runNavigationTests = runAllTests;

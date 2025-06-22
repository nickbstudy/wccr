// Get the hamburger menu and navigation
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

// Helper function to close the menu and update ARIA state
function closeMenu() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
}

// Helper function to open the menu and update ARIA state
function openMenu() {
    hamburger.classList.add('active');
    mobileNav.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
}

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', function () {
    const isCurrentlyOpen = hamburger.classList.contains('active');
    
    if (isCurrentlyOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('header')) {
        closeMenu();
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
// Get the hamburger menu and navigation
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('header')) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});
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

class ImageGallery {
    constructor() {
        this.images = Array.from(document.querySelectorAll('.img-preview'));
        this.overlay = document.getElementById('imageOverlay');
        this.overlayImage = document.getElementById('overlayImage');
        this.overlaySource = document.getElementById('overlaySource');
        this.overlayCounter = document.getElementById('overlayCounter');
        this.currentIndex = 0;
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        this.init();
    }

    init() {
        // Add click listeners to all preview images
        this.images.forEach((img, index) => {
            img.addEventListener('click', () => this.openOverlay(index));
        });

        // Overlay controls
        document.getElementById('overlayClose').addEventListener('click', () => this.closeOverlay());
        document.getElementById('navPrev').addEventListener('click', () => this.prevImage());
        document.getElementById('navNext').addEventListener('click', () => this.nextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Improved mobile-friendly overlay dismissal
        this.setupOverlayDismissal();

        // Prevent right-click context menu on overlay
        this.overlay.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    setupOverlayDismissal() {
        // Create a more reliable handler that works on mobile
        const handleDismiss = (e) => {
            const target = e.target;
            
            // Close if tapping on the overlay background or overlay-content
            if (target === this.overlay || target.classList.contains('overlay-content')) {
                this.closeOverlay();
            }
        };

        // Use both mousedown and touchstart for immediate response
        this.overlay.addEventListener('mousedown', handleDismiss);
        this.overlay.addEventListener('touchstart', handleDismiss, { passive: true });
        
        // Alternative approach: make the overlay-content div handle dismissal
        const overlayContent = this.overlay.querySelector('.overlay-content');
        if (overlayContent) {
            overlayContent.addEventListener('mousedown', (e) => {
                if (e.target === overlayContent) {
                    this.closeOverlay();
                }
            });
            overlayContent.addEventListener('touchstart', (e) => {
                if (e.target === overlayContent) {
                    this.closeOverlay();
                }
            }, { passive: true });
        }
    }

    openOverlay(index) {
        this.currentIndex = index;
        this.updateOverlayImage();
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    closeOverlay() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateOverlayImage();
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateOverlayImage();
    }

    updateOverlayImage() {
        const currentImg = this.images[this.currentIndex];
        const fullSrc = currentImg.dataset.fullSrc;
        const fullWebp = currentImg.dataset.fullWebp;
        const alt = currentImg.alt;

        // Update the picture element with WebP support
        this.overlaySource.srcset = fullWebp;
        this.overlayImage.src = fullSrc;
        this.overlayImage.alt = alt;

        // Update counter
        this.overlayCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }

    handleKeyPress(e) {
        if (!this.overlay.classList.contains('active')) return;

        switch (e.key) { 
            case 'Escape':
                this.closeOverlay();
                break;
            case 'ArrowLeft':
                this.prevImage();
                break;
            case 'ArrowRight':
                this.nextImage();
                break;
        }
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
});
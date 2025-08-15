// Hamburger Menu Toggle with Fade-in and Fade-out Animation
const hamburgerToggle = document.getElementById('hamburger-toggle');
const expandedMenu = document.getElementById('expanded-menu');
let isMenuOpen = false;

// Wait for DOM to be fully loaded before starting animation
document.addEventListener('DOMContentLoaded', function() {
    // Start title animation after DOM is loaded
    startTitleAnimation();

    // Add fade-in effect for the mushroom background image
    setTimeout(function() {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.classList.add('bg-visible');
        }
    }, 500); // Delay of 500ms before starting the fade-in
});
hamburgerToggle.addEventListener('click', function() {
    if (!isMenuOpen) {
        openMenu();
    } else {
        closeMenu();
    }
});

function openMenu() {
    expandedMenu.classList.add('open'); // Add the open class
    isMenuOpen = true;
}

function closeMenu() {
    expandedMenu.classList.remove('open'); // Remove the open class
    isMenuOpen = false;
}

// Smooth Scroll for internal links with offset
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const targetElement = targetSection.querySelector('h2'); // Target the h2 element inside the section

        // Adjust for extra space at the bottom for the last section
        const isLastSection = targetId === '#work-experience-section';
        if (isLastSection) {
            targetSection.style.paddingBottom = '50vh'; // Add space for the last section
        }

        // Get the element's position
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

        // Add offset (150px) to position the section further down
        const offsetPosition = elementPosition - 150;

        // Scroll to the position with offset
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close the menu after clicking on a link (for mobile)
        closeMenu();
    });
});

// Assuming your icon has a class of 'floating-icon'
document.querySelector('.floating-icon').addEventListener('click', function(e) {
    e.preventDefault();

    // Scroll to the top of the page
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });

    // Optionally, you can close the menu or perform another action here if needed
    closeMenu();
});



// Show Floating Icon and Hamburger Menu on Scroll
const floatingElements = document.getElementById('floating-elements');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        floatingElements.classList.remove('hidden');
    } else {
        floatingElements.classList.add('hidden');
    }
});

// Fade-in effect for elements
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once it's visible
        }
    });
}, {
    threshold: 0.5, // Increased threshold - element needs to be 50% visible to trigger the fade-in
    rootMargin: '-100px 0px' // Adds a negative margin to delay the fade-in effect
});

fadeInElements.forEach(element => {
    observer.observe(element);
});

// Title Animation Function
function startTitleAnimation() {
    const frames = [
        '🧙🪄✨',
        '🧙🪄 ⚡',
        '🧙🪄 ⚡⚡',
        '🧙🪄 ⚡⚡⚡',
        '🧙🪄',
        '🧙🪄 ⚡⚡⚡',
        '🧙🪄',
        '🧙🪄 ⚡⚡⚡',
    ];

    let currentFrame = 0;

    function animateTitle() {
        document.title = frames[currentFrame];
        currentFrame = (currentFrame + 1) % frames.length;  // Loop over frames

        // Make updates less frequent for better browser compatibility
        setTimeout(animateTitle, 1000);  // Update every 1 second (1000 ms)
    }

    animateTitle();  // Start the animation
}

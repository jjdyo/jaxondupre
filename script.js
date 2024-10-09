// Hamburger Menu Toggle with Fade-in and Fade-out Animation
const hamburgerToggle = document.getElementById('hamburger-toggle');
const expandedMenu = document.getElementById('expanded-menu');
let isMenuOpen = false;

// Call startTitleAnimation() when page loads
window.onload = function() {
    // Merge this with DOM Ready Check Later
    // Start title animation
    startTitleAnimation();
};
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

// Smooth Scroll for internal links with center alignment
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId).querySelector('h2'); // Target the h2 element inside the section

        // Adjust for extra space at the bottom for the last section
        const isLastSection = targetId === '#work-experience-section';
        if (isLastSection) {
            document.querySelector(targetId).style.paddingBottom = '50vh'; // Add space for the last section
        }

        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center' // Scroll target element to the center of the viewport
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
    threshold: 1 // Element needs to be fully visible to trigger the fade-in
});

fadeInElements.forEach(element => {
    observer.observe(element);
});

// Title Animation Function
function startTitleAnimation() {
    const frames = [
        '🧙🪄',            // Wizard and wand
        '🧙🪄⚡',           // One lightning bolt
        '🧙🪄⚡⚡',         // Two lightning bolts
        '🧙🪄⚡⚡⚡',       // Full animation
        '🧙🪄',            // Return to just wizard and wand
        '🧙🪄⚡⚡⚡',       // Flash with full animation
        '🧙🪄',            // Flash off
        '🧙🪄⚡⚡⚡',       // Flash again
    ];

    let currentFrame = 0;  // Track current frame
    let flashCount = 0;    // Track flash repetitions

    function animateTitle() {
        document.title = frames[currentFrame]; // Update title
        currentFrame = (currentFrame + 1) % frames.length; // Move to next frame

        // Set a delay for each frame
        let delay = (currentFrame < 4) ? 300 : 500; // Faster build-up, slower flashes

        if (currentFrame === 0) {
            flashCount++;
            if (flashCount === 2) flashCount = 0; // Reset after 2 flash cycles
        }

        // Continue the animation
        setTimeout(animateTitle, delay);
    }

    // Start animation
    animateTitle();
}

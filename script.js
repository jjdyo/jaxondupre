// Hamburger Menu Toggle with Fade-in and Fade-out Animation
const hamburgerToggle = document.getElementById('hamburger-toggle');
const expandedMenu = document.getElementById('expanded-menu');
let isMenuOpen = false;

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

// Smooth Scroll for internal links
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });

        // Close the menu after clicking on a link (for mobile)
        closeMenu();
    });
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
    threshold: 0.1 // Element needs to be 10% visible to trigger the fade-in
});

fadeInElements.forEach(element => {
    observer.observe(element);
});

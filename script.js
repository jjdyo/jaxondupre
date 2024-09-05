// Smooth Scroll for internal links
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });

        // Close the menu after clicking on a link (for mobile)
        document.getElementById('navbar-menu').classList.remove('active');
    });
});

// Hamburger Menu Toggle
const hamburgerToggle = document.getElementById('hamburger-toggle');
const navbarMenu = document.getElementById('navbar-menu');

hamburgerToggle.addEventListener('click', function() {
    navbarMenu.classList.toggle('active');
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

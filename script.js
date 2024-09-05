// Smooth Scroll for internal links
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });

        // Close the menu after clicking on a link (for mobile)
        document.getElementById('expanded-menu').style.display = 'none';
        document.getElementById('navbar-menu').classList.remove('active');
    });
});

// Hamburger Menu Toggle
const hamburgerToggle = document.getElementById('hamburger-toggle');
const expandedMenu = document.getElementById('expanded-menu');

hamburgerToggle.addEventListener('click', function() {
    if (expandedMenu.style.display === 'none' || expandedMenu.style.display === '') {
        expandedMenu.style.display = 'flex';
    } else {
        expandedMenu.style.display = 'none';
    }
});

// Show Floating Name and Hamburger Menu on Scroll
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

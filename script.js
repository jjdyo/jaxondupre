// Hamburger Menu Toggle with Fade-in and Fade-out Animation
const hamburgerToggle = document.getElementById('hamburger-toggle');
const expandedMenu = document.getElementById('expanded-menu');
let isMenuOpen = false;

// Wait for DOM to be fully loaded before starting animation
document.addEventListener('DOMContentLoaded', function() {
    // Start title animation after DOM is loaded
    startTitleAnimation();

    // Initialize vine flow overlay + animation loop
    initVineFlow();

    // Add fade-in effect for the mushroom background image
    setTimeout(function() {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.classList.add('bg-visible');
        }
    }, 50); // Delay of 50ms before starting the fade-in

    // Initialize hamburger menu toggle
    hamburgerToggle.addEventListener('click', function() {
        if (!isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    });
});

function initVineFlow() {
    const svg = document.querySelector('.vines-svg');
    if (!svg) return;

    // Initialize growth progress variable immediately (so the overlay doesn’t flash on load)
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
    document.documentElement.style.setProperty('--vine-grow', String(scrollPercent));

    // Clone each vine path to create a moving highlight overlay.
    // This keeps the main vine available for scroll-linked growth while the overlay provides
    // a subtle top↔bottom “flow” illusion with per-vine randomized sine patterns.
    const baseVines = Array.from(svg.querySelectorAll('.vine-path.vine-side'));
    const flowVines = [];

    baseVines.forEach((base, i) => {
        const clone = base.cloneNode(true);
        clone.removeAttribute('id');
        clone.classList.remove('vine-extra', 'vine-extra-1', 'vine-extra-2', 'vine-extra-3', 'vine-extra-4');
        clone.classList.add('vine-flow');

        // Deterministic “random” parameters by index (stable across reloads)
        const seed = (i + 1) * 9973;
        const rand01 = (n) => {
            const x = Math.sin(n) * 10000;
            return x - Math.floor(x);
        };

        const speed = 18 + rand01(seed + 1) * 26;      // px-ish per second in dashoffset units
        const freq = 0.6 + rand01(seed + 2) * 1.1;      // Hz-ish
        const phase = rand01(seed + 3) * Math.PI * 2;
        const amp = 10 + rand01(seed + 4) * 18;         // sine amplitude

        // Vary dash pattern per vine for a more organic look
        const dash = 4 + Math.floor(rand01(seed + 5) * 10); // 4..13
        const gap = 16 + Math.floor(rand01(seed + 6) * 26); // 16..41
        clone.style.strokeDasharray = `${dash} ${gap}`;

        flowVines.push({
            el: clone,
            speed,
            freq,
            phase,
            amp,
            dir: rand01(seed + 7) > 0.5 ? 1 : -1,
        });

        // Insert after the base path so it renders on top
        base.insertAdjacentElement('afterend', clone);
    });

    let rafId = 0;
    const start = performance.now();

    const tick = (now) => {
        const t = (now - start) / 1000;
        for (const v of flowVines) {
            // Combine steady drift + sinusoid to create “natural” motion primarily along the vine
            const drift = v.dir * v.speed * t;
            const wave = Math.sin((t * v.freq * Math.PI * 2) + v.phase) * v.amp;
            v.el.style.strokeDashoffset = `${drift + wave}`;
        }
        rafId = requestAnimationFrame(tick);
    };

    // If user prefers reduced motion, keep the overlay subtle and avoid continuous animation.
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
        rafId = requestAnimationFrame(tick);
    }

    // Safety: stop animation when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = 0;
        } else if (!reduceMotion && !rafId) {
            rafId = requestAnimationFrame(tick);
        }
    });
}

function openMenu() {
    // Add the open class to trigger CSS transitions
    expandedMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    isMenuOpen = true;
}

function closeMenu() {
    // Remove the open class to trigger CSS transitions
    expandedMenu.classList.remove('open');
    document.body.style.overflow = ''; // Restore scrolling when menu is closed
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
const vineLeft = document.getElementById('vine-left');
const vineRight = document.getElementById('vine-right');

window.addEventListener('scroll', function() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
    
    // Update floating elements visibility
    if (window.scrollY > 100) {
        floatingElements.classList.remove('hidden');
    } else {
        floatingElements.classList.add('hidden');
    }

    // Update vine growth
    const drawOffset = 1000 - (scrollPercent * 1000);
    const vines = document.querySelectorAll('.vine-path.vine-side');
    vines.forEach(vine => {
        vine.style.strokeDashoffset = drawOffset;
    });

    // Expose growth progress to CSS so the flow overlay can fade in naturally
    document.documentElement.style.setProperty('--vine-grow', String(scrollPercent));
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
        '🌱',
        '🌿',
        '🌳',
        '🍃',
        '🍀',
        '🎋',
        '🍃',
        '🌿',
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

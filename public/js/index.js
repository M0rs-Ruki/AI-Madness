const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking on links
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('open');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-button').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.target);
        const icon = button.querySelector('span:last-child');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-content').forEach(content => {
            if (content !== target) {
                content.classList.add('hidden');
                const otherButton = document.querySelector(`[data-target="${content.id}"] span:last-child`);
                if (otherButton) otherButton.textContent = '+';
            }
        });
        
        // Toggle current FAQ
        target.classList.toggle('hidden');
        icon.textContent = target.classList.contains('hidden') ? '+' : '−';
    });
});

// Pricing toggle
const monthlyBtn = document.getElementById('monthlyBtn');
const yearlyBtn = document.getElementById('yearlyBtn');

monthlyBtn.addEventListener('click', () => {
    monthlyBtn.classList.add('bg-red-500', 'text-white');
    monthlyBtn.classList.remove('text-gray-400');
    yearlyBtn.classList.remove('bg-red-500', 'text-white');
    yearlyBtn.classList.add('text-gray-400');
});

yearlyBtn.addEventListener('click', () => {
    yearlyBtn.classList.add('bg-red-500', 'text-white');
    yearlyBtn.classList.remove('text-gray-400');
    monthlyBtn.classList.remove('bg-red-500', 'text-white');
    monthlyBtn.classList.add('text-gray-400');
});

// Savings calculator
const savingsSlider = document.getElementById('savingsSlider');
const savingsAmount = document.getElementById('savingsAmount');

savingsSlider.addEventListener('input', (e) => {
    const currentSpend = parseInt(e.target.value);
    const savings = Math.max(0, currentSpend - 1.99);
    savingsAmount.textContent = `₹${savings.toLocaleString()}/mo`;
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles if motion is not reduced
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    createParticles();
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.hover-tilt').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

let ticking = false;
function updateOnScroll() {
    // Throttle scroll events for better performance
    if (!ticking) {
        requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll, { passive: true });
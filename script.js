// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
        
        // Initialize animations after loading
        initializeAnimations();
    }, 3000);
});

// Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Pricing toggle
const pricingToggle = document.getElementById('pricing-toggle');
const monthlyPrices = document.querySelectorAll('.monthly');
const yearlyPrices = document.querySelectorAll('.yearly');

if (pricingToggle) {
    pricingToggle.addEventListener('change', function() {
        if (this.checked) {
            monthlyPrices.forEach(price => price.style.display = 'none');
            yearlyPrices.forEach(price => price.style.display = 'inline');
        } else {
            monthlyPrices.forEach(price => price.style.display = 'inline');
            yearlyPrices.forEach(price => price.style.display = 'none');
        }
    });
}

// Portfolio filters
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonials slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const navDots = document.querySelectorAll('.nav-dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    navDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
    
    // Activate current dot
    if (navDots[index]) {
        navDots[index].classList.add('active');
    }
}

// Navigation dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Contact form
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = contactForm?.querySelector('.submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            
            // Show success message
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'form-status success show';
            
            // Reset form
            contactForm.reset();
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('show');
            }, 5000);
        }, 2000);
    });
}

// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate skill bars
            if (entry.target.classList.contains('about')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill bars animation
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 200);
    });
}

// Tilt effect for cards
function initializeTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) scale3d(1.05, 1.05, 1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
        
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
    });
}

// Parallax effect for floating elements
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Particle animation enhancement
function enhanceParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            
            particle.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 2000 + (index * 500));
    });
}

// Initialize all animations
function initializeAnimations() {
    initializeTiltEffect();
    initializeParallax();
    enhanceParticles();
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : testimonialCards.length - 1;
        showTestimonial(currentTestimonial);
    }
    
    if (e.key === 'ArrowRight') {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical images
function preloadImages() {
    const imageUrls = [
        // Add any critical image URLs here
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    preloadImages();
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after animations are ready
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Accessibility improvements
function improveAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
}

// Initialize accessibility improvements
improveAccessibility();

// Console message for developers
console.log(`
🎨 Alex Chen Portfolio Website
Built with modern web technologies
- Responsive Design
- Smooth Animations
- Accessibility Features
- Performance Optimized

Feel free to explore the code!
`);
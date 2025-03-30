// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li a');
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.logo');
const socialLinksNavAnchors = document.querySelectorAll('.social-links-nav a');
const darkModeIcon = document.querySelector('.dark-mode-toggle i');
const bgToggleIcon = document.querySelector('.bg-toggle i');
const burgerLines = document.querySelectorAll('.burger div');

// Change navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white', 'dark:bg-gray-900', 'shadow-md');
        navbar.classList.remove('bg-transparent');
        
        // Change text colors
        logo.classList.remove('text-white');
        logo.classList.add('text-gray-900', 'dark:text-white');
        
        navLinks.forEach(link => {
            link.classList.remove('text-white', 'hover:text-blue-300');
            link.classList.add('text-gray-900', 'dark:text-white', 'hover:text-blue-500');
        });
        
        socialLinksNavAnchors.forEach(anchor => {
            anchor.classList.remove('text-white', 'hover:text-blue-300');
            anchor.classList.add('text-gray-700', 'dark:text-gray-300', 'hover:text-blue-600');
        });
        
        if (!document.documentElement.classList.contains('dark')) {
            darkModeIcon.classList.remove('text-white');
            darkModeIcon.classList.add('text-gray-700');
            
            bgToggleIcon.classList.remove('text-white');
            bgToggleIcon.classList.add('text-gray-700');
        }
        
        burgerLines.forEach(line => {
            line.classList.remove('bg-white');
            line.classList.add('bg-gray-900', 'dark:bg-white');
        });
    } else {
        navbar.classList.remove('bg-white', 'dark:bg-gray-900', 'shadow-md');
        navbar.classList.add('bg-transparent');
        
        // Reset text colors
        logo.classList.add('text-white');
        logo.classList.remove('text-gray-900', 'dark:text-white');
        
        navLinks.forEach(link => {
            link.classList.add('text-white', 'hover:text-blue-300');
            link.classList.remove('text-gray-900', 'dark:text-white', 'hover:text-blue-500');
        });
        
        socialLinksNavAnchors.forEach(anchor => {
            anchor.classList.add('text-white', 'hover:text-blue-300');
            anchor.classList.remove('text-gray-700', 'dark:text-gray-300', 'hover:text-blue-600');
        });
        
        darkModeIcon.classList.add('text-white');
        darkModeIcon.classList.remove('text-gray-700');
        
        bgToggleIcon.classList.add('text-white');
        bgToggleIcon.classList.remove('text-gray-700');
        
        burgerLines.forEach(line => {
            line.classList.add('bg-white');
            line.classList.remove('bg-gray-900', 'dark:bg-white');
        });
    }
});

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    document.querySelectorAll('.nav-links li').forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    }); 

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Typing Effect with Tailwind
const typedTextSpan = document.querySelector('.typed-text');
const texts = ['Web Developer', 'Full Stack Developer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;
let erasingDelay = 100;
let newTextDelay = 2000;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150 - Math.random() * 50;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Start typing effect when the page loads
window.addEventListener('load', type);

// Scroll Animation for Skills
const skillBars = document.querySelectorAll('.progress');
const skillsSection = document.querySelector('.skills');

function animateSkills() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Intersection Observer for Skills Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use the system preference
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Background Image Toggle
const bgToggle = document.getElementById('bgToggle');
const pageBg = document.querySelector('.page-bg');
const backgroundImages = [
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
];

// Set initial background from localStorage or default to the first one
let currentBgIndex = parseInt(localStorage.getItem('bgIndex') || '0');

// Function to preload images
function preloadImage(url) {
    console.log('Attempting to load image:', url);
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            console.log('Successfully loaded image:', url);
            resolve(url);
        };
        img.onerror = () => {
            console.error('Failed to load image:', url);
            reject(url);
        };
    });
}

// Set the background image with error handling
function setBackgroundImage(url) {
    preloadImage(url)
        .then(() => {
            pageBg.style.backgroundImage = `url('${url}')`;
            if (pageBg.style.opacity === '0') {
                setTimeout(() => {
                    pageBg.style.opacity = document.documentElement.classList.contains('dark') ? '0.05' : '0.1';
                }, 300);
            }
        })
        .catch(() => {
            console.log('Failed to load image:', url);
            // Use fallback image or move to next image
            currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
            setBackgroundImage(backgroundImages[currentBgIndex]);
        });
}

// Initial background setup
setBackgroundImage(backgroundImages[currentBgIndex]);

// Toggle through background images on button click
bgToggle.addEventListener('click', () => {
    currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
    pageBg.style.opacity = '0';
    localStorage.setItem('bgIndex', currentBgIndex.toString());
    
    setTimeout(() => {
        setBackgroundImage(backgroundImages[currentBgIndex]);
    }, 300);
});

// Document load handler to ensure background images are loaded
window.addEventListener('DOMContentLoaded', () => {
    // Force refresh the background images
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const currentBgImage = getComputedStyle(heroSection).backgroundImage;
        if (currentBgImage === 'none' || currentBgImage === '') {
            heroSection.style.backgroundImage = "url('https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')";
        }
    }
    
    // Force refresh page background
    if (pageBg && (!pageBg.style.backgroundImage || pageBg.style.backgroundImage === 'none')) {
        setBackgroundImage(backgroundImages[currentBgIndex]);
    }
}); 
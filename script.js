document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu on link click
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Product Modal Logic ---
    const productCards = document.querySelectorAll('.glass-card');
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Hardcoded product data for demo
    const productsData = {
        1: { name: "The Serene Lounger", price: "$2,499", img: "assets/sofa1.png", desc: "Crafted for ultimate relaxation, the Serene Lounger features plush, deep cushions and a timeless minimalist design. Perfect for modern living spaces." },
        2: { name: "Urban Elegance", price: "$1,999", img: "assets/sofa2.png", desc: "A sleek and sophisticated sofa with clean lines and premium fabric. The Urban Elegance brings a touch of class to any room." },
        3: { name: "Minimalist Dream", price: "$2,150", img: "assets/sofa3.png", desc: "Embodying simplicity and comfort, the Minimalist Dream is perfect for smaller spaces without compromising on style. Made with sustainable materials." },
    };
    
    productCards.forEach(card => {
        card.querySelector('.quick-view-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = card.dataset.productId;
            const product = productsData[productId];

            document.getElementById('modal-title').innerText = product.name;
            document.getElementById('modal-price').innerText = product.price;
            document.getElementById('modal-img').src = product.img;
            document.getElementById('modal-description').innerText = product.desc;
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
            }, 50);
        });
    });

    const closeModal = () => {
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Testimonial Slider ---
    const track = document.getElementById('slider-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('next-slide');
    const prevButton = document.getElementById('prev-slide');
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    // slides.forEach(setSlidePosition); // not needed for flex approach

    const moveToSlide = (targetIndex) => {
        track.style.transform = 'translateX(-' + (slideWidth * targetIndex) + 'px)';
        currentIndex = targetIndex;
    };

    nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });

    setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    }, 5000); // Auto-rotate every 5 seconds

    // --- About Section Parallax Image ---
    const aboutImage = document.getElementById('about-image');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        // Adjust the '0.2' to change the parallax speed
        aboutImage.style.transform = 'translateY(' + scrollPosition * 0.1 + 'px)';
    });

    // --- Newsletter Form Validation ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterMessage = document.getElementById('newsletter-message');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterEmail.value;
        if (validateEmail(email)) {
            newsletterMessage.textContent = "Thank you for subscribing!";
            newsletterMessage.style.color = '#B2E4D5';
            newsletterEmail.value = '';
        } else {
            newsletterMessage.textContent = "Please enter a valid email.";
            newsletterMessage.style.color = '#FADADD';
        }
        setTimeout(() => newsletterMessage.textContent = '', 3000);
    });

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Floating Particles in Hero Section ---
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 5 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
    }
});
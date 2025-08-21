document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Background Image Carousel ---
    const heroSection = document.getElementById('hero-section');
    const backgroundImages = [
        '../assets/pic1.png',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1600880292210-f76c9b0559a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1772&q=80'
    ];
    let currentBgIndex = 0;

    function changeBackground() {
        currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
        heroSection.style.backgroundImage = `url('${backgroundImages[currentBgIndex]}')`;
    }

    // Preload images for smoother transitions
    backgroundImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Set initial background
    heroSection.style.backgroundImage = `url('${backgroundImages[0]}')`;
    
    // Change background every 8 seconds (matching Figma requirement)
    setInterval(changeBackground, 8000);

    // --- 2. Testimonial Carousel ---
    const testimonialCard = document.getElementById('testimonial-card');
    const testimonialImageEl = document.getElementById('testimonial-image');
    const testimonialTextEl = document.getElementById('testimonial-text');

    const testimonials = [
        {
            image: '../assets/bj.jpg',
            text: '"Tripledots has helped me develop real world skills in web development and changed my career path completely."'
        },
        {
            image: '../assets/dora.jpg',
            text: '"The data science bootcamp was intensive but incredibly rewarding. I landed my dream job in tech right after graduation."'
        },
        {
            image: '../assets/esther.jpg',
            text: '"Amazing instructors and hands-on projects. Tripledots prepared me for the real challenges in the tech industry."'
        },
        {
            image: '../assets/habib.jpg',
            text: '"The corporate training program transformed our entire development team. Highly recommended for businesses!"'
        },
        {
            image: '../assets/mj.jpg',
            text: '"From zero coding knowledge to landing my first software engineering role. Tripledots made it possible."'
        },
        {
            image: '../assets/victory.jpg',
            text: '"The mentorship and practical approach at Tripledots gave me the confidence to start my own tech company."'
        }
    ];
    let currentTestimonialIndex = 0;

    function updateTestimonial() {
        // Fade out current testimonial
        testimonialCard.classList.add('fade-out');

        setTimeout(() => {
            // Move to next testimonial
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            const { image, text } = testimonials[currentTestimonialIndex];
            
            // Update content
            testimonialImageEl.src = image;
            testimonialTextEl.textContent = text;
            
            // Fade back in
            testimonialCard.classList.remove('fade-out');
        }, 500); // Match CSS transition duration
    }

    // Set initial testimonial
    testimonialImageEl.src = testimonials[0].image;
    testimonialTextEl.textContent = testimonials[0].text;
    
    // Change testimonial every 5 seconds
    setInterval(updateTestimonial, 5000);

    // --- 3. Button Event Listeners ---
    const viewCoursesBtn = document.querySelector('.btn-primary');
    const applyNowBtn = document.querySelector('.btn-secondary');

    if (viewCoursesBtn) {
        viewCoursesBtn.addEventListener('click', () => {
            // Smooth scroll to courses section or navigate
            const coursesSection = document.querySelector('#courses') || 
                                  document.querySelector('.courses-section');
            
            if (coursesSection) {
                coursesSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Navigate to courses page if section doesn't exist
                console.log('Navigate to courses page');
                // window.location.href = '/courses';
            }
        });
    }

    if (applyNowBtn) {
        applyNowBtn.addEventListener('click', () => {
            // Smooth scroll to contact section or navigate to application
            const contactSection = document.querySelector('#contact') || 
                                  document.querySelector('.contact-section');
            
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Navigate to application page if section doesn't exist
                console.log('Navigate to application page');
                // window.location.href = '/apply';
            }
        });
    }

    // --- 4. Navigation Enhancement ---
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start' 
                    });
                }
            }
        });
    });

    // --- 5. Responsive Navigation (Simple) ---
    // Add mobile menu toggle if needed in future
    function handleMobileNav() {
        const navLinks = document.querySelector('.nav-links');
        const navbar = document.querySelector('.navbar');
        
        // Simple responsive handling
        if (window.innerWidth <= 992) {
            // Mobile behavior can be enhanced here
        }
    }

    window.addEventListener('resize', handleMobileNav);
    handleMobileNav(); // Initial check

    // --- 6. Performance Optimization ---
    // Intersection Observer for animations when hero comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe hero elements for animation
    const heroElements = document.querySelectorAll('.hero-left h1, .hero-left .tagline, .hero-left p, .testimonial-card');
    heroElements.forEach(el => observer.observe(el));

    // --- 7. Accessibility Enhancements ---
    // Keyboard navigation for testimonials
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            // Previous testimonial (can be implemented)
            updateTestimonial();
        } else if (e.key === 'ArrowRight') {
            // Next testimonial
            updateTestimonial();
        }
    });

    // Pause animations when user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable auto-rotation or slow it down
        console.log('Reduced motion preference detected');
    }

    // --- 8. Error Handling ---
    // Handle image loading errors
    backgroundImages.forEach((src, index) => {
        const img = new Image();
        img.onerror = () => {
            console.warn(`Failed to load background image ${index + 1}: ${src}`);
            // Remove failed image from rotation
            backgroundImages.splice(index, 1);
        };
        img.src = src;
    });

    // Handle testimonial image errors
    testimonialImageEl.onerror = () => {
        testimonialImageEl.src = 'https://placehold.co/120x120/cccccc/666666?text=User';
    };

    console.log('Hero section initialized successfully');
});

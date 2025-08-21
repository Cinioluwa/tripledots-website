/*
 * ===================================================================
 * TRIPLE DOTS MAIN JAVASCRIPT
 * Combined from all section scripts with intelligent enhancements
 * ===================================================================
*/

// --- GLOBAL UTILITIES & ENHANCEMENTS ---

class TripleDotsWebsite {
    constructor() {
        this.isInitialized = false;
        this.sections = [];
        this.currentSection = null;
        this.scrollTimeout = null;
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🚀 Initializing Tripledots Website...');
        
        // Initialize all sections
        this.initHero();
        this.initAbout();
        this.initCourses();
        this.initServices();
        this.initContact();
        this.initFooter();
        
        // Initialize global features
        this.initNavigation();
        this.initScrollEffects();
        this.initAccessibility();
        this.initPerformanceOptimizations();
        
        this.isInitialized = true;
        console.log('✅ Tripledots Website initialized successfully');
    }

    // --- HERO SECTION INITIALIZATION ---
    initHero() {
        console.log('Initializing Hero section...');
        
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        // Background Image Carousel
        const backgroundImages = [
            './assets/pic1.png',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
            'https://images.unsplash.com/photo-1600880292210-f76c9b0559a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1772&q=80'
        ];
        let currentBgIndex = 0;

        const changeBackground = () => {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
                heroSection.style.backgroundImage = `url('${backgroundImages[currentBgIndex]}')`;
            }
        };

        // Preload images for smoother transitions
        backgroundImages.forEach((src, index) => {
            const img = new Image();
            img.onerror = () => {
                console.warn(`Failed to load background image ${index + 1}: ${src}`);
                backgroundImages.splice(index, 1);
            };
            img.src = src;
        });
        
        // Set initial background
        if (backgroundImages.length > 0) {
            heroSection.style.backgroundImage = `url('${backgroundImages[0]}')`;
            // Change background every 8 seconds
            setInterval(changeBackground, 8000);
        }

        // Testimonial Carousel
        const testimonialCard = document.getElementById('testimonial-card');
        const testimonialImageEl = document.getElementById('testimonial-image');
        const testimonialTextEl = document.getElementById('testimonial-text');

        if (testimonialCard && testimonialImageEl && testimonialTextEl) {
            const testimonials = [
                {
                    image: './assets/bj.jpg',
                    text: '"Tripledots has helped me develop real world skills in web development and changed my career path completely."'
                },
                {
                    image: './assets/dora.jpg',
                    text: '"The data science bootcamp was intensive but incredibly rewarding. I landed my dream job in tech right after graduation."'
                },
                {
                    image: './assets/esther.jpg',
                    text: '"Amazing instructors and hands-on projects. Tripledots prepared me for the real challenges in the tech industry."'
                },
                {
                    image: './assets/habib.jpg',
                    text: '"The corporate training program transformed our entire development team. Highly recommended for businesses!"'
                },
                {
                    image: './assets/mj.jpg',
                    text: '"From zero coding knowledge to landing my first software engineering role. Tripledots made it possible."'
                },
                {
                    image: './assets/victory.jpg',
                    text: '"The mentorship and practical approach at Tripledots gave me the confidence to start my own tech company."'
                }
            ];
            let currentTestimonialIndex = 0;

            const updateTestimonial = () => {
                testimonialCard.classList.add('fade-out');

                setTimeout(() => {
                    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
                    const { image, text } = testimonials[currentTestimonialIndex];
                    
                    testimonialImageEl.src = image;
                    testimonialTextEl.textContent = text;
                    
                    testimonialCard.classList.remove('fade-out');
                }, 500);
            };

            // Handle testimonial image errors
            testimonialImageEl.onerror = () => {
                testimonialImageEl.src = 'https://placehold.co/120x120/cccccc/666666?text=User';
            };

            // Set initial testimonial
            testimonialImageEl.src = testimonials[0].image;
            testimonialTextEl.textContent = testimonials[0].text;
            
            // Change testimonial every 5 seconds (only if motion is not reduced)
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                setInterval(updateTestimonial, 5000);
            }

            // Keyboard navigation for testimonials
            document.addEventListener('keydown', (e) => {
                if (e.target.closest('#hero')) {
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                        updateTestimonial();
                    }
                }
            });
        }

        // Button Event Listeners
        const viewCoursesBtn = document.querySelector('.btn-primary');
        const applyNowBtn = document.querySelector('.btn-secondary');

        if (viewCoursesBtn) {
            viewCoursesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollToSection('courses');
                this.trackEvent('hero_cta_courses_clicked');
            });
        }

        if (applyNowBtn) {
            applyNowBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollToSection('contact');
                this.trackEvent('hero_cta_apply_clicked');
            });
        }

        console.log('✅ Hero section initialized');
    }

    // --- ABOUT SECTION INITIALIZATION ---
    initAbout() {
        console.log('Initializing About section...');
        
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;

        // Animate images on scroll
        const imageContainers = aboutSection.querySelectorAll('.image-container');
        
        imageContainers.forEach((container, index) => {
            const img = container.querySelector('img');
            
            // Add loading="lazy" for performance
            if (img && !img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Add stagger animation delay
            container.style.animationDelay = `${index * 0.2}s`;

            // Add hover effect enhancement
            container.addEventListener('mouseenter', () => {
                if (!this.isMobile()) {
                    container.style.transform = 'translateY(-2px)';
                }
            });

            container.addEventListener('mouseleave', () => {
                container.style.transform = 'translateY(0)';
            });
        });

        console.log('✅ About section initialized');
    }

    // --- COURSES SECTION INITIALIZATION ---
    initCourses() {
        console.log('Initializing Courses section...');
        
        const coursesSection = document.getElementById('courses');
        if (!coursesSection) return;

        const cards = coursesSection.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            // Add progressive loading animation
            card.style.animationDelay = `${index * 0.1}s`;

            // Add ARIA labels for better accessibility
            const courseTitle = card.querySelector('.head')?.textContent;
            card.setAttribute('aria-label', `${courseTitle} course information`);
        });

        console.log('✅ Courses section initialized');
    }

    // --- SERVICES SECTION INITIALIZATION ---
    initServices() {
        console.log('Initializing Services section...');
        
        const servicesSection = document.getElementById('services');
        if (!servicesSection) return;

        // Animate service blocks on scroll
        const serviceBlocks = servicesSection.querySelectorAll('.section-1, .section-2');
        
        serviceBlocks.forEach((block, index) => {
            block.style.animationDelay = `${index * 0.2}s`;
        });

        console.log('✅ Services section initialized');
    }

    // --- CONTACT SECTION INITIALIZATION ---
    initContact() {
        console.log('Initializing Contact section...');
        
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        // Enhanced contact item interactions
        const contactItems = contactSection.querySelectorAll('.contact-item');
        
        contactItems.forEach(item => {
            // Add hover cursor for interactive items
            const hasLink = item.querySelector('a');
            
            if (hasLink) {
                item.style.cursor = 'pointer';
            }
        });

        // Map interaction enhancements
        const mapFrame = contactSection.querySelector('iframe');
        if (mapFrame) {
            mapFrame.addEventListener('load', () => {
                console.log('Map loaded successfully');
            });
        }

        console.log('✅ Contact section initialized');
    }

    // --- FOOTER INITIALIZATION ---
    initFooter() {
        console.log('Initializing Footer...');
        
        const footer = document.querySelector('footer');
        if (!footer) return;

        // Enhanced social media link tracking
        const socialLinks = footer.querySelectorAll('.social-icon');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = this.getSocialPlatform(link.href);
                this.trackEvent('social_link_clicked', { platform });
                console.log(`Social link clicked: ${platform}`);
            });

            // Add hover sound effect (optional)
            link.addEventListener('mouseenter', () => {
                if (!this.isMobile()) {
                    // Could add subtle sound effect here
                }
            });
        });

        // Footer navigation links
        const footerNavLinks = footer.querySelectorAll('nav a');
        footerNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const sectionId = href.substring(1);
                    this.smoothScrollToSection(sectionId);
                }
            });
        });

        console.log('✅ Footer initialized');
    }

    // --- NAVIGATION ENHANCEMENTS ---
    initNavigation() {
        console.log('Initializing Navigation...');
        
        const header = document.querySelector('.main-header');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-link');
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!header) return;

        // Header scroll behavior
        let lastScrollY = window.scrollY;
        
        const updateHeaderOnScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', this.throttle(updateHeaderOnScroll, 10));

        // Hamburger menu functionality
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                
                // Prevent body scrolling when menu is open
                if (mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking outside
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when pressing escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Enhanced navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (hamburger && mobileMenu) {
                        hamburger.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Update active state
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Smooth scroll to section
                    const sectionId = href.substring(1);
                    this.smoothScrollToSection(sectionId);
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', this.throttle(() => {
            this.updateActiveNavLink();
        }, 100));

        console.log('✅ Navigation initialized');
    }

    // --- SCROLL EFFECTS ---
    initScrollEffects() {
        console.log('Initializing Scroll Effects...');
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add stagger animation for child elements
                    const children = entry.target.querySelectorAll('.card, .image-container, .contact-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all major sections and elements
        const elementsToObserve = document.querySelectorAll(`
            section,
            .hero-left h1,
            .hero-left .tagline,
            .hero-left p,
            .testimonial-card,
            .card,
            .image-container,
            .contact-item
        `);

        elementsToObserve.forEach(el => observer.observe(el));

        console.log('✅ Scroll Effects initialized');
    }

    // --- ACCESSIBILITY ENHANCEMENTS ---
    initAccessibility() {
        console.log('Initializing Accessibility...');
        
        // Skip to content link
        this.createSkipLink();
        
        // Enhanced focus management
        this.initFocusManagement();
        
        // Keyboard navigation enhancements
        this.initKeyboardNavigation();
        
        // Screen reader enhancements
        this.initScreenReaderEnhancements();
        
        console.log('✅ Accessibility initialized');
    }

    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#hero';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    initFocusManagement() {
        // Improve focus visibility
        const focusableElements = document.querySelectorAll(`
            a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])
        `);
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '1px solid var(--primary-blue)';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    initKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Home':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.smoothScrollToSection('hero');
                    }
                    break;
                case 'End':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
                    }
                    break;
            }
        });
    }

    initScreenReaderEnhancements() {
        // Add live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
        
        this.liveRegion = liveRegion;
    }

    // --- PERFORMANCE OPTIMIZATIONS ---
    initPerformanceOptimizations() {
        console.log('Initializing Performance Optimizations...');
        
        // Lazy load images
        this.initLazyLoading();
        
        // Optimize scroll listeners
        this.initScrollOptimizations();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        console.log('✅ Performance Optimizations initialized');
    }

    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    initScrollOptimizations() {
        // Use passive listeners for better performance
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250), { passive: true });
    }

    preloadCriticalResources() {
        const criticalImages = [
            './assets/tripledots_logo.png',
            './assets/pic1.png',
            './assets/bj.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // --- UTILITY METHODS ---
    smoothScrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (!targetElement) return;

        const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Announce to screen readers
        this.announceToScreenReader(`Navigated to ${sectionId} section`);
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-link');
        const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleScroll() {
        // Throttled scroll handling
        if (this.scrollTimeout) return;
        
        this.scrollTimeout = setTimeout(() => {
            // Handle scroll-based effects here
            this.scrollTimeout = null;
        }, 16); // ~60fps
    }

    handleResize() {
        // Handle responsive adjustments
        console.log('Window resized');
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }

    getSocialPlatform(url) {
        if (url.includes('instagram')) return 'Instagram';
        if (url.includes('twitter')) return 'Twitter';
        if (url.includes('linkedin')) return 'LinkedIn';
        if (url.includes('facebook')) return 'Facebook';
        return 'Unknown';
    }

    trackEvent(eventName, data = {}) {
        // Analytics tracking (placeholder for future implementation)
        console.log(`📊 Event: ${eventName}`, data);
        
        // Future: Send to Google Analytics, Facebook Pixel, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }

    isMobile() {
        return window.innerWidth <= 768;
    }

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

// --- INITIALIZATION ---
window.TripleDotsWebsite = TripleDotsWebsite;
const website = new TripleDotsWebsite();

// --- ERROR HANDLING ---
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Future: Send error reports to monitoring service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Future: Send error reports to monitoring service
});

// --- SERVICE WORKER REGISTRATION (Future Enhancement) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Future: Register service worker for offline functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

console.log('🎉 Tripledots Website main script loaded successfully!');

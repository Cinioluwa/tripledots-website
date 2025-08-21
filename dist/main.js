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

        // Background carousel (supports images and videos). Videos are muted and autoplayed.
        const backgroundItems = [
            { type: 'image', src: './assets/justdoit.png' },
            { type: 'image', src: './assets/pic1.png' },
            { type: 'image', src: './assets/b2.jpg' },
            { type: 'image', src: './assets/b3.jpg' },
            { type: 'image', src: './assets/b1.jpg' },
            { type: 'video', src: './assets/b4.webm' },
            { type: 'image', src: './assets/lightbulb.png' },
            { type: 'image', src: './assets/b6.png' },
            { type: 'video', src: './assets/b5.webm' }
        ];

        let currentBgIndex = 0;
        // Setup a hero-bg-media container for layering items and crossfading
        let bgContainer = document.querySelector('.hero-bg-media');
        if (!bgContainer) {
            bgContainer = document.createElement('div');
            bgContainer.className = 'hero-bg-media';
            heroSection.insertBefore(bgContainer, heroSection.firstChild);
        }

        // Pool for video elements to avoid re-creating them each time (reduces playback lag)
        const videoPool = {};

        const createOrGetVideo = (src) => {
            if (videoPool[src]) return videoPool[src];
            const v = document.createElement('video');
            v.src = src;
            v.muted = true;
            v.loop = true;
            v.playsInline = true;
            v.preload = 'auto';
            v.className = 'bg-video';
            v.style.zIndex = '-2';
            videoPool[src] = v;
            return v;
        };

        const showItem = (item) => {
            // Add new bg element for item
            let el;
            if (item.type === 'video') {
                el = createOrGetVideo(item.src);
                if (!el.parentNode) bgContainer.appendChild(el);
                // ensure play started
                const p = el.play();
                if (p && typeof p.then === 'function') p.catch(() => {});
            } else {
                el = document.createElement('div');
                el.className = 'bg-item';
                el.style.backgroundImage = `url('${item.src}')`;
                bgContainer.appendChild(el);
            }

            // Force a layout & then make visible to trigger transition
            void el.offsetWidth;
            el.classList.add('visible');

            // Remove previous non-active items after crossfade duration (1s)
            Array.from(bgContainer.children).forEach(child => {
                if (child === el) return;
                child.classList.remove('visible');
                setTimeout(() => {
                    // only remove if still not visible
                    if (!child.classList.contains('visible') && child.parentNode) child.remove();
                }, 1100);
            });
        };

        // Preload image items only (videos will buffer by the browser)
        backgroundItems.forEach((it, idx) => {
            if (it.type === 'image') {
                const img = new Image();
                try { img.crossOrigin = 'anonymous'; } catch (e) {}
                img.onerror = () => {
                    console.warn(`Failed to load background image ${idx + 1}: ${it.src}`);
                    backgroundItems.splice(idx, 1);
                };
                img.src = it.src;
            }
        });

        if (backgroundItems.length > 0) {
            showItem(backgroundItems[0]);
            // Change background every 10 seconds (gives videos time to buffer)
            setInterval(() => {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                currentBgIndex = (currentBgIndex + 1) % backgroundItems.length;
                showItem(backgroundItems[currentBgIndex]);
            }, 10000);
        }

        // Testimonial Carousel
        const testimonialCard = document.getElementById('testimonial-card');
        const testimonialImageEl = document.getElementById('testimonial-image');
        const testimonialTextEl = document.getElementById('testimonial-text');
        const testimonialNameEl = document.getElementById('testimonial-name');
        const testimonialTrackEl = document.getElementById('testimonial-track');

        if (testimonialCard && testimonialImageEl && testimonialTextEl && testimonialNameEl && testimonialTrackEl) {
            // Ensure the img element requests CORS for external sources
            try { testimonialImageEl.crossOrigin = 'anonymous'; } catch (e) {}
            const testimonials = [
                {
                    image: './assets/bj.jpg',
                    text: '"I was working in retail for 3 years and felt stuck. After completing the web development program at Tripledots, I got my first developer job at a fintech startup in Lagos. The hands-on projects and portfolio we built made all the difference during interviews."',
                    name: 'Bolaji',
                    track: 'Web Development Graduate'
                },
                {
                    image: './assets/dora.jpg',
                    text: '"Coming from a biology background, I never thought I\'d understand machine learning. The instructors broke down complex concepts so well. Now I\'m a data scientist at an oil & gas company, building predictive models that actually impact business decisions."',
                    name: 'Isidora Obeahon',
                    track: 'AI/ML & Python'
                },
                {
                    image: './assets/esther.jpg',
                    text: '"What impressed me most wasn\'t just the coding - it was learning how to think like a developer. The debugging sessions, code reviews, and real client projects prepared me for the chaos of startup life. I\'m now a full-stack developer at a growing tech company."',
                    name: 'Esther Owolabi',
                    track: 'Web Development'
                },
                {
                    image: './assets/habib.jpg',
                    text: '"Our company had security vulnerabilities we couldn\'t identify. After our IT team went through Tripledots\' cybersecurity training, we discovered and fixed 15 critical issues. The ROI was immediate - we prevented what could have been a costly breach."',
                    name: 'Habib',
                    track: 'Networking & Cybersecurity'
                },
                {
                    image: './assets/mj.jpg',
                    text: '"I was manually creating reports for hours every week. Learning Python and Power BI at Tripledots changed everything. Now I automate those reports in minutes and focus on actual analysis. My manager promoted me to Lead Analyst within 6 months."',
                    name: 'Mujeeb Adisa',
                    track: 'Data Analysis with Python'
                },
                {
                    image: './assets/victory.jpg',
                    text: '"The entrepreneurship mindset they teach alongside the technical skills is gold. I built my first SaaS product during the program and launched it 2 months after graduation. It\'s now generating ₦500K monthly revenue with clients across West Africa."',
                    name: 'Victory',
                    track: 'Web Development'
                },
                {
                    image: './assets/maryam.jpg',
                    text: '"I had the theory from school, but Tripledots gave me the practical skills. Now I bridge academic knowledge with real-world computer networking and cybersecurity solutions. The hands-on experience transformed me from student to professional."',
                    name: 'Maryam Omowumi Adebayo',
                    track: 'Network Security Engineering'
                }
            ];
            let currentTestimonialIndex = 0;

            const updateTestimonial = () => {
                testimonialCard.classList.add('fade-out');

                setTimeout(() => {
                    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
                    const { image, text, name, track } = testimonials[currentTestimonialIndex];
                    
                    testimonialImageEl.src = image;
                    testimonialTextEl.textContent = text;
                    testimonialNameEl.textContent = name;
                    testimonialTrackEl.textContent = track;
                    
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
            testimonialNameEl.textContent = testimonials[0].name;
            testimonialTrackEl.textContent = testimonials[0].track;
            
            // Change testimonial every 5 seconds (only if motion is not reduced)
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                setInterval(updateTestimonial, 10000);
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
        
        // Preload testimonial images
        this.preloadTestimonialImages();
        
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

    preloadTestimonialImages() {
        // Preload all testimonial images for smooth transitions
        const testimonialImages = [
            './assets/bj.jpg',
            './assets/dora.jpg',
            './assets/esther.jpg',
            './assets/habib.jpg',
            './assets/mj.jpg',
            './assets/maryam.jpg',
            './assets/victory.jpg'
        ];

        testimonialImages.forEach(src => {
            const img = new Image();
            img.src = src;
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

// --- DEVELOPER EASTER EGG ---
console.log(`
    ████████╗██████╗ ██╗██████╗ ██╗     ███████╗██████╗  ██████╗ ████████╗███████╗
    ╚══██╔══╝██╔══██╗██║██╔══██╗██║     ██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝
       ██║   ██████╔╝██║██████╔╝██║     █████╗  ██║  ██║██║   ██║   ██║   ███████╗
       ██║   ██╔══██╗██║██╔═══╝ ██║     ██╔══╝  ██║  ██║██║   ██║   ██║   ╚════██║
       ██║   ██║  ██║██║██║     ███████╗███████╗██████╔╝╚██████╔╝   ██║   ███████║
       ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝     ╚══════╝╚══════╝╚═════╝  ╚═════╝    ╚═╝   ╚══════╝
    
    👋 Hey there, fellow developer! 
    🚀 Interested in building something amazing with us?
    💼 Check out our courses at tripledotstechnologies.com
    📧 Drop us a line: info@tripledotstechnologies.com
    
    Built with 💙 by the Tripledots Team
`);

if (navigator.userAgent.toLowerCase().includes('chrome')) {
    console.log('%c🔥 This website was crafted with passion and cutting-edge tech!', 
        'background: linear-gradient(45deg, #1e2451, #4BACDD); color: white; padding: 10px; border-radius: 5px; font-weight: bold;');
}

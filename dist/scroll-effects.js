/*
 * ===================================================================
 * TRIPLEDOTS - ADVANCED SCROLL EFFECTS JAVASCRIPT
 * Handles all scroll-based animations and interactions
 * ===================================================================
*/

class ScrollEffectsManager {
    constructor() {
        this.scrollY = 0;
        this.lastScrollY = 0;
        this.scrollVelocity = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.ticking = false;
        this.particles = [];
        
        this.init();
    }

    init() {
        console.log('🎨 Initializing Advanced Scroll Effects...');
        
        // Initialize all scroll effects
        this.createScrollProgress();
        this.initIntersectionObserver();
        this.initParallaxElements();
        this.initScrollVelocity();
        this.createParticleSystem();
        this.initMagneticElements();
        this.initTextWaveAnimations();
        this.initCounters();
        this.initPageLoader();
        
        // Bind scroll events
        this.bindScrollEvents();
        
        console.log('✨ Advanced Scroll Effects initialized successfully');
    }

    // ===== SCROLL PROGRESS INDICATOR =====
    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.id = 'scroll-progress';
        document.body.appendChild(progressBar);
    }

    updateScrollProgress() {
        const scrollProgress = document.getElementById('scroll-progress');
        if (!scrollProgress) return;

        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
    }

    // ===== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS =====
    initIntersectionObserver() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -100px 0px'
        };

        this.revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all scroll reveal elements
        this.observeScrollRevealElements();
        this.addRevealClassesToElements();
    }

    addRevealClassesToElements() {
        // Add scroll reveal classes to existing elements
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (!section.classList.contains('scroll-reveal')) {
                const classes = [
                    'scroll-reveal',
                    'scroll-reveal-left', 
                    'scroll-reveal-right',
                    'scroll-reveal-scale'
                ];
                section.classList.add(classes[index % classes.length]);
            }
        });

        // Add stagger animation to course cards
        const courseCards = document.querySelectorAll('#courses .card');
        courseCards.forEach(card => {
            card.classList.add('scroll-stagger-item');
            // Remove enhanced-card class from course cards only
            card.classList.remove('enhanced-card');
            // Remove magnetic-element class from course cards to prevent repositioning
            card.classList.remove('magnetic-element');
        });

        // Add floating animation to images
        const images = document.querySelectorAll('.image-container img, .testimonial-profile img');
        images.forEach(img => {
            img.classList.add('floating-element');
        });

        // Add magnetic effect to buttons and cards (excluding course cards)
        const buttons = document.querySelectorAll('.btn, .social-icon');
        const otherCards = document.querySelectorAll('.card:not(#courses .card)');
        [...buttons, ...otherCards].forEach(btn => {
            btn.classList.add('magnetic-element');
        });
    }

    observeScrollRevealElements() {
        const revealElements = document.querySelectorAll(`
            .scroll-reveal,
            .scroll-reveal-left,
            .scroll-reveal-right,
            .scroll-reveal-scale,
            .scroll-stagger-item,
            .section-entrance
        `);

        revealElements.forEach(el => {
            this.revealObserver.observe(el);
        });
    }

    revealElement(element) {
        element.classList.add('revealed');
        
        // Special handling for stagger items
        if (element.classList.contains('scroll-stagger-item')) {
            const siblings = element.parentNode.querySelectorAll('.scroll-stagger-item');
            siblings.forEach((sibling, index) => {
                setTimeout(() => {
                    sibling.classList.add('revealed');
                }, index * 100);
            });
        }

        // Add glitch effect to headings (DISABLED)
        /*
        if (element.tagName === 'H1' || element.tagName === 'H2') {
            this.addGlitchEffect(element);
        }
        */
    }

    addGlitchEffect(element) {
        element.classList.add('glitch-text');
        element.setAttribute('data-text', element.textContent);
        
        // Remove glitch effect after animation
        setTimeout(() => {
            element.classList.remove('glitch-text');
        }, 2000);
    }

    // ===== PARALLAX EFFECTS =====
    initParallaxElements() {
        // Make hero section parallax
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.classList.add('parallax-container');
            
            // Create background layer
            const bgLayer = document.createElement('div');
            bgLayer.className = 'hero-bg-layer parallax-element';
            heroSection.insertBefore(bgLayer, heroSection.firstChild);
        }

        // Add parallax to other sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('parallax-container');
        });
    }

    updateParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        const scrollTop = window.pageYOffset;

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // ===== PARTICLE SYSTEM =====
    createParticleSystem() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        heroSection.appendChild(particlesContainer);

        // Create initial particles
        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }

        // Continuously spawn particles
        setInterval(() => {
            if (this.particles.length < 50) {
                this.createParticle(particlesContainer);
            }
        }, 200);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            this.particles = this.particles.filter(p => p !== particle);
        }, 15000);
    }

    // ===== SCROLL VELOCITY EFFECTS =====
    initScrollVelocity() {
        this.velocityElements = document.querySelectorAll('.velocity-blur');
    }

    updateScrollVelocity() {
        this.scrollVelocity = Math.abs(this.scrollY - this.lastScrollY);
        
        if (this.scrollVelocity > 5) {
            document.body.classList.add('scrolling-fast');
            this.velocityElements.forEach(el => {
                el.classList.add('scrolling-fast');
            });
        } else {
            document.body.classList.remove('scrolling-fast');
            this.velocityElements.forEach(el => {
                el.classList.remove('scrolling-fast');
            });
        }
        
        this.lastScrollY = this.scrollY;
    }

    // ===== MAGNETIC ELEMENTS =====
    initMagneticElements() {
        const magneticElements = document.querySelectorAll('.magnetic-element');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    // ===== TEXT WAVE ANIMATIONS (DISABLED) =====
    initTextWaveAnimations() {
        // Wave animations disabled for professional appearance
        return;
    }

    createWaveText(element) {
        // Wave text creation disabled
        return;
    }

    // ===== ANIMATED COUNTERS =====
    initCounters() {
        this.counters = [
            { element: null, target: 50, prefix: '', suffix: '+', label: 'Students Trained' },
            { element: null, target: 5, prefix: '', suffix: '+', label: 'Courses Offered' },
            { element: null, target: 4, prefix: '', suffix: '', label: 'Years Experience' },
            { element: null, target: 95, prefix: '', suffix: '%', label: 'Success Rate' }
        ];
        
        this.createCounterElements();
    }

    createCounterElements() {
        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;

        const countersContainer = document.createElement('div');
        countersContainer.className = 'counters-container';
        countersContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
            padding: 2rem;
            background: rgba(75, 172, 221, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        `;

        this.counters.forEach((counter, index) => {
            const counterDiv = document.createElement('div');
            counterDiv.className = 'counter-item scroll-reveal-scale';
            counterDiv.style.textAlign = 'center';
            
            const numberDiv = document.createElement('div');
            numberDiv.className = 'counter-number';
            numberDiv.textContent = '0';
            
            const labelDiv = document.createElement('div');
            labelDiv.className = 'counter-label';
            labelDiv.textContent = counter.label;
            
            counterDiv.appendChild(numberDiv);
            counterDiv.appendChild(labelDiv);
            countersContainer.appendChild(counterDiv);
            
            counter.element = numberDiv;
        });

        aboutSection.appendChild(countersContainer);
        this.revealObserver.observe(countersContainer);
    }

    animateCounters() {
        this.counters.forEach(counter => {
            if (counter.animated) return;
            
            counter.animated = true;
            const startValue = 0;
            const duration = 2000;
            const startTime = Date.now();
            
            const updateCounter = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = Math.floor(startValue + (counter.target - startValue) * this.easeOutQuart(progress));
                counter.element.textContent = counter.prefix + currentValue + counter.suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            requestAnimationFrame(updateCounter);
        });
    }

    easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    // ===== PAGE LOADER =====
    initPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner" id="progress-spinner"></div>
                <h3 class="loader-title">Welcome to Tripledots</h3>
                <p class="loader-subtitle">Technologies</p>
            </div>
        `;
        document.body.appendChild(loader);
        
        // Track actual loading progress
        this.trackLoadingProgress(loader);
    }

    trackLoadingProgress(loader) {
        let assetsLoaded = 0;
        let totalAssets = 0;
        
        // Count all images, scripts, and stylesheets
        const images = document.querySelectorAll('img');
        const scripts = document.querySelectorAll('script[src]');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        totalAssets = images.length + scripts.length + stylesheets.length;
        
        const updateProgress = () => {
            assetsLoaded++;
            const progress = Math.min((assetsLoaded / totalAssets) * 100, 100);
            this.updateSpinnerProgress(progress);
            
            if (assetsLoaded >= totalAssets) {
                // All assets loaded, wait for smooth completion
                setTimeout(() => {
                    loader.classList.add('hidden');
                    this.startEntranceAnimations();
                }, 300);
            }
        };

        // Track image loading
        images.forEach(img => {
            if (img.complete) {
                updateProgress();
            } else {
                img.addEventListener('load', updateProgress);
                img.addEventListener('error', updateProgress); // Count errors as loaded
            }
        });

        // Track script loading
        scripts.forEach(script => {
            script.addEventListener('load', updateProgress);
            script.addEventListener('error', updateProgress);
        });

        // Track stylesheet loading
        stylesheets.forEach(link => {
            link.addEventListener('load', updateProgress);
            link.addEventListener('error', updateProgress);
        });

        // Fallback - ensure loader disappears even if tracking fails
        setTimeout(() => {
            if (!loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
                this.startEntranceAnimations();
            }
        }, 4000);
    }

    updateSpinnerProgress(progress) {
        const spinner = document.querySelector('#progress-spinner::before');
        // Progress is handled by CSS animation duration sync
    }

    startEntranceAnimations() {
        const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('revealed');
            }, index * 100);
        });
    }

    // ===== SCROLL EVENT BINDING =====
    bindScrollEvents() {
        let ticking = false;

        const handleScroll = () => {
            this.scrollY = window.pageYOffset;
            
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollProgress();
                    this.updateParallax();
                    this.updateScrollVelocity();
                    
                    // Check if counters should animate
                    const countersContainer = document.querySelector('.counters-container');
                    if (countersContainer && this.isElementInViewport(countersContainer) && !this.countersAnimated) {
                        this.animateCounters();
                        this.countersAnimated = true;
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Handle scroll end
        window.addEventListener('scroll', () => {
            clearTimeout(this.scrollTimeout);
            this.isScrolling = true;
            
            this.scrollTimeout = setTimeout(() => {
                this.isScrolling = false;
                document.body.classList.remove('scrolling-fast');
            }, 150);
        });
    }

    // ===== UTILITY METHODS =====
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ===== SMOOTH SCROLL ENHANCEMENTS =====
    initSmoothScrollEnhancements() {
        // Add smooth scroll to navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement, 1000);
                }
            });
        });
    }

    smoothScrollTo(element, duration = 1000) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    // ===== CLEANUP =====
    destroy() {
        if (this.revealObserver) {
            this.revealObserver.disconnect();
        }
        
        // Remove event listeners and cleanup
        window.removeEventListener('scroll', this.handleScroll);
        
        // Remove created elements
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) scrollProgress.remove();
        
        const loader = document.querySelector('.page-loader');
        if (loader) loader.remove();
    }
}

// Initialize scroll effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.scrollEffects = new ScrollEffectsManager();
});

// Export for potential external use
window.ScrollEffectsManager = ScrollEffectsManager;

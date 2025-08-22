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
        
        // Initialize preloader immediately to prevent flash
        this.initPageLoader();
        
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
        // Preloader already initialized in constructor
        
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

        // Add floating animation to images (but not about images)
        const images = document.querySelectorAll('.testimonial-profile img');
        images.forEach(img => {
            img.classList.add('floating-element');
        });

        // Ensure about images have entrance reveal class but remove floating
        const aboutImages = document.querySelectorAll('.about-image-entrance');
        aboutImages.forEach(el => {
            if (!el.classList.contains('scroll-reveal')) el.classList.add('scroll-reveal');
            // Remove floating-element if it was added to avoid sway
            const img = el.querySelector('img');
            if (img) img.classList.remove('floating-element');
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
                <div class="loader-logo-container">
                    <div class="loader-logo-pulse"></div>
                    <img src="./assets/tripledots_logo.png" alt="Tripledots Logo" class="loader-logo" />
                </div>
                <div class="loader-text-container">
                    <h2 class="loader-title" id="loader-title">Initializing Innovation...</h2>
                    <div class="loader-taglines" id="loader-taglines">
                        <p class="loader-tagline active">Empowering the next generation of tech leaders</p>
                        <p class="loader-tagline">Where ambition meets opportunity</p>
                        <p class="loader-tagline">Building Nigeria's tech future, one student at a time</p>
                        <p class="loader-tagline">Transform your career. Transform your life.</p>
                    </div>
                    <div class="loader-progress-container">
                        <div class="loader-progress-bar">
                            <div class="loader-progress-fill" id="progress-fill"></div>
                        </div>
                        <div class="loader-percentage" id="loader-percentage">0%</div>
                    </div>
                </div>
                <div class="loader-floating-elements">
                    <div class="floating-code">{ }</div>
                    <div class="floating-code">&lt;/&gt;</div>
                    <div class="floating-code">AI</div>
                    <div class="floating-code">ML</div>
                    <div class="floating-code">{ }</div>
                    <div class="floating-code">Web</div>
                </div>
            </div>
        `;
        document.body.appendChild(loader);
        
        // Start engaging animations
        this.startLoaderAnimations();
        
        // Track actual loading progress
        this.trackLoadingProgress(loader);
    }

    startLoaderAnimations() {
        // Animate taglines
        const taglines = document.querySelectorAll('.loader-tagline');
        let currentTagline = 0;
        
        const rotateTaglines = () => {
            if (taglines.length === 0) return;
            
            taglines[currentTagline].classList.remove('active');
            currentTagline = (currentTagline + 1) % taglines.length;
            taglines[currentTagline].classList.add('active');
        };
        
        const taglineInterval = setInterval(rotateTaglines, 2000);
        
        // Animate title text
        const title = document.getElementById('loader-title');
        if (title) {
            const titles = [
                'Initializing Innovation...',
                'Loading Excellence...',
                'Preparing Your Future...',
                'Connecting Possibilities...'
            ];
            let titleIndex = 0;
            
            const rotateTitle = () => {
                title.style.opacity = '0';
                setTimeout(() => {
                    titleIndex = (titleIndex + 1) % titles.length;
                    title.textContent = titles[titleIndex];
                    title.style.opacity = '1';
                }, 300);
            };
            
            const titleInterval = setInterval(rotateTitle, 3000);
            
            // Store intervals for cleanup
            this.loaderIntervals = [taglineInterval, titleInterval];
        }
    }

    trackLoadingProgress(loader) {
        // Create a realistic and engaging progress experience that always reaches 100%
        let currentProgress = 0;
        let targetProgress = 0;
        
        // Define realistic loading phases with messages
        const loadingPhases = [
            { target: 15, duration: 400, label: 'Loading core assets...' },
            { target: 35, duration: 500, label: 'Initializing components...' },
            { target: 55, duration: 400, label: 'Loading testimonials...' },
            { target: 75, duration: 300, label: 'Preparing interface...' },
            { target: 90, duration: 250, label: 'Almost ready...' },
            { target: 100, duration: 200, label: 'Welcome! 🚀' }
        ];
        
        let currentPhase = 0;
        
        // Smooth progress animation with realistic increments
        const animateProgress = () => {
            if (currentProgress < targetProgress) {
                // Random increment for realistic feel
                const increment = Math.random() * 3 + 0.5;
                currentProgress = Math.min(currentProgress + increment, targetProgress);
                
                this.updateLoaderProgress(currentProgress);
                requestAnimationFrame(animateProgress);
            } else if (currentPhase < loadingPhases.length - 1) {
                // Move to next phase after delay
                setTimeout(() => {
                    currentPhase++;
                    if (currentPhase < loadingPhases.length) {
                        targetProgress = loadingPhases[currentPhase].target;
                        this.updateLoaderPhase(loadingPhases[currentPhase].label);
                        animateProgress();
                    }
                }, loadingPhases[currentPhase].duration);
            } else if (currentProgress >= 100) {
                // Ensure we actually hit 100% and then hide loader
                this.updateLoaderProgress(100);
                setTimeout(() => {
                    if (!loader.classList.contains('hidden')) {
                        loader.classList.add('hidden');
                        document.body.classList.add('loader-ready');
                        this.startEntranceAnimations();
                        
                        // Clean up intervals
                        if (this.loaderIntervals) {
                            this.loaderIntervals.forEach(interval => clearInterval(interval));
                        }
                    }
                }, 600);
            }
        };
        
        // Start loading sequence
        targetProgress = loadingPhases[0].target;
        this.updateLoaderPhase(loadingPhases[0].label);
        
        // Small initial delay for smoother experience
        setTimeout(() => {
            animateProgress();
        }, 300);
        
        // Also track real assets in background for faster loading on good connections
        this.trackRealAssets();
    }
    
    trackRealAssets() {
        // Track actual assets but don't block progress
        const images = Array.from(document.images).filter(img => 
            img.loading !== 'lazy' && 
            !img.complete && 
            img.src
        );
        
        let assetsLoaded = 0;
        const totalAssets = images.length;
        
        if (totalAssets === 0) return; // No assets to track
        
        images.forEach(img => {
            const checkLoaded = () => {
                assetsLoaded++;
                if (assetsLoaded >= totalAssets * 0.7) { // 70% of images loaded
                    // Speed up our fake progress slightly
                    const progressFill = document.getElementById('progress-fill');
                    if (progressFill && parseInt(progressFill.style.width) < 60) {
                        // Small boost if we're still early in loading
                        this.updateLoaderProgress(Math.min(parseInt(progressFill.style.width) + 10, 60));
                    }
                }
            };
            
            if (img.complete) {
                checkLoaded();
            } else {
                img.addEventListener('load', checkLoaded);
                img.addEventListener('error', checkLoaded); // Count errors too
            }
        });
    }

    updateLoaderProgress(progress) {
        const progressFill = document.getElementById('progress-fill');
        const percentageText = document.getElementById('loader-percentage');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (percentageText) {
            percentageText.textContent = `${Math.round(progress)}%`;
        }
        
        // Add excitement when we're close to completion
        if (progress >= 90) {
            const title = document.getElementById('loader-title');
            if (title && !title.classList.contains('almost-ready')) {
                title.classList.add('almost-ready');
                title.textContent = 'Almost Ready! 🚀';
            }
        }
    }

    updateLoaderPhase(message) {
        const title = document.getElementById('loader-title');
        if (title && !title.classList.contains('almost-ready')) {
            title.style.opacity = '0.7';
            setTimeout(() => {
                title.textContent = message;
                title.style.opacity = '1';
            }, 200);
        }
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
        
        // Clear loader intervals
        if (this.loaderIntervals) {
            this.loaderIntervals.forEach(interval => clearInterval(interval));
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

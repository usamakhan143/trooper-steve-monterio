// Advanced Animations and Interactive Effects

class AnimationEngine {
    constructor() {
        this.animations = new Map();
        this.timeline = [];
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupMouseEffects();
        this.setupPageTransitions();
        this.setupAdvancedAnimations();
    }

    // Intersection Observer for scroll-triggered animations
    setupIntersectionObserver() {
        const options = {
            threshold: [0.1, 0.3, 0.7],
            rootMargin: '-10% 0px -10% 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, options);

        // Observe elements with animation classes
        document.querySelectorAll('[data-animate]').forEach(el => {
            this.observer.observe(el);
        });
    }

    // Mouse-based effects
    setupMouseEffects() {
        document.addEventListener('mousemove', (e) => {
            this.handleMouseParallax(e);
            this.updateCustomCursor(e);
        });

        // Interactive hover effects for cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => this.cardHoverEnter(e.target));
            card.addEventListener('mouseleave', (e) => this.cardHoverLeave(e.target));
            card.addEventListener('mousemove', (e) => this.cardMouseMove(e));
        });
    }

    // Page transition effects - DISABLED
    setupPageTransitions() {
        // Page transitions disabled - no loader overlay
        // Links work normally without transition effects
    }

    // Advanced animation setups
    setupAdvancedAnimations() {
        this.createFloatingElements();
        this.setupTextAnimations();
        this.setupProgressBars();
        this.setupCounterAnimations();
    }

    // Trigger animations based on scroll position
    triggerAnimation(element, ratio) {
        const animationType = element.getAttribute('data-animate');

        switch(animationType) {
            case 'fadeInUp':
                this.fadeInUp(element, ratio);
                break;
            case 'slideInLeft':
                this.slideInLeft(element, ratio);
                break;
            case 'slideInRight':
                this.slideInRight(element, ratio);
                break;
            case 'scaleIn':
                this.scaleIn(element, ratio);
                break;
            case 'rotateIn':
                this.rotateIn(element, ratio);
                break;
            case 'stagger':
                this.staggerChildren(element, ratio);
                break;
            default:
                this.fadeInUp(element, ratio);
        }
    }

    // Animation functions
    fadeInUp(element, ratio) {
        const progress = Math.min(ratio * 2, 1);
        element.style.opacity = progress;
        element.style.transform = `translateY(${50 * (1 - progress)}px)`;
    }

    slideInLeft(element, ratio) {
        const progress = Math.min(ratio * 2, 1);
        element.style.opacity = progress;
        element.style.transform = `translateX(${-100 * (1 - progress)}px)`;
    }

    slideInRight(element, ratio) {
        const progress = Math.min(ratio * 2, 1);
        element.style.opacity = progress;
        element.style.transform = `translateX(${100 * (1 - progress)}px)`;
    }

    scaleIn(element, ratio) {
        const progress = Math.min(ratio * 2, 1);
        element.style.opacity = progress;
        element.style.transform = `scale(${0.5 + (0.5 * progress)})`;
    }

    rotateIn(element, ratio) {
        const progress = Math.min(ratio * 2, 1);
        element.style.opacity = progress;
        element.style.transform = `rotate(${-180 * (1 - progress)}deg) scale(${0.5 + (0.5 * progress)})`;
    }

    staggerChildren(element, ratio) {
        if (ratio > 0.3) {
            const children = Array.from(element.children);
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }

    // Mouse parallax effect
    handleMouseParallax(e) {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.5;
            const xPos = (x - 0.5) * speed * 100;
            const yPos = (y - 0.5) * speed * 100;
            el.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    }

    // Custom cursor
    updateCustomCursor(e) {
        let cursor = document.querySelector('.custom-cursor');
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            document.body.appendChild(cursor);
        }

        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }

    // Card hover effects
    cardHoverEnter(card) {
        card.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transform = 'translateY(-15px) scale(1.03)';
        card.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';

        // Add glow effect
        const icon = card.querySelector('.card-icon');
        if (icon) {
            icon.style.filter = 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.6))';
        }
    }

    cardHoverLeave(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';

        const icon = card.querySelector('.card-icon');
        if (icon) {
            icon.style.filter = 'none';
        }
    }

    cardMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `translateY(-15px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    // Page transitions - DISABLED
    transitionToPage(url) {
        // Direct navigation without overlay
        window.location.href = url;
    }

    // Floating elements
    createFloatingElements() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create additional floating safety icons
        const icons = ['🛡️', '🚨', '🦺', '⛑️', '🚑', '🚒', '👮‍♀️', '👨‍🚒', '⚕️', '🚔'];

        for (let i = 0; i < 10; i++) {
            const floatingIcon = document.createElement('div');
            floatingIcon.className = 'floating-safety-icon';
            floatingIcon.textContent = icons[Math.floor(Math.random() * icons.length)];
            floatingIcon.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 2 + 1}rem;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: complexFloat ${Math.random() * 10 + 10}s linear infinite;
                pointer-events: none;
                z-index: 1;
            `;
            hero.appendChild(floatingIcon);
        }
    }

    // Text animations
    setupTextAnimations() {
        const textElements = document.querySelectorAll('[data-text-animate]');

        textElements.forEach(element => {
            const text = element.textContent;
            const animationType = element.getAttribute('data-text-animate');

            if (animationType === 'typewriter') {
                this.typewriterEffect(element, text);
            } else if (animationType === 'wave') {
                this.waveTextEffect(element, text);
            } else if (animationType === 'bounce') {
                this.bounceTextEffect(element, text);
            }
        });
    }

    typewriterEffect(element, text) {
        element.textContent = '';
        element.style.borderRight = '2px solid #667eea';

        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(timer);
                element.style.borderRight = 'none';
            }
        }, 100);
    }

    waveTextEffect(element, text) {
        element.innerHTML = text.split('').map((char, index) =>
            `<span style="animation-delay: ${index * 0.1}s" class="wave-char">${char}</span>`
        ).join('');
    }

    bounceTextEffect(element, text) {
        element.innerHTML = text.split('').map((char, index) =>
            `<span style="animation-delay: ${index * 0.1}s" class="bounce-char">${char}</span>`
        ).join('');
    }

    // Progress bars
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');

        progressBars.forEach(bar => {
            const fill = bar.querySelector('.progress-fill');
            const target = parseInt(bar.getAttribute('data-progress') || '0');

            this.observer.observe(bar);
            bar.addEventListener('intersectionChange', () => {
                this.animateProgressBar(fill, target);
            });
        });
    }

    // Counter animations for statistics
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number[data-target]');

        counters.forEach(counter => {
            this.observer.observe(counter);

            const countUp = () => {
                const target = parseInt(counter.getAttribute('data-target'));
                const current = parseInt(counter.textContent) || 0;
                const increment = target / 100;

                if (current < target) {
                    counter.textContent = Math.ceil(current + increment);
                    setTimeout(countUp, 50);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            // Start animation when element is visible
            const handleIntersection = (entries) => {
                entries.forEach(entry => {
                    if (entry.target === counter && entry.isIntersecting) {
                        countUp();
                        this.observer.unobserve(counter);
                    }
                });
            };

            // Create a separate observer for this counter
            const counterObserver = new IntersectionObserver(handleIntersection, {
                threshold: 0.5
            });
            counterObserver.observe(counter);
        });
    }

    animateProgressBar(fill, target) {
        let current = 0;
        const timer = setInterval(() => {
            current += 2;
            fill.style.width = current + '%';
            if (current >= target) {
                clearInterval(timer);
            }
        }, 50);
    }

    // Particle systems
    createParticleSystem(container, config = {}) {
        const defaults = {
            count: 50,
            colors: ['#667eea', '#764ba2', '#ff6b35', '#f7931e'],
            shapes: ['circle', 'triangle', 'square'],
            speed: { min: 1, max: 3 },
            size: { min: 2, max: 6 }
        };

        const settings = { ...defaults, ...config };

        for (let i = 0; i < settings.count; i++) {
            this.createParticle(container, settings);
        }
    }

    createParticle(container, settings) {
        const particle = document.createElement('div');
        particle.className = 'animated-particle';

        const color = settings.colors[Math.floor(Math.random() * settings.colors.length)];
        const size = Math.random() * (settings.size.max - settings.size.min) + settings.size.min;
        const speed = Math.random() * (settings.speed.max - settings.speed.min) + settings.speed.min;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: particleRise ${10 / speed}s linear infinite;
            opacity: ${Math.random() * 0.8 + 0.2};
        `;

        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (10 / speed) * 1000);
    }

    // Cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.animations.clear();
    }
}

// Specialized animation classes for different safety categories
class SafetyAnimations {
    static gunSafety() {
        // Specific animations for gun safety page
        return {
            stopSign: () => {
                const signs = document.querySelectorAll('.stop-sign');
                signs.forEach(sign => {
                    sign.style.animation = 'pulse 1s ease-in-out infinite';
                });
            },

            runAway: () => {
                const figures = document.querySelectorAll('.running-figure');
                figures.forEach(figure => {
                    figure.style.animation = 'runAnimation 2s ease-in-out infinite';
                });
            }
        };
    }

    static swimmingSafety() {
        return {
            waves: () => {
                const waves = document.querySelectorAll('.wave');
                waves.forEach((wave, index) => {
                    wave.style.animationDelay = `${index * 0.3}s`;
                    wave.style.animation = 'waveMotion 3s ease-in-out infinite';
                });
            },

            lifeRing: () => {
                const rings = document.querySelectorAll('.life-ring');
                rings.forEach(ring => {
                    ring.style.animation = 'float 2s ease-in-out infinite';
                });
            }
        };
    }

    static cyberSafety() {
        return {
            dataStream: () => {
                const container = document.querySelector('.cyber-background');
                if (container) {
                    this.createDataStream(container);
                }
            },

            shieldProtection: () => {
                const shields = document.querySelectorAll('.cyber-shield');
                shields.forEach(shield => {
                    shield.style.animation = 'shieldGlow 2s ease-in-out infinite alternate';
                });
            }
        };
    }

    static createDataStream(container) {
        const characters = '01';
        for (let i = 0; i < 20; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            stream.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                color: #00ff00;
                font-family: monospace;
                font-size: 14px;
                animation: dataFall ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;

            let text = '';
            for (let j = 0; j < 20; j++) {
                text += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            stream.textContent = text;
            container.appendChild(stream);
        }
    }
}

// Initialize animation engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationEngine = new AnimationEngine();

    // Make it globally accessible for debugging
    window.animationEngine = animationEngine;
    window.SafetyAnimations = SafetyAnimations;
});

// Add CSS for complex animations
const complexAnimationStyles = `
@keyframes complexFloat {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
    }
    25% {
        transform: translateY(-20px) rotate(90deg);
    }
    50% {
        transform: translateY(-40px) rotate(180deg);
    }
    75% {
        transform: translateY(-20px) rotate(270deg);
    }
}

@keyframes particleRise {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-100vh);
        opacity: 0;
    }
}

@keyframes waveMotion {
    0%, 100% {
        transform: translateX(0) scaleY(1);
    }
    50% {
        transform: translateX(10px) scaleY(1.1);
    }
}

@keyframes runAnimation {
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(20px);
    }
}

@keyframes shieldGlow {
    0% {
        filter: drop-shadow(0 0 5px #3498db);
    }
    100% {
        filter: drop-shadow(0 0 20px #3498db);
    }
}

@keyframes dataFall {
    from {
        transform: translateY(-100px);
        opacity: 1;
    }
    to {
        transform: translateY(100vh);
        opacity: 0;
    }
}

.wave-char {
    display: inline-block;
    animation: charWave 2s ease-in-out infinite;
}

.bounce-char {
    display: inline-block;
    animation: charBounce 1s ease-in-out infinite;
}

@keyframes charWave {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes charBounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-15px);
    }
}



.custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(102, 126, 234, 0.5);
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: difference;
    z-index: 9999;
    transition: transform 0.1s ease;
}
`;

// Inject complex animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = complexAnimationStyles;
document.head.appendChild(styleSheet);

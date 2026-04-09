// ============================================
// Navigation Scroll Effect
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');

        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');

        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <div class="mobile-menu-content">
                    ${navLinks.innerHTML}
                    <div class="mobile-menu-actions">
                        ${navActions.innerHTML}
                    </div>
                </div>
            `;

            // Add mobile menu styles
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: fixed;
                    top: 72px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.98);
                    backdrop-filter: blur(10px);
                    z-index: 999;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                .mobile-menu.active {
                    opacity: 1;
                    visibility: visible;
                }
                .mobile-menu-content {
                    padding: 32px 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    list-style: none;
                }
                .mobile-menu-content li {
                    list-style: none;
                }
                .mobile-menu-content li a {
                    display: block;
                    font-size: 18px;
                    font-weight: 500;
                    color: #999999;
                    padding: 12px 0;
                    border-bottom: 1px solid #1a1a1a;
                }
                .mobile-menu-content li a:hover {
                    color: #00ff66;
                }
                .mobile-menu-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 16px;
                }
                .mobile-menu-actions .btn {
                    width: 100%;
                    justify-content: center;
                }
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -5px);
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(mobileMenu);
        }

        mobileMenu.classList.toggle('active');
    });
}

// ============================================
// Filter Tabs
// ============================================
const filterTabs = document.querySelectorAll('.filter-tab');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const selectedCategory = tab.textContent.trim().toLowerCase();
        const cards = document.querySelectorAll('.post-card');
        let visibleIndex = 0;

        cards.forEach((card) => {
            const categoryBadge = card.querySelector('.category-badge');
            const cardCategory = categoryBadge ? categoryBadge.textContent.trim().toLowerCase() : '';

            // Check if card matches the selected category
            const shouldShow = selectedCategory === 'all' || cardCategory === selectedCategory;

            if (shouldShow) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, visibleIndex * 100);
                visibleIndex++;
            } else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// Newsletter Form
// ============================================
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const email = emailInput.value;

        if (email) {
            // Simulate form submission
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success message
                newsletterForm.innerHTML = `
                    <div class="success-message" style="
                        background: rgba(16, 185, 129, 0.2);
                        border: 1px solid #10b981;
                        padding: 20px 32px;
                        border-radius: 12px;
                        color: #10b981;
                        font-weight: 600;
                        font-size: 16px;
                    ">
                        🎉 Thanks for subscribing! Check your inbox for confirmation.
                    </div>
                `;
            }, 1500);
        }
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// Scroll Reveal Animations
// ============================================
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Helper to assign a reveal class + optional delay, then observe
    function reveal(selector, cls = 'reveal', stagger = false) {
        document.querySelectorAll(selector).forEach((el, i) => {
            // Skip elements already inside the hero (they animate separately)
            if (el.closest('.hero, .page-header, .auth-section')) return;
            el.classList.add(cls);
            if (stagger) el.style.transitionDelay = `${i * 80}ms`;
            observer.observe(el);
        });
    }

    // ---- Shared across all pages ----
    reveal('.section-header');
    reveal('.newsletter-content');
    reveal('.footer-brand');
    reveal('.footer-links', 'reveal', true);

    // ---- Index ----
    reveal('.featured-post');
    reveal('.post-card', 'reveal', true);
    reveal('.stat', 'reveal-scale', true);

    // ---- Articles ----
    reveal('.article-card', 'reveal', true);
    reveal('.search-container');
    reveal('.filter-tabs');
    reveal('.pagination');

    // ---- Categories ----
    reveal('.category-card', 'reveal', true);

    // ---- About ----
    reveal('.about-intro', 'reveal-left');
    reveal('.about-image', 'reveal-right');
    reveal('.value-card', 'reveal', true);
    reveal('.team-card', 'reveal', true);
    reveal('.about-cta');
    reveal('.about-stat', 'reveal-scale', true);

    // ---- Contact ----
    reveal('.contact-info', 'reveal-left');
    reveal('.contact-form-wrapper', 'reveal-right');
    reveal('.contact-card', 'reveal', true);
    reveal('.faq-item', 'reveal', true);

    // ---- Subscribe / Pricing ----
    reveal('.pricing-card', 'reveal', true);
    reveal('.feature-item', 'reveal', true);
    reveal('.subscribe-hero');
    reveal('.testimonial-card', 'reveal', true);
}

document.addEventListener('DOMContentLoaded', initReveal);

// ============================================
// Button Ripple Effect
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// Lazy Load Images
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Articles Page Sidebar Toggle
// ============================================
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const articlesSidebar = document.getElementById('articles-sidebar');
const sidebarClose = document.getElementById('sidebar-close');

function openSidebar() {
    if (articlesSidebar && sidebarOverlay && sidebarToggle) {
        articlesSidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        sidebarToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSidebar() {
    if (articlesSidebar && sidebarOverlay && sidebarToggle) {
        articlesSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        sidebarToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        if (articlesSidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
}

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && articlesSidebar && articlesSidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// ============================================
// Articles Page Category Filtering
// ============================================
function filterArticlesByCategory(category) {
    const cards = document.querySelectorAll('.article-card');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const resultsCount = document.querySelector('.results-count span');
    let visibleCount = 0;

    // Update active state in sidebar
    categoryLinks.forEach(link => {
        const linkText = link.querySelector('span:first-child').textContent.trim().toLowerCase();
        if (linkText === category || (category === 'all' && linkText === 'all')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Filter cards
    cards.forEach((card) => {
        const categoryBadge = card.querySelector('.category-badge');
        const cardCategory = categoryBadge ? categoryBadge.textContent.trim().toLowerCase() : '';

        const shouldShow = category === 'all' || cardCategory === category;

        if (shouldShow) {
            visibleCount++;
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, visibleCount * 80);
        } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    // Update results count
    if (resultsCount) {
        setTimeout(() => {
            resultsCount.textContent = visibleCount;
        }, 350);
    }
}

// Check for category in URL on page load
function checkURLCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category && document.querySelector('.articles-grid')) {
        setTimeout(() => {
            filterArticlesByCategory(category.toLowerCase());
        }, 100);
    }
}

// Run on page load
checkURLCategory();

// Sidebar category links click handler
const categoryListLinks = document.querySelectorAll('.category-list a');
categoryListLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryText = link.querySelector('span:first-child').textContent.trim().toLowerCase();
        filterArticlesByCategory(categoryText);

        // Update URL without reloading
        const newUrl = categoryText === 'all'
            ? window.location.pathname
            : `${window.location.pathname}?category=${categoryText}`;
        window.history.pushState({}, '', newUrl);

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

// ============================================
// Articles Sort Dropdown
// ============================================
const sortSelect = document.getElementById('sort-select');

if (sortSelect) {
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const articlesGrid = document.querySelector('.articles-grid');
        const cards = Array.from(articlesGrid.querySelectorAll('.article-card'));

        // Parse date from card
        function getDateFromCard(card) {
            const dateText = card.querySelector('.article-meta .date').textContent.trim();
            return new Date(dateText);
        }

        // Sort cards based on selection
        cards.sort((a, b) => {
            const dateA = getDateFromCard(a);
            const dateB = getDateFromCard(b);

            if (sortValue === 'latest') {
                return dateB - dateA; // Newest first
            } else if (sortValue === 'oldest') {
                return dateA - dateB; // Oldest first
            } else if (sortValue === 'popular') {
                // Sort by read time as a proxy for popularity (longer = more popular)
                const readTimeA = parseInt(a.querySelector('.read-time').textContent) || 0;
                const readTimeB = parseInt(b.querySelector('.read-time').textContent) || 0;
                return readTimeB - readTimeA;
            }
            return 0;
        });

        // Animate out
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });

        // Reorder and animate in
        setTimeout(() => {
            cards.forEach((card, index) => {
                articlesGrid.appendChild(card);
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 300);
    });
}

// ============================================
// Contact Form
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            contactForm.innerHTML = `
                <div class="success-message" style="
                    background: rgba(0, 255, 102, 0.1);
                    border: 1px solid #00ff66;
                    padding: 40px;
                    border-radius: 12px;
                    text-align: center;
                ">
                    <div style="
                        width: 64px;
                        height: 64px;
                        background: rgba(0, 255, 102, 0.2);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 20px;
                    ">
                        <svg width="32" height="32" fill="none" stroke="#00ff66" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <h3 style="color: #ffffff; font-size: 24px; margin-bottom: 12px;">Message Sent!</h3>
                    <p style="color: #888888; font-size: 16px;">Thank you for reaching out. We'll get back to you within 24-48 hours.</p>
                </div>
            `;
        }, 1500);
    });
}

// ============================================
// Auth Page Tabs
// ============================================
const authTabs = document.querySelectorAll('.auth-tab');

if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            authTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });

            // Show target form
            const targetId = tab.dataset.target;
            const targetForm = document.getElementById(targetId);
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });
}

// ============================================
// Hero Typewriter Effect
// ============================================
function initTypewriter() {
    // Target the main heading on any page (Hero, Page Header, or Auth Header)
    const titleElement = document.querySelector('#hero-title, .page-header h1, .auth-header h1');
    if (!titleElement) return;

    // Parse the existing content to build segments dynamically
    const segments = [];
    const childNodes = Array.from(titleElement.childNodes);

    childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            // Handle text nodes
            if (node.textContent.length > 0) {
                segments.push({ text: node.textContent, type: 'text' });
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Handle elements (like spans with gradient-text)
            segments.push({
                text: node.textContent,
                type: 'span',
                className: node.className
            });
        }
    });

    titleElement.innerHTML = ''; // Clear existing content
    titleElement.classList.add('typing-cursor'); // Add cursor

    let segmentIndex = 0;
    let charIndex = 0;
    let currentElement = null;

    function typeChar() {
        if (segmentIndex >= segments.length) {
            // Animation complete
            return;
        }

        const segment = segments[segmentIndex];

        // Create element for new segment
        if (charIndex === 0) {
            if (segment.type === 'span') {
                currentElement = document.createElement('span');
                currentElement.className = segment.className;
                titleElement.appendChild(currentElement);
            } else {
                currentElement = document.createTextNode('');
                titleElement.appendChild(currentElement);
            }
        }

        // Append character
        const char = segment.text.charAt(charIndex);
        if (segment.type === 'span') {
            currentElement.textContent += char;
        } else {
            currentElement.nodeValue += char;
        }

        charIndex++;

        // Schedule next character
        if (charIndex < segment.text.length) {
            setTimeout(typeChar, 50); // Typing speed (ms)
        } else {
            segmentIndex++;
            charIndex = 0;
            setTimeout(typeChar, 50);
        }
    }

    // Start typing after a short delay
    setTimeout(typeChar, 500);
}

// Initialize typewriter when DOM is loaded
document.addEventListener('DOMContentLoaded', initTypewriter);

// ============================================
// STAT COUNTER ANIMATION
// ============================================
function animateCounters(selector = '.stat-number') {
    const statNumbers = document.querySelectorAll(selector);
    if (!statNumbers.length) return;

    statNumbers.forEach(el => {
        const raw = el.textContent.trim();
        // Parse suffix (K, M, +, K+, M+, etc.) and numeric value
        const match = raw.match(/^([\d.]+)(K|M)?(\+)?$/i);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = (match[2] || '') + (match[3] || '');
        const duration = 1800;
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            // Show one decimal if target has one, otherwise integer
            const display = target % 1 !== 0 ? current.toFixed(1) : Math.floor(current);
            el.textContent = display + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        }

        el.textContent = '0' + suffix;
        requestAnimationFrame(tick);
    });
}

// Trigger counter when hero stats come into view
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateCounters('.stat-number');
            observer.disconnect();
        }
    }, { threshold: 0.3 });
    observer.observe(heroStats);
}

// Trigger counter when about page stats come into view
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateCounters('.about-stat-number');
            observer.disconnect();
        }
    }, { threshold: 0.3 });
    observer.observe(aboutStats);
}

console.log('🚀 BoldBlog loaded successfully!');

/* =====================================================
   JUNEBERRY TEA LOUNGE — JAVASCRIPT
   Smooth interactions, status indicator, menu filter
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ===== OPEN/CLOSED STATUS INDICATOR =====
    // CUSTOMIZATION POINT: Adjust open hours below
    // Hours format: { open: HourInteger, close: HourInteger } using 24-hour time
    const businessHours = {
        0: { open: 10, close: 18 },  // Sunday
        1: { open: 8,  close: 19 },  // Monday
        2: { open: 8,  close: 19 },  // Tuesday
        3: { open: 8,  close: 19 },  // Wednesday
        4: { open: 8,  close: 19 },  // Thursday
        5: { open: 8,  close: 19 },  // Friday
        6: { open: 10, close: 18 },  // Saturday
    };

    function updateOpenStatus() {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const today = businessHours[day];

        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');

        if (!statusDot || !statusText) return;

        if (today && hour >= today.open && hour < today.close) {
            statusDot.classList.remove('closed');
            statusText.textContent = 'Open Now';
        } else {
            statusDot.classList.add('closed');
            statusText.textContent = 'Closed';
        }
    }

    updateOpenStatus();
    setInterval(updateOpenStatus, 60000); // Re-check every minute

    // ===== SMOOTH SCROLL NAVIGATION =====
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 12px rgba(15, 40, 23, 0.06)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // ===== INTERSECTION OBSERVER — FADE-IN ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.drink-card, .pillar, .info-block, .featured-card, .order-method-card, .stat'
    );

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // ===== CATEGORY FILTER (visual mockup) =====
    const categoryTabs = document.querySelectorAll('.category-tab');
    const drinkCards = document.querySelectorAll('.drink-card');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.textContent.trim().toLowerCase();

            drinkCards.forEach(card => {
                const cardCategory = (card.dataset.category || '').toLowerCase();
                if (category === 'all' ||
                    category.includes(cardCategory.split('-')[0]) ||
                    cardCategory.includes(category.split(' ')[0])) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== ORDER PAGE: CUSTOMIZER PILL TOGGLES =====
    const optionGroups = document.querySelectorAll('.option-group');

    optionGroups.forEach(group => {
        const pills = group.querySelectorAll('.option-pill');
        pills.forEach(pill => {
            pill.addEventListener('click', function() {
                pills.forEach(p => p.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });

    // ===== AUTO-UPDATE FOOTER YEAR =====
    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    console.log('Juneberry Tea Lounge — loaded.');
});

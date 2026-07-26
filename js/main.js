/* ============================================
   Mubarak Kasim Portfolio — Main JS
   ============================================ */

// ─── Mobile Navigation Toggle ───────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navLinks) navLinks.classList.toggle('show-mobile');
        hamburger.classList.toggle('active');
    });
}

// ─── Theme (light/dark) toggle with persistence ────
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
}

// Initialize theme
(function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return setTheme(saved);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
})();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme') || 'light';
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ─── Smooth Scrolling for Navigation Links ──────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.classList.remove('show-mobile');
                    if (hamburger) hamburger.classList.remove('active');
                }
            }
        }
    });
});

// ─── Active Nav Link on Scroll ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === '#' + id) {
                    a.classList.add('active');
                }
            });
        }
    });
}

// ─── Navbar Scroll Effect ───────────────────────────
const navbar = document.getElementById('main-nav');

function onScroll() {
    updateActiveNav();
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Contact Form Handling ──────────────────────────
const contactForm = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.message) {
            if (statusEl) statusEl.textContent = 'Please complete all fields.';
            return;
        }

        const endpoint = this.action;

        try {
            if (endpoint) {
                if (statusEl) statusEl.textContent = 'Sending...';
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    if (statusEl) statusEl.textContent = 'Message sent — thank you! 🎉';
                    this.reset();
                } else {
                    let errMsg = 'Failed to send message.';
                    try { const json = await res.json(); if (json && json.error) errMsg = json.error; } catch (_) { }
                    if (statusEl) statusEl.textContent = errMsg;
                }
            } else {
                const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
                const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
                window.location.href = `mailto:khankingmubcy@gmail.com?subject=${subject}&body=${body}`;
                if (statusEl) statusEl.textContent = 'Opening your mail client...';
            }
        } catch (err) {
            console.error('Contact form error', err);
            if (statusEl) statusEl.textContent = 'An error occurred sending the message.';
        }
    });
}

// ─── Hero Role Rotator ──────────────────────────────
const roles = [
    'Mobile App Developer',
    'Senior Software Engineer',
    'React Native Expert',
    'SaaS Platform Architect',
    'Full-Stack Developer'
];

const roleRotator = document.getElementById('role-rotator');
if (roleRotator) {
    let roleIndex = 0;
    setInterval(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleRotator.style.opacity = '0';
        roleRotator.style.transform = 'translateY(8px)';
        setTimeout(() => {
            roleRotator.textContent = roles[roleIndex];
            roleRotator.style.opacity = '1';
            roleRotator.style.transform = 'translateY(0)';
        }, 300);
    }, 3000);
    roleRotator.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// ─── Stat Counter Animation ─────────────────────────
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        if (counter.dataset.animated) return;
        const target = parseInt(counter.dataset.count, 10);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            counter.textContent = Math.round(target * eased);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
                counter.dataset.animated = 'true';
            }
        }
        requestAnimationFrame(update);
    });
}

// Use IntersectionObserver for counters
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// ─── Scroll-Reveal Animation ────────────────────────
const fadeElements = document.querySelectorAll(
    '.service-card, .project-card, .tech-card, .edu-card, .timeline-item, .about-paragraph, .about-photo-wrapper'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => fadeObserver.observe(el));

// ─── Hero Subtle Ambient Grid Canvas ───────────────────────────
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animFrameId;
    let offset = 0;

    function resizeCanvas() {
        const hero = canvas.parentElement;
        if (!hero) return;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.035)' : 'rgba(15, 23, 42, 0.04)';
        ctx.lineWidth = 1;

        const gridSize = 50;
        offset = (offset + 0.1) % gridSize;

        for (let x = offset; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = offset; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        animFrameId = requestAnimationFrame(drawGrid);
    }

    resizeCanvas();
    drawGrid();

    window.addEventListener('resize', resizeCanvas);
}

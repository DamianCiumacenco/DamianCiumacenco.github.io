// ─── JS LOADED — enables scroll animations ───────────────────────
document.body.classList.add('js-loaded');

// ─── SCROLL REVEAL ────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// ─── NAV ACTIVE STATE ─────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// ─── CURSOR GROW ON HOVER ─────────────────────────────────────────
const dot  = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

document.querySelectorAll('a, button, .project-card, .stat-block').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.width  = '20px';
    dot.style.height = '20px';
    dot.style.background = 'rgba(192,23,42,0.5)';
    ring.style.width  = '50px';
    ring.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.width  = '10px';
    dot.style.height = '10px';
    dot.style.background = '#c0172a';
    ring.style.width  = '34px';
    ring.style.height = '34px';
  });
});

// ─── PARALLAX HERO IMAGE ──────────────────────────────────────────
const heroImg = document.querySelector('.hero-image-wrap img');
window.addEventListener('scroll', () => {
  if (heroImg) {
    const scrollY = window.scrollY;
    heroImg.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
});

// ─── STAGGERED PROJECT CARDS ──────────────────────────────────────
const cards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background 0.3s, box-shadow 0.3s';
  cardObserver.observe(card);
});

// ─── STAT NUMBER COUNT UP ─────────────────────────────────────────
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('count-done');
      entry.target.style.transition = 'transform 0.4s ease';
      entry.target.style.transform = 'scale(1.1)';
      setTimeout(() => entry.target.style.transform = 'scale(1)', 400);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(s => statObserver.observe(s));

// ─── SMOOTH NAV HIDE ON SCROLL DOWN ──────────────────────────────
let lastScroll = 0;
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 100) {
    nav.style.transform = 'translateY(-100%)';
    nav.style.transition = 'transform 0.3s ease';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = current;
});

// ─── CONTACT EMAIL COPY ON CLICK ─────────────────────────────────
const emailEl = document.querySelector('.contact-email');
if (emailEl) {
  emailEl.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailEl.textContent).then(() => {
      const orig = emailEl.textContent;
      emailEl.textContent = 'Copied! ✓';
      emailEl.style.color = 'var(--crimson)';
      setTimeout(() => {
        emailEl.textContent = orig;
        emailEl.style.color = '';
      }, 2000);
    });
  });
}

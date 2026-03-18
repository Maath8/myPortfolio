/* =====================================================
   SCRIPT.JS — Muaz Nakkaş Portfolio
   ===================================================== */

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === HERO PARTICLES ===
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 6 + 2;
    const x    = Math.random() * 100;
    const dur  = Math.random() * 15 + 8;
    const delay = Math.random() * 10;
    const colors = ['#7c3aed', '#4f46e5', '#06b6d4', '#a78bfa'];

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      bottom: -10px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
    `;
    container.appendChild(p);
  }
}
createParticles();

// === INTERSECTION OBSERVER — Fade In ===
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply initial hidden state & observe
const fadeTargets = document.querySelectorAll(
  '.about-text, .about-photo-wrap, .project-card, .skill-item, .contact-card, .stat-card'
);
fadeTargets.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.7s ease ${i * 0.07}s, transform 0.7s ease ${i * 0.07}s`;
  fadeObserver.observe(el);
});

// === SKILL BARS ===
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(grid => {
  skillObserver.observe(grid);
});

// === SMOOTH ACTIVE NAV ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sectionObserver.observe(sec));



// === COUNTER ANIMATION ===
function animateCounter(el, target) {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * parseInt(target));
    el.textContent = value + '+';
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(num => {
        animateCounter(num, num.textContent);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

// === TYPING EFFECT for subtitle ===
const subtitle = document.getElementById('hero-subtitle');
if (subtitle) {
  const words = ['I am a Computer Engineer', 'I am a Game Developer', 'I am an IoT Enthusiast', 'I am a Web Developer'];
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function typeEffect() {
    const current = words[wordIdx];

    if (!deleting) {
      subtitle.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        setTimeout(() => { deleting = true; typeEffect(); }, 2000);
        return;
      }
    } else {
      subtitle.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(typeEffect, deleting ? 60 : 100);
  }

  // Start typing after hero animation
  setTimeout(typeEffect, 1500);
}

console.log('%c Muaz Nakkaş — Portfolio 🚀', 'color: #7c3aed; font-size: 16px; font-weight: bold;');

'use strict';

/* ── WhatsApp handler ─────────────────────────── */
const WA_NUMBER = '523344476121';
const WA_MESSAGES = {
  general: 'Hola Nova Vision, me gustaría obtener más información sobre sus servicios.',
  video:   'Hola Nova Vision, me interesa el plan de Video Production ($700). ¿Podemos hablar?',
  web:     'Hola Nova Vision, me interesa el plan de Web Design ($1,600). ¿Podemos hablar?',
  completo:'Hola Nova Vision, me interesa el Plan Completo ($2,700). ¿Podemos hablar?',
};
function openWhatsApp(plan) {
  const msg = encodeURIComponent(WA_MESSAGES[plan] || WA_MESSAGES.general);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
}

/* ── Navbar scroll ────────────────────────────── */
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 60);
  lastScroll = y;
}, { passive: true });

/* ── Hamburger ────────────────────────────────── */
const hamburger = document.getElementById('hamburger-btn');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ── Active nav link on scroll ────────────────── */
const sections = document.querySelectorAll('section[id], footer[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

/* ── Reveal on scroll ─────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.reveal-up, .reveal-depth, .reveal-text, .service-card, .price-card'
).forEach(el => revealObserver.observe(el));

/* ── Philosophy laser-type effect ─────────────── */
const PHILOSOPHY_TEXT =
  '"No solo creamos contenido.\nDiseñamos legados digitales\ncon precisión quirúrgica."';
const philQuote = document.getElementById('phil-quote');
const philLabel = document.getElementById('phil-label');
const philLine  = document.getElementById('phil-line');
let laserStarted = false;

function laserType(text, el, speed = 38) {
  el.innerHTML = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(cursor);

  const tick = () => {
    if (i >= text.length) {
      // keep cursor blinking 2s then remove
      setTimeout(() => cursor.remove(), 2000);
      philLine.classList.add('expanded');
      return;
    }
    const ch = text[i];
    if (ch === '\n') {
      cursor.insertAdjacentHTML('beforebegin', '<br>');
    } else {
      const span = document.createElement('span');
      span.textContent = ch;
      span.className = 'char';
      cursor.insertAdjacentElement('beforebegin', span);
    }
    i++;
    setTimeout(tick, speed);
  };
  tick();
}

const philObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !laserStarted) {
      laserStarted = true;
      philLabel.classList.add('visible');
      setTimeout(() => laserType(PHILOSOPHY_TEXT, philQuote), 600);
      philObserver.disconnect();
    }
  });
}, { threshold: 0.4 });
philObserver.observe(document.getElementById('philosophy'));

/* ── Circuit dots ─────────────────────────────── */
// Subtle animated particles in philosophy background
const circuitDots = document.getElementById('circuit-dots');
if (circuitDots) {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;
      width:2px;height:2px;border-radius:50%;
      background:rgba(0,170,255,.6);
      left:${Math.random()*100}%;top:${Math.random()*100}%;
      animation:waPulse ${2+Math.random()*3}s ease-out infinite;
      animation-delay:${Math.random()*3}s;
    `;
    circuitDots.appendChild(p);
  }
}

/* ── Parallax hero logo on mouse move ─────────── */
const heroSection = document.getElementById('hero');
const heroLogo    = document.getElementById('hero-logo');
heroSection && heroSection.addEventListener('mousemove', e => {
  const rx = (e.clientX / window.innerWidth  - 0.5) * 14;
  const ry = (e.clientY / window.innerHeight - 0.5) * 14;
  heroLogo.style.transform = `rotateY(${rx}deg) rotateX(${-ry}deg) translateY(0px)`;
});
heroSection && heroSection.addEventListener('mouseleave', () => {
  heroLogo.style.transform = '';
});

/* ── Inject polish.css ────────────────────────── */
const polishLink = document.createElement('link');
polishLink.rel = 'stylesheet';
polishLink.href = 'polish.css';
document.head.appendChild(polishLink);

/* ========================
   script.js — Landing Page Arthur Firmino Martins
======================== */

(function () {
  'use strict';

  // ── THEME TOGGLE ──────────────────────────────────────
  const html        = document.documentElement;
  const themeBtn    = document.getElementById('themeToggle');
  const STORAGE_KEY = 'afm-theme';

  function getPreferred() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  applyTheme(getPreferred());

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ── NAV SCROLL SHADOW ─────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── MOBILE MENU ───────────────────────────────────────
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // close on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ── REVEAL ON SCROLL ──────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // stagger siblings inside skill-grid, projects-list, etc.
        const siblings = entry.target.parentElement
          ? [...entry.target.parentElement.querySelectorAll('.reveal')]
          : [];
        siblings.forEach((el, i) => {
          if (!el.classList.contains('visible')) {
            setTimeout(() => el.classList.add('visible'), i * 90);
          }
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // ── SKILL BAR ANIMATION ───────────────────────────────
  const skillFills = document.querySelectorAll('.skill-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const width = el.getAttribute('data-width') || '80';
        // Delay so bars animate after card appears
        setTimeout(() => { el.style.width = width + '%'; }, 300);
        barObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(el => barObserver.observe(el));

  // ── PROJECT HOVER ─────────────────────────────────────
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.paddingLeft = '12px';
    });
    item.addEventListener('mouseleave', () => {
      item.style.paddingLeft = '';
    });
  });

  // ── SMOOTH ANCHOR SCROLL ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── ACTIVE NAV LINK ───────────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => activeObserver.observe(s));

  // ── PARALLAX ORB (light effect) ───────────────────────
  const orbs = document.querySelectorAll('.hero-orb');
  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orbs[0] && (orbs[0].style.transform = `translate(${dx * 20}px, ${dy * 15}px)`);
    orbs[1] && (orbs[1].style.transform = `translate(${-dx * 15}px, ${-dy * 10}px)`);
  }, { passive: true });

  // ── CARD TILT ────────────────────────────────────────
  const tiltCard = document.querySelector('.card-inner');
  if (tiltCard) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
      tiltCard.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
    });
    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = '';
    });
  }

})();
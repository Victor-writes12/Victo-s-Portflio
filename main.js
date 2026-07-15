// VICTOR UKPATA — PORTFOLIO
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  // === FOOTER YEAR ===
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // === NAVBAR SCROLL STATE ===
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // === MOBILE NAV TOGGLE ===
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = navToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });

  // === HERO ENTRANCE ANIMATION ===
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 150 + i * 130);
  });

  // === SCROLL-TRIGGERED REVEAL (rest of page) ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => observer.observe(el));

  // === 3D TILT CARD (hero) — cursor-reactive ===
  const tiltCard = document.getElementById('tiltCard');
  const cursorGlow = document.getElementById('cursorGlow');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (tiltCard && !prefersReducedMotion) {
    const maxTilt = 12;

    const handleTilt = (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - y) * maxTilt * 2;
      tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const resetTilt = () => {
      tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    // Desktop: track mouse across whole hero for a smooth, ambient tilt
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / window.innerWidth;
      const dy = (e.clientY - centerY) / window.innerHeight;
      tiltCard.style.transform = `rotateX(${dy * -18}deg) rotateY(${dx * 18}deg)`;
    });
    hero.addEventListener('mouseleave', resetTilt);
  }

  // === AMBIENT CURSOR GLOW ===
  if (cursorGlow && !prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // === ANIMATED STAT COUNTERS ===
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // === CARD TILT ON HOVER (projects / certs / about cards) ===
  const hoverTiltCards = document.querySelectorAll('.card-tilt');
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    hoverTiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

 // === CONTACT ===
  const EMAILJS_PUBLIC_KEY = 'fQ5LBRGPE0QwRAei2';
  const EMAILJS_SERVICE_ID = 'service_itkncva';
  const EMAILJS_NOTIFY_TEMPLATE = 'template_sdpczz8';
  const EMAILJS_AUTOREPLY_TEMPLATE = 'template_0i9jc1k';

  if (window.emailjs) emailjs.init(EMAILJS_PUBLIC_KEY);

  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const submitBtn = form.querySelector('button[type="submit"]');
      const params = {
        from_name: name,
        from_email: email,
        to_name: name,
        to_email: email,
        email: email,
        reply_to: email,
        message: message
      };

      submitBtn.disabled = true;
      formNote.textContent = 'Sending your message…';

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_NOTIFY_TEMPLATE, params)
        .then(() => emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_TEMPLATE, params))
        .then(() => {
          formNote.textContent = 'Message sent! Check your email for confirmation.';
          form.reset();
        })
        .catch((err) => {
          console.error('EmailJS error:', err && err.text ? err.text : err);
          formNote.textContent = 'Something went wrong. Please email supportdoc11@gmail.com directly.';
        })
        .finally(() => { submitBtn.disabled = false; });
    });
  }
// === SMOOTH-SCROLL OFFSET FOR FIXED NAV ===
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 84;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
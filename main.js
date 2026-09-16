// VICTOR UKPATA — PORTFOLIO
// =====================================================
// === PRELOADER ===
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 400);
  });
document.addEventListener('DOMContentLoaded', () => {

  // === FOOTER YEAR ===
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // === THEME TOGGLE (light green/white default, dark mode optional) ===
  const themeToggle = document.getElementById('themeToggle');
  const rootEl = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  if (savedTheme === 'dark') rootEl.setAttribute('data-theme', 'dark');

  const syncToggleIcon = () => {
    const icon = themeToggle.querySelector('i');
    const isDark = rootEl.getAttribute('data-theme') === 'dark';
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
  };
  syncToggleIcon();

  themeToggle.addEventListener('click', () => {
    const isDark = rootEl.getAttribute('data-theme') === 'dark';
    if (isDark) {
      rootEl.removeAttribute('data-theme');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      rootEl.setAttribute('data-theme', 'dark');
      localStorage.setItem('portfolio-theme', 'dark');
    }
    syncToggleIcon();
  });

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

  // === 3D SCROLL — perspective tilt driven by scroll position ===
  if (!prefersReducedMotion) {
    const tiltScrollEls = document.querySelectorAll('.section-inner, .work-card, .project-card, .cert-card');
    let scrollTicking = false;

    function update3DScroll() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      tiltScrollEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return; // skip far off-screen elements
        const center = r.top + r.height / 2;
        const progress = (center - vh / 2) / vh;
        const clamped = Math.max(-1, Math.min(1, progress));
        el.style.setProperty('--scroll-rx', (clamped * -5).toFixed(2) + 'deg');
        el.style.setProperty('--scroll-tz', (Math.abs(clamped) * -30).toFixed(1) + 'px');
      });
      scrollTicking = false;
    }
    window.addEventListener('scroll', () => {
      if (!scrollTicking) { requestAnimationFrame(update3DScroll); scrollTicking = true; }
    }, { passive: true });
    window.addEventListener('resize', update3DScroll);
    update3DScroll();
  }

  // === HOMEPAGE PREVIEW VIDEOS — play only while visible, fall back to poster if no clip yet ===
  const previewVideos = document.querySelectorAll('.work-video, .project-video');
  if (previewVideos.length) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          const p = vid.play();
          if (p && p.catch) p.catch(() => { /* no clip yet — poster stays visible */ });
        } else {
          vid.pause();
        }
      });
    }, { threshold: 0.35 });

    previewVideos.forEach((vid) => {
      vid.addEventListener('error', () => vid.classList.add('is-missing'), true);
      videoObserver.observe(vid);
    });
  }

  // === PROJECTS PAGE — click a preview to play/pause + unmute ===
  document.querySelectorAll('.project-media').forEach((media) => {
    const vid = media.querySelector('video');
    if (!vid) return;
    const toggle = () => {
      if (vid.paused) {
        vid.muted = false;
        vid.play().catch(() => {});
        media.classList.add('is-playing');
      } else {
        vid.pause();
        media.classList.remove('is-playing');
      }
    };
    media.addEventListener('click', (e) => { e.preventDefault(); toggle(); });
    media.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    vid.addEventListener('ended', () => media.classList.remove('is-playing'));
  });

});
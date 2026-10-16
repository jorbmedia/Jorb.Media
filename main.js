/**
 * JORB.MEDIA - Advanced Interactive Engine (Apple Minimalist Standard)
 * Includes: 
 *  1. Custom Kinetic Magnetic Cursor with Contextual States (Play/View/Hover)
 *  2. 3D Card Tilt Physics & Cursor Spotlight Glare
 *  3. Interactive Velocity Curve Playground (Live After Effects Curve Tester)
 *  4. Scroll Reveal & Animated Number Counters
 *  5. Web Audio API Subtle Apple UI Haptics (Sound Synthesizer)
 *  6. Responsive Video Lightbox
 *  7. Dynamic Segmented Filter Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initCardSpotlightAndTilt();
  initVelocityPlayground();
  initAnimatedCounters();
  initScrollReveals();
  initAudioHaptics();
  initNavbar();
  initLightbox();
  initPortfolioFilters();
});

/* --------------------------------------------------------------------------
   1. CUSTOM KINETIC MAGNETIC CURSOR (With "PLAY" / "VIEW" / Magnetic Hover)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  // Only enable on desktop pointer devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.id = 'apple-cursor';
  cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-follower"><span class="cursor-label"></span></div>';
  document.body.appendChild(cursor);

  const dot = cursor.querySelector('.cursor-dot');
  const follower = cursor.querySelector('.cursor-follower');
  const label = cursor.querySelector('.cursor-label');

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Contextual Hover States
  // A. Video Cards & Spotlight -> Expand to "PLAY"
  document.querySelectorAll('.vault-card, .spotlight-video-wrap, .spotlight-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-play');
      label.textContent = 'PLAY';
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-play');
      label.textContent = '';
    });
  });

  // B. Buttons & Links -> Magnetic Snap & Expand
  document.querySelectorAll('a, button, .filter-tab, .btn-primary, .btn-secondary').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });

  // Hide cursor on mouse leave window
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('cursor-hidden');
  });
  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('cursor-hidden');
  });
}

/* --------------------------------------------------------------------------
   2. 3D CARD TILT & CURSOR SPOTLIGHT GLARE (Apple Card Physics)
   -------------------------------------------------------------------------- */
function initCardSpotlightAndTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('.vault-card, .bento-card, .spotlight-card, .stat-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set CSS variables for cursor spotlight glare
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Calculate 3D tilt angles (subtle & elegant)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   3. INTERACTIVE VELOCITY GRAPH PLAYGROUND (Motion Design Core Skill)
   -------------------------------------------------------------------------- */
function initVelocityPlayground() {
  const playground = document.getElementById('velocity-playground');
  if (!playground) return;

  const ball = playground.querySelector('.velocity-ball');
  const curvePath = playground.querySelector('.velocity-graph-path');
  const buttons = playground.querySelectorAll('.curve-btn');
  const curveFormula = playground.querySelector('.curve-formula');

  // Defined Easing Curves & SVG Bezier Path Visualizations
  const curves = {
    linear: {
      css: 'linear',
      path: 'M 10 90 L 190 10',
      formula: 'cubic-bezier(0, 0, 1, 1)',
      desc: 'Linear: Rigid, mechanical, zero dopamine.'
    },
    ease: {
      css: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      path: 'M 10 90 C 70 70, 80 10, 190 10',
      formula: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      desc: 'Standard Ease: Gentle acceleration & deceleration.'
    },
    jorb: {
      css: 'cubic-bezier(0.16, 1, 0.3, 1)',
      path: 'M 10 90 C 30 10, 50 10, 190 10',
      formula: 'cubic-bezier(0.16, 1, 0.3, 1) — JORB RETENTION CURVE',
      desc: 'Jorb Surgical Curve: Instant explosive acceleration with seamless cinematic deceleration.'
    }
  };

  let currentMode = 'jorb';

  function applyCurve(mode) {
    currentMode = mode;
    const config = curves[mode];
    if (!config) return;

    buttons.forEach(b => b.classList.toggle('is-active', b.getAttribute('data-curve') === mode));
    
    if (ball) {
      ball.style.animationTimingFunction = config.css;
    }
    if (curvePath) {
      curvePath.setAttribute('d', config.path);
    }
    if (curveFormula) {
      curveFormula.innerHTML = `<code>${config.formula}</code><span class="formula-desc">${config.desc}</span>`;
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      applyCurve(btn.getAttribute('data-curve'));
    });
  });

  // Default initialize with Jorb's retention curve
  applyCurve('jorb');
}

/* --------------------------------------------------------------------------
   4. ANIMATED NUMBER COUNTERS (Counts Up on Scroll)
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const statCards = document.querySelectorAll('.stat-card');
  if (!statCards.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const valEl = card.querySelector('.stat-num');
      if (!valEl) return;

      const target = parseInt(valEl.getAttribute('data-target') || '0', 10);
      const suffix = valEl.getAttribute('data-suffix') || '';
      const prefix = valEl.getAttribute('data-prefix') || '';
      const duration = 1600;
      const startTime = performance.now();

      function updateNumber(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Exponential ease out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * easeProgress);

        valEl.textContent = `${prefix}${current}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          valEl.textContent = `${prefix}${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateNumber);
      obs.unobserve(card);
    });
  }, { threshold: 0.3 });

  statCards.forEach(card => observer.observe(card));
}

/* --------------------------------------------------------------------------
   5. SCROLL REVEALS (Intersection Observer Fade & Glide)
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.vault-card, .bento-card, .spotlight-card, .section-header');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   6. WEB AUDIO API HAPTICS (Apple-style Synthesized UI Clicks)
   -------------------------------------------------------------------------- */
function initAudioHaptics() {
  let audioCtx = null;
  let isSoundEnabled = false;

  const soundBtn = document.getElementById('sound-toggle-btn');

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playPop(freq = 880, duration = 0.04) {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      initAudio();
      isSoundEnabled = !isSoundEnabled;
      soundBtn.classList.toggle('is-active', isSoundEnabled);
      soundBtn.setAttribute('aria-pressed', isSoundEnabled);
      const label = soundBtn.querySelector('.sound-label');
      if (label) label.textContent = isSoundEnabled ? 'SOUND [ON]' : 'SOUND [OFF]';
      if (isSoundEnabled) playPop(1200, 0.06);
    });
  }

  // Bind click sound to interactive triggers
  document.querySelectorAll('a, button, .vault-card, .filter-tab').forEach(el => {
    el.addEventListener('click', () => {
      if (isSoundEnabled) playPop(900, 0.035);
    });
  });
}

/* --------------------------------------------------------------------------
   7. NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const nav = document.querySelector('.nav-float');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('is-scrolled');
    } else {
      nav?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  if (hamburger && mobileMenu) {
    function toggleMenu() {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   8. VIDEO LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('video-lightbox');
  const backdrop = document.getElementById('video-lightbox__backdrop');
  const closeBtn = document.getElementById('video-lightbox__close');
  const frameContainer = document.getElementById('lightbox-frame-container');
  const tagEl = document.getElementById('video-lightbox__tag');
  const titleEl = document.getElementById('video-lightbox__title');
  const extBtn = document.getElementById('video-lightbox__external');
  const fileWarning = document.getElementById('video-lightbox__file-warning');

  if (!lightbox || !frameContainer) return;

  function openVideo(videoId, title, tag, aspect = '16-9') {
    if (!videoId) return;

    if (titleEl) titleEl.textContent = title || 'Jorb.media Project';
    if (tagEl) tagEl.textContent = tag || 'VIDEO';

    const ytWatchUrl = (aspect === '9-16') 
      ? `https://youtube.com/shorts/${videoId}`
      : `https://www.youtube.com/watch?v=${videoId}`;

    if (extBtn) extBtn.href = ytWatchUrl;

    const isFileProtocol = window.location.protocol === 'file:';
    if (fileWarning) {
      fileWarning.style.display = isFileProtocol ? 'flex' : 'none';
      const warningLink = fileWarning.querySelector('a');
      if (warningLink) warningLink.href = ytWatchUrl;
    }

    if (aspect === '9-16') {
      frameContainer.classList.add('is-vertical');
    } else {
      frameContainer.classList.remove('is-vertical');
    }

    frameContainer.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1" 
        title="${title || 'Video Player'}" 
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    `;

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    frameContainer.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-video-id]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (e.target.closest('.card-yt-direct-btn')) return;
      e.preventDefault();
      const id = trigger.getAttribute('data-video-id');
      const title = trigger.getAttribute('data-video-title');
      const tag = trigger.getAttribute('data-video-tag');
      const aspect = trigger.getAttribute('data-video-aspect') || '16-9';
      openVideo(id, title, tag, aspect);
    });
  });

  closeBtn?.addEventListener('click', closeVideo);
  backdrop?.addEventListener('click', closeVideo);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeVideo();
    }
  });
}

/* --------------------------------------------------------------------------
   9. SEGMENTED FILTER CONTROLS
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.vault-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

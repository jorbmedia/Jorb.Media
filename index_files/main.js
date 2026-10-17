/**
 * JORB.MEDIA - Interactive Engine
 * Apple-inspired smooth motion, video lightbox modal, and scroll reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLightbox();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & ACCESSIBLE MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  // Subtle translucent header blur on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (toggle && menu) {
    const toggleMenu = () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    toggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (menu.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. VIDEO LIGHTBOX (16:9 widescreen & 9:16 vertical shorts)
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('video-lightbox');
  const backdrop = document.querySelector('.video-lightbox__backdrop');
  const closeBtn = document.querySelector('.video-lightbox__close');
  const frameContainer = document.getElementById('lightbox-frame-container');
  const titleEl = document.querySelector('.video-lightbox__title');
  const extBtn = document.querySelector('.video-lightbox__ext-link');

  if (!lightbox || !frameContainer) return;

  function openVideo(videoId, title, aspect = '16-9') {
    if (!videoId) return;

    if (titleEl) titleEl.textContent = title || 'Jorb.media Project';

    const ytWatchUrl = (aspect === '9-16') 
      ? `https://youtube.com/shorts/${videoId}`
      : `https://www.youtube.com/watch?v=${videoId}`;

    if (extBtn) extBtn.href = ytWatchUrl;

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

    closeBtn?.focus();
  }

  function closeVideo() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    frameContainer.innerHTML = ''; // Stop video audio/playback
    document.body.style.overflow = '';
  }

  // Bind video triggers (cards & buttons)
  document.querySelectorAll('[data-video-id]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Don't intercept direct click on external link button
      if (e.target.closest('.work-card__ext-btn')) return;

      e.preventDefault();
      const id = trigger.getAttribute('data-video-id');
      const title = trigger.getAttribute('data-video-title');
      const aspect = trigger.getAttribute('data-video-aspect') || '16-9';
      openVideo(id, title, aspect);
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
   3. SCROLL REVEAL (Subtle fade up with --ease)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

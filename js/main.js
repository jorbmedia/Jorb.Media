/**
 * JORB.MEDIA - Interactive Engine
 * Apple-inspired smooth motion, video lightbox modal, category filters, and corner back-to-top button
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initLightbox();
  initWorkFilters();
  initBackToTop();
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

  // Translucent header blur on scroll
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
   2. SMOOTH SCROLL NAVIGATION (Ensures header & in-page buttons always work)
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();

        // Calculate offset position accounting for the fixed header
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 10;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const menu = document.querySelector('.nav-menu');
        const toggle = document.querySelector('.nav-toggle');
        if (menu?.classList.contains('is-open')) {
          menu.classList.remove('is-open');
          toggle?.classList.remove('is-active');
          toggle?.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }

        // Push state without jumping
        try {
          history.pushState(null, '', targetId);
        } catch (_) {}
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. CATEGORY HUB (ZakariaHQ Style Division & Interactive Project Gallery)
   -------------------------------------------------------------------------- */
function initWorkFilters() {
  const categoryCards = document.querySelectorAll('.category-card');
  const showcase = document.getElementById('category-showcase');
  const activeTitle = document.getElementById('showcase-active-title');
  const activeBadge = document.getElementById('showcase-active-badge');
  const collapseBtn = document.getElementById('showcase-collapse-btn');
  const showAllBtn = document.getElementById('show-all-btn');
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.work-card');

  if (!categoryCards.length || !cards.length) return;

  const categoryMeta = {
    vsl: { title: 'VSL · Video de ventas', badge: '1 proyecto' },
    yt: { title: 'YouTube · Formato largo & Motion', badge: '3 proyectos' },
    'short-form': { title: 'Short form · Formato vertical 9:16', badge: '5 proyectos' },
    all: { title: 'Todos los proyectos seleccionados', badge: '9 proyectos' }
  };

  function applyCategory(catKey, shouldScroll = false) {
    if (!showcase) return;

    // Show showcase
    showcase.style.display = 'block';

    // Update active state on 3 Zakaria cards
    categoryCards.forEach(card => {
      const target = card.getAttribute('data-category-target');
      card.classList.toggle('is-active', target === catKey);
    });

    // Update showcase title and counter
    const meta = categoryMeta[catKey] || categoryMeta.all;
    if (activeTitle) activeTitle.textContent = meta.title;
    if (activeBadge) activeBadge.textContent = meta.badge;

    // Update filter tabs
    tabs.forEach(tab => {
      const filter = tab.getAttribute('data-filter');
      const isActive = (filter === catKey);
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Filter project cards
    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (catKey === 'all' || category === catKey) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.display = 'none';
      }
    });

    // Smooth scroll to showcase
    if (shouldScroll) {
      setTimeout(() => {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
        const rect = showcase.getBoundingClientRect();
        const targetScroll = rect.top + window.pageYOffset - headerHeight - 10;
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      }, 50);
    }
  }

  // 1. Click on any of the 3 Zakaria category cards
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-category-target');
      if (target) applyCategory(target, true);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const target = card.getAttribute('data-category-target');
        if (target) applyCategory(target, true);
      }
    });
  });

  // 2. Click on "O ver los 9 proyectos juntos"
  showAllBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    applyCategory('all', true);
  });

  // 3. Click on category switcher tabs inside showcase
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      if (filter) applyCategory(filter, false);
    });
  });

  // 4. Click on "Cerrar" button in showcase
  collapseBtn?.addEventListener('click', () => {
    if (showcase) showcase.style.display = 'none';
    categoryCards.forEach(card => card.classList.remove('is-active'));
    
    // Scroll back to top of trabajo section
    const trabajoEl = document.getElementById('trabajo');
    if (trabajoEl) {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
      const rect = trabajoEl.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.pageYOffset - headerHeight,
        behavior: 'smooth'
      });
    }
  });

  // 5. Deep linking via URL hash (e.g. #vsl, #yt, #short-form)
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'vsl' || hash === 'yt' || hash === 'short-form') {
    applyCategory(hash, false);
  }
}

/* --------------------------------------------------------------------------
   4. FLOATING BACK TO TOP BUTTON (Persistent in corner)
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   5. VIDEO LIGHTBOX (16:9 widescreen & 9:16 vertical shorts)
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
   6. SCROLL REVEAL (Subtle fade up with --ease)
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
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

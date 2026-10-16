/**
 * JORB.MEDIA - Interactive Motion Design Portfolio Engine (English)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initLightbox();
  initPortfolioFilters();
  initDriftAndParallax();
  initLiveTimecode();
});

/* --------------------------------------------------------------------------
   1. NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const nav = document.querySelector('.nav-float');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('is-scrolled');
    } else {
      nav?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
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
   2. VIDEO LIGHTBOX (Supports 16:9 & 9:16 Shorts + YouTube Direct Fallback)
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

    // Set title and badge
    if (titleEl) titleEl.textContent = title || 'Jorb.media Project';
    if (tagEl) tagEl.textContent = tag || 'VIDEO';

    // Build correct YouTube direct URL
    const ytWatchUrl = (aspect === '9-16') 
      ? `https://youtube.com/shorts/${videoId}`
      : `https://www.youtube.com/watch?v=${videoId}`;

    if (extBtn) {
      extBtn.href = ytWatchUrl;
    }

    // Check if running on local file:/// protocol
    const isFileProtocol = window.location.protocol === 'file:';
    if (fileWarning) {
      fileWarning.style.display = isFileProtocol ? 'flex' : 'none';
      const warningLink = fileWarning.querySelector('a');
      if (warningLink) warningLink.href = ytWatchUrl;
    }

    // Handle vertical aspect ratio for Shorts
    if (aspect === '9-16') {
      frameContainer.classList.add('is-vertical');
    } else {
      frameContainer.classList.remove('is-vertical');
    }

    // Embed YouTube iframe with complete security & playback attributes
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
    frameContainer.innerHTML = ''; // Stop playback immediately
    document.body.style.overflow = '';
  }

  // Bind all triggers that open the lightbox
  document.querySelectorAll('[data-video-id]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // If user clicked directly on an external link inside the card, let it open
      if (e.target.closest('.card-yt-direct-btn')) {
        return;
      }

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

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeVideo();
    }
  });
}

/* --------------------------------------------------------------------------
   3. PORTFOLIO FILTER TABS
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

/* --------------------------------------------------------------------------
   4. DRIFT & MOUSE PARALLAX (After Effects UI Floating Elements)
   -------------------------------------------------------------------------- */
function initDriftAndParallax() {
  const heroSection = document.querySelector('.section--hero');
  const driftElements = document.querySelectorAll('.drift-element');

  if (!heroSection || !driftElements.length) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;
  });

  heroSection.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  function render() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    driftElements.forEach(el => {
      const depth = parseFloat(el.getAttribute('data-parallax-depth') || '0.3');
      const moveX = currentX * depth * 80;
      const moveY = currentY * depth * 80;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* --------------------------------------------------------------------------
   5. LIVE AFTER EFFECTS TIMECODE COUNTER (60 FPS Motion Clock)
   -------------------------------------------------------------------------- */
function initLiveTimecode() {
  const timecodeEl = document.getElementById('live-ae-timecode');
  if (!timecodeEl) return;

  let frames = 0;
  let seconds = 14;
  let minutes = 2;
  let hours = 0;

  setInterval(() => {
    frames++;
    if (frames >= 60) {
      frames = 0;
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }
    }

    const fStr = String(frames).padStart(2, '0');
    const sStr = String(seconds).padStart(2, '0');
    const mStr = String(minutes).padStart(2, '0');
    const hStr = String(hours).padStart(2, '0');

    timecodeEl.innerHTML = `${hStr}:${mStr}:${sStr}:<span>${fStr}</span>`;
  }, 1000 / 60);
}

/* =====================================================
   PROJECT DETAIL — SLIDESHOW & ANIMATIONS
   ===================================================== */

// === SLIDESHOW ===
const slides   = document.querySelectorAll('.slide');
const thumbs   = document.querySelectorAll('.thumb');
const dots     = document.querySelectorAll('.dot');
const curEl    = document.getElementById('cur');
const totalEl  = document.getElementById('total');

let current = 0;
let autoTimer = null;

function playYtVideo(coverId, iframeId, videoId) {
  const cover = document.getElementById(coverId);
  const iframe = document.getElementById(iframeId);
  if (cover && iframe) {
    cover.style.display = 'none';
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
    stopAuto(); // Disable auto-slide while watching
  }
}

if (totalEl) totalEl.textContent = slides.length;

function goTo(idx) {
  // Stop iframe videos and reset covers if any in the current slide before leaving
  const ytCover = slides[current].querySelector('.yt-cover');
  const ytIframe = slides[current].querySelector('iframe');
  
  if (ytCover && ytIframe && ytCover.style.display === 'none') {
    ytIframe.src = '';
    ytCover.style.display = 'block';
  } else if (!ytCover) {
    const oldIframes = slides[current].querySelectorAll('iframe');
    oldIframes.forEach(ifr => {
      let src = ifr.src;
      if (src) ifr.src = src;
    });
  }

  slides[current].classList.remove('active');
  thumbs[current].classList.remove('active');
  dots[current].classList.remove('active');

  current = (idx + slides.length) % slides.length;

  slides[current].classList.add('active');
  thumbs[current].classList.add('active');
  dots[current].classList.add('active');

  if (curEl) curEl.textContent = current + 1;
}

function startAuto() {
  // If the page contains a video, we disable auto-slideshow entirely 
  // to avoid interrupting the user while watching.
  if (document.querySelector('.slide iframe')) return;
  autoTimer = setInterval(() => goTo(current + 1), 4000);
}

function stopAuto() {
  clearInterval(autoTimer);
}

// Arrow buttons
document.getElementById('prev-btn')?.addEventListener('click', () => {
  stopAuto(); goTo(current - 1); startAuto();
});
document.getElementById('next-btn')?.addEventListener('click', () => {
  stopAuto(); goTo(current + 1); startAuto();
});

// Thumbnails
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    stopAuto();
    goTo(parseInt(thumb.dataset.index));
    startAuto();
  });
});

// Dots
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    stopAuto();
    goTo(parseInt(dot.dataset.index));
    startAuto();
  });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); startAuto(); }
  if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); startAuto(); }
});

// Touch / swipe support
let touchStartX = 0;
const slideshowWrap = document.querySelector('.slideshow-wrap');
if (slideshowWrap) {
  slideshowWrap.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slideshowWrap.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      stopAuto();
      goTo(diff > 0 ? current + 1 : current - 1);
      startAuto();
    }
  });
}

startAuto();

// === CARD SCROLL ANIMATIONS ===
const cards = document.querySelectorAll('.detail-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => cardObserver.observe(card));

// === NAVBAR SCROLL ===
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

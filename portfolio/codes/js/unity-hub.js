/* unity-hub.js — minimal, just navbar scroll effect */

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 30px rgba(0,0,0,0.4)'
    : 'none';
});

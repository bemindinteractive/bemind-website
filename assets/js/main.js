document.addEventListener('DOMContentLoaded', function () {

  window.sr = ScrollReveal({
    distance: '20px',
    duration: 300,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
  });
  sr.reveal('.c-illustrated-description-block');
  sr.reveal('.c-intro-block');
})

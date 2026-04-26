/* ============================================================
   Raffaele Francesco D'Amato — Editorial Premium
   Vanilla JS · accordion · scroll obs · smooth scroll
   ============================================================ */

(function () {
  'use strict';

  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item) => {
      const button = item.querySelector('.faq-question');
      if (!button) return;
      button.addEventListener('click', () => {
        const isOpen = item.getAttribute('data-open') === 'true';
        const next = !isOpen;
        item.setAttribute('data-open', String(next));
        button.setAttribute('aria-expanded', String(next));
      });
    });
  }

  function initScrollAnim() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initFAQ();
      initScrollAnim();
      initSmoothScroll();
    });
  } else {
    initFAQ();
    initScrollAnim();
    initSmoothScroll();
  }
})();

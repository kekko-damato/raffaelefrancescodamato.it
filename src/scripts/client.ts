/* ============================================================
   Raffaele Francesco D'Amato — Editorial Premium
   Client-side: accordion · scroll obs · smooth scroll
   ============================================================ */

function initFAQ(): void {
  const items = document.querySelectorAll<HTMLElement>('.faq-item')
  items.forEach((item) => {
    const button = item.querySelector<HTMLButtonElement>('.faq-question')
    if (!button) return
    button.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true'
      const next = !isOpen
      item.setAttribute('data-open', String(next))
      button.setAttribute('aria-expanded', String(next))
    })
  })
}

function initScrollAnim(): void {
  const elements = document.querySelectorAll<HTMLElement>('.fade-up')
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'))
    return
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    elements.forEach((el) => el.classList.add('visible'))
    return
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  )
  elements.forEach((el) => obs.observe(el))
}

function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - 24
      window.scrollTo({ top, behavior: 'smooth' })
    })
  })
}

function init(): void {
  initFAQ()
  initScrollAnim()
  initSmoothScroll()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

/**
 * DXSL Main JavaScript
 * Handles Navigation, Mobile menu, Scroll interactions, and UX
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header shadow & blur on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        header.style.borderColor = 'rgba(0, 240, 255, 0.2)';
      } else {
        header.style.boxShadow = 'none';
        header.style.borderColor = 'var(--border-subtle)';
      }
    }, { passive: true });
  }

  // 3. Highlight current active section in nav on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length > 0 && navItems.length > 0) {
    window.addEventListener('scroll', () => {
      let currentId = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          currentId = section.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentId}`) {
          item.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // 4. Save language selection when user clicks a language choice
  const langLinks = document.querySelectorAll('[data-lang-select]');
  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const selectedLang = link.getAttribute('data-lang-select');
      if (selectedLang) {
        try {
          localStorage.setItem('dxsl_preferred_lang', selectedLang);
        } catch (err) {
          // Ignore localStorage errors (private browsing etc.)
        }
      }
    });
  });

  // 5. Back to top button if present
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

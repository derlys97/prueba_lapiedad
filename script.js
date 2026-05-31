document.addEventListener('DOMContentLoaded', () => {
  const header    = document.getElementById('header');
  const menuBtn   = document.getElementById('menu-btn');
  const nav       = document.getElementById('main-nav');

  /* ── HAMBURGER MENU ── */
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── SCROLLED HEADER ── */
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── REVEAL ON SCROLL ── */
  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealItems.forEach((item) => revealObserver.observe(item));

  /* ── STAGGERED ENTITY CARDS ── */
  const entityItems = document.querySelectorAll('.entity-item');
  const entityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.entity-item');
          items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(16px)';
            item.style.transition = `opacity 0.45s ease ${i * 0.08}s, transform 0.45s ease ${i * 0.08}s`;
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 60);
          });
          entityObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  const entityGrid = document.querySelector('.entity-grid');
  if (entityGrid) entityObserver.observe(entityGrid);

  /* ── TIMELINE STAGGER ── */
  const timelineList = document.getElementById('timeline-list');
  if (timelineList) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach((item, i) => {
              item.style.opacity = '0';
              item.style.transform = 'translateX(-12px)';
              item.style.transition = `opacity 0.4s ease ${0.05 + i * 0.07}s, transform 0.4s ease ${0.05 + i * 0.07}s`;
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
              }, 80);
            });
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    timelineObserver.observe(timelineList);
  }

  /* ── ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => sectionObserver.observe(s));
});

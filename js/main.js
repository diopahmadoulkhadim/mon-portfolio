const yearElement = document.getElementById('current-year');

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const navigation = document.getElementById('main-navigation');
const navigationLinks = document.querySelectorAll('.navbar-nav .nav-link');

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navigationLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});

const observedSections = document.querySelectorAll('main section[id]');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          link.classList.toggle('active', link.hash === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

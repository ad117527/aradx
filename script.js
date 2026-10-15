(() => {
  const body = document.body;
  const langToggle = document.getElementById('langToggle');
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const toast = document.getElementById('toast');
  let language = localStorage.getItem('aradx-language') || 'fa';

  function setLanguage(lang) {
    language = lang;
    const english = lang === 'en';
    body.classList.toggle('lang-en', english);
    body.dir = english ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
    document.documentElement.dir = english ? 'ltr' : 'rtl';
    document.querySelectorAll('[data-fa][data-en]').forEach(el => {
      el.innerHTML = english ? el.dataset.en : el.dataset.fa;
    });
    langToggle.textContent = english ? 'فا' : 'EN';
    langToggle.setAttribute('aria-label', english ? 'تغییر زبان به فارسی' : 'Switch language to English');
    document.title = english ? 'ARADX — Technology for Tomorrow' : 'ARADX — فناوری برای آینده';
    localStorage.setItem('aradx-language', lang);
  }
  langToggle.addEventListener('click', () => setLanguage(language === 'fa' ? 'en' : 'fa'));
  setLanguage(language);

  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  document.getElementById('year').textContent = new Date().getFullYear();

  // Local-only notice helper, available for future interactive features.
  window.aradxNotice = (messageFa, messageEn) => {
    toast.textContent = language === 'en' ? messageEn : messageFa;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2600);
  };
})();

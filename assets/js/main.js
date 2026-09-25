// Home page interactions: light/dark theme toggle, mobile menu, hero search.
// The initial theme is applied by the inline script in <head> to avoid a flash.

(function () {
  var THEME_KEY = 'aw-theme';
  var root = document.documentElement;

  // ---- Theme toggle ----
  var themeButton = document.querySelector('[data-theme-toggle]');

  function syncThemeLabel() {
    var isDark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', isDark ? 'Gunakan mode terang' : 'Gunakan mode gelap');
  }

  if (themeButton) {
    syncThemeLabel();
    themeButton.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, root.dataset.theme);
      } catch (e) {
        // Storage can be unavailable (private mode); the theme still applies for this visit.
      }
      syncThemeLabel();
    });
  }

  // ---- Mobile menu ----
  var menuButton = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('mobile-menu');

  function setMenuOpen(open) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  }

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      setMenuOpen(menu.hidden);
    });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenuOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.hidden) {
        setMenuOpen(false);
        menuButton.focus();
      }
    });
  }

  // ---- Hero search ----
  // No search results page yet: keep the visitor on the product section.
  var searchForm = document.querySelector('[data-hero-search]');
  if (searchForm) {
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      document.getElementById('produk').scrollIntoView();
    });
  }
})();

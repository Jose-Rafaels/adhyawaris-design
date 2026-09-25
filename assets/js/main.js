// Site-wide interactions: light/dark theme toggle, mobile menu, hero search,
// and (on the Listing Product page) the filter sheet and active-filter chips.
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

  // ---- Filter panel (Listing Product page) ----
  // A static sidebar on desktop; below 1024px the same panel becomes a bottom
  // sheet opened from the "Filter" button in the control bar.
  var filterToggle = document.querySelector('[data-filter-toggle]');
  var filterPanel = document.getElementById('filter-panel');
  var filterBackdrop = document.querySelector('[data-filter-backdrop]');

  function setFilterOpen(open) {
    filterPanel.classList.toggle('is-open', open);
    filterBackdrop.classList.toggle('is-open', open);
    filterToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  }

  if (filterToggle && filterPanel && filterBackdrop) {
    filterToggle.addEventListener('click', function () {
      setFilterOpen(true);
    });
    filterBackdrop.addEventListener('click', function () {
      setFilterOpen(false);
    });
    filterPanel.querySelectorAll('[data-filter-close], [data-filter-apply]').forEach(function (button) {
      button.addEventListener('click', function () {
        setFilterOpen(false);
        filterToggle.focus();
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && filterPanel.classList.contains('is-open')) {
        setFilterOpen(false);
        filterToggle.focus();
      }
    });
  }

  // ---- Active filter chips ----
  // No real filtering behind this static page: removing a chip just clears
  // its matching checkbox and drops the chip, as a stand-in for re-querying.
  document.querySelectorAll('[data-chip-remove]').forEach(function (button) {
    button.addEventListener('click', function () {
      button.closest('.filter-chip').remove();
    });
  });

  // ---- Clear filters ----
  var clearButton = document.querySelector('[data-filter-clear]');
  if (clearButton && filterPanel) {
    clearButton.addEventListener('click', function () {
      filterPanel.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.checked = false;
      });
      document.querySelectorAll('.filter-chip').forEach(function (chip) {
        chip.remove();
      });
    });
  }
})();

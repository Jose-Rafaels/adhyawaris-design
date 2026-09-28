// Site-wide interactions: light/dark theme toggle, mobile menu, hero search,
// the Listing Product filter sheet and active-filter chips, the Product
// Detail tabs and gallery, and the Consultation page's WhatsApp form.
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

  // ---- Tabs (Product Detail page) ----
  // Standard tablist/tab/tabpanel pattern: click or arrow keys select a tab,
  // which shows its panel and hides the rest.
  document.querySelectorAll('[role="tablist"]').forEach(function (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function selectTab(tab, moveFocus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        selectTab(tab, false);
      });
      tab.addEventListener('keydown', function (event) {
        var newIndex;
        if (event.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') newIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') newIndex = 0;
        else if (event.key === 'End') newIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        selectTab(tabs[newIndex], true);
      });
    });
  });

  // ---- Product gallery thumbnails (Product Detail page) ----
  document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
    var mainImage = gallery.querySelector('[data-gallery-main]');
    var thumbs = gallery.querySelectorAll('[data-gallery-thumb]');
    if (!mainImage || !thumbs.length) return;
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        mainImage.src = thumb.querySelector('img').src;
        thumbs.forEach(function (t) {
          t.removeAttribute('aria-current');
        });
        thumb.setAttribute('aria-current', 'true');
      });
    });
  });

  // ---- Consultation form (Consultation page) ----
  // No backend behind this static page: composes the filled-in fields into
  // a formatted message and opens WhatsApp (wa.me) with it pre-filled,
  // matching the page's own "terhubung otomatis ke WhatsApp" copy.
  var consultationForm = document.querySelector('[data-consultation-form]');
  if (consultationForm) {
    var WHATSAPP_NUMBER = '622138741115'; // company number, intl format, no leading +
    var CONSULTATION_FIELDS = [
      ['Nama Lengkap', 'name'],
      ['Email Kantor', 'email'],
      ['Jalur / Skema Pengadaan', 'procurement'],
      ['Model Instrumen Acuan', 'instrument'],
      ['Nama Instansi', 'institution'],
      ['Kota / Lokasi', 'location'],
      ['Detail Kebutuhan', 'detail'],
    ];

    consultationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!consultationForm.reportValidity()) return;

      var lines = ['Halo, saya ingin berkonsultasi mengenai kebutuhan instrumen laboratorium:', ''];
      CONSULTATION_FIELDS.forEach(function (field) {
        var element = consultationForm.elements.namedItem(field[1]);
        var value = element && 'value' in element ? element.value.trim() : '';
        if (value) lines.push(field[0] + ': ' + value);
      });

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }
})();

// Admin panel interactions: theme toggle, mobile sidebar drawer, the
// product list's delete-confirmation modal, the login form (password
// visibility + fake-auth redirect), and the product form (add/edit title
// switch via ?id=, demo data fill, and image upload preview).
// No backend: every action here simulates the real flow for review purposes.

(function () {
  var THEME_KEY = 'aw-theme';
  var root = document.documentElement;

  // ---- Theme toggle ----
  var themeButton = document.querySelector('[data-theme-toggle]');

  function syncThemeLabel() {
    if (!themeButton) return;
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

  // ---- Sidebar drawer (mobile) ----
  var sidebar = document.getElementById('admin-sidebar');
  var sidebarToggle = document.querySelector('[data-sidebar-toggle]');
  var sidebarBackdrop = document.querySelector('[data-sidebar-backdrop]');

  function setSidebarOpen(open) {
    sidebar.classList.toggle('is-open', open);
    sidebarBackdrop.classList.toggle('is-open', open);
    sidebarToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  }

  if (sidebar && sidebarToggle && sidebarBackdrop) {
    sidebarToggle.addEventListener('click', function () {
      setSidebarOpen(!sidebar.classList.contains('is-open'));
    });
    sidebarBackdrop.addEventListener('click', function () {
      setSidebarOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
        setSidebarOpen(false);
        sidebarToggle.focus();
      }
    });
  }

  // ---- Delete-confirmation modal (Product list) ----
  var deleteModal = document.getElementById('delete-modal');
  if (deleteModal) {
    var deleteModalName = deleteModal.querySelector('[data-delete-modal-name]');
    var deleteTrigger = null;

    function openDeleteModal(trigger) {
      deleteTrigger = trigger;
      if (deleteModalName) deleteModalName.textContent = trigger.dataset.productName || 'Produk ini';
      deleteModal.classList.add('is-open');
      var confirmButton = deleteModal.querySelector('[data-modal-confirm]');
      if (confirmButton) confirmButton.focus();
    }

    function closeDeleteModal() {
      deleteModal.classList.remove('is-open');
      if (deleteTrigger) deleteTrigger.focus();
    }

    document.querySelectorAll('[data-delete-trigger]').forEach(function (button) {
      button.addEventListener('click', function () {
        openDeleteModal(button);
      });
    });
    deleteModal.querySelectorAll('[data-modal-close]').forEach(function (button) {
      button.addEventListener('click', closeDeleteModal);
    });
    deleteModal.addEventListener('click', function (event) {
      if (event.target === deleteModal) closeDeleteModal();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && deleteModal.classList.contains('is-open')) closeDeleteModal();
    });
    var confirmButton = deleteModal.querySelector('[data-modal-confirm]');
    if (confirmButton) {
      confirmButton.addEventListener('click', function () {
        if (deleteTrigger) {
          var row = deleteTrigger.closest('tr');
          if (row) row.remove();
        }
        closeDeleteModal();
      });
    }
  }

  // ---- Login page ----
  var loginForm = document.querySelector('[data-login-form]');
  if (loginForm) {
    var loginError = document.querySelector('[data-login-error]');

    document.querySelectorAll('[data-toggle-password]').forEach(function (button) {
      button.addEventListener('click', function () {
        var input = document.getElementById(button.getAttribute('aria-controls'));
        if (!input) return;
        var show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        button.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
        button.querySelector('[data-icon-show]').hidden = show;
        button.querySelector('[data-icon-hide]').hidden = !show;
      });
    });

    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!loginForm.reportValidity()) return;
      if (loginError) loginError.hidden = true;
      // No backend: any well-formed submission "succeeds" and enters the admin panel.
      window.location.href = 'admin-produk.html';
    });
  }

  // ---- Product form (Add/Edit) ----
  var productForm = document.querySelector('[data-product-form]');
  if (productForm) {
    var params = new URLSearchParams(window.location.search);
    var isEdit = Boolean(params.get('id'));

    document.querySelectorAll('[data-form-title]').forEach(function (el) {
      el.textContent = isEdit ? 'Edit Produk' : 'Tambah Produk';
    });
    document.querySelectorAll('[data-form-breadcrumb]').forEach(function (el) {
      el.textContent = isEdit ? 'Edit Produk' : 'Tambah Produk';
    });
    document.querySelectorAll('[data-form-subtitle]').forEach(function (el) {
      el.textContent = isEdit
        ? 'Perbarui detail dan spesifikasi produk yang sudah ada di katalog.'
        : 'Lengkapi detail produk baru untuk ditambahkan ke katalog.';
    });
    document.querySelectorAll('[data-form-submit-label]').forEach(function (el) {
      el.textContent = isEdit ? 'Simpan Perubahan' : 'Simpan Produk';
    });
    document.title = (isEdit ? 'Edit Produk' : 'Tambah Produk') + ' — Panel Admin Adhya Waris Saintifik';

    if (isEdit) {
      // Demo data standing in for a real fetch-by-id — every edit link on the
      // list page opens this same sample product for this static mockup.
      var demoValues = {
        name: 'SUV-1200 Series UV-Vis Double Beam',
        sku: 'AW-SUV-1200',
        category: 'spektrofotometri',
        lini: 'lingkungan',
        tkdn: '40.36',
        description:
          'Spektrofotometer berkas ganda dengan layar sentuh 10,1 inci dan memori internal 1024 MB untuk pengujian mandiri tanpa PC.',
        specification: 'Layar sentuh 10,1 inci\nMemori internal 1024 MB\nRentang panjang gelombang 190-1100 nm',
        status: 'published',
      };
      Object.keys(demoValues).forEach(function (key) {
        var field = productForm.elements.namedItem(key);
        if (field) field.value = demoValues[key];
      });

      var existingPreview = document.querySelector('[data-existing-preview]');
      var previewGrid = document.querySelector('[data-upload-preview-grid]');
      if (existingPreview && previewGrid) {
        existingPreview.hidden = false;
        previewGrid.hidden = false;
      }

      var createdEl = document.querySelector('[data-history-created]');
      var updatedEl = document.querySelector('[data-history-updated]');
      if (createdEl) createdEl.textContent = '12 Jan 2026';
      if (updatedEl) updatedEl.textContent = '24 Sep 2026';
    }

    productForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!productForm.reportValidity()) return;
      // No backend: saving returns to the list page as if the write succeeded.
      window.location.href = 'admin-produk.html';
    });
  }

  // ---- Image upload preview (new files added via the dropzone input) ----
  var uploadInput = document.querySelector('[data-upload-input]');
  if (uploadInput) {
    var uploadPreviewGrid = document.querySelector('[data-upload-preview-grid]');
    uploadInput.addEventListener('change', function () {
      if (!uploadInput.files || !uploadInput.files[0] || !uploadPreviewGrid) return;
      var url = URL.createObjectURL(uploadInput.files[0]);
      var figure = document.createElement('div');
      figure.className = 'image-upload__preview';
      figure.innerHTML =
        '<img src="' +
        url +
        '" alt="" />' +
        '<button type="button" class="image-upload__remove" aria-label="Hapus gambar"><svg class="icon icon--16" aria-hidden="true"><use href="#i-x" /></svg></button>';
      figure.querySelector('.image-upload__remove').addEventListener('click', function () {
        URL.revokeObjectURL(url);
        figure.remove();
      });
      uploadPreviewGrid.appendChild(figure);
      uploadPreviewGrid.hidden = false;
    });
  }
})();

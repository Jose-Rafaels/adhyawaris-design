# Adhya Waris — Company Profile Website

Front-end for the PT Adhya Waris Saintifik company profile site, built from the
Figma file **Adhya Waris (Copy)** → page *Layout Design*. Implemented so far:

- **Home** (`index.html`) — desktop 1440 and phone 393 frames, light + dark mode.
- **Listing Product** (`listing-produk.html`) — the product catalog page: filter
  sidebar (a bottom sheet on phone/tablet), sort + active-filter chips, product
  grid, and pagination, desktop 1440 and phone 393 frames, light + dark mode.
- **Product Detail** (`detail-produk.html`) — a single product's page: image
  gallery with thumbnails, product info + CTA, and a 4-tab body (Overview,
  Spesifikasi, Aplikasi, Layanan & Support), light + dark mode.
- **About Us** (`tentang-kami.html`) — company profile: photo hero, profile text
  with 3 value cards, a Visi & Misi split section, a Standar (TKDN) section, and
  a Team row, light + dark mode.
- **Consultation** (`konsultasi.html`) — a lead-gen form that composes a WhatsApp
  message from its fields, plus a sidebar (benefits, a 3-step process, and a
  workshop/service-hub location card), light + dark mode.

All five pages share the same Navbar, CTA and Footer sections (copied markup,
not a template include — see **Shared sections** below); Consultation and
About Us also share the same photo hero component.

Alongside the public site, there's a small **Admin panel** (`admin-login.html`,
`admin-produk.html`, `admin-produk-form.html`) for managing the product catalog.
Unlike the five pages above, this isn't a Figma implementation — the Figma file
has no admin/dashboard screens (checked via `get_metadata` before starting) — it's
original design work, built to reuse the same token/component system. See
**Admin panel** below for scope and what's real vs. demo data.

## Stack

Plain **HTML + CSS**, with a small vanilla JavaScript file only where behaviour is
needed. No framework, no build step, no dependencies.

- Font: [Geist](https://vercel.com/font), self-hosted in `assets/fonts/` (SIL Open Font License)
- Icons: [Phosphor](https://phosphoricons.com) (regular), inlined as an SVG sprite at the top of each page — the Figma icon layers use Phosphor names (`caret-down`, `sun`, `magnifying-glass`, `funnel-simple`, …)

Open any of the five `.html` files in a browser, or serve the folder with any
static server:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

## Structure

```
index.html               # Home page markup + icon sprite
listing-produk.html      # Listing Product page markup + icon sprite
detail-produk.html       # Product Detail page markup + icon sprite
tentang-kami.html        # About Us page markup + icon sprite
konsultasi.html          # Consultation page markup + icon sprite
admin-login.html         # Admin panel: login screen
admin-produk.html        # Admin panel: product list
admin-produk-form.html   # Admin panel: add/edit product form (mode switches on the `?id=` query param)
assets/
  css/
    tokens.css           # Style Guide → CSS variables (light + dark modes)
    base.css             # font-face, reset, layout container, text-style classes, .brand-surface
    components.css       # UI Kit: button, badge, search field, section heading, product/article cards, logo
    layout.css             # navbar, footer
    home.css                # Home page: hero, showcase product, core value, article & news, CTA
    listing.css              # Listing Product page: page hero, breadcrumb, filter panel, control bar, product grid, pagination
    detail.css                # Product Detail page: gallery, product info, tabs, spec table, application/support grids
    about.css                  # About Us page: photo hero (shared with Consultation), profile + value cards, visi/misi, standar, team
    consultation.css            # Consultation page: form fields, WhatsApp button, sidebar cards, 3-step process, map card
    admin.css                    # Admin panel: sidebar + topbar shell, table, form, toggle, modal, login screen
  js/
    main.js               # theme toggle, mobile menu, hero search, filter sheet, active-filter chips, tabs, gallery, consultation form
    admin.js                # admin theme toggle, sidebar drawer, delete-confirm modal, login form, product form
  fonts/                 # Geist (woff2)
  images/                # images (some are placeholders — see "Still to do") + favicon
```

CSS classes follow BEM (`.product-card__title`, `.badge--red`). Text styles from the
Figma Style Guide are utility classes: `text-heading-5xl`, `text-body-sm-medium`,
`text-label-xs`, …

## Design tokens

`assets/css/tokens.css` mirrors the Figma variables one-to-one, e.g.
`Color/Surface/Neutral/Primary-normal` → `--color-surface-neutral-primary-normal`,
`Spacing/14` → `--spacing-14`, `Border/Border-radius/rounded-base` → `--radius-base`.
Dark mode is applied with `<html data-theme="dark">` and uses the Figma dark
variable mode. The saved choice is kept in `localStorage`; otherwise the system
preference is used. A few tokens the earlier pages didn't need yet
(`--color-border-neutral-medium`, `--font-size-2xl`, `--leading-8`,
`--color-surface-brand-blue-medium`, `--color-text-brand-red-default`,
`--spacing-3-5`) were added for About Us and Consultation, same naming
convention as the rest. Two of those (`--color-surface-brand-blue-medium`,
`--color-text-brand-red-default`) needed a dark-mode value this project never
had captured from Figma directly — each has a comment at its definition
explaining how it was estimated from a related token that *was* captured.

A handful of surface tokens (`*-secondary-normal`, `*-secondary-strong`) only have a
light-mode value — they're meant to stay light in both themes (e.g. the hero search
field). Anywhere else, pair a background with a token that *does* have a dark-mode
value (`*-secondary-medium`, `*-primary-normal`) so neutral text stays legible in
dark mode. This tripped up three different sections while building this site (the
Core Value/CTA background, the Listing filter panel, and the About Us value cards)
before landing on that rule — see the comments on `.brand-surface` in `base.css`
and `.filter-panel` / `.value-card` in `listing.css` / `about.css`.

Breakpoints: desktop ≥ 1200px (80px gutter), tablet 768–1199px (32px), phone < 768px (12px).
The Listing Product page collapses the filter sidebar into a bottom sheet below 1024px;
Product Detail, About Us and Consultation stack their two-column sections below 1024px
too. If you add a two-column-to-stacked responsive rule, watch for `flex: 1 1 0` (or any
`flex-basis: 0`) left over from the row layout once the container becomes
`flex-direction: column` — it sizes along whichever axis is now vertical, and
if you also reset the item's `min-height` to `0` in that same breakpoint (to
drop a fixed height meant for the row layout), the item can collapse to zero
height and overlap its siblings. Reset `flex` to `none` alongside `min-height: 0`,
not just the height — `.value-card` in `about.css` is a worked example of the bug.

## JavaScript

`assets/js/main.js` is shared by all five pages; each block no-ops if its markup
isn't on the current page. It handles:

- the light/dark toggle (the initial theme is set by a tiny inline script in `<head>` to avoid a flash),
- opening/closing the mobile menu (button, link click, Escape),
- the hero search form (Home only — scrolls to the product section until a search page exists),
- the filter sheet (Listing Product only) — opens/closes as a bottom sheet below 1024px (button, backdrop click, Escape, Apply); at ≥1024px the same markup renders as a static sidebar and the toggle button is hidden by CSS,
- active-filter chips and "Hapus Filter" (Listing Product only) — removing a chip or clearing unchecks the matching filter; there's no real query behind this static page,
- the tab control (Product Detail only) — a standard tablist/tab/tabpanel pattern; click or Left/Right/Home/End switches the visible panel,
- the gallery thumbnails (Product Detail only) — clicking a thumbnail swaps the main image and moves the active outline; all thumbnails point at the same placeholder image today (see "Still to do"),
- the consultation form (Consultation only) — on submit, after the browser's native required-field validation passes, it composes the filled-in fields into a formatted message and opens `wa.me/<number>?text=<message>` in a new tab (matching the page's own "terhubung otomatis ke WhatsApp" copy). There's no backend; nothing is stored or sent anywhere except that WhatsApp deep link. `wa.me` is on this sandbox's blocked-domains list, so the generated link itself couldn't be opened end-to-end here — it was verified by stubbing `window.open` and inspecting the composed URL/message instead.

About Us needed no new JavaScript — every interactive-looking element on it (the
Team row) is plain CSS (`overflow-x: auto` with scroll-snap).

## Shared sections

The Navbar, CTA and Footer are the same markup copied into all five pages (this
is a static site, not a templated one) — Consultation is the one page without a
CTA section, matching its own Figma frame (redundant on a page that *is* already
a consultation flow). If you edit one of these sections, mirror the change in
the other files — search for the section's HTML comment
(`<!-- ============ Navbar ============ -->` etc.) in each of `index.html`,
`listing-produk.html`, `detail-produk.html`, `tentang-kami.html` and
`konsultasi.html`.

## Admin panel

Original design, not a Figma implementation — confirmed via `get_metadata` that
the source file has no admin/dashboard screens before building this, so there
was nothing to extract. Built per the requested scope (product list through
product detail, plus a login and an add/create screen) as real HTML pages,
reusing `tokens.css`, `base.css` and `components.css` (`.button`, `.badge`,
`.sr-only`, the text-style utility classes) for visual continuity with the
public site, with its own `admin.css` for the sidebar + topbar shell, table,
form, toggle and modal, and `admin.js` for its interactions. `noindex, nofollow`
is set on all three admin pages since they're not meant to be crawled; there's
no link to the admin panel from the public site's navbar — the three pages are
reached directly by URL.

- **`admin-login.html`** — email/password form (password visibility toggle,
  native required-field validation) over a split layout: a brand panel reusing
  `.brand-surface` and the existing `cta-bg.webp` photo (there's no dedicated
  login photo), and the form card. No backend: any submission that passes
  browser validation redirects to `admin-produk.html`, and the on-page copy
  says so explicitly rather than pretending otherwise.
- **`admin-produk.html`** — the product list: 4 summary stat cards, a
  search/status/category toolbar (not wired to real filtering — same "static
  page" caveat as the public Listing page's filter panel), an 8-row table, and
  a delete-confirmation modal (Escape/backdrop/Cancel to dismiss, Confirm
  removes the row from the DOM). The 8 rows are demo data: real product-line
  names already established elsewhere on the site (HPLC, AAS, UV-Vis
  Spektrofotometer, Timbangan Analitik — from the About Us Profile section) but
  invented SKUs/TKDN percentages/statuses, and every thumbnail reuses the
  site's one real product photo (`product-uv-vis.png`) since there's no second
  product photo to draw from.
- **`admin-produk-form.html`** — a single form used for both Add and Edit:
  `admin.js` reads the `?id=` query param and switches the page title,
  breadcrumb, subtitle and submit-button label, and (edit mode only) fills the
  fields with one hardcoded demo product, shows an existing-image preview, and
  fills the "Riwayat" (created/updated) dates — standing in for a real
  fetch-by-id, since every edit link on the list page opens the same sample
  record here. The image dropzone accepts a real file and shows a live
  preview via `URL.createObjectURL` (removable); nothing is uploaded anywhere.
  Saving (Add or Edit) redirects back to the product list, same no-backend
  caveat as the login form.

New tokens added for this panel only (light values are original design
choices, not extracted; dark values are derived the same way the rest of the
site's estimated dark tokens are — see the **Design tokens** section above):
`--color-text-status-success`, `--color-surface-status-success-soft`,
`--color-border-status-success` (the "Dipublikasikan" status badge) and
`--color-surface-brand-blue-strong-hover` (hover state for the new
`.button--blue` variant, used for the admin panel's primary actions instead of
the public site's red `.button` so Save/Login don't read as a delete action).
Both new button variants (`.button--blue`, `.button--ghost`) live in the
shared `components.css` since they're generically reusable, not admin-only.

The sidebar's "Dashboard" and "Artikel & Berita" nav items are visibly
disabled with a "Segera" (soon) badge — real nav destinations that are out of
scope for this pass, kept visible so the shell reads as a real product rather
than a single hidden screen.

## Still to do

- **Images.** The hero photo, product render, article photo and the Core Value/CTA
  background are real images (`assets/images/hero-lab.webp`, `product-uv-vis.png`,
  `article-lab.webp`, `cta-bg.webp`), supplied directly rather than exported from the
  Figma file. The same handful of images repeat across every card and every page —
  the About Us page's Profile and Standar photos and the Visi card's background
  reuse `hero-lab.webp`/`article-lab.webp` too, since the actual Figma photos for
  those sections couldn't be fetched (see below); Consultation's map card is a
  plain CSS/SVG placeholder for the same reason, not a real map. Swap in
  per-section/per-product photos and a real map embed when available (including
  distinct Product Detail gallery photos — its 5 thumbnails all point at the same
  file today).
- **Logo.** The navbar/footer logo is still a text-based placeholder (`#logo-wordmark`
  in the sprite). Replace the `<svg class="logo …">` elements with the exported logo.
- **WhatsApp number.** Consultation's form opens `wa.me` using the company's listed
  phone number (`+62 21 38741115`, the only real contact number on the site) reformatted
  for `wa.me`. That's a landline-shaped number — confirm the business actually has
  WhatsApp on it (or supply a dedicated WhatsApp Business number) before this goes live.
- **Figma access was unreliable while building this.** It went from rate-limited
  (Listing Product, Product Detail) to a flat access error on every call, then a
  new link to the same file restored full read access partway through (used for
  About Us and Consultation). Even with access restored, this environment's outbound
  network policy blocks direct downloads from Figma's asset CDN (`www.figma.com`),
  which the `download_assets`/`get_screenshot` tools depend on — only content the
  MCP server itself renders inline (design-context screenshots, which are composited
  previews, not usable source files) got through. So:
  - **Listing Product** (built while access was down entirely): the "Lini Instrumen"
    filter options match five product-application sections seen elsewhere in the
    file (Farmasi & Obat-obatan, Diagnostik Klinis, Pangan & Minuman, Biokimia &
    Sains Hayati, Sains Lingkungan & Air) and should be accurate; "Kategori Utama"
    (Spektrofotometri, Kromatografi, etc.), the sort options, and the
    product/pagination counts are reasonable placeholders, not extracted labels.
    The mobile filter is a bottom sheet (matching Figma's "Filter Instruments"
    component); Figma also documents an inline-accordion variant ("Mobile Filter
    Wrapper — Expanded") that this page doesn't use.
  - **Product Detail** (also built while access was down): the product header
    (gallery layout, tags, category, title, description, the 4 tab names) is real,
    node-accurate content captured earlier. The body of each tab is authored,
    grounded in real numbers from that header's own description and from the home
    page (spectral resolution 1.0 nm, 10.1" touchscreen, ± 0.0003 Abs/hr baseline
    stability, 1024 MB memory, TKDN 40.36%) and the five sector names above — but
    Figma's own tab-content instances weren't expanded before access dropped, so
    the exact copy, the specification table's full row list, and the CTA button's
    label ("Minta Penawaran Harga") are this build's own choices, not extracted
    labels. Worth checking against Figma.
  - **About Us and Consultation** (built after access was restored): all copy is
    real, node-accurate content — every heading, body paragraph, form field label
    and placeholder, checklist item, step label, and the one team member's
    name/role/focus text are exactly what's in the Figma file. What's *not* real:
    photos (About Us's Profile/Visi/Standar images, Consultation's map) and small
    icons (About Us's quote/value/visi/misi/checkmark icons) couldn't be downloaded
    for the network reason above, so this build reuses the site's existing photos
    and substitutes Phosphor icons chosen to match each one's visible shape/meaning
    in the Figma preview. The About Us team photo is a generic avatar icon, not a
    photo — Figma's own file repeats one stock photo under the same name across all
    5 cards, and rather than reproduce a photo standing in for a specific named
    person, this build leaves the photo slot generic; the name/role/focus text is
    still Figma's real (placeholder) content, repeated 5× exactly as the source file
    does. Real, distinct staff (names, roles and photos) should replace all 5 cards
    before launch. The Team row's horizontal scroll is also this build's own choice
    — Figma's frame just clips the 5th card at a fixed width; scrolling makes it
    reachable instead. The procurement-scheme and reference-instrument dropdown
    *options* on Consultation are this build's own reasonable choices (grounded in
    terms — e-Katalog, LPSE — already established elsewhere in the file), since the
    option lists themselves weren't part of the captured design-context content.
- An empty-state variant of Listing Product ("Listing Product - Empty State" in
  Figma) isn't built, and Product Detail is a single representative product
  (SUV-1202), not a per-product template wired to real product data.
- Partner logos in the Home hero's social-proof marquee are text placeholders (the Figma uses "Logoipsum" placeholders too).
- The Produk dropdown and the ID/EN language switcher are visual only (no menu content or translations yet).
- **Admin panel** has no backend — see its own section above for exactly what
  each page fakes. Beyond that: the Dashboard and Artikel & Berita sidebar
  destinations aren't built (intentionally out of scope, marked "Segera"); the
  product list's search/status/category toolbar and pagination aren't wired to
  real data (only 8 demo rows exist, all on one page); and the 8 products all
  reuse the one real product photo on the site, so a real media library would
  be needed before this is more than a mockup.

# Adhya Waris — Company Profile Website

Front-end for the PT Adhya Waris Saintifik company profile site, built from the
Figma file **Adhya Waris (Copy)** → page *Layout Design*. Implemented so far:

- **Home** (`index.html`) — desktop 1440 and phone 393 frames, light + dark mode.
- **Listing Product** (`listing-produk.html`) — the product catalog page: filter
  sidebar (a bottom sheet on phone/tablet), sort + active-filter chips, product
  grid, and pagination, desktop 1440 and phone 393 frames, light + dark mode.

Both pages share the same Navbar, CTA and Footer sections (copied markup, not a
template include — see **Shared sections** below).

## Stack

Plain **HTML + CSS**, with a small vanilla JavaScript file only where behaviour is
needed. No framework, no build step, no dependencies.

- Font: [Geist](https://vercel.com/font), self-hosted in `assets/fonts/` (SIL Open Font License)
- Icons: [Phosphor](https://phosphoricons.com) (regular), inlined as an SVG sprite at the top of each page — the Figma icon layers use Phosphor names (`caret-down`, `sun`, `magnifying-glass`, `funnel-simple`, …)

Open `index.html` or `listing-produk.html` in a browser, or serve the folder with
any static server:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

## Structure

```
index.html               # Home page markup + icon sprite
listing-produk.html      # Listing Product page markup + icon sprite
assets/
  css/
    tokens.css           # Style Guide → CSS variables (light + dark modes)
    base.css             # font-face, reset, layout container, text-style classes, .brand-surface
    components.css       # UI Kit: button, badge, search field, section heading, product/article cards, logo
    layout.css            # navbar, footer
    home.css             # Home page: hero, showcase product, core value, article & news, CTA
    listing.css           # Listing Product page: page hero, filter panel, control bar, product grid, pagination
  js/main.js             # theme toggle, mobile menu, hero search, filter sheet, active-filter chips
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
preference is used.

A handful of surface tokens (`*-secondary-normal`, `*-secondary-strong`) only have a
light-mode value — they're meant to stay light in both themes (e.g. the hero search
field). Anywhere else, pair a background with a token that *does* have a dark-mode
value (`*-secondary-medium`, `*-primary-normal`) so neutral text stays legible in
dark mode — see the comments on `.brand-surface` and `.filter-panel` in
`base.css`/`listing.css` for a worked example of the bug this avoids.

Breakpoints: desktop ≥ 1200px (80px gutter), tablet 768–1199px (32px), phone < 768px (12px).
The Listing Product page collapses the filter sidebar into a bottom sheet below 1024px.

## JavaScript

`assets/js/main.js` is shared by both pages; each block no-ops if its markup isn't
on the current page. It handles:

- the light/dark toggle (the initial theme is set by a tiny inline script in `<head>` to avoid a flash),
- opening/closing the mobile menu (button, link click, Escape),
- the hero search form (Home only — scrolls to the product section until a search page exists),
- the filter sheet (Listing Product only) — opens/closes as a bottom sheet below 1024px (button, backdrop click, Escape, Apply); at ≥1024px the same markup renders as a static sidebar and the toggle button is hidden by CSS,
- active-filter chips and "Hapus Filter" (Listing Product only) — removing a chip or clearing unchecks the matching filter; there's no real query behind this static page.

## Shared sections

The Navbar, CTA and Footer are the same markup copied into both pages (this is a
static site, not a templated one). If you edit one of these sections, mirror the
change in the other file — search for the section's HTML comment
(`<!-- ============ Navbar ============ -->` etc.) in both `index.html` and
`listing-produk.html`.

## Still to do

- **Images.** The hero photo, product render, article photo and the Core Value/CTA
  background are real images (`assets/images/hero-lab.webp`, `product-uv-vis.png`,
  `article-lab.webp`, `cta-bg.webp`), supplied directly rather than exported from the
  Figma file. The same product and article images repeat across every card on both
  pages, and the same CTA background repeats on the Core Value and CTA sections
  (set inline via `style="background-image: url(...)"` on each `.brand-surface`
  element) — swap in per-product renders and more article photos when available.
- **Logo.** The navbar/footer logo is still a text-based placeholder (`#logo-wordmark`
  in the sprite). Replace the `<svg class="logo …">` elements with the exported logo.
- **Listing Product content is partly inferred.** Figma's MCP tool calls were
  rate-limited (Starter plan) while building this page, so some copy was
  reconstructed from what had already been fetched rather than read directly off
  the node: the "Lini Instrumen" filter options match the five product-application
  sections seen elsewhere in the file (Farmasi & Obat-obatan, Diagnostik Klinis,
  Pangan & Minuman, Biokimia & Sains Hayati, Sains Lingkungan & Air) and should be
  accurate; the "Kategori Utama" options (Spektrofotometri, Kromatografi, etc.),
  the sort options, and the product/pagination counts are reasonable placeholders,
  not extracted labels — check them against Figma before treating this as final.
  The mobile filter is implemented as a bottom sheet (matching the Figma
  "Filter Instruments" component); Figma also documents an inline accordion
  variant ("Mobile Filter Wrapper — Expanded") that this page doesn't use.
- An empty-state variant of Listing Product ("Listing Product - Empty State" in
  Figma) isn't built.
- Partner logos in the Home hero's social-proof marquee are text placeholders (the Figma uses "Logoipsum" placeholders too).
- The Produk dropdown and the ID/EN language switcher are visual only (no menu content or translations yet).

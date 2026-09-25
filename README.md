# Adhya Waris — Company Profile Website

Front-end for the PT Adhya Waris Saintifik company profile site, built from the
Figma file **Adhya Waris (Copy)** → page *Layout Design*. This first milestone
implements the **Home Page** (desktop 1440 and phone 393 frames, light + dark mode).

## Stack

Plain **HTML + CSS**, with a small vanilla JavaScript file only where behaviour is
needed. No framework, no build step, no dependencies.

- Font: [Geist](https://vercel.com/font), self-hosted in `assets/fonts/` (SIL Open Font License)
- Icons: [Phosphor](https://phosphoricons.com) (regular), inlined as an SVG sprite at the top of `index.html` — the Figma icon layers use Phosphor names (`caret-down`, `sun`, `magnifying-glass`, …)

Open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

## Structure

```
index.html              # Home page markup + icon sprite
assets/
  css/
    tokens.css          # Style Guide → CSS variables (light + dark modes)
    base.css            # font-face, reset, layout container, text-style classes
    components.css      # UI Kit: button, badge, search field, section heading, product/article cards, logo
    layout.css          # navbar, footer
    home.css            # hero, showcase product, core value, article & news, CTA
  js/main.js            # theme toggle, mobile menu, hero search
  fonts/                # Geist (woff2)
  images/               # placeholder images + favicon
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

Breakpoints: desktop ≥ 1200px (80px gutter), tablet 768–1199px (32px), phone < 768px (12px).

## JavaScript

`assets/js/main.js` only handles:

- the light/dark toggle (the initial theme is set by a tiny inline script in `<head>` to avoid a flash),
- opening/closing the mobile menu (button, link click, Escape),
- the hero search form (scrolls to the product section until a search page exists).

## Still to do

- **Images.** The hero photo, product render, article photo and the Core Value/CTA
  background are now real images (`assets/images/hero-lab.webp`, `product-uv-vis.png`,
  `article-lab.webp`, `cta-bg.webp`), supplied directly rather than exported from the
  Figma file. The same product and article images repeat across all 6/3 cards, and
  the same CTA background repeats on the Core Value and CTA sections via
  `--brand-surface-image` in `base.css`, set inline on each `.brand-surface` element
  in `index.html` — swap in per-product renders and a second article photo when
  available.
- **Logo.** The navbar/footer logo is still a text-based placeholder (`#logo-wordmark`
  in the sprite). Replace the two `<svg class="logo …">` elements with the exported logo.
- Partner logos in the social-proof marquee are text placeholders (the Figma uses "Logoipsum" placeholders too).
- The Produk dropdown and the ID/EN language switcher are visual only (no menu content or translations yet).

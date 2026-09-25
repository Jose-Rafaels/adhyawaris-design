# Adhya Waris — Company Profile Website

Front-end for the PT Adhya Waris Saintifik company profile site, built from the
Figma file **Adhya Waris (Copy)** → page *Layout Design*. This first milestone
implements the **Home Page** (desktop 1440 and phone 393 frames, light + dark mode).

## Stack

- [Vite](https://vite.dev) + React + TypeScript
- Plain CSS: global design tokens + CSS Modules per component (no CSS framework)
- [Geist](https://vercel.com/font) via `@fontsource-variable/geist`
- Icons: [Phosphor](https://phosphoricons.com) (`@phosphor-icons/react`) — the Figma icon layers use Phosphor names (`caret-down`, `sun`, `magnifying-glass`, …)

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview
```

## Structure

```
src/
  styles/
    tokens.css        # Style Guide → CSS variables (light + dark modes)
    base.css          # reset, text-style classes (text-heading-5xl, text-body-sm-medium, …)
  components/
    ui/               # UI Kit: Button, Badge, SearchInput, SectionHeading, ProductCard, ArticleCard, Logo
    layout/           # Navbar, Footer
  sections/home/      # Hero, Showcase Product, Core Value, Article & News, CTA
  pages/HomePage.tsx
  data/               # page content + asset paths
  hooks/useTheme.ts   # light/dark toggle (persists to localStorage)
```

## Design tokens

`src/styles/tokens.css` mirrors the Figma variables one-to-one, e.g.
`Color/Surface/Neutral/Primary-normal` → `--color-surface-neutral-primary-normal`,
`Spacing/14` → `--spacing-14`, `Border/Border-radius/rounded-base` → `--radius-base`.
Dark mode is applied with `<html data-theme="dark">` and uses the Figma dark
variable mode. Text styles (`Heading/5xl`, `Body/sm/medium`, `Label/xs`, …) are
exposed as utility classes in `base.css`.

Breakpoints: desktop ≥ 1200px (80px gutter), tablet 768–1199px (32px), phone < 768px (12px).

## Still to do

- **Bitmap assets.** Figma asset downloads were blocked from the build environment,
  so `public/images/*.svg` are placeholders. Export the hero photo, the product
  render, the article photo and the Adhya Waris logo from Figma, then update
  `src/data/assets.ts` (see comments there). The blue artwork behind the Core Value
  and CTA blocks is recreated with CSS gradients (`.brand-surface`); set
  `--brand-surface-image` to use the exported bitmap instead.
- Partner logos in the social-proof marquee are text placeholders (the Figma uses "Logoipsum" placeholders too).
- The Produk dropdown and the ID/EN language switcher are visual only (no menu content or translations yet).

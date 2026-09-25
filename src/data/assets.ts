/**
 * Static image assets used by the home page.
 *
 * The files in /public/images are lightweight placeholders. Export the real
 * bitmaps from the Figma "Home Page" frames and drop them in with the same
 * names (or update the paths here):
 *   - hero-lab            Hero Section → background photo (1440×713)
 *   - product-uv-vis      Showcase Product card → product render
 *   - article-lab         Article & News card → cover photo
 *   - logo.brand/inverse  Navbar / Footer "Adhya Waris Logo"
 */
export const assets = {
  heroImage: '/images/hero-lab.svg',
  productImage: '/images/product-uv-vis.svg',
  articleImage: '/images/article-lab.svg',
  logo: {
    brand: null as string | null,
    inverse: null as string | null,
  },
};

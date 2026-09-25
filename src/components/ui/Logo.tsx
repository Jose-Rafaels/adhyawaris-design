import { assets } from '../../data/assets';

type LogoProps = {
  /** `brand` = red wordmark (navbar), `inverse` = white wordmark (footer). */
  tone?: 'brand' | 'inverse';
  className?: string;
};

/**
 * Adhya Waris wordmark. Uses the exported logo file when one is configured in
 * `assets.logo`, otherwise falls back to a text-based placeholder wordmark.
 */
export function Logo({ tone = 'brand', className }: LogoProps) {
  const src = tone === 'brand' ? assets.logo.brand : assets.logo.inverse;
  if (src) {
    return <img src={src} alt="Adhya Waris Saintifik" className={className} />;
  }

  const fill = tone === 'brand' ? '#d81e2c' : '#ffffff';
  return (
    <svg
      viewBox="0 0 115 32"
      className={className}
      role="img"
      aria-label="Adhya Waris Saintifik"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="21"
        fill={fill}
        fontFamily="var(--font-base)"
        fontWeight="800"
        fontSize="24"
        letterSpacing="0.5"
        textLength="115"
        lengthAdjust="spacingAndGlyphs"
      >
        ADHYA
      </text>
      <text
        x="1"
        y="30.5"
        fill={fill}
        fontFamily="var(--font-base)"
        fontWeight="600"
        fontSize="6"
        textLength="112"
        lengthAdjust="spacing"
      >
        WARIS SAINTIFIK
      </text>
    </svg>
  );
}

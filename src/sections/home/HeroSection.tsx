import type { FormEvent } from 'react';
import { assets } from '../../data/assets';
import { partnerBrands } from '../../data/home';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    // Search results page is not built yet; keep the user on the product section.
    event.preventDefault();
    document.getElementById('produk')?.scrollIntoView();
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media} aria-hidden>
        <img src={assets.heroImage} alt="" />
      </div>

      <div className={styles.content}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={`${styles.title} text-heading-5xl`}>
            Solusi Instrumen Laboratorium Berpresisi dan Berkelanjutan
          </h1>
          <p className={`${styles.subtitle} text-body-xl-regular`}>
            Dapatkan alat analitik berkualitas terbaik yang disesuaikan dengan kebutuhan fasilitas Anda, lengkap
            dengan jaminan servis dan pendampingan aplikasi
          </p>
        </div>

        <form className={styles.search} role="search" onSubmit={handleSearch}>
          <SearchInput
            id="hero-search"
            name="q"
            label="Cari produk"
            placeholder="Cari instrumen lab, spesifikasi alat, atau sektor industri..."
          />
          <Button type="submit">Cari Produk</Button>
        </form>
      </div>

      <div className={styles.proof}>
        <p className={`${styles.proofLabel} text-body-base-medium`}>Didukung oleh Brand Analitik Terpercaya</p>
        <div className={styles.marquee}>
          <ul className={styles.track}>
            {[...partnerBrands, ...partnerBrands].map((brand, i) => (
              <li key={i} className={styles.brand} aria-hidden={i >= partnerBrands.length || undefined}>
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { featuredProducts } from '../../data/home';
import { Button } from '../../components/ui/Button';
import { ProductCard } from '../../components/ui/ProductCard';
import { SectionHeading } from '../../components/ui/SectionHeading';
import styles from './ShowcaseProductSection.module.css';

export function ShowcaseProductSection() {
  return (
    <section id="produk" className={styles.section} aria-labelledby="showcase-title">
      <div className={`container ${styles.inner}`}>
        <SectionHeading
          id="showcase-title"
          title="Instrumen Analitikal Berpresisi Tinggi untuk"
          highlight="Laboratorium Anda"
          action={<Button href="#produk">Jelajahi Seluruh Produk</Button>}
        />
        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

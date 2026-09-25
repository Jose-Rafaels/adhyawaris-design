import { ArrowRight } from '@phosphor-icons/react';
import type { Product } from '../../data/home';
import { Badge } from './Badge';
import styles from './ProductCard.module.css';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img className={styles.image} src={product.image} alt="" loading="lazy" />
        <div className={styles.tags}>
          {product.tags.map((tag) => (
            <Badge key={tag.label} tone={tag.tone}>
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>
      <div className={styles.body}>
        <p className={`${styles.category} text-body-xs-medium`}>{product.category}</p>
        <div className={styles.info}>
          <h3 className={`${styles.name} text-body-base-semibold`}>
            <a href={product.href}>{product.name}</a>
          </h3>
          <p className={`${styles.description} text-body-sm-regular`}>{product.description}</p>
        </div>
        <span className={`${styles.link} text-body-sm-medium`} aria-hidden>
          Detail Spesifikasi
          <ArrowRight size={20} />
        </span>
      </div>
    </article>
  );
}

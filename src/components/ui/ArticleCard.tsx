import { ArrowRight } from '@phosphor-icons/react';
import type { Article } from '../../data/home';
import styles from './ArticleCard.module.css';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img className={styles.image} src={article.image} alt="" loading="lazy" />
      </div>
      <div className={styles.body}>
        <p className={`${styles.category} text-body-xs-medium`}>{article.category}</p>
        <div className={styles.info}>
          <h3 className={`${styles.title} text-body-base-semibold`}>
            <a href={article.href}>{article.title}</a>
          </h3>
          <p className={`${styles.excerpt} text-body-sm-regular`}>{article.excerpt}</p>
        </div>
        <div className={styles.meta}>
          <p className={`${styles.date} text-body-xs-regular`}>
            {article.date} • {article.readTime}
          </p>
          <span className={`${styles.readMore} text-body-xs-semibold`} aria-hidden>
            Baca Selengkapnya
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}

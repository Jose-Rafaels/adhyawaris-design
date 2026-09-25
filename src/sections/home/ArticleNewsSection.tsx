import { latestArticles } from '../../data/home';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { Button } from '../../components/ui/Button';
import { SectionHeading } from '../../components/ui/SectionHeading';
import styles from './ArticleNewsSection.module.css';

export function ArticleNewsSection() {
  return (
    <section id="artikel" className={styles.section} aria-labelledby="articles-title">
      <div className={`container ${styles.inner}`}>
        <SectionHeading
          id="articles-title"
          title="Wawasan Terkini Seputar"
          highlight="Industri & Laboratorium"
          titleWidth={433}
          action={<Button href="#artikel">Jelajahi Seluruh Artikel</Button>}
        />
        <div className={styles.grid}>
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

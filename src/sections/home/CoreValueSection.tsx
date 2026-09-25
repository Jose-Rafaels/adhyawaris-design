import { SealCheck, Stack, Target, Wrench, type Icon } from '@phosphor-icons/react';
import { Fragment } from 'react';
import { coreValues, stats, type FeatureIcon } from '../../data/home';
import styles from './CoreValueSection.module.css';

const featureIcons: Record<FeatureIcon, Icon> = {
  'seal-check': SealCheck,
  target: Target,
  wrench: Wrench,
  stack: Stack,
};

export function CoreValueSection() {
  return (
    <section id="tentang" className={styles.section} aria-labelledby="core-value-title">
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.card} brand-surface`}>
          <div className={styles.header}>
            <h2 id="core-value-title" className={`${styles.title} text-heading-3xl`}>
              Solusi Terpercaya untuk Standar Laboratorium Modern
            </h2>
            <p className={`${styles.lead} text-body-base-regular`}>
              Menggabungkan rekam jejak teruji, kepatuhan regulasi TKDN, dan dukungan teknis menyeluruh.
            </p>
          </div>

          <ul className={styles.stats}>
            {stats.map((stat, i) => (
              <Fragment key={stat.label}>
                {i > 0 && <li className={styles.statDivider} role="presentation" />}
                <li className={styles.stat}>
                  <p className={`${styles.statValue} text-heading-4xl`}>{stat.value}</p>
                  <p className={`${styles.statLabel} text-body-base-regular`}>{stat.label}</p>
                </li>
              </Fragment>
            ))}
          </ul>

          <ul className={styles.features}>
            {coreValues.map((value) => {
              const FeatureIconComponent = featureIcons[value.icon];
              return (
                <li key={value.title} className={styles.feature}>
                  <FeatureIconComponent className={styles.featureIcon} size={32} aria-hidden />
                  <div className={styles.featureText}>
                    <h3 className={`${styles.featureTitle} text-body-lg-semibold`}>{value.title}</h3>
                    <p className={`${styles.featureDescription} text-body-base-regular`}>{value.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

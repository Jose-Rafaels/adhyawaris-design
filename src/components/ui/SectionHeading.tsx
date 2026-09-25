import type { CSSProperties, ReactNode } from 'react';
import styles from './SectionHeading.module.css';

type SectionHeadingProps = {
  id?: string;
  title: string;
  highlight: string;
  action?: ReactNode;
  /** Title width from the Figma frame, controls where the heading wraps. */
  titleWidth?: number;
};

/** Section title with a gradient-highlighted tail and an optional action on the right. */
export function SectionHeading({ id, title, highlight, action, titleWidth = 522 }: SectionHeadingProps) {
  return (
    <div className={styles.header}>
      <h2
        id={id}
        className={`${styles.title} text-heading-3xl`}
        style={{ '--title-width': `${titleWidth}px` } as CSSProperties}
      >
        {title} <span className="text-gradient">{highlight}</span>
      </h2>
      {action}
    </div>
  );
}

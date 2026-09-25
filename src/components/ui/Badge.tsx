import type { ReactNode } from 'react';
import styles from './Badge.module.css';

type BadgeProps = {
  children: ReactNode;
  tone: 'red' | 'blue';
};

export function Badge({ children, tone }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]} text-label-xs`}>{children}</span>;
}

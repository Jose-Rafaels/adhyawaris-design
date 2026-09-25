import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonSize = 'md' | 'sm' | 'responsive';

type CommonProps = {
  children: ReactNode;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, size = 'responsive', className, ...rest } = props;
  const classes = [styles.button, styles.primary, styles[size], className].filter(Boolean).join(' ');

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

import { MagnifyingGlass } from '@phosphor-icons/react';
import type { InputHTMLAttributes } from 'react';
import styles from './SearchInput.module.css';

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> & {
  label: string;
};

export function SearchInput({ label, id, ...rest }: SearchInputProps) {
  return (
    <div className={styles.field}>
      <MagnifyingGlass className={styles.icon} size={20} aria-hidden />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input id={id} type="search" className={styles.input} {...rest} />
    </div>
  );
}

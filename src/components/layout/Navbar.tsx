import { CaretDown, List, Sun, X } from '@phosphor-icons/react';
import { useState } from 'react';
import { navLinks } from '../../data/home';
import { useTheme } from '../../hooks/useTheme';
import { Logo } from '../ui/Logo';
import styles from './Navbar.module.css';

type NavbarProps = {
  /** href of the current page, used to mark the active link. */
  currentHref?: string;
};

export function Navbar({ currentHref = '/' }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = navLinks.map((link) => (
    <a
      key={link.label}
      href={link.href}
      className={`${styles.navLink} text-body-base-medium`}
      aria-current={link.href === currentHref ? 'page' : undefined}
      onClick={() => setMenuOpen(false)}
    >
      {link.label}
      {link.hasMenu && <CaretDown size={20} aria-hidden />}
    </a>
  ));

  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logoLink} aria-label="Adhya Waris Saintifik — Beranda">
          <Logo className={styles.logo} />
        </a>

        <nav className={styles.nav} aria-label="Navigasi utama">
          {links}
        </nav>

        <div className={styles.options}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Gunakan mode terang' : 'Gunakan mode gelap'}
          >
            <Sun size={20} aria-hidden />
          </button>
          <span className={styles.divider} aria-hidden />
          <button type="button" className={`${styles.language} text-body-base-medium`} aria-label="Bahasa: Indonesia">
            ID
            <CaretDown size={20} aria-hidden />
          </button>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {menuOpen ? <X size={18} aria-hidden /> : <List size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.mobileMenu} hidden={!menuOpen}>
        <nav className={`container ${styles.mobileNav}`} aria-label="Navigasi utama (seluler)">
          {links}
        </nav>
      </div>
    </header>
  );
}

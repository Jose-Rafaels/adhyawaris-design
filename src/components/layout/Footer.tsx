import { ArrowUpRight, MapPin } from '@phosphor-icons/react';
import { company, footerLinks, socialLinks } from '../../data/home';
import { Logo } from '../ui/Logo';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer id="kontak" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={styles.about}>
            <Logo tone="inverse" className={styles.logo} />
            <p className="text-body-base-regular">{company.tagline}</p>
            <address className={`${styles.address} text-body-base-regular`}>
              <MapPin size={20} aria-hidden />
              {company.address}
            </address>
          </div>

          <div className={styles.columns}>
            <nav className={styles.column} aria-labelledby="footer-company">
              <h2 id="footer-company" className={`${styles.columnTitle} text-body-sm-semibold`}>
                COMPANY
              </h2>
              <ul className={`${styles.links} text-body-base-regular`}>
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.column}>
              <h2 className={`${styles.columnTitle} text-body-sm-semibold`}>CONTACT</h2>
              <ul className={`${styles.links} text-body-base-regular`}>
                <li>
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </li>
                <li>
                  <a href={`https://${company.website}`}>{company.website}</a>
                </li>
              </ul>
            </div>

            <div className={styles.column}>
              <h2 className={`${styles.columnTitle} text-body-sm-semibold`}>SOCIAL MEDIA</h2>
              <ul className={`${styles.links} text-body-base-regular`}>
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                      <ArrowUpRight size={18} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className={`${styles.copyright} text-body-base-regular`}>
          © 2026 {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

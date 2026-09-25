import { Button } from '../../components/ui/Button';
import styles from './CtaSection.module.css';

export function CtaSection() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.card} brand-surface`}>
          <div className={styles.content}>
            <div className={styles.copy}>
              <h2 id="cta-title" className={`${styles.title} text-heading-5xl`}>
                Butuh Penawaran Harga atau
                <br />
                Konsultasi Teknis?
              </h2>
              <p className={`${styles.description} text-body-base-regular`}>
                Diskusikan kebutuhan fasilitas pengujian Anda secara mendalam—mulai dari pemilihan unit instrumen
                analitis, perencanaan sistem integrasi, hingga skema garansi purna jual dan pendampingan aplikasi
                langsung oleh teknisi bersertifikat
              </p>
            </div>
            <Button href="#kontak">Konsultasi Sekarang</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

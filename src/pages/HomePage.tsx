import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { ArticleNewsSection } from '../sections/home/ArticleNewsSection';
import { CoreValueSection } from '../sections/home/CoreValueSection';
import { CtaSection } from '../sections/home/CtaSection';
import { HeroSection } from '../sections/home/HeroSection';
import { ShowcaseProductSection } from '../sections/home/ShowcaseProductSection';

export function HomePage() {
  return (
    <>
      <Navbar currentHref="/" />
      <main>
        <HeroSection />
        <ShowcaseProductSection />
        <CoreValueSection />
        <ArticleNewsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

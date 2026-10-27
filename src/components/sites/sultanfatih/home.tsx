import { SiteNav } from "./nav";
import { Hero } from "./hero";
import { CampusStrip, ValuesGrid, NewsSection, LifeGallery, PartnersStrip } from "./sections";
import { SiteFooter } from "./footer";

/**
 * Sultan Fatih K.12 — Bumble teması ile ana sayfa.
 * Şerit: honey hero → beyaz kampüs overlap → eğitim/değerler →
 * haberler → galeri → partnerler → ink footer + honey şerit.
 */
export default function SultanFatihHome() {
  return (
    <div id="top" className="min-h-screen bg-paper-white">
      <SiteNav />
      <main>
        <Hero />
        <CampusStrip />
        <ValuesGrid />
        <NewsSection />
        <LifeGallery />
        <PartnersStrip />
      </main>
      <SiteFooter />
    </div>
  );
}

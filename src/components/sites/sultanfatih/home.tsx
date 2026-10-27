import { AnnouncementBar } from "./announcement";
import { SiteNav } from "./nav";
import { Hero } from "./hero";
import { CampusStrip } from "./campus-strip";
import { QuickAccessStrip, ValuesGrid, NewsSection, PartnersStrip } from "./sections";
import { AchievementsWall } from "./achievements";
import { LifeGallery } from "./gallery";
import { LeadCta } from "./lead-cta";
import { SiteFooter } from "./footer";
import { FloatingActions } from "./floating-actions";
import { CookieConsent } from "./cookie-consent";

/**
 * Sultan Fatih K.12 ana sayfa — Kanca Modeli akışı (etik/"Kolaylaştırıcı"):
 * duyuru şeridi (tetikleyici) → başarı hero'su (değişken ödül) →
 * kampüs tercihi (yatırım) → hızlı erişim (mevcut veli alışkanlık yolu) →
 * eğitim → başarı duvarı → haberler → galeri lightbox →
 * ön kayıt bandı (sürtünmesiz eylem) → footer.
 * Detay: docs/hook-model-uygulama.md
 */
export default function SultanFatihHome() {
  return (
    <div id="top" className="min-h-screen bg-paper-white">
      <AnnouncementBar />
      <SiteNav />
      <main id="main-content">
        <Hero />
        <CampusStrip />
        <QuickAccessStrip />
        <ValuesGrid />
        <AchievementsWall />
        <NewsSection />
        <LifeGallery />
        <LeadCta />
        <PartnersStrip />
      </main>
      <SiteFooter />
      {/* Mobil sabit CTA barının footer içeriğini örtmemesi için boşluk */}
      <div aria-hidden className="h-20 bg-bumble-ink md:hidden" />
      <FloatingActions />
      <CookieConsent />
    </div>
  );
}

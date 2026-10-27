import { AnnouncementBar } from "./announcement";
import { SiteNav } from "./nav";
import { Hero } from "./hero";
import { CampusStrip } from "./campus-strip";
import { QuickAccessStrip } from "./sections";
import { LeadCta } from "./lead-cta";
import { SiteFooter } from "./footer";
import { FloatingActions } from "./floating-actions";
import { CookieConsent } from "./cookie-consent";

/** Sade ana sayfa: tanıtım, kampüs seçimi, hızlı erişim ve başvuru. */
export default function SultanFatihHome() {
  return (
    <div id="top" className="min-h-screen bg-paper-white">
      <AnnouncementBar />
      <SiteNav />
      <main id="main-content">
        <Hero />
        <CampusStrip />
        <QuickAccessStrip />
        <LeadCta />
      </main>
      <SiteFooter />
      {/* Mobil sabit CTA barının footer içeriğini örtmemesi için boşluk */}
      <div aria-hidden className="h-20 bg-bumble-ink md:hidden" />
      <FloatingActions />
      <CookieConsent />
    </div>
  );
}

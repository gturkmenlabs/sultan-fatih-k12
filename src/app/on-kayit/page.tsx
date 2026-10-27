import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, RotateCcw, ShieldCheck } from "lucide-react";
import { SiteNav } from "@/components/sites/sultanfatih/nav";
import { SiteFooter } from "@/components/sites/sultanfatih/footer";
import { PreRegistrationForm } from "@/components/sites/sultanfatih/on-kayit-form";
import { CookieConsent } from "@/components/sites/sultanfatih/cookie-consent";

export const metadata: Metadata = {
  title: "Ön Kayıt",
  description:
    "Sultan Fatih Koleji 2026–2027 ön kayıt başvurusu — Fatih ve Beylikdüzü kampüsleri için 3 kısa adımda başvurun, dilediğinizde kaldığınız yerden devam edin.",
  alternates: { canonical: "/on-kayit" },
};

const ASSURANCES = [
  { icon: Clock, label: "Yaklaşık 2 dakika sürer" },
  { icon: RotateCcw, label: "Ara verip kaldığınız yerden devam edebilirsiniz" },
  { icon: ShieldCheck, label: "KVKK kapsamında, yalnızca onayınızla" },
];

export default function PreRegistrationPage() {
  return (
    <div className="min-h-screen bg-paper-white">
      <SiteNav />
      <main id="main-content">
        <section className="bg-bumble-honey pb-28 pt-10 md:pt-14" aria-label="Ön kayıt tanıtımı">
          <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-paper-white/70 px-4 py-2 text-caption font-medium text-bumble-ink transition-colors hover:bg-paper-white"
            >
              <ArrowLeft size={15} aria-hidden />
              Ana sayfaya dön
            </Link>
            <h1 className="mt-8 text-heading-lg font-bold text-bumble-ink md:text-display">
              2026–2027 Ön Kayıt
            </h1>
            <p className="mt-4 max-w-2xl text-subheading text-bumble-ink/80">
              Fatih ve Beylikdüzü kampüslerimiz için ön kayıt başvurunuzu üç
              kısa adımda oluşturun. Başvurunuzun ardından ekibimiz tanışma
              ve kampüs turu için sizinle iletişime geçer.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {ASSURANCES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-paper-white px-4 py-2 text-caption font-medium text-bumble-ink shadow-sm"
                >
                  <Icon size={16} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative z-10 -mt-16 pb-20" aria-label="Ön kayıt formu">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <PreRegistrationForm />
          </div>
        </section>
      </main>
      <SiteFooter />
      <CookieConsent />
    </div>
  );
}

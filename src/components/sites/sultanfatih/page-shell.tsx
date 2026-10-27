import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnnouncementBar } from "./announcement";
import { SiteNav } from "./nav";
import { SiteFooter } from "./footer";
import { FloatingActions } from "./floating-actions";
import { CookieConsent } from "./cookie-consent";

/**
 * İç sayfa iskeleti — tüm kurumsal sayfalarda aynı ritim:
 * Top Bar → yapışkan nav → altın başlık bandı → içerik → footer.
 */
export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper-white">
      <AnnouncementBar />
      <SiteNav />
      <main id="main-content">
        <section className="bg-bumble-honey py-12 md:py-16" aria-label={title}>
          <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-paper-white/70 px-4 py-2 text-caption font-medium text-bumble-ink transition-colors hover:bg-paper-white"
            >
              <ArrowLeft size={15} aria-hidden />
              Ana sayfa
            </Link>
            <p className="mt-8 text-caption font-bold uppercase tracking-[0.14em] text-brand-blue">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-heading-lg font-bold text-bumble-ink md:text-display">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-subheading leading-relaxed text-bumble-ink/80">
              {description}
            </p>
          </div>
        </section>
        {children}
      </main>
      <SiteFooter />
      <div aria-hidden className="h-20 bg-primary-navy md:hidden" />
      <FloatingActions />
      <CookieConsent />
    </div>
  );
}

/** İç sayfa bölüm başlığı (ana sayfadaki ritimle aynı) */
export function PageSectionHeading({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-heading font-bold text-bumble-ink">{title}</h2>
      {desc && <p className="mt-3 max-w-2xl text-body leading-relaxed text-text-main">{desc}</p>}
    </div>
  );
}

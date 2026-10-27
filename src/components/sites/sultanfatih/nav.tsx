"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "./data";

/**
 * Yapışkan (sticky) üst bar — Bumble dili: beyaz logo kartı, aktif bölüm
 * beyaz pill, sağda koyu filled CTA. Yapışkan olması, her kaydırma
 * konumunda birincil eylemi (Ön Kayıt) tek tık uzağında tutar (Fogg
 * "Ability"). Aktif pill scrollspy ile gerçek bölümü gösterir.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — yalnızca sayfada bulunan bölümleri gözler (ana sayfa)
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.sectionId)
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const linkClass = (sectionId: string) =>
    active === sectionId
      ? "inline-block rounded-nav bg-paper-white px-5 py-2.5 text-body font-medium text-bumble-ink shadow-sm"
      : "inline-block rounded-nav px-5 py-2.5 text-body font-medium text-bumble-ink/80 transition-colors hover:bg-paper-white/50 hover:text-bumble-ink";

  return (
    <header
      className={`sticky top-0 z-50 bg-bumble-honey/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav
        aria-label="Ana menü"
        className="mx-auto flex max-w-[var(--page-max-width)] items-center gap-3 px-6 py-3 md:px-8"
      >
        <Link
          href="/"
          aria-label="Sultan Fatih Eğitim Kurumları ana sayfa"
          className="shrink-0 rounded-nav bg-paper-white p-2 shadow-sm transition-transform hover:scale-[1.02]"
        >
          <Image
            src="/sites/sultanfatih/brand/logo.png"
            alt="Özel Sultan Fatih Eğitim Kurumları"
            width={220}
            height={64}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.sectionId}>
              <Link
                href={item.href}
                aria-current={active === item.sectionId ? "true" : undefined}
                className={linkClass(item.sectionId)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href="https://translate.google.com/translate?sl=tr&tl=en&u=https://www.sultanfatih.k12.tr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Switch language to English"
            className="hidden items-center gap-2 rounded-nav px-4 py-2.5 text-body font-medium text-bumble-ink transition-colors hover:bg-paper-white/60 sm:flex"
          >
            <Globe size={18} strokeWidth={2} aria-hidden />
            <span className="hidden xl:inline">TR</span>
          </a>
          <Link
            href="/on-kayit"
            className="rounded-buttons bg-bumble-ink px-6 py-3 text-body font-medium tracking-[0.016em] text-paper-white transition-colors hover:bg-charcoal"
          >
            Ön Kayıt
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sfk-mobile-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="rounded-nav bg-paper-white p-2.5 shadow-sm lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="px-6 pb-4 lg:hidden">
          <div id="sfk-mobile-menu" className="rounded-cards bg-paper-white p-4 shadow-sm">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.sectionId}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-nav px-4 py-3 text-body font-medium text-bumble-ink transition-colors hover:bg-mist ${
                      active === item.sectionId ? "bg-mist" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

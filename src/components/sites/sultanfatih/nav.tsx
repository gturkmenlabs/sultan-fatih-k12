"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, MonitorSmartphone, Phone, X } from "lucide-react";
import { NAV_ITEMS, OFFICIAL } from "./data";

/**
 * Yapışkan (sticky) üst bar — altın zemin üzerinde beyaz logo kartı,
 * aktif sayfa beyaz pill, sağda lacivert Ön Kayıt CTA'sı.
 * Aktif durumu URL'den (usePathname) okur; her sayfada tutarlıdır.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const linkClass = (href: string) =>
    (pathname === href || pathname.startsWith(`${href}/`))
      ? "inline-block rounded-nav bg-paper-white px-3 py-2.5 text-body font-medium text-bumble-ink shadow-sm"
      : "inline-block rounded-nav px-3 py-2.5 text-body font-medium text-bumble-ink/80 transition-colors hover:bg-paper-white/50 hover:text-bumble-ink";

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
            className="h-auto w-[150px] sm:w-[180px] xl:w-[200px]"
          />
        </Link>

        <ul className="mx-auto hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={(pathname === item.href || pathname.startsWith(`${item.href}/`)) ? "page" : undefined}
                className={linkClass(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
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
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sfk-mobile-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="rounded-nav bg-paper-white p-2.5 shadow-sm xl:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="px-6 pb-4 xl:hidden">
          <div id="sfk-mobile-menu" className="rounded-cards bg-paper-white p-4 shadow-sm">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={(pathname === item.href || pathname.startsWith(`${item.href}/`)) ? "page" : undefined}
                    className={`block rounded-nav px-4 py-3 text-body font-medium text-bumble-ink transition-colors hover:bg-mist ${
                      (pathname === item.href || pathname.startsWith(`${item.href}/`)) ? "bg-mist" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-bumble-ink/10 pt-3">
                <a
                  href={OFFICIAL.k12net}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-nav px-4 py-3 text-body font-medium text-bumble-ink transition-colors hover:bg-mist"
                >
                  <MonitorSmartphone size={18} aria-hidden />
                  K12Net Veli Portalı
                </a>
              </li>
              <li>
                <a
                  href="tel:+902125312282"
                  className="flex items-center gap-2 rounded-nav px-4 py-3 text-body font-medium text-bumble-ink transition-colors hover:bg-mist"
                >
                  <Phone size={18} aria-hidden />
                  Hemen ara: 0212 531 22 82
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

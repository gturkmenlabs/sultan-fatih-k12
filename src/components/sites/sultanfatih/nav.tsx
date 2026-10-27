"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "./data";

/**
 * Floating borderless nav — Bumble dili:
 * beyaz zeminde logo kartı, aktif link beyaz pill, sağda koyu filled buton.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-[var(--page-max-width)] items-center gap-3 px-6 py-4 md:px-8">
        {/* Logo — beyaz kart (Bumble'in aktif pill dili) */}
        <a
          href="/"
          aria-label="Sultan Fatih Eğitim Kurumları ana sayfa"
          className="rounded-nav bg-paper-white p-2 shadow-sm transition-transform hover:scale-[1.02]"
        >
          <Image
            src="/sites/sultanfatih/brand/logo.png"
            alt="Özel Sultan Fatih Eğitim Kurumları"
            width={220}
            height={64}
            priority
            className="h-9 w-auto md:h-10"
          />
        </a>

        {/* Masaüstü menü — borderless, geniş aralıklı */}
        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  i === 1
                    ? "inline-block rounded-nav bg-paper-white px-6 py-2.5 text-body font-medium text-bumble-ink shadow-sm"
                    : "inline-block rounded-nav px-6 py-2.5 text-body font-medium text-bumble-ink/80 transition-colors hover:text-bumble-ink"
                }
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Sağ araç çubuğu */}
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
          <a
            href="https://www.sultanfatih.k12.tr/iletisim-bilgileri/on-kayit-formu"
            className="rounded-buttons bg-bumble-ink px-6 py-3 text-body font-medium tracking-[0.016em] text-paper-white transition-colors hover:bg-charcoal"
          >
            Ön Kayıt
          </a>
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

      {/* Mobil menü */}
      {open && (
        <div
          id="sfk-mobile-menu"
          className="mx-6 rounded-cards bg-paper-white p-6 shadow-sm lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block rounded-nav px-4 py-3 text-body font-medium text-bumble-ink transition-colors hover:bg-mist"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

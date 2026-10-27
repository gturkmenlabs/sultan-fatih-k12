"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, ClipboardList, MonitorSmartphone } from "lucide-react";
import { OFFICIAL } from "./data";

/**
 * Yüzen eylemler:
 * - Yukarı çık düğmesi (kaynak sitedeki kırmızı dairenin tema karşılığı)
 * - Mobil alt CTA barı: aday veli için Ön Kayıt, mevcut veli için K12Net.
 *   Başparmağın altında birincil eylem = Fogg "Ability"nin mobil karşılığı.
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      {showTop && (
        <button
          type="button"
          onClick={toTop}
          aria-label="Sayfanın başına dön"
          className="fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-bumble-ink text-paper-white shadow-sm transition-transform hover:scale-105 md:bottom-6 md:right-6"
        >
          <ArrowUp size={20} aria-hidden />
        </button>
      )}

      <nav
        aria-label="Hızlı işlemler"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-bumble-ink/10 bg-paper-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
      >
        <div className="flex gap-2">
          <Link
            href="/on-kayit"
            className="flex flex-1 items-center justify-center gap-2 rounded-buttons bg-bumble-ink px-4 py-3 text-body-sm font-semibold text-paper-white"
          >
            <ClipboardList size={17} aria-hidden />
            Ön Kayıt
          </Link>
          <a
            href={OFFICIAL.k12net}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-buttons bg-mist px-4 py-3 text-body-sm font-semibold text-bumble-ink"
          >
            <MonitorSmartphone size={17} aria-hidden />
            K12Net Girişi
          </a>
        </div>
      </nav>
    </>
  );
}

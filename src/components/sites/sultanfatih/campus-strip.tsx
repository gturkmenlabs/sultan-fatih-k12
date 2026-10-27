"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { CAMPUS } from "./data";
import { STORAGE_KEYS, removeStorage, useStoredString, writeStorage } from "./storage";

/**
 * Kampüs şeridi — honey hero'ya taşan kartlar + "Benim Kampüsüm" tercihi.
 *
 * Tercih, Kanca Modeli'nin Yatırım evresidir: veli küçük bir seçim yapar,
 * bu değer cihazda depolanır; ön kayıt formunda kampüs hazır seçili gelir
 * ve bir sonraki ziyarette kart öne çıkar (bir sonraki tetikleyici).
 */
export function CampusStrip() {
  const preferred = useStoredString(STORAGE_KEYS.campus);

  const choose = (title: string) => {
    if (preferred === title) {
      removeStorage(STORAGE_KEYS.campus);
    } else {
      writeStorage(STORAGE_KEYS.campus, title);
    }
  };

  return (
    <section id="kampusler" className="relative z-10 -mt-16" aria-label="Kampüslerimiz">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {CAMPUS.map((item) => {
            if (item.isCta) {
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block overflow-hidden rounded-cards bg-pollen p-3 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-mist">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="(min-width: 1280px) 370px, (min-width: 768px) 30vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between px-3 pb-1 pt-4">
                    <div>
                      <h2 className="text-subheading font-semibold text-bumble-ink">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-caption text-graphite">{item.caption}</p>
                    </div>
                    <ArrowUpRight size={20} className="text-bumble-ink" aria-hidden />
                  </div>
                </Link>
              );
            }

            const isPreferred = preferred === item.title;
            return (
              <article
                key={item.title}
                className={`overflow-hidden rounded-cards bg-paper-white p-3 shadow-sm transition-transform hover:-translate-y-1 ${
                  isPreferred ? "ring-2 ring-bumble-ink" : ""
                }`}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[16/9] w-full overflow-hidden rounded-xl bg-mist"
                  aria-label={`${item.title} sayfasını aç (yeni sekme)`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="(min-width: 1280px) 370px, (min-width: 768px) 30vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {isPreferred && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bumble-ink px-3 py-1.5 text-caption font-medium text-paper-white shadow-sm">
                      <Check size={14} aria-hidden />
                      Benim Kampüsüm
                    </span>
                  )}
                </a>
                <div className="px-3 pb-1 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-subheading font-semibold text-bumble-ink">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-caption text-graphite">{item.caption}</p>
                    </div>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.title} detayları (yeni sekme)`}
                      className="mt-1 rounded-full p-1 text-bumble-ink transition-colors hover:bg-mist"
                    >
                      <ArrowUpRight size={20} aria-hidden />
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => choose(item.title)}
                    aria-pressed={isPreferred}
                    className={`mt-4 w-full rounded-buttons px-4 py-2.5 text-caption font-semibold transition-colors ${
                      isPreferred
                        ? "bg-bumble-ink text-paper-white hover:bg-charcoal"
                        : "bg-mist text-bumble-ink hover:bg-bumble-honey"
                    }`}
                  >
                    {isPreferred ? "Tercihiniz kaydedildi" : "Benim kampüsüm olarak seç"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-4 min-h-6 text-caption text-graphite">
          {preferred
            ? `✓ ${preferred} tercihiniz bu cihazda kaydedildi — ön kayıt formunda kampüsünüz hazır seçili gelecek.`
            : "Kampüs tercihinizi seçerseniz bu cihazda hatırlanır; ön kayıt ve tanışma randevusu o kampüse göre planlanır."}
        </p>
      </div>
    </section>
  );
}

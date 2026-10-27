"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, ExternalLink } from "lucide-react";
import { ACHIEVEMENT_SLIDES, type AchievementCategory } from "./data";
import { Reveal } from "./reveal";

const ALL = "Tümü" as const;
type Filter = typeof ALL | AchievementCategory;
const INITIAL_COUNT = 6;

/**
 * Başarı duvarı — "Av" (keşif) ve "Kabile" (topluluk gururu) ödüllerinin
 * etik karşılığı: gerçek okul başarıları, kategori filtreleriyle
 * keşfedilebilir. Değişkenlik içerikten gelir; zorlama/bildirim yoktur.
 */
export function AchievementsWall() {
  const [filter, setFilter] = useState<Filter>(ALL);
  const [expanded, setExpanded] = useState(false);

  const categories = useMemo<Filter[]>(() => {
    const seen: AchievementCategory[] = [];
    for (const slide of ACHIEVEMENT_SLIDES) {
      if (!seen.includes(slide.category)) seen.push(slide.category);
    }
    return [ALL, ...seen];
  }, []);

  const filtered = useMemo(
    () =>
      filter === ALL
        ? ACHIEVEMENT_SLIDES
        : ACHIEVEMENT_SLIDES.filter((s) => s.category === filter),
    [filter]
  );

  const visible =
    filter === ALL && !expanded ? filtered.slice(0, INITIAL_COUNT) : filtered;
  const hiddenCount = filtered.length - visible.length;

  return (
    <section id="basarilar" className="py-16" aria-label="Başarılarımız">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-heading font-bold text-bumble-ink">Başarılarımız</h2>
          <p aria-live="polite" className="text-caption text-graphite">
            {filtered.length} başarı
            {filter !== ALL ? ` · ${filter}` : ""}
          </p>
        </div>

        <div role="group" aria-label="Başarı kategorisi filtresi" className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setFilter(cat);
                  setExpanded(false);
                }}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-caption font-medium transition-colors ${
                  isActive
                    ? "bg-bumble-ink text-paper-white"
                    : "bg-mist text-bumble-ink hover:bg-bumble-honey"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((slide) => {
              const external = slide.href.startsWith("http");
              return (
                <a
                  key={slide.src}
                  href={slide.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block overflow-hidden rounded-cards bg-paper-white p-3 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[64/25] overflow-hidden rounded-cards bg-mist">
                    <Image
                      src={slide.src}
                      alt={slide.label}
                      fill
                      sizes="(min-width: 768px) 50vw, 92vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-start gap-3 px-2 pb-1 pt-4">
                    <div className="min-w-0 flex-1">
                      <span className="inline-block rounded-full bg-bumble-honey px-2.5 py-1 text-[12px] font-semibold text-bumble-ink">
                        {slide.category}
                      </span>
                      <h3 className="mt-2 text-body font-semibold leading-snug text-bumble-ink">
                        {slide.label}
                      </h3>
                    </div>
                    {external && (
                      <ExternalLink size={18} aria-hidden className="mt-1 shrink-0 text-graphite" />
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </Reveal>

        {hiddenCount > 0 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 rounded-buttons bg-bumble-ink px-6 py-3 text-body font-medium text-paper-white transition-colors hover:bg-charcoal"
            >
              {hiddenCount} başarıyı daha göster
              <ChevronDown size={18} aria-hidden />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY } from "./data";

/**
 * Bento yerleşimi (8 fotoğraf): 1 büyük + 1 geniş + 6 standart hücre.
 * Mobilde ilk fotoğraf tam genişlikte açılır.
 */
const BENTO_SPANS = [
  "col-span-2 aspect-[16/9] md:col-span-2 md:row-span-2 md:aspect-auto md:h-full",
  "aspect-[4/3] md:aspect-auto md:h-full",
  "aspect-[4/3] md:aspect-auto md:h-full",
  "aspect-[4/3] md:aspect-auto md:h-full",
  "aspect-[4/3] md:aspect-auto md:h-full",
  "aspect-[4/3] md:col-span-2 md:aspect-auto md:h-full",
  "aspect-[4/3] md:aspect-auto md:h-full",
  "aspect-[4/3] md:aspect-auto md:h-full",
];

/**
 * "Sultan Fatih'te Yaşam" galerisi + sayfa içi lightbox.
 * Kaynak sitedeki Fancybox davranışının erişilebilir karşılığı:
 * ESC / ok tuşları, önceki-sonraki, odak yönetimi, scroll kilidi.
 * Eskiden fotoğraf yeni sekmede ham dosya olarak açılıyordu.
 */
export function LifeGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = GALLERY.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  useEffect(() => {
    if (openIndex === null) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, go]);

  const active = openIndex !== null ? GALLERY[openIndex] : null;

  return (
    <section id="yasam" className="py-16" aria-label="Sultan Fatih'te yaşam galerisi">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <div className="mb-10 flex items-baseline justify-between gap-6">
          <h2 className="text-heading font-bold text-bumble-ink">
            Sultan Fatih&apos;te Yaşam
          </h2>
          <p className="hidden text-caption text-graphite sm:block">
            Fotoğrafa tıklayarak büyütün
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:auto-rows-[210px] md:grid-cols-4">
          {GALLERY.map((photo, i) => (
            <button
              key={photo.thumb}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${photo.alt} — büyüt`}
              aria-haspopup="dialog"
              className={`group relative block overflow-hidden rounded-cards shadow-sm ${BENTO_SPANS[i] ?? "aspect-[4/3]"}`}
            >
              <Image
                src={photo.thumb}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 25vw, 46vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-paper-white/90 text-bumble-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              >
                <Expand size={15} />
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri — ${active.alt}`}
          className="sfk-dialog fixed inset-0 z-[80] flex items-center justify-center bg-onyx/95 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Galeriyi kapat"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper-white text-bumble-ink shadow-sm transition-transform hover:scale-105"
          >
            <X size={20} aria-hidden />
          </button>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Önceki fotoğraf"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper-white text-bumble-ink shadow-sm transition-transform hover:scale-105 md:left-6"
          >
            <ChevronLeft size={20} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Sonraki fotoğraf"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper-white text-bumble-ink shadow-sm transition-transform hover:scale-105 md:right-6"
          >
            <ChevronRight size={20} aria-hidden />
          </button>

          <figure className="w-full max-w-5xl">
            <div className="relative h-[68vh] w-full overflow-hidden rounded-cards bg-bumble-ink">
              <Image
                key={active.full}
                src={active.full}
                alt={active.alt}
                fill
                sizes="92vw"
                className="sfk-dialog-img object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-paper-white">
              <span aria-live="polite" className="text-body-sm">
                {active.alt}
              </span>
              <span className="shrink-0 text-caption text-paper-white/70">
                {openIndex + 1} / {count}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

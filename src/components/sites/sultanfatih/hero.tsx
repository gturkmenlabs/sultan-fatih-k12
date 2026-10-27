"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, ChevronLeft, ChevronRight, Medal, Bot, Trophy } from "lucide-react";
import { ACHIEVEMENT_SLIDES } from "./data";

const SLIDE_MS = 4500;

const STAT_PILLS = [
  { icon: Trophy, label: "LGS 2024 Başarı Tablosu" },
  { icon: Bot, label: "VEX Robotics Türkiye Şampiyonu" },
  { icon: Medal, label: "Bilim Olimpiyatları — 2 Madalya" },
];

/**
 * Honey full-bleed hero — dev wordmark + tilted başarı showcase'i.
 * Başarı resimleri sırayla (4,5 sn) çapraz fade + yavaş zoom ile geçer.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const count = ACHIEVEMENT_SLIDES.length;

  // prefers-reduced-motion: otomatik geçişi kapat, dursun (elle ilerletilebilir)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAutoPlay(false);
    }
  }, []);

  // Sırayla otomatik geçiş — hover/focus'ta duru
  useEffect(() => {
    if (!autoPlay || paused) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % count),
      SLIDE_MS
    );
    return () => clearInterval(timer);
  }, [autoPlay, paused, count]);

  const go = (delta: number) =>
    setIndex((i) => (i + delta + count) % count);
  const active = ACHIEVEMENT_SLIDES[index];

  return (
    <section className="relative bg-bumble-honey pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="mx-auto grid max-w-[var(--page-max-width)] items-center gap-16 px-6 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Sol: wordmark + tanıtım */}
        <div>
          <h1 className="font-bold text-hero-mark text-bumble-ink">
            <span className="block">SULTAN</span>
            <span className="block">FATİH</span>
          </h1>
          <p className="mt-6 max-w-md text-subheading text-bumble-ink/80">
            Fatih ve Beylikdüzü&apos;nün en başarılı koleji. Öğrencilerimizin
            kulüp, yarışma ve sınav başarıları ana sayfada
            sırayla ve animasyonlu olarak akar.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://www.sultanfatih.k12.tr/iletisim-bilgileri/on-kayit-formu"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-buttons bg-bumble-ink px-8 py-4 text-body font-medium tracking-[0.016em] text-paper-white transition-colors hover:bg-charcoal"
            >
              Ön Kayıt Yap
            </a>
            <a
              href="https://www.sultanfatih.k12.tr/Uploads/files/katalog.pdf"
              className="rounded-buttons px-6 py-4 text-body font-medium tracking-[0.016em] text-bumble-ink underline decoration-bumble-ink/40 decoration-2 underline-offset-4 transition-colors hover:decoration-bumble-ink"
            >
              Tanıtım Kataloğu
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Öne çıkan başarılar">
            {STAT_PILLS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full bg-paper-white px-4 py-2 text-caption font-medium text-bumble-ink shadow-sm"
              >
                <Icon size={16} strokeWidth={2} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Sağ: animasyonlu başarı vitrini */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Arkadaki pollen derinlık kartı (Bumble'in 5–8° eğik kart dili) */}
          <div
            aria-hidden
            className="absolute inset-x-4 -bottom-6 hidden h-40 rounded-cards bg-pollen md:block"
          />

          <div className="relative overflow-hidden rounded-cards bg-paper-white p-2 shadow-sm">
            {/* Gösterim penceresi — 2.56 poster oranı, metin kırpmadan */}
            <div className="relative aspect-[64/25] overflow-hidden rounded-cards bg-mist">
              {ACHIEVEMENT_SLIDES.map((slide, i) => (
                <a
                  key={slide.src}
                  href={slide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-hidden={i !== index}
                  tabIndex={i === index ? 0 : -1}
                  className={`sfk-slide absolute inset-0 ${i === index ? "is-active" : ""}`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.label}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 640px, 92vw"
                    className="sfk-slide-img object-cover"
                  />
                </a>
              ))}

              {/* Doğrulama rozeti — beyaz pill, ink metin + checkmark */}
              <p
                aria-live="polite"
                className="absolute bottom-3 left-3 right-16 inline-flex max-w-full items-center gap-2 self-start rounded-full bg-paper-white py-1.5 pl-3 pr-4 text-caption font-medium text-bumble-ink shadow-sm"
              >
                <CheckCircle2 size={15} strokeWidth={2.2} aria-hidden />
                <span className="truncate">{active.label}</span>
              </p>
            </div>
          </div>

          {/* Kontrol satırı — segment göstergeler + oklar + sayaç */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Önceki başarı"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-white text-bumble-ink shadow-sm transition-transform hover:scale-105"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>

            <div
              role="group"
              aria-label="Başarı gösterimi ilerlemesi"
              className="flex flex-1 items-center gap-1.5"
            >
              {ACHIEVEMENT_SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}. başarı sayfası — ${slide.label}`}
                  aria-current={i === index}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i === index
                      ? "bg-bumble-ink"
                      : "bg-bumble-ink/25 hover:bg-bumble-ink/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sonraki başarı"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-white text-bumble-ink shadow-sm transition-transform hover:scale-105"
            >
              <ChevronRight size={18} aria-hidden />
            </button>

            <span className="w-12 text-right text-caption text-bumble-ink/70">
              {String(index + 1).padStart(2, "0")}/{count}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

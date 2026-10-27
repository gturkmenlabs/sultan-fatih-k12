"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, ChevronRight, Medal, Bot, ShieldCheck, Trophy } from "lucide-react";
import { ACHIEVEMENT_SLIDES } from "./data";

const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/sites/sultanfatih/hero/hero-01.jpg": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-02.jpg": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-03.jpeg": {
    "width": 1600,
    "height": 625
  },
  "/sites/sultanfatih/hero/hero-04.jpg": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-05.png": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-06.png": {
    "width": 1200,
    "height": 469
  },
  "/sites/sultanfatih/hero/hero-07.jpg": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-08.jpeg": {
    "width": 1600,
    "height": 625
  },
  "/sites/sultanfatih/hero/hero-09.png": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-10.png": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-11.jpg": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-12.jpg": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-13.png": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-14.jpg": {
    "width": 1920,
    "height": 750
  },
  "/sites/sultanfatih/hero/hero-15.png": {
    "width": 1080,
    "height": 1350
  }
};

const SLIDE_MS = 4500;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
function getServerReducedMotion() {
  return false;
}

const STAT_PILLS = [
  { icon: Trophy, label: "LGS 2024 Başarı Tablosu" },
  { icon: Bot, label: "VEX Robotics Türkiye Şampiyonu" },
  { icon: Medal, label: "Bilim Olimpiyatları — 2 Madalya" },
];

/**
 * Başarı resimleri doğal en-boy oranıyla, kırpılmadan gösterilir.
 * Altında gezinme kontrolleri ve başvuru bağlantıları bulunur.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // prefers-reduced-motion: otomatik geçişi kapat (elle ilerletilebilir)
  const prefersReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );
  const autoPlay = !prefersReduced;
  const count = ACHIEVEMENT_SLIDES.length;

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
    <section aria-label="Tanıtım" className="relative bg-bumble-honey pb-24 pt-8 md:pb-32 md:pt-10">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        {/* ÜST: animasyonlu başarı vitrini — tam genişlik */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Arkadaki pollen derinlik kartı */}
          <div
            aria-hidden
            className="absolute inset-x-8 -bottom-4 hidden h-24 rounded-cards bg-pollen md:block"
          />

          <div className="relative overflow-hidden rounded-cards bg-paper-white p-2 shadow-lg">
            {/* Gösterim penceresi — 2.56 poster oranı, metin kırpmadan */}
            <div className="relative overflow-hidden rounded-cards bg-mist">
              {ACHIEVEMENT_SLIDES.map((slide, i) => (
                <a
                  key={slide.src}
                  href={slide.href}
                  {...(slide.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-hidden={i !== index}
                  tabIndex={i === index ? 0 : -1}
                  className={i === index ? "relative block" : "hidden"}
                >
                  <Image
                    src={slide.src}
                    alt={slide.label}
                    width={IMAGE_DIMENSIONS[slide.src].width}
                    height={IMAGE_DIMENSIONS[slide.src].height}
                    priority={i === 0}
                    sizes="(min-width: 1280px) 1216px, 92vw"
                    className="mx-auto h-auto max-w-full object-contain"
                  />
                </a>
              ))}

              {/* Doğrulama rozeti — beyaz pill, ink metin + checkmark */}
              <p
                aria-live="polite"
                className="relative mt-3 inline-flex max-w-full items-center gap-2 self-start rounded-full bg-paper-white py-1.5 pl-3 pr-4 text-caption font-medium text-bumble-ink shadow-sm"
              >
                <CheckCircle2 size={15} strokeWidth={2.2} aria-hidden />
                <span>{active.label}</span>
              </p>
            </div>
          </div>

          {/* Kontrol satırı — segment göstergeler + oklar + sayaç */}
          <div className="relative mt-6 flex items-center gap-3">
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

        {/* ALT: CTA satırı — görünür başlık/tanıtım yazısı kaldırıldı;
            h1 yalnızca ekran okuyucu ve SEO için tutulur */}
        <h1 className="sr-only">
          Özel Sultan Fatih Eğitim Kurumları — Sultan Fatih Koleji
        </h1>
        <div className="mt-12 flex flex-wrap items-start justify-between gap-8 md:mt-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/on-kayit"
                className="rounded-buttons bg-bumble-ink px-8 py-4 text-body font-medium tracking-[0.016em] text-paper-white transition-colors hover:bg-charcoal"
              >
                Ön Kayıt Yap
              </Link>
              <Link
                href="/kurumsal"
                className="rounded-buttons bg-paper-white px-6 py-4 text-body font-medium text-bumble-ink shadow-sm transition-colors hover:bg-mist"
              >
                Kurumumuzu Tanıyın
              </Link>
              <a
                href="https://www.sultanfatih.k12.tr/Uploads/files/katalog.pdf"
                className="rounded-buttons px-6 py-4 text-body font-medium tracking-[0.016em] text-bumble-ink underline decoration-bumble-ink/40 decoration-2 underline-offset-4 transition-colors hover:decoration-bumble-ink"
              >
                Tanıtım Kataloğu
              </a>
            </div>
            <p className="mt-4 flex max-w-md items-center gap-2 text-caption text-bumble-ink/70">
              <ShieldCheck size={16} aria-hidden className="shrink-0" />
              Ön kayıt 3 kısa adımdan oluşur; bilgileriniz KVKK kapsamında, yalnızca onayınızla işlenir.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label="Öne çıkan başarılar">
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
      </div>
    </section>
  );
}

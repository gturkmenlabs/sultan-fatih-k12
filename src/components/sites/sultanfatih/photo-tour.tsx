"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { CAMPUS, GALLERY } from "./data";

const TOUR_MS = 5000;
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

interface TourStop {
  src: string;
  thumb: string;
  label: string;
}

/**
 * Kampüs fotoğraf turu — rehberdeki 360° sanal tur hedefinin, eldeki
 * gerçek fotoğraflarla çalışan dürüst ilk sürümü. 360° çekimler
 * tamamlandığında bu bileşenin yerini aynı bölümde panorama görüntüleyici
 * alabilir (bkz. docs/tasarim-sistemi-ve-ia.md). Otomatik geçiş oynat/
 * duraklat düğmesiyle kullanıcı kontrolündedir.
 */
export function PhotoTour() {
  const stops = useMemo<TourStop[]>(() => {
    const campusStops = CAMPUS.filter((c) => !c.isCta).map((c) => ({
      src: c.image,
      thumb: c.image,
      label: `${c.title} — ${c.caption}`,
    }));
    const galleryStops = GALLERY.map((g) => ({
      src: g.full,
      thumb: g.thumb,
      label: g.alt,
    }));
    return [...campusStops, ...galleryStops];
  }, []);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hoverPaused, setHoverPaused] = useState(false);
  const prefersReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );
  const autoPlay = playing && !hoverPaused && !prefersReduced;
  const count = stops.length;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), TOUR_MS);
    return () => clearInterval(timer);
  }, [autoPlay, count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const active = stops[index];

  return (
    <div
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      <div className="relative overflow-hidden rounded-cards bg-primary-navy p-2 shadow-lg">
        <div className="relative aspect-[16/9] overflow-hidden rounded-cards bg-primary-navy md:aspect-[21/9]">
          {stops.map((stop, i) => (
            <div
              key={stop.src + i}
              aria-hidden={i !== index}
              className={`sfk-slide absolute inset-0 ${i === index ? "is-active" : ""}`}
            >
              <Image
                src={stop.src}
                alt={stop.label}
                fill
                priority={i === 0}
                sizes="(min-width: 1280px) 1216px, 92vw"
                className="sfk-slide-img object-cover"
              />
            </div>
          ))}

          <p
            aria-live="polite"
            className="absolute bottom-3 left-3 right-20 inline-flex max-w-full items-center gap-2 rounded-full bg-paper-white py-1.5 pl-3 pr-4 text-caption font-medium text-primary-navy shadow-sm"
          >
            <Camera size={15} aria-hidden className="shrink-0" />
            <span className="truncate">{active.label}</span>
          </p>
          <span className="absolute bottom-3 right-3 rounded-full bg-primary-navy/80 px-3 py-1.5 text-caption font-medium text-paper-white">
            {index + 1} / {count}
          </span>
        </div>
      </div>

      {/* Kontroller */}
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
          aria-label={playing ? "Otomatik turu duraklat" : "Otomatik turu oynat"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-navy text-paper-white shadow-sm transition-colors hover:bg-brand-blue"
        >
          {playing ? <Pause size={17} aria-hidden /> : <Play size={17} aria-hidden />}
        </button>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Önceki durak"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-white text-primary-navy shadow-sm transition-transform hover:scale-105"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>

        <div
          className="flex flex-1 gap-2 overflow-x-auto py-1"
          role="group"
          aria-label="Tur durakları"
        >
          {stops.map((stop, i) => (
            <button
              key={stop.thumb + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}. durak — ${stop.label}`}
              aria-current={i === index}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-photo transition-all ${
                i === index
                  ? "ring-2 ring-primary-navy ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={stop.thumb}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Sonraki durak"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-white text-primary-navy shadow-sm transition-transform hover:scale-105"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { ArrowUpRight, Bell, CalendarDays, FileText, UtensilsCrossed } from "lucide-react";
import { OFFICIAL } from "./data";
import { Reveal } from "./reveal";

const emptySubscribe = () => () => {};
function getTodayLabel() {
  return new Intl.DateTimeFormat("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}
function getServerTodayLabel() {
  return "";
}

/**
 * "Bugün Okulda" — mevcut veli/öğrenci senaryosunun (UX Matrix) karşılığı.
 * Yemek menüsü, akademik takvim ve duyuruların kayıt sistemi K12Net'tir;
 * bu şerit sahte/güncel olmayan veri yayımlamak yerine veliyi tek tıkla
 * doğru kaynağa taşır ve bugünün tarihini gösterir.
 */
const TILES = [
  {
    icon: UtensilsCrossed,
    title: "Yemek Menüsü",
    desc: "Bugünün menüsü K12Net'te",
    href: OFFICIAL.k12net,
  },
  {
    icon: CalendarDays,
    title: "Akademik Takvim",
    desc: "Sınav ve etkinlik tarihleri",
    href: OFFICIAL.k12net,
  },
  {
    icon: Bell,
    title: "Duyurular",
    desc: "Okuldan son bildirimler",
    href: OFFICIAL.k12net,
  },
  {
    icon: FileText,
    title: "Not & Devamsızlık",
    desc: "e-Okul ve K12Net üzerinden",
    href: "https://e-okul.meb.gov.tr/",
  },
] as const;

export function ParentToday() {
  const today = useSyncExternalStore(
    emptySubscribe,
    getTodayLabel,
    getServerTodayLabel
  );

  return (
    <section className="pt-12" aria-label="Bugün okulda — veli hızlı erişimi">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <Reveal>
          <div className="rounded-cards bg-primary-navy p-6 text-paper-white shadow-lg md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-heading-sm font-bold">Bugün Okulda</h2>
              <p aria-live="polite" className="text-caption font-medium text-bumble-honey">
                {today}
              </p>
            </div>
            <p className="mt-2 max-w-2xl text-body-sm leading-relaxed text-paper-white/75">
              Velilerimiz için günlük bilgiler veli portalımızda yayımlanır.
              Aşağıdaki kısayollar sizi tek tıkla ilgili ekrana taşır.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {TILES.map(({ icon: Icon, title, desc, href }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-cards bg-paper-white/10 p-4 transition-colors hover:bg-paper-white/20"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bumble-honey text-primary-navy">
                    <Icon size={19} aria-hidden />
                  </span>
                  <span className="mt-3 flex items-center gap-1 text-body-sm font-semibold">
                    {title}
                    <ArrowUpRight
                      size={15}
                      aria-hidden
                      className="text-paper-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                  <span className="mt-1 block text-caption leading-snug text-paper-white/70">
                    {desc}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

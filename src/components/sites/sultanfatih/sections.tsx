import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  Cpu,
  FlaskConical,
  Globe,
  GraduationCap,
  Languages,
  MonitorSmartphone,
} from "lucide-react";
import { NEWS, OFFICIAL, PROGRAM_BADGES, QUICK_ACCESS, VALUES, PARTNERS } from "./data";
import { Reveal } from "./reveal";

/* ------------------------------------------------------------------ */
/* Hızlı erişim — mevcut velinin günlük alışkanlık yolu (tek tık)      */
/* ------------------------------------------------------------------ */

const QUICK_ICONS = {
  portal: MonitorSmartphone,
  eokul: GraduationCap,
  katalog: BookOpen,
  kayit: ClipboardList,
} as const;

export function QuickAccessStrip() {
  return (
    <section className="pt-12" aria-label="Hızlı erişim">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {QUICK_ACCESS.map((item) => {
              const Icon = QUICK_ICONS[item.icon];
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bumble-honey text-bumble-ink">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 text-body-sm font-semibold text-bumble-ink">
                      {item.title}
                      <ArrowUpRight size={15} aria-hidden className="shrink-0 text-graphite" />
                    </span>
                    <span className="mt-0.5 block text-caption leading-snug text-graphite">
                      {item.desc}
                    </span>
                  </span>
                </>
              );
              const className =
                "flex items-center gap-3 rounded-cards bg-paper-white p-4 shadow-sm transition-transform hover:-translate-y-0.5";
              return item.external ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link key={item.title} href={item.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Değerler / eğitim kutuları — foto zemin + ink katman                */
/* ------------------------------------------------------------------ */

export function ValuesGrid() {
  return (
    <section id="egitim" className="py-16" aria-label="Eğitim ve değerler">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <SectionHeading title="Eğitimde Sultan Fatih" />
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((card) => (
              <a
                key={card.title}
                href={card.href}
                {...(card.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group relative block h-96 overflow-hidden rounded-cards"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 92vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/40 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 p-6 text-paper-white">
                  <span className="block text-subheading font-semibold">{card.title}</span>
                  <span className="mt-3 block space-y-1.5">
                    {card.items.map((line) => (
                      <span key={line} className="block text-caption text-paper-white/90">
                        • {line}
                      </span>
                    ))}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Bizden Haberler — foto sol, metin sağ feature kartları              */
/* ------------------------------------------------------------------ */

export function NewsSection() {
  return (
    <section id="haberler" className="py-16" aria-label="Bizden haberler">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <SectionHeading
          title="Bizden Haberler"
          action={{ label: "Tüm Haberler", href: OFFICIAL.news }}
        />
        <Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {NEWS.map((news) => (
              <a
                key={news.title}
                href={news.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 items-center gap-5 sm:grid-cols-[auto_minmax(0,1fr)] md:grid-cols-1 xl:grid-cols-[auto_minmax(0,1fr)] rounded-cards bg-paper-white p-6 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-cards sm:aspect-auto sm:h-32 sm:w-36 md:aspect-video md:h-auto md:w-full xl:aspect-auto xl:h-32 xl:w-36">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="(min-width: 1280px) 144px, (min-width: 768px) 45vw, (min-width: 640px) 144px, 85vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="inline-block rounded-full bg-mist px-2.5 py-1 text-[12px] font-semibold text-graphite">
                    {news.tag}
                  </span>
                  <h3 className="mt-2 text-subheading font-semibold text-bumble-ink">
                    {news.title}
                  </h3>
                  {news.spot && (
                    <p className="mt-2 text-body-sm text-graphite">{news.spot}</p>
                  )}
                  <span className="mt-4 inline-block text-caption font-semibold uppercase tracking-[0.02em] text-bumble-ink underline decoration-bumble-honey decoration-2 underline-offset-4">
                    Haberi oku
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Partner logo şeridi — mist bant üzerinde beyaz pill kartlar         */
/* ------------------------------------------------------------------ */

export function PartnersStrip() {
  return (
    <section className="bg-mist py-12" aria-label="Entegrasyon ve iş ortakları">
      <div className="mx-auto flex max-w-[var(--page-max-width)] flex-wrap items-center justify-center gap-6 px-6 md:justify-between md:px-8">
        {PARTNERS.map((partner) => (
          <a
            key={partner.alt}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center rounded-nav bg-paper-white px-6 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Image src={partner.image} alt={partner.alt} width={110} height={36} className="h-7 w-auto object-contain" />
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ortak parçalar                                                      */
/* ------------------------------------------------------------------ */

function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-10 flex items-baseline justify-between gap-6">
      <h2 className="text-heading font-bold text-bumble-ink">{title}</h2>
      {action && (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-body font-medium text-bumble-ink underline decoration-bumble-ink/30 decoration-2 underline-offset-4 transition-colors hover:decoration-bumble-ink"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Program rozetleri — haber/başarıyla belgelenen programlar           */
/* ------------------------------------------------------------------ */

const PROGRAM_ICONS = {
  dil: Languages,
  steam: Cpu,
  dunya: Globe,
  bilim: FlaskConical,
} as const;

export function ProgramBadges() {
  return (
    <section className="pb-4" aria-label="Öne çıkan programlarımız">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAM_BADGES.map((badge) => {
              const Icon = PROGRAM_ICONS[badge.icon];
              return (
                <article
                  key={badge.title}
                  className="rounded-cards bg-mist p-5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bumble-honey text-primary-navy">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-body font-semibold text-primary-navy">
                    {badge.title}
                  </h3>
                  <p className="mt-1.5 text-body-sm leading-relaxed text-text-main">
                    {badge.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

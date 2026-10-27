import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CAMPUS, NEWS, VALUES, GALLERY, PARTNERS } from "./data";

/* ------------------------------------------------------------------ */
/* Kampüs şeridi — honey hero'ya overlap eden beyaz kart provaları     */
/* ------------------------------------------------------------------ */

export function CampusStrip() {
  return (
    <section className="relative z-10 -mt-16" aria-label="Kampüsler">
      <div className="mx-auto grid max-w-[var(--page-max-width)] gap-6 px-6 md:grid-cols-3 md:px-8">
        {CAMPUS.map((item, i) => {
          const isCta = i === CAMPUS.length - 1;
          return (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block overflow-hidden rounded-cards p-3 shadow-sm transition-transform hover:-translate-y-1 ${
                isCta ? "bg-pollen" : "bg-paper-white"
              }`}
            >
              <div className="relative h-48 overflow-hidden rounded-cards">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 92vw"
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
            </a>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Değerler / eğitim kutuları — foto zemin + ink katman                */
/* ------------------------------------------------------------------ */

export function ValuesGrid() {
  return (
    <section className="py-16" aria-label="Eğitim ve değerler">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <SectionHeading title="Eğitimde Sultan Fatih" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((card) => (
            <Card key={card.title}>
              <a
                href={card.href}
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Feature kart — foto sol, metin sağ (Bumble'in 2 kolon feature'i)    */
/* ------------------------------------------------------------------ */

export function NewsSection() {
  return (
    <section className="py-16" aria-label="Bizden haberler">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <SectionHeading
          title="Bizden Haberler"
          action={{ label: "Tüm Haberler", href: "https://www.sultanfatih.k12.tr/haberler/okul-haberleri/" }}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {NEWS.map((news) => (
            <Card key={news.title}>
              <a
                href={news.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[auto_1fr] items-center gap-6 rounded-cards bg-paper-white p-6 shadow-sm"
              >
                <div className="relative h-36 w-44 overflow-hidden rounded-cards">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="176px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-subheading font-semibold text-bumble-ink">
                    {news.title}
                  </h3>
                  {news.spot && (
                    <p className="mt-2 text-body-sm text-graphite">{news.spot}</p>
                  )}
                  <span className="mt-4 inline-block text-caption font-semibold tracking-[0.02em] text-bumble-ink uppercase underline decoration-honey decoration-2 underline-offset-4">
                    Haberi oku
                  </span>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* "Sultan Fatih'te Yaşam" galerisi — 8 fotoan                         */
/* ------------------------------------------------------------------ */

export function LifeGallery() {
  return (
    <section className="py-16" aria-label="Sultan Fatih'te yaşam galerisi">
      <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
        <SectionHeading title="Sultan Fatih'te Yaşam" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((photo) => (
            <a
              key={photo.thumb}
              href={photo.full}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] overflow-hidden rounded-cards shadow-sm"
            >
              <Image
                src={photo.thumb}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 25vw, 46vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
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

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}

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

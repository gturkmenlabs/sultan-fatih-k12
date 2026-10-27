import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Backpack,
  Check,
  FlaskConical,
  GraduationCap,
  MapPin,
  Microscope,
} from "lucide-react";
import { PageShell, PageSectionHeading } from "@/components/sites/sultanfatih/page-shell";
import { Reveal } from "@/components/sites/sultanfatih/reveal";
import { LEVELS_DETAIL } from "@/components/sites/sultanfatih/data";

export const metadata: Metadata = {
  title: "Kademelerimiz",
  description:
    "Anaokulu, ilkokul, ortaokul, anadolu lisesi ve fen lisesi — Sultan Fatih'te her kademede eğitim yaklaşımı ve kampüs dağılımı.",
  alternates: { canonical: "/kademeler" },
};

const LEVEL_ICONS = {
  anaokulu: Baby,
  ilkokul: Backpack,
  ortaokul: FlaskConical,
  lise: GraduationCap,
  fen: Microscope,
} as const;

export default function LevelsPage() {
  return (
    <PageShell
      eyebrow="Kademelerimiz"
      title="Anaokulundan fen lisesine tek çatı"
      description="Her yaş grubunun gelişimsel ihtiyacına göre tasarlanmış programlar: oyunla başlayan keşif, LGS ve YKS'de sistemli hazırlığa ve bilim olimpiyatlarına uzanır."
    >
      {/* Karşılaştırma özeti */}
      <section className="py-16" aria-label="Kademe karşılaştırması">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <PageSectionHeading
            title="Hangi kademe, hangi kampüste?"
            desc="Kademe kartından doğrudan o kademe için ön kayıt oluşturabilirsiniz; formda seçiminiz hazır gelir."
          />
          <Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {LEVELS_DETAIL.map((level) => {
                const Icon = LEVEL_ICONS[level.icon];
                return (
                  <a
                    key={level.name}
                    href={`#${level.name.toLocaleLowerCase("tr-TR").replace(/\s+/g, "-")}`}
                    className="group rounded-cards bg-mist p-5 transition-colors hover:bg-bumble-honey"
                  >
                    <Icon size={24} aria-hidden className="text-brand-blue" />
                    <h3 className="mt-3 text-body font-semibold text-primary-navy">
                      {level.name}
                    </h3>
                    <p className="mt-1 flex items-start gap-1 text-caption leading-snug text-text-main">
                      <MapPin size={13} aria-hidden className="mt-0.5 shrink-0" />
                      {level.campuses.join(" · ")}
                    </p>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kademe detayları */}
      {LEVELS_DETAIL.map((level, i) => {
        const Icon = LEVEL_ICONS[level.icon];
        const slug = level.name.toLocaleLowerCase("tr-TR").replace(/\s+/g, "-");
        const reversed = i % 2 === 1;
        return (
          <section
            key={level.name}
            id={slug}
            aria-label={level.name}
            className={`py-14 ${reversed ? "bg-mist" : ""}`}
          >
            <div
              className={`mx-auto grid max-w-[var(--page-max-width)] items-center gap-10 px-6 md:px-8 lg:grid-cols-2 ${
                reversed ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-cards shadow-sm [direction:ltr]">
                <Image
                  src={level.image}
                  alt={`${level.name} — Sultan Fatih`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 92vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper-white px-3.5 py-1.5 text-caption font-semibold text-primary-navy shadow-sm">
                  <Icon size={15} aria-hidden />
                  {level.name}
                </span>
              </div>

              <div className="[direction:ltr]">
                <h2 className="text-heading font-bold text-primary-navy">{level.tagline}</h2>
                <p className="mt-4 text-body leading-relaxed text-text-main">{level.desc}</p>
                <ul className="mt-6 space-y-3">
                  {level.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-body text-primary-navy">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bumble-honey text-primary-navy">
                        <Check size={14} aria-hidden />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex items-center gap-2 text-caption font-medium text-text-main">
                  <MapPin size={15} aria-hidden />
                  {level.campuses.join(" ve ")} — kampüsler sayfasında gezin
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/on-kayit?kademe=${encodeURIComponent(level.name)}`}
                    className="inline-flex items-center gap-2 rounded-buttons bg-primary-navy px-6 py-3 text-body font-medium text-paper-white transition-colors hover:bg-brand-blue"
                  >
                    {level.name} için ön kayıt
                    <ArrowRight size={17} aria-hidden />
                  </Link>
                  <Link
                    href="/kampusler"
                    className="rounded-buttons px-5 py-3 text-body font-medium text-primary-navy underline decoration-primary-navy/30 decoration-2 underline-offset-4 transition-colors hover:decoration-primary-navy"
                  >
                    Kampüsleri inceleyin
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  HeartHandshake,
  Landmark,
  Music,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { PageShell, PageSectionHeading } from "@/components/sites/sultanfatih/page-shell";
import { Reveal } from "@/components/sites/sultanfatih/reveal";
import { ProgramBadges } from "@/components/sites/sultanfatih/sections";
import { VALUES } from "@/components/sites/sultanfatih/data";

export const metadata: Metadata = {
  title: "Kurumsal",
  description:
    "Özel Sultan Fatih Eğitim Kurumları kurumsal sayfaları: Genel Müdürün Mesajı, Vizyon & Misyon, E-Safety, Okul Marşı ve değerlerimiz.",
  alternates: { canonical: "/kurumsal" },
};

const CORPORATE_LINKS = [
  {
    icon: Sparkles,
    title: "Genel Müdürün Mesajı",
    desc: "Kurumumuzun eğitim anlayışını yönetimimizin kaleminden okuyun.",
    href: "/kurumsal/genel-mudurun-mesaji",
  },
  {
    icon: Landmark,
    title: "Vizyon & Misyon",
    desc: "Sultan Fatih'in kurumsal hedefleri ve eğitim ilkeleri.",
    href: "/kurumsal/vizyon-misyon",
  },
  {
    icon: ShieldCheck,
    title: "E-Safety",
    desc: "Öğrencilerimizin dijital güvenliğine ilişkin yaklaşımımız.",
    href: "/kurumsal/e-safety",
  },
  {
    icon: Music,
    title: "Okul Marşı",
    desc: "Sultan Fatih ruhunu anlatan marşımızı dinleyin/okuyun.",
    href: "/kurumsal/okul-marsimiz",
  },
  {
    icon: BookOpen,
    title: "Tanıtım Kataloğu",
    desc: "Okulumuzu tek bir PDF içinde ayrıntılı inceleyin.",
    href: "https://www.sultanfatih.k12.tr/Uploads/files/katalog.pdf",
  },
  {
    icon: HeartHandshake,
    title: "Destek Hizmetleri",
    desc: "Servis, yemek ve diğer destek süreçlerine dair bilgiler.",
    href: "/kurumsal/destek-hizmetleri",
  },
] as const;

export default function CorporatePage() {
  const valuesCard = VALUES.find((v) => v.title === "Değerler Eğitimi");

  return (
    <PageShell
      eyebrow="Kurumsal"
      title="Köklü gelenek, yenilikçi eğitim"
      description="Özel Sultan Fatih Eğitim Kurumları; Fatih ve Beylikdüzü kampüslerinde anaokulundan fen lisesine, akademik başarıyı değerler eğitimiyle birlikte büyütür."
    >
      {/* Kurumsal sayfa kartları */}
      <section className="py-16" aria-label="Kurumsal sayfalar">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <PageSectionHeading
            title="Kurumsal sayfalarımız"
            desc="Kurumsal başlıklarımızı aşağıdaki sayfalardan inceleyebilirsiniz."
          />
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CORPORATE_LINKS.map(({ icon: Icon, title, desc, href }) => (
                <Link
                  key={title}
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group rounded-cards bg-paper-white p-6 shadow-sm ring-1 ring-primary-navy/5 transition-transform hover:-translate-y-0.5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bumble-honey text-primary-navy">
                    <Icon size={20} aria-hidden />
                  </span>
                  <h3 className="mt-4 flex items-center gap-1.5 text-body font-semibold text-primary-navy">
                    {title}
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="text-text-main/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </h3>
                  <p className="mt-1.5 text-body-sm leading-relaxed text-text-main">{desc}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Değerlerimiz */}
      {valuesCard && (
        <section className="bg-mist py-16" aria-label="Değerlerimiz">
          <div className="mx-auto grid max-w-[var(--page-max-width)] items-center gap-10 px-6 md:px-8 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-cards shadow-sm">
              <Image
                src={valuesCard.image}
                alt="Değerler eğitimi — Sultan Fatih"
                fill
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-heading font-bold text-primary-navy">Değerlerimiz</h2>
              <p className="mt-4 text-body leading-relaxed text-text-main">
                Akademik başarı kadar karakter gelişimini de önemseriz.
                Değerler eğitimi programımız; milli ve manevi değerleri,
                evrensel erdemlerle birlikte günlük okul yaşamının parçası
                hâline getirir.
              </p>
              <ul className="mt-6 space-y-3">
                {valuesCard.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body text-primary-navy">
                    <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bumble-honey text-caption font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={valuesCard.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-block rounded-buttons bg-primary-navy px-6 py-3 text-body font-medium text-paper-white transition-colors hover:bg-brand-blue"
              >
                Değerler Eğitimi sayfamız
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Program rozetleri */}
      <div className="pt-16">
        <ProgramBadges />
      </div>

      {/* Topluluk: mezunlar & kariyer */}
      <section className="py-16" aria-label="Mezunlar ve kariyer">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <PageSectionHeading title="Topluluğumuz" />
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-cards bg-primary-navy p-7 text-paper-white">
              <Users size={26} aria-hidden className="text-bumble-honey" />
              <h3 className="mt-4 text-subheading font-semibold">Mezunlarımız</h3>
              <p className="mt-2 text-body-sm leading-relaxed text-paper-white/75">
                Öğrencilerimizin ve mezunlarımızın başarı öykülerini
                başarı vitrinimizde ve sosyal medya hesaplarımızda
                paylaşıyoruz. Topluluğumuzdan haberdar olmak için bizi
                takip edin.
              </p>
              <Link
                href="/#basarilar"
                className="mt-5 inline-block rounded-buttons bg-bumble-honey px-5 py-2.5 text-body-sm font-semibold text-primary-navy transition-colors hover:bg-pollen"
              >
                Başarı öykülerine göz atın
              </Link>
            </article>
            <article className="rounded-cards bg-mist p-7">
              <Briefcase size={26} aria-hidden className="text-brand-blue" />
              <h3 className="mt-4 text-subheading font-semibold text-primary-navy">
                Ekibimize katılın
              </h3>
              <p className="mt-2 text-body-sm leading-relaxed text-text-main">
                Öğretmen ve idari kadro başvuruları resmî sitemizdeki İnsan
                Kaynakları kanalı üzerinden alınır. Güncel duyurular için
                resmî sitemizi ziyaret edin.
              </p>
              <a
                href="https://www.sultanfatih.k12.tr/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-buttons bg-primary-navy px-5 py-2.5 text-body-sm font-semibold text-paper-white transition-colors hover:bg-brand-blue"
              >
                Resmî site — İnsan Kaynakları
              </a>
            </article>
          </div>

          {/* Vakıf */}
          <div className="mt-4 flex flex-wrap items-center gap-5 rounded-cards bg-paper-white p-6 shadow-sm ring-1 ring-primary-navy/5">
            <Image
              src="/sites/sultanfatih/partners/vakif.png"
              alt="Tilmih Vakfı"
              width={140}
              height={44}
              className="h-9 w-auto object-contain"
            />
            <p className="min-w-56 flex-1 text-body-sm leading-relaxed text-text-main">
              <strong className="text-primary-navy">Tilmih Vakfı</strong>,
              kurumumuzun paydaşları arasındadır. Vakıf hakkında ayrıntılı
              bilgiye vakfın resmî sitesinden ulaşabilirsiniz.
            </p>
            <a
              href="https://www.tilmihvakfi.org.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-buttons bg-mist px-5 py-2.5 text-body-sm font-semibold text-primary-navy transition-colors hover:bg-bumble-honey"
            >
              tilmihvakfi.org.tr
              <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

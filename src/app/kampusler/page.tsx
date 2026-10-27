import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Camera, MapPin, Phone } from "lucide-react";
import { PageShell, PageSectionHeading } from "@/components/sites/sultanfatih/page-shell";
import { CampusPreference } from "@/components/sites/sultanfatih/campus-strip";
import { PhotoTour } from "@/components/sites/sultanfatih/photo-tour";
import { Reveal } from "@/components/sites/sultanfatih/reveal";
import { CAMPUS_DETAIL } from "@/components/sites/sultanfatih/data";

export const metadata: Metadata = {
  title: "Kampüslerimiz",
  description:
    "Fatih ve Beylikdüzü kampüsleri: kademeler, fotoğraf turu ve yol tarifi. Kampüsünüzü seçin, ön kaydınızı o kampüse göre oluşturun.",
  alternates: { canonical: "/kampusler" },
};

export default function CampusesPage() {
  return (
    <PageShell
      eyebrow="Kampüs & Fiziki İmkânlar"
      title="İki kampüs, tek Sultan Fatih"
      description="Fatih ve Beylikdüzü kampüslerimizde aynı eğitim anlayışı, her kademeye uygun öğrenme ortamlarıyla buluşur. Önce fotoğraflarla gezin, sonra yerinde görün."
    >
      {/* Kampüs kartları */}
      <section id="kampusler" className="py-16" aria-label="Kampüsler">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <PageSectionHeading
            title="Kampüslerimiz"
            desc="Her kampüsün kademe dağılımını inceleyin; size uygun kampüs için doğrudan ön kayıt oluşturun (tercihiniz formda hazır gelir)."
          />
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              {CAMPUS_DETAIL.map((campus) => (
                <article
                  key={campus.name}
                  className="overflow-hidden rounded-cards bg-paper-white p-3 shadow-sm ring-1 ring-primary-navy/5"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-cards">
                    <Image
                      src={campus.image}
                      alt={campus.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 92vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-paper-white px-3.5 py-1.5 text-caption font-semibold text-primary-navy shadow-sm">
                      <MapPin size={14} aria-hidden />
                      {campus.district}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-heading-sm font-bold text-primary-navy">
                      {campus.name}
                    </h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-text-main">
                      {campus.blurb}
                    </p>
                    <address className="mt-3 space-y-1 not-italic">
                      <span className="block text-body-sm text-text-main">{campus.address}</span>
                      <a
                        href={`tel:+90${campus.phones[0].replace(/\D/g, "").replace(/^0/, "")}`}
                        className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-primary-navy hover:underline"
                      >
                        <Phone size={14} aria-hidden />
                        {campus.phones[0]}
                      </a>
                    </address>

                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${campus.name} kademeleri`}>
                      {campus.levels.map((level) => (
                        <li
                          key={level}
                          className="rounded-full bg-mist px-3 py-1.5 text-caption font-semibold text-brand-blue"
                        >
                          {level}
                        </li>
                      ))}
                    </ul>

                    <CampusPreference name={campus.name} />

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/on-kayit?kampus=${encodeURIComponent(campus.name)}`}
                        className="inline-flex items-center gap-2 rounded-buttons bg-primary-navy px-5 py-2.5 text-body-sm font-semibold text-paper-white transition-colors hover:bg-brand-blue"
                      >
                        Bu kampüse ön kayıt
                        <ArrowRight size={16} aria-hidden />
                      </Link>
                      <a
                        href={campus.mapSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-buttons bg-mist px-5 py-2.5 text-body-sm font-semibold text-primary-navy transition-colors hover:bg-bumble-honey"
                      >
                        <MapPin size={16} aria-hidden />
                        Yol tarifi al
                      </a>
                      <a
                        href={campus.officialHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-body-sm font-medium text-primary-navy underline decoration-primary-navy/30 decoration-2 underline-offset-4 hover:decoration-primary-navy"
                      >
                        Kampüs sayfası
                        <ArrowUpRight size={15} aria-hidden />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fotoğraf turu */}
      <section id="tur" className="bg-mist py-16" aria-label="Kampüs fotoğraf turu">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <PageSectionHeading
            title="Kampüsü fotoğraflarla gezin"
            desc="Sultan Fatih'te yaşamdan karelerle hazırladığımız turu kendi hızınızda dolaşın. Otomatik geçişi dilediğiniz an duraklatabilirsiniz."
          />
          <div className="mb-6 flex items-center gap-2 text-caption font-medium text-text-main">
            <Camera size={16} aria-hidden />
            360° sanal tur çekimlerimiz tamamlandığında bu alan panorama
            görüntüleyiciyle güncellenecektir.
          </div>
          <PhotoTour />

          <div className="mt-10 rounded-cards bg-primary-navy p-7 text-paper-white md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <h3 className="text-subheading font-semibold">
                Fotoğraflar yetmez — gelin yerinde görün
              </h3>
              <p className="mt-2 max-w-xl text-body-sm leading-relaxed text-paper-white/75">
                Ön kaydınızı oluşturun; seçtiğiniz kampüste tanışma ve kampüs
                turunuzu birlikte planlayalım.
              </p>
            </div>
            <Link
              href="/on-kayit"
              className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-buttons bg-bumble-honey px-6 py-3 text-body font-semibold text-primary-navy transition-colors hover:bg-pollen md:mt-0"
            >
              Tanışma için ön kayıt
              <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

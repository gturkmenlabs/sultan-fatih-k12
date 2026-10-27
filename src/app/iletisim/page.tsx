import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ClipboardList, Mail, MapPin, MonitorSmartphone, Phone } from "lucide-react";
import { PageShell, PageSectionHeading } from "@/components/sites/sultanfatih/page-shell";
import { LeadCta } from "@/components/sites/sultanfatih/lead-cta";
import { Reveal } from "@/components/sites/sultanfatih/reveal";
import { CAMPUS_DETAIL, OFFICIAL, SCHOOL } from "@/components/sites/sultanfatih/data";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Sultan Fatih Koleji iletişim: Fatih ve Beylikdüzü kampüsleri, yol tarifi, sizi arayalım formu ve veli portalı bağlantıları.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="İletişim"
      title="Bize ulaşın, sizi arayalım"
      description="Size en uygun kanalı seçin: kampüslerimizi ziyaret edin, yol tarifi alın ya da kısacık formu doldurun — öğrenci işlerimiz sizinle iletişime geçsin."
    >
      {/* Kampüs iletişim kartları */}
      <section className="py-16" aria-label="Kampüs iletişim bilgileri">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <PageSectionHeading
            title="Kampüslerimiz"
            desc="Kampüs adres ve telefonları aşağıdadır; dokunarak hemen arayabilir veya yol tarifi alabilirsiniz. Birim bazlı ayrıntılar resmî iletişim sayfamızdadır."
          />
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              {CAMPUS_DETAIL.map((campus) => (
                <article
                  key={campus.name}
                  className="grid overflow-hidden rounded-cards bg-paper-white shadow-sm ring-1 ring-primary-navy/5 sm:grid-cols-[220px_1fr]"
                >
                  <div className="relative min-h-44">
                    <Image
                      src={campus.image}
                      alt={campus.name}
                      fill
                      sizes="(min-width: 640px) 220px, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-brand-blue">
                      <MapPin size={14} aria-hidden />
                      {campus.district}
                    </p>
                    <h3 className="mt-2 text-subheading font-bold text-primary-navy">
                      {campus.name}
                    </h3>
                    <p className="mt-1.5 text-body-sm text-text-main">
                      {campus.levels.join(" · ")}
                    </p>
                    <address className="mt-3 space-y-1.5 not-italic">
                      <span className="block text-body-sm leading-relaxed text-text-main">
                        {campus.address}
                      </span>
                      {campus.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:+90${phone.replace(/\D/g, "").replace(/^0/, "")}`}
                          className="flex items-center gap-2 text-body-sm font-semibold text-primary-navy hover:underline"
                        >
                          <Phone size={15} aria-hidden />
                          {phone}
                        </a>
                      ))}
                      <a
                        href={`mailto:${SCHOOL.email}`}
                        className="flex items-center gap-2 text-body-sm font-medium text-brand-blue hover:underline"
                      >
                        <Mail size={15} aria-hidden />
                        {SCHOOL.email}
                      </a>
                    </address>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href={campus.mapSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-buttons bg-mist px-4 py-2 text-body-sm font-semibold text-primary-navy transition-colors hover:bg-bumble-honey"
                      >
                        <MapPin size={15} aria-hidden />
                        Yol tarifi
                      </a>
                      <a
                        href={campus.officialHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-buttons bg-mist px-4 py-2 text-body-sm font-semibold text-primary-navy transition-colors hover:bg-bumble-honey"
                      >
                        Kampüs sayfası
                        <ArrowUpRight size={15} aria-hidden />
                      </a>
                      <Link
                        href={`/on-kayit?kampus=${encodeURIComponent(campus.name)}`}
                        className="inline-flex items-center gap-1.5 rounded-buttons bg-primary-navy px-4 py-2 text-body-sm font-semibold text-paper-white transition-colors hover:bg-brand-blue"
                      >
                        Ön kayıt
                        <ArrowRight size={15} aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          {/* Hızlı kanallar */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <a
              href="https://www.sultanfatih.k12.tr/iletisim-bilgileri/iletisim-bilgilerimiz"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-cards bg-mist p-6 transition-colors hover:bg-bumble-honey"
            >
              <h3 className="flex items-center gap-1.5 text-body font-semibold text-primary-navy">
                Resmî iletişim sayfamız
                <ArrowUpRight size={16} aria-hidden />
              </h3>
              <p className="mt-1.5 text-body-sm leading-relaxed text-text-main">
                Telefon, adres ve birim iletişim bilgileri için resmî
                sayfamızı kullanın.
              </p>
            </a>
            <a
              href={OFFICIAL.k12net}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-cards bg-mist p-6 transition-colors hover:bg-bumble-honey"
            >
              <h3 className="flex items-center gap-2 text-body font-semibold text-primary-navy">
                <MonitorSmartphone size={18} aria-hidden />
                Mevcut velilerimiz
              </h3>
              <p className="mt-1.5 text-body-sm leading-relaxed text-text-main">
                Not, duyuru ve randevu işlemleriniz için K12Net veli
                portalına giriş yapın.
              </p>
            </a>
            <Link
              href="/on-kayit"
              className="rounded-cards bg-primary-navy p-6 text-paper-white transition-colors hover:bg-brand-blue"
            >
              <h3 className="flex items-center gap-2 text-body font-semibold">
                <ClipboardList size={18} aria-hidden />
                Aday velilerimiz
              </h3>
              <p className="mt-1.5 text-body-sm leading-relaxed text-paper-white/75">
                Ön kayıt formunu doldurun; tanışma ve kampüs turunuzu
                birlikte planlayalım.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Sizi arayalım */}
      <LeadCta />
    </PageShell>
  );
}

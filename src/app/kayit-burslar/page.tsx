import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Award, BellRing, ChevronDown } from "lucide-react";
import { PageShell, PageSectionHeading } from "@/components/sites/sultanfatih/page-shell";
import { LeadCta } from "@/components/sites/sultanfatih/lead-cta";
import { Reveal } from "@/components/sites/sultanfatih/reveal";
import { FAQ_ITEMS, REGISTRATION_STEPS } from "@/components/sites/sultanfatih/data";

export const metadata: Metadata = {
  title: "Kayıt & Burslar",
  description:
    "Sultan Fatih Koleji kayıt süreci adım adım: ön kayıt, tanışma, öğrenci tanıma ve kesin kayıt. Burs olanakları ve sık sorulan sorular.",
  alternates: { canonical: "/kayit-burslar" },
};

export default function AdmissionPage() {
  return (
    <PageShell
      eyebrow="Kayıt & Burslar"
      title="Kayıt süreci, baştan sona şeffaf"
      description="Ön kayıttan kesin kayda kadar dört net adım. Koşullar tanışma görüşmesinde açıkça paylaşılır; kararınızı okulu yerinde görerek verirsiniz."
    >
      {/* Süreç adımları */}
      <section className="py-16" aria-label="Kayıt süreç rehberi">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <PageSectionHeading
            title="Süreç rehberi"
            desc="Her adımda ne olacağını önceden bilin. İlk adım yalnızca birkaç dakikanızı alır ve taslağınız cihazınızda saklanır."
          />
          <Reveal>
            <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {REGISTRATION_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className={`rounded-cards p-6 ${
                    i === 0
                      ? "bg-primary-navy text-paper-white"
                      : "bg-paper-white shadow-sm ring-1 ring-primary-navy/5"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-body font-bold ${
                      i === 0
                        ? "bg-bumble-honey text-primary-navy"
                        : "bg-mist text-brand-blue"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <h3
                    className={`mt-4 text-body font-semibold ${
                      i === 0 ? "text-paper-white" : "text-primary-navy"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-2 text-body-sm leading-relaxed ${
                      i === 0 ? "text-paper-white/75" : "text-text-main"
                    }`}
                  >
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="mt-8">
            <Link
              href="/on-kayit"
              className="inline-flex items-center gap-2 rounded-buttons bg-primary-navy px-7 py-3.5 text-body font-medium text-paper-white transition-colors hover:bg-brand-blue"
            >
              1. adım: Ön kaydımı oluştur
              <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Burslar */}
      <section className="bg-mist py-16" aria-label="Burs ve indirim olanakları">
        <div className="mx-auto max-w-[var(--page-max-width)] px-6 md:px-8">
          <PageSectionHeading
            title="Burs & başarı indirimleri"
            desc="Başarıyı ödüllendirmeyi önemseriz. Güncel koşul ve oranlar dönemlere göre değiştiği için ayrıntılar öğrenci işlerimizden ve haber duyurularımızdan paylaşılır."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-cards bg-paper-white p-7 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bumble-honey text-primary-navy">
                <Award size={21} aria-hidden />
              </span>
              <h3 className="mt-4 text-subheading font-semibold text-primary-navy">
                LGS başarısını ödüllendiriyoruz
              </h3>
              <p className="mt-2 text-body-sm leading-relaxed text-text-main">
                LGS sonuçlarına göre indirim olanakları sunulur. Güncel
                oranları okulumuzu arayarak veya tanışma görüşmenizde
                öğrenebilirsiniz.
              </p>
              <a
                href="https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/lgs-basarisini-odullendiriyoruz-10"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-body-sm font-semibold text-primary-navy underline decoration-bumble-honey decoration-2 underline-offset-4"
              >
                Haberi okuyun
                <ArrowUpRight size={15} aria-hidden />
              </a>
            </article>

            <article className="rounded-cards bg-primary-navy p-7 text-paper-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bumble-honey text-primary-navy">
                <BellRing size={21} aria-hidden />
              </span>
              <h3 className="mt-4 text-subheading font-semibold">
                Bursluluk sınavı duyurusunda haber verelim
              </h3>
              <p className="mt-2 text-body-sm leading-relaxed text-paper-white/75">
                Bursluluk sınavı tarihi duyurulduğunda bilgilendirilmek
                isterseniz kısacık formda başvuru türü olarak
                &ldquo;Bursluluk sınavı bilgilendirmesi&rdquo;ni seçin ve
                iletişim izni verin. İzninizi dilediğiniz an geri
                alabilirsiniz.
              </p>
              <Link
                href="/on-kayit?tip=burs"
                className="mt-5 inline-flex items-center gap-2 rounded-buttons bg-bumble-honey px-5 py-2.5 text-body-sm font-semibold text-primary-navy transition-colors hover:bg-pollen"
              >
                Bilgilendirme listesine katıl
                <ArrowRight size={16} aria-hidden />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Sizi arayalım + mini form */}
      <LeadCta />

      {/* SSS */}
      <section className="py-16" aria-label="Sık sorulan sorular">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <PageSectionHeading
            title="Sık sorulan sorular"
            desc="Aklınıza takılan başka bir soru olursa ön kayıt formundaki not alanına yazabilirsiniz; tanışma görüşmesinde birlikte konuşuruz."
          />
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="group rounded-cards bg-paper-white shadow-sm ring-1 ring-primary-navy/5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-body font-semibold text-primary-navy [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown
                    size={19}
                    aria-hidden
                    className="shrink-0 text-text-main/60 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-body-sm leading-relaxed text-text-main">{item.a}</p>
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-body-sm font-semibold text-primary-navy underline decoration-bumble-honey decoration-2 underline-offset-4"
                    >
                      {item.hrefLabel ?? "Ayrıntılar"}
                      <ArrowUpRight size={15} aria-hidden />
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

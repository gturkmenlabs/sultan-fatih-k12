import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/sites/sultanfatih/page-shell";

const pages: Record<string, { title: string; description: string; paragraphs: string[]; pending: string }> = {
  "genel-mudurun-mesaji": {
    title: "Genel Müdürün Mesajı",
    description: "Kurum yönetimimizin mesajı için ayrılan kurumsal sayfa.",
    paragraphs: [],
    pending: "Genel müdürümüzün onaylı mesaj metni henüz bu siteye aktarılmadı. İmzalı mesaj ve yönetici bilgileri kurum tarafından sağlandığında burada yayımlanacaktır.",
  },
  "vizyon-misyon": {
    title: "Vizyon & Misyon",
    description: "Kurumumuzun eğitim yaklaşımı ve değerleri.",
    paragraphs: ["Sultan Fatih Eğitim Kurumlarını, eğitim kademelerimizi ve değerler eğitimi yaklaşımımızı Kurumsal ve Kademeler sayfalarımızdan inceleyebilirsiniz."],
    pending: "Kurumun resmî vizyon ve misyon metinleri henüz bu siteye aktarılmadı. Bu sayfada kurum adına yeni bir vizyon veya misyon beyanı oluşturulmamıştır.",
  },
  "e-safety": {
    title: "E-Safety",
    description: "Dijital güvenlik konusunda aileler için genel bilgilendirme.",
    paragraphs: ["Çocuklarla güçlü ve benzersiz parolalar kullanma, kişisel bilgileri paylaşmama ve tanımadıkları kişilerden gelen bağlantılara dikkat etme konularını konuşun.", "Siber zorbalık veya şüpheli bir içerikle karşılaşıldığında kanıtları saklayın, ilgili platformun bildirim araçlarını kullanın ve okul ile iletişime geçin. Bu öneriler genel bilgilendirmedir; kurumun resmî güvenlik politikası yerine geçmez."],
    pending: "Kurumun onaylı E-Safety politikası ve ilgili belgeleri henüz bu siteye aktarılmadı.",
  },
  "okul-marsimiz": {
    title: "Okul Marşı",
    description: "Sultan Fatih okul marşı için ayrılan sayfa.",
    paragraphs: [],
    pending: "Okul marşının onaylı sözleri ve ses kaydı henüz bu siteye aktarılmadı. Doğrulanmış kayıt sağlandığında bu sayfadan dinlenebilecektir.",
  },
  "destek-hizmetleri": {
    title: "Destek Hizmetleri",
    description: "Servis, yemek ve okul yaşamına ilişkin bilgi talepleri.",
    paragraphs: ["Servis güzergâhları, yemek hizmeti ve diğer destek süreçlerine ilişkin güncel bilgileri ilgili kampüsün iletişim kanallarından talep edebilirsiniz.", "Servis güzergâhı ve saatleri, ücretlendirme, yemek menüsü veya alerjen bilgisi için kampüsünüzle doğrudan görüşün. Doğrulanmamış menü, ücret veya hizmet taahhüdü bu sayfada yayımlanmaz."],
    pending: "Kurumun onaylı destek hizmetleri açıklaması ve güncel belgeleri henüz bu siteye aktarılmadı.",
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return page ? { title: page.title, description: page.description, alternates: { canonical: `/kurumsal/${slug}` } } : {};
}

export default async function CorporateDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return (
    <PageShell eyebrow="Kurumsal" title={page.title} description={page.description}>
      <section className="mx-auto max-w-[var(--page-max-width)] px-6 py-16 md:px-8">
        <article className="max-w-3xl space-y-6 text-body leading-relaxed text-text-main">
          {page.paragraphs.map((text) => <p key={text}>{text}</p>)}
          <div role="note" className="rounded-cards bg-mist p-6 ring-1 ring-primary-navy/10">
            <h2 className="mb-2 text-subheading font-semibold text-primary-navy">İçerik durumu</h2>
            <p>{page.pending}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/iletisim" className="rounded-buttons bg-primary-navy px-6 py-3 font-medium text-paper-white">Kampüsle iletişime geçin</Link>
            <Link href="/kurumsal" className="rounded-buttons bg-mist px-6 py-3 font-medium text-primary-navy">Tüm kurumsal sayfalar</Link>
          </div>
        </article>
      </section>
    </PageShell>
  );
}

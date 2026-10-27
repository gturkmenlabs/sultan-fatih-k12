import Image from "next/image";

/**
 * lucide-react bu sürümde marka ikonlarını kaldırdığı için
 * sosyal ikonlar lucide'ın çizgi stiliyle yerel SVG olarak tanımlı.
 */
type BrandIconProps = {
  size?: number;
  "aria-hidden"?: boolean | "true" | "false";
  className?: string;
};

function BrandIcon({
  size = 24,
  className,
  "aria-hidden": ariaHidden,
  children,
}: BrandIconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
    >
      {children}
    </svg>
  );
}

function Facebook(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </BrandIcon>
  );
}

function Twitter(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </BrandIcon>
  );
}

function Instagram(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </BrandIcon>
  );
}

function Youtube(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </BrandIcon>
  );
}

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Kurumsal",
    links: [
      { label: "Genel Müdürün Mesajı", href: "https://www.sultanfatih.k12.tr/kurumsal/genel-mudurun-mesaji" },
      { label: "Vizyon & Misyon", href: "https://www.sultanfatih.k12.tr/kurumsal/vizyon-misyon" },
      { label: "E-Safety", href: "https://www.sultanfatih.k12.tr/kurumsal/e-safety" },
      { label: "Okul Marşı", href: "https://www.sultanfatih.k12.tr/kurumsal/okul-marsimiz" },
      { label: "Destek Hizmetleri", href: "https://www.sultanfatih.k12.tr/kurumsal/destek-hizmetleri" },
    ],
  },
  {
    title: "Kampüsler",
    links: [
      { label: "Fatih Kampüsü", href: "https://www.sultanfatih.k12.tr/kampusler/fatih-kampusu/sultan-fatih-ilkokulu" },
      { label: "Beylikdüzü Kampüsü", href: "https://www.sultanfatih.k12.tr/kampusler/beylikduzu-kampusu/beylikduzu-sultan-fatih-ilkokulu" },
      { label: "Ön Kayıt Formu", href: "https://www.sultanfatih.k12.tr/iletisim-bilgileri/on-kayit-formu" },
    ],
  },
  {
    title: "Eğitim & Öğretim",
    links: [
      { label: "Eğitim Süreçleri", href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/egitim-surecleri" },
      { label: "Değerler Eğitimi", href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/degerler-egitimi" },
      { label: "Yabancı Dil Eğitimi", href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/yabanci-dil-egitimi" },
      { label: "Sınav Hazırlık", href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/sinav-hazirlik" },
      { label: "Erasmus+", href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/erasmus" },
    ],
  },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/sultanfatih" },
  { icon: Twitter, label: "X (Twitter)", href: "https://twitter.com/sultanfatih" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/sultanfatih" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/sultanfatih" },
];

const LEGAL = [
  { label: "Hakkımızda", href: "https://www.sultanfatih.k12.tr/kurumsal/genel-mudurun-mesaji" },
  { label: "Çerez Politikası", href: "https://www.sultanfatih.k12.tr/cerez-politikasi" },
  { label: "Aydınlatma Metni", href: "https://www.sultanfatih.k12.tr/aydinlatma-metni" },
  { label: "İletişim", href: "https://www.sultanfatih.k12.tr/iletisim-bilgileri/iletisim-bilgilerimiz" },
];

export function SiteFooter() {
  return (
    <footer className="bg-bumble-ink text-paper-white">
      <div className="mx-auto grid max-w-[var(--page-max-width)] gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        {/* Marka sütunu */}
        <div>
          <div className="w-fit rounded-nav bg-paper-white p-2">
            <Image
              src="/sites/sultanfatih/brand/logo.png"
              alt="Özel Sultan Fatih Eğitim Kurumları"
              width={220}
              height={64}
              className="h-10 w-auto"
            />
          </div>
          <p className="mt-6 max-w-xs text-body-sm leading-relaxed text-paper-white/70">
            Fatih ve Beylikdüzü&apos;nün köklü eğitim kurumu — anaokulu,
            ilkokul, ortaokul, anadolu ve fen lisesi düzeylerinde eğitim.
          </p>
          <ul className="mt-6 flex gap-2" aria-label="Sosyal medya">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-white/10 transition-colors hover:bg-paper-white/20"
                >
                  <Icon size={18} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Site haritası sütunları */}
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-body font-semibold uppercase tracking-[0.05em] text-paper-white">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-paper-white/70 transition-colors hover:text-paper-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Honey copyright şeridi — kaynakta turuncu şeridin tema karşılığı */}
      <div className="bg-bumble-honey text-bumble-ink">
        <div className="mx-auto flex max-w-[var(--page-max-width)] flex-wrap items-center justify-between gap-4 px-6 py-4 text-caption md:px-8">
          <p>© {new Date().getFullYear()}. Sultan Fatih K.12 — Tüm hakları saklıdır.</p>
          <ul className="flex flex-wrap items-center gap-x-2">
            {LEGAL.map((item, i) => (
              <li key={item.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-bumble-ink/40">|</span>}
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

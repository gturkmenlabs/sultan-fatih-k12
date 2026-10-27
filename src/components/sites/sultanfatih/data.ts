/** Sultan Fatih K.12 ana sayfa içerik modeli */

export const SCHOOL = {
  name: "Sultan Fatih K.12",
  legalName: "Özel Sultan Fatih Eğitim Kurumları",
  url: "https://www.sultanfatih.k12.tr",
  /* İletişim bilgileri resmî "Kampüslerimiz" sayfasından doğrulandı:
     https://www.sultanfatih.k12.tr/kurumsal/kampuslerimiz */
  email: "bilgi@sultanfatih.k12.tr",
  phoneMain: "0212 531 22 82",
  phoneMainHref: "tel:+902125312282",
  logo: "/sites/sultanfatih/brand/logo.png",
  socials: [
    "https://www.facebook.com/sultanfatih",
    "https://twitter.com/sultanfatih",
    "https://www.instagram.com/sultanfatih",
    "https://www.youtube.com/sultanfatih",
  ],
} as const;

export const OFFICIAL = {
  preRegistration: "https://www.sultanfatih.k12.tr/iletisim-bilgileri/on-kayit-formu",
  catalog: "https://www.sultanfatih.k12.tr/Uploads/files/katalog.pdf",
  news: "https://www.sultanfatih.k12.tr/haberler/okul-haberleri/",
  k12net: "https://sultanfatih.k12net.com",
  cookiePolicy: "https://www.sultanfatih.k12.tr/cerez-politikasi",
  privacyNotice: "https://www.sultanfatih.k12.tr/aydinlatma-metni",
} as const;

/** Kademeler — ön kayıt formu ve hızlı erişimde ortak liste */
export const LEVELS = [
  "Anaokulu",
  "İlkokul",
  "Ortaokul",
  "Anadolu Lisesi",
  "Fen Lisesi",
] as const;

export const CAMPUS_NAMES = ["Beylikdüzü Kampüsü", "Fatih Kampüsü"] as const;

export type AchievementCategory =
  | "Robotik & Teknoloji"
  | "Sınav Başarısı"
  | "Akademik & Bilim"
  | "Okul Yaşamı"
  | "Kayıt & Tanıtım";

export interface AchievementSlide {
  src: string;
  label: string;
  href: string;
  category: AchievementCategory;
}

export const ACHIEVEMENT_SLIDES: AchievementSlide[] = [
  { src: "/sites/sultanfatih/hero/hero-01.jpg", label: "T.C. Gençlik ve Spor Bakanlığı Bilgi Yarışması — İstanbul Şampiyonu", href: "https://www.sultanfatih.k12.tr/sultan-fatih-anadolu-lisesi-fen-lisesi/t-c-genclik-ve-spor-bakanligi-bilgi-yarismasinda-istanbul-sampiyonuyuz--4318", category: "Akademik & Bilim" },
  { src: "/sites/sultanfatih/hero/hero-02.jpg", label: "VEX Robotics Türkiye Finalleri'nde Şampiyonluk", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ilkokulu/sultan-fatih-koleji-nden-turkiye-vex-robotics-finalleri-nde-sampiyonluk-4313", category: "Robotik & Teknoloji" },
  { src: "/sites/sultanfatih/hero/hero-03.jpeg", label: "Gençlik Merkezi Tanıtım Günümüz", href: "/kurumsal#basarilar", category: "Okul Yaşamı" },
  { src: "/sites/sultanfatih/hero/hero-04.jpg", label: "SFK Drone Takımı'na Best Pilot Team Award", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ortaokulu/-sfk-dron-takimimiza-best-pilot-team-award-odulu-4312", category: "Robotik & Teknoloji" },
  { src: "/sites/sultanfatih/hero/hero-05.png", label: "Kelimelerinin Gücüyle Gelen Birincilik", href: "https://www.sultanfatih.k12.tr/sultan-fatih-anadolu-lisesi-fen-lisesi/kelimelerin-gucuyle-gelen-birincilik-4303", category: "Akademik & Bilim" },
  { src: "/sites/sultanfatih/hero/hero-06.png", label: "Robotun Fatihleri — Robotik Turnuva Zaferi", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ortaokulu/robotun-fatihleri-4301", category: "Robotik & Teknoloji" },
  { src: "/sites/sultanfatih/hero/hero-07.jpg", label: "Uluslararası Alanda Büyük Başarı", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ortaokulu/uluslararasi-alanda-buyuk-basari-4249", category: "Akademik & Bilim" },
  { src: "/sites/sultanfatih/hero/hero-08.jpeg", label: "BİLSEM Yetenek Avcıları", href: "https://www.sultanfatih.k12.tr/beylikduzu-sultan-fatih-ilkokulu/bilsem-4218", category: "Akademik & Bilim" },
  { src: "/sites/sultanfatih/hero/hero-09.png", label: "Robot Turnuvasında Birincilik ve 3 Kupa", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ortaokulu/robot-turnuvasinda-birincilik-ve-3-kupa-4174", category: "Robotik & Teknoloji" },
  { src: "/sites/sultanfatih/hero/hero-10.png", label: "LGS 2024 Başarı Tablomuz", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ortaokulu/lgs-2024-4147", category: "Sınav Başarısı" },
  { src: "/sites/sultanfatih/hero/hero-11.jpg", label: "Bilim Olimpiyatlarında 2 Madalya", href: "https://www.sultanfatih.k12.tr/sultan-fatih-anadolu-lisesi-fen-lisesi/bilim-olimpiyatlarinda-2-madalya-4146", category: "Akademik & Bilim" },
  { src: "/sites/sultanfatih/hero/hero-13.png", label: "YKS Gurur Tablomuz", href: "https://www.sultanfatih.k12.tr/sultan-fatih-anadolu-lisesi-fen-lisesi/yks-gurur-tablomuz-3871", category: "Sınav Başarısı" },
  { src: "/sites/sultanfatih/hero/hero-14.jpg", label: "Tanıtım Kataloğumuzu İnceleyin", href: OFFICIAL.catalog, category: "Kayıt & Tanıtım" },
  { src: "/sites/sultanfatih/hero/hero-15.png", label: "İstanbul Bilgi Yarışması Şampiyonluğu", href: "/kurumsal#basarilar", category: "Akademik & Bilim" },
];

export interface CampusItem {
  image: string;
  title: string;
  caption: string;
  href: string;
  /** true ise kart bir CTA'dır (ön kayıt), kampüs tercihi olarak seçilemez */
  isCta?: boolean;
}

export const CAMPUS: CampusItem[] = [
  { image: "/sites/sultanfatih/campus/beylikduzu.jpg", title: "Beylikdüzü Kampüsü", caption: "Anaokulu · İlkokul · Ortaokul", href: "https://www.sultanfatih.k12.tr/kampusler/beylikduzu-kampusu/beylikduzu-sultan-fatih-ilkokulu" },
  { image: "/sites/sultanfatih/campus/fatih.jpg", title: "Fatih Kampüsü", caption: "İlkokul · Ortaokul · Lise", href: "https://www.sultanfatih.k12.tr/kampusler/fatih-kampusu/sultan-fatih-ilkokulu" },
];

export interface NewsItem {
  image: string;
  title: string;
  spot: string;
  href: string;
  tag: string;
}

export const NEWS: NewsItem[] = [
  { image: "/sites/sultanfatih/news/1.jpg", title: "Bir Okuldan Daha Fazlası", spot: "", href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/bir-okuldan-daha-fazlasi-1037", tag: "Okul Yaşamı" },
  { image: "/sites/sultanfatih/news/2.jpg", title: "Yabancı Dil Eğitimi", spot: "Öğrencilerimizin İngilizce kazanımları, University of Cambridge ESOL sınavları ile belgelenmektedir.", href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/yabanci-dil-egitimi-639", tag: "Yabancı Dil" },
  { image: "/sites/sultanfatih/news/3.jpg", title: "LGS Başarısını Ödüllendiriyoruz", spot: "Okulumuzu arayarak LGS indirim oranlarını öğrenebilirsiniz.", href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/lgs-basarisini-odullendiriyoruz-10", tag: "Sınav & Burs" },
  { image: "/sites/sultanfatih/news/4.jpg", title: "STEAM Sultan Fatih'te", spot: "", href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/steam-sultan-fatihte--3", tag: "STEAM" },
];

export interface GalleryImage {
  thumb: string;
  full: string;
  alt: string;
}

export const GALLERY: GalleryImage[] = [
  { thumb: "/sites/sultanfatih/gallery/01-thumb.jpg", full: "/sites/sultanfatih/gallery/01-full.jpg", alt: "Sultan Fatih'te yaşam — anı 1" },
  { thumb: "/sites/sultanfatih/gallery/02-thumb.jpg", full: "/sites/sultanfatih/gallery/02-full.jpg", alt: "Sultan Fatih'te yaşam — anı 2" },
  { thumb: "/sites/sultanfatih/gallery/03-thumb.jpeg", full: "/sites/sultanfatih/gallery/03-full.jpeg", alt: "Sultan Fatih'te yaşam — anı 3" },
  { thumb: "/sites/sultanfatih/gallery/04-thumb.jpg", full: "/sites/sultanfatih/gallery/04-full.jpg", alt: "Sultan Fatih'te yaşam — anı 4" },
  { thumb: "/sites/sultanfatih/gallery/05-thumb.jpeg", full: "/sites/sultanfatih/gallery/05-full.jpeg", alt: "Sultan Fatih'te yaşam — anı 5" },
  { thumb: "/sites/sultanfatih/gallery/06-thumb.jpeg", full: "/sites/sultanfatih/gallery/06-full.jpeg", alt: "Sultan Fatih'te yaşam — anı 6" },
  { thumb: "/sites/sultanfatih/gallery/07-thumb.jpeg", full: "/sites/sultanfatih/gallery/07-full.jpeg", alt: "Sultan Fatih'te yaşam — anı 7" },
  { thumb: "/sites/sultanfatih/gallery/08-thumb.jpg", full: "/sites/sultanfatih/gallery/08-full.jpg", alt: "Sultan Fatih'te yaşam — anı 8" },
];

export interface ValueCard {
  image: string;
  title: string;
  href: string;
  items: string[];
}

export const VALUES: ValueCard[] = [
  {
    image: "/sites/sultanfatih/values/s1.jpg",
    title: "Eğitim Süreçleri",
    href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/egitim-surecleri",
    items: ["Güvenli eğitim ortamı", "Yaparak–yaşayarak öğrenme", "Milli manevi değerler eğitimi", "Teknoloji destekli sınıflar", "Bireysel ve grup etütleri"],
  },
  {
    image: "/sites/sultanfatih/values/s2.jpg",
    title: "Yabancı Dil Eğitimi",
    href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/yabanci-dil-egitimi",
    items: ["Yoğun İngilizce eğitimi", "Cambridge ESOL sınav takibi", "Interactive Approach yöntemi", "Uzman öğretmen kadrosu"],
  },
  {
    image: "/sites/sultanfatih/values/s3.jpg",
    title: "Kulüplerimiz",
    href: "/kademeler",
    items: ["Robot & Lego Kulübü", "Deney Kulübü", "Satranç Kulübü", "Tiyatro Kulübü", "Zeka Oyunları Kulübü"],
  },
  {
    image: "/sites/sultanfatih/values/s4.jpg",
    title: "Değerler Eğitimi",
    href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/degerler-egitimi",
    items: ["Yardımseverlik ve cömertlik", "Sabır, irade ve sorumluluk", "Özgüven ve cesaret", "Dürüstlük ve adalet"],
  },
];

/**
 * Ana navigasyon — school-website-design-v3 bilgi mimarisindeki
 * üst düzey sayfalara gider. Aktif durumu nav bileşeni pathname'den okur.
 */
export const NAV_ITEMS = [
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Kademeler", href: "/kademeler" },
  { label: "Kampüsler", href: "/kampusler" },
  { label: "Kayıt & Burslar", href: "/kayit-burslar" },
  { label: "İletişim", href: "/iletisim" },
] as const;

/** Başvuru türleri — /on-kayit formu ve API aynı listeyi kullanır */
export const APPLICATION_TYPES = [
  "Ön kayıt",
  "Bursluluk sınavı bilgilendirmesi",
  "Genel bilgi",
] as const;

/**
 * Program rozetleri — yalnızca sitedeki haber/başarı içeriğiyle
 * belgelenebilen programlar (uydurma akreditasyon iddiası yok).
 */
export const PROGRAM_BADGES = [
  {
    icon: "dil" as const,
    title: "Cambridge ESOL Takibi",
    desc: "İngilizce kazanımları Cambridge ESOL sınavlarıyla belgelenir",
  },
  {
    icon: "steam" as const,
    title: "STEAM & Robotik",
    desc: "VEX Robotics Türkiye şampiyonluğu ve drone/robot takımları",
  },
  {
    icon: "dunya" as const,
    title: "Erasmus+ & eTwinning",
    desc: "Uluslararası proje ve değişim programları",
  },
  {
    icon: "bilim" as const,
    title: "Bilim Olimpiyatları",
    desc: "Olimpiyatlarda madalya ve bilgi yarışması şampiyonlukları",
  },
];

/** Kademeler — /kademeler sayfası. Kampüs bilgisi CAMPUS başlıklarından gelir. */
export interface LevelDetail {
  name: (typeof LEVELS)[number];
  tagline: string;
  desc: string;
  points: string[];
  campuses: string[];
  image: string;
  icon: "anaokulu" | "ilkokul" | "ortaokul" | "lise" | "fen";
}

export const LEVELS_DETAIL: LevelDetail[] = [
  {
    name: "Anaokulu",
    tagline: "Oyun temelli keşif ve güvenli bir başlangıç",
    desc: "Erken çocuklukta merak duygusunu koruyan, güvenli ve sıcak bir ortamda yaparak-yaşayarak öğrenme.",
    points: [
      "Yaparak–yaşayarak öğrenme ve keşif alanları",
      "Değerler eğitimiyle sosyal-duygusal gelişim",
      "İngilizceyle erken yaşta tanışma",
      "Güvenli eğitim ortamı ve bireysel ilgi",
    ],
    campuses: ["Beylikdüzü Kampüsü"],
    image: "/sites/sultanfatih/values/s4.jpg",
    icon: "anaokulu",
  },
  {
    name: "İlkokul",
    tagline: "Sağlam temel beceriler, büyüyen merak",
    desc: "Okuma-yazma ve temel becerilerin yanında kulüpler, yabancı dil ve teknolojiyle zenginleşen bir ilkokul deneyimi.",
    points: [
      "Yoğun İngilizce; Cambridge ESOL sınav takibi",
      "Robot & Lego, satranç, deney ve zekâ oyunları kulüpleri",
      "Teknoloji destekli sınıflar",
      "BİLSEM ve yarışmalarda ilkokul başarıları",
    ],
    campuses: ["Fatih Kampüsü", "Beylikdüzü Kampüsü"],
    image: "/sites/sultanfatih/values/s2.jpg",
    icon: "ilkokul",
  },
  {
    name: "Ortaokul",
    tagline: "LGS'ye planlı hazırlık, sahnede robotik",
    desc: "LGS hedefiyle planlanan akademik program; etütler, sınav koçluğu ve Türkiye çapında başarı gösteren robot/drone takımları.",
    points: [
      "LGS odaklı sınav hazırlık programı",
      "Bireysel ve grup etütleriyle yakın takip",
      "Robot ve drone takımlarından turnuva kupaları",
      "LGS başarıları ödüllendirilir (haberlerimize bakın)",
    ],
    campuses: ["Fatih Kampüsü", "Beylikdüzü Kampüsü"],
    image: "/sites/sultanfatih/values/s1.jpg",
    icon: "ortaokul",
  },
  {
    name: "Anadolu Lisesi",
    tagline: "YKS hedefi ve geniş bir vizyon",
    desc: "YKS'ye sistemli hazırlanan, bilgi yarışmalarında İstanbul şampiyonlukları yaşayan bir lise topluluğu.",
    points: [
      "YKS hazırlık ve gurur tablosu geleneği",
      "Bilgi yarışmalarında İstanbul şampiyonlukları",
      "Erasmus+ ve eTwinning projeleriyle küresel bakış",
      "Değerler eğitimiyle karakter gelişimi",
    ],
    campuses: ["Fatih Kampüsü"],
    image: "/sites/sultanfatih/values/s3.jpg",
    icon: "lise",
  },
  {
    name: "Fen Lisesi",
    tagline: "Bilimde derinleşme, olimpiyat kültürü",
    desc: "Bilim olimpiyatlarında madalyalar kazanan, araştırma ve STEAM projeleriyle öne çıkan fen lisesi programı.",
    points: [
      "Bilim Olimpiyatları'nda madalyalar",
      "STEAM ve araştırma projeleri",
      "YKS'de güçlü sayısal hazırlık",
      "Uluslararası yarışmalarda dereceler",
    ],
    campuses: ["Fatih Kampüsü"],
    image: "/sites/sultanfatih/hero/hero-11.jpg",
    icon: "fen",
  },
];

/** Kampüs detayları — /kampusler sayfası */
export interface CampusDetail {
  name: string;
  district: string;
  address: string;
  phones: string[];
  levels: string[];
  image: string;
  officialHref: string;
  mapSearchUrl: string;
  blurb: string;
}

export const CAMPUS_DETAIL: CampusDetail[] = [
  {
    name: "Fatih Kampüsü",
    district: "Fatih · İstanbul",
    address: "Derviş Ali Mahallesi Yahyazade Sokak No:7 Fatih İstanbul",
    phones: ["0212 531 22 82"],
    levels: ["İlkokul", "Ortaokul", "Anadolu Lisesi", "Fen Lisesi"],
    image: "/sites/sultanfatih/campus/fatih.jpg",
    officialHref:
      "https://www.sultanfatih.k12.tr/kampusler/fatih-kampusu/sultan-fatih-ilkokulu",
    mapSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Dervi%C5%9F+Ali+Mahallesi+Yahyazade+Sokak+No%3A7+Fatih+%C4%B0stanbul",
    blurb:
      "İlkokuldan fen lisesine uzanan kesintisiz eğitim; LGS ve YKS hazırlığının, olimpiyat ve robotik başarılarının merkezi.",
  },
  {
    name: "Beylikdüzü Kampüsü",
    district: "Beylikdüzü · İstanbul",
    address: "Fatih Mahallesi Fatih",
    phones: ["0212 421 08 22", "0212 880 81 10", "0212 509 38 20"],
    levels: ["Anaokulu", "İlkokul", "Ortaokul"],
    image: "/sites/sultanfatih/campus/beylikduzu.jpg",
    officialHref:
      "https://www.sultanfatih.k12.tr/kampusler/beylikduzu-kampusu/beylikduzu-sultan-fatih-ilkokulu",
    mapSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Derea%C4%9Fz%C4%B1+Mahallesi+Sultan+Fatih+Caddesi+No%3A80+Beylikd%C3%BCz%C3%BC+%C4%B0stanbul",
    blurb:
      "Anaokulundan ortaokula erken yaşlarda güvenli başlangıç; BİLSEM ve ilkokul yarışma başarılarıyla öne çıkan kampüsümüz.",
  },
];

/**
 * SSS — yalnızca süreç ve doğrulanmış içerik hakkında. Ücret/oran gibi
 * değişken bilgilerde kesin rakam uydurulmaz; resmî kaynağa yönlendirilir.
 */
export const FAQ_ITEMS: { q: string; a: string; href?: string; hrefLabel?: string }[] = [
  {
    q: "Ön kayıt, kesin kayıt anlamına mı gelir?",
    a: "Hayır. Ön kayıt ilk adımdır: formu iletirsiniz, tanışma ve kampüs turu yapılır, kademeye uygun öğrenci tanıma sürecinin ardından kesin kayıt birlikte tamamlanır. Böylece kararınızı aceleye getirmeden, okulu yerinde görerek verebilirsiniz.",
  },
  {
    q: "Kayıt ücretleri ve ödeme koşulları nasıl öğrenilir?",
    a: "Ücret ve ödeme koşulları kademe ve döneme göre değiştiği için bu sayfada sabit bir tutar yayımlamıyoruz. Ön kayıt sonrası tanışma görüşmesinde güncel koşullar şeffaf biçimde paylaşılır.",
  },
  {
    q: "Burs ve indirim olanakları var mı?",
    a: "LGS başarısı okulumuzda ödüllendirilir; indirim oranları için okulumuzla iletişime geçebilirsiniz. Bursluluk sınavı duyuruları yayımladığımızda sizi haberdar etmemizi isterseniz, ön kayıt formunda başvuru türü olarak 'Bursluluk sınavı bilgilendirmesi'ni seçip iletişim izni vermeniz yeterlidir.",
    href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/lgs-basarisini-odullendiriyoruz-10",
    hrefLabel: "LGS başarısını ödüllendiriyoruz — haberi okuyun",
  },
  {
    q: "Hangi kampüste hangi kademeler var?",
    a: "Fatih Kampüsü: İlkokul, Ortaokul, Anadolu Lisesi ve Fen Lisesi. Beylikdüzü Kampüsü: Anaokulu, İlkokul ve Ortaokul. Detaylı karşılaştırma için Kademeler ve Kampüsler sayfalarımıza bakabilirsiniz.",
  },
  {
    q: "Yabancı dil eğitimi nasıl belgelendiriliyor?",
    a: "Yoğun İngilizce programında öğrencilerimizin kazanımları University of Cambridge ESOL sınavları ile takip edilip belgelenmektedir.",
    href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/yabanci-dil-egitimi-639",
    hrefLabel: "Yabancı dil eğitimi haberimiz",
  },
  {
    q: "Servis, yemek ve diğer destek hizmetleri hakkında bilgi alabilir miyim?",
    a: "Destek hizmetlerine ilişkin güncel bilgilere resmî sitemizdeki Destek Hizmetleri sayfasından ve tanışma görüşmenizde öğrenci işlerimizden ulaşabilirsiniz.",
    href: "https://www.sultanfatih.k12.tr/kurumsal/destek-hizmetleri",
    hrefLabel: "Destek Hizmetleri sayfası",
  },
  {
    q: "Kesin kayıtta hangi belgeler gerekir?",
    a: "Gerekli belgelerin güncel listesi, öğrenci tanıma süreci sonrasında öğrenci işlerimiz tarafından size yazılı olarak iletilir; böylece eksiksiz ve tek seferde hazırlayabilirsiniz.",
  },
];

/**
 * Hızlı erişim — mevcut veli/öğrencinin günlük alışkanlık yolunun (habit path)
 * tek tıkla ulaşılabilen halkaları.
 */
export const QUICK_ACCESS = [
  {
    icon: "portal" as const,
    title: "K12Net Veli Portalı",
    desc: "Not, devamsızlık ve duyurular",
    href: OFFICIAL.k12net,
    external: true,
  },
  {
    icon: "eokul" as const,
    title: "e-Okul (MEB)",
    desc: "Resmî öğrenci bilgi sistemi",
    href: "https://e-okul.meb.gov.tr/",
    external: true,
  },
  {
    icon: "katalog" as const,
    title: "Tanıtım Kataloğu",
    desc: "Okulu tek PDF'te inceleyin",
    href: OFFICIAL.catalog,
    external: true,
  },
  {
    icon: "kayit" as const,
    title: "Ön Kayıt",
    desc: "3 kısa adımda başvurun",
    href: "/on-kayit",
    external: false,
  },
];

/** Kayıt sürecinin şeffaf adımları — belirsizliği (iç tetikleyici) azaltır */
export const REGISTRATION_STEPS = [
  {
    title: "Ön kayıt formu",
    desc: "Veli ve öğrenci bilgilerinizi 3 kısa adımda iletin. Taslağınız bu cihazda saklanır, sonra devam edebilirsiniz.",
  },
  {
    title: "Tanışma & kampüs turu",
    desc: "Öğrenci işleri ekibimiz sizinle iletişime geçerek seçtiğiniz kampüste tanışma randevusu planlar.",
  },
  {
    title: "Öğrenci tanıma",
    desc: "Kademeye uygun tanıma/değerlendirme süreciyle öğrencimizi yakından tanırız.",
  },
  {
    title: "Kesin kayıt",
    desc: "Koşullar netleşir, kayıt işleminiz tamamlanır ve veli portalınız (K12Net) tanımlanır.",
  },
] as const;

export const PARTNERS = [
  { image: "/sites/sultanfatih/partners/e-okul.png", alt: "e-Okul MEB", href: "https://e-okul.meb.gov.tr/" },
  { image: "/sites/sultanfatih/partners/okulsagligi.png", alt: "Okul Sağlığı MEB", href: "https://okulsagligi.meb.gov.tr/" },
  { image: "/sites/sultanfatih/partners/vakif.png", alt: "Tilmih Vakfı", href: "https://www.tilmihvakfi.org.tr" },
  { image: "/sites/sultanfatih/partners/k12net.png", alt: "K12Net", href: OFFICIAL.k12net },
];

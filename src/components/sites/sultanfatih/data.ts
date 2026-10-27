/** Sultan Fatih K.12 ana sayfa içerik modeli */

export interface AchievementSlide {
  src: string;
  label: string;
  href: string;
}

export const ACHIEVEMENT_SLIDES: AchievementSlide[] = [
  { src: "/sites/sultanfatih/hero/hero-01.jpg", label: "T.C. Gençlik ve Spor Bakanlığı Bilgi Yarışması — İstanbul Şampiyonu", href: "https://www.sultanfatih.k12.tr/sultan-fatih-anadolu-lisesi-fen-lisesi/t-c-genclik-ve-spor-bakanligi-bilgi-yarismasinda-istanbul-sampiyonuyuz--4318" },
  { src: "/sites/sultanfatih/hero/hero-02.jpg", label: "VEX Robotics Türkiye Finalleri'nde Şampiyonluk", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ilkokulu/sultan-fatih-koleji-nden-turkiye-vex-robotics-finalleri-nde-sampiyonluk-4313" },
  { src: "/sites/sultanfatih/hero/hero-03.jpeg", label: "Gençlik Merkezi Tanıtım Günümüz", href: "#" },
  { src: "/sites/sultanfatih/hero/hero-04.jpg", label: "SFK Drone Takımı'na Best Pilot Team Award", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ortaokulu/-sfk-dron-takimimiza-best-pilot-team-award-odulu-4312" },
  { src: "/sites/sultanfatih/hero/hero-05.png", label: "Kelimelerinin Gücüyle Gelen Birincilik", href: "https://www.sultanfatih.k12.tr/sultan-fatih-anadolu-lisesi-fen-lisesi/kelimelerin-gucuyle-gelen-birincilik-4303" },
  { src: "/sites/sultanfatih/hero/hero-06.png", label: "Robotun Fatihleri — Robotik Turnuva Zaferi", href: "https://www.sultanfatih.k12.tr//sultan-fatih-ortaokulu/robotun-fatihleri-4301" },
  { src: "/sites/sultanfatih/hero/hero-07.jpg", label: "Uluslararası Alanda Büyük Başarı", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ortaokulu/uluslararasi-alanda-buyuk-basari-4249" },
  { src: "/sites/sultanfatih/hero/hero-08.jpeg", label: "BİLSEM Yetenek Avcıları", href: "https://www.sultanfatih.k12.tr/beylikduzu-sultan-fatih-ilkokulu/bilsem-4218" },
  { src: "/sites/sultanfatih/hero/hero-09.png", label: "Robot Turnuvasında Birincilik ve 3 Kupa", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ortaokulu/robot-turnuvasinda-birincilik-ve-3-kupa-4174" },
  { src: "/sites/sultanfatih/hero/hero-10.png", label: "LGS 2024 Başarı Tablomuz", href: "https://www.sultanfatih.k12.tr/sultan-fatih-ortaokulu/lgs-2024-4147" },
  { src: "/sites/sultanfatih/hero/hero-11.jpg", label: "Bilim Olimpiyatlarında 2 Madalya", href: "https://www.sultanfatih.k12.tr/sultan-fatih-anadolu-lisesi-fen-lisesi/bilim-olimpiyatlarinda-2-madalya-4146" },
  { src: "/sites/sultanfatih/hero/hero-12.jpg", label: "Ön Kayıt Formunuz Hazır", href: "https://www.sultanfatih.k12.tr/iletisim-bilgileri/on-kayit-formu" },
  { src: "/sites/sultanfatih/hero/hero-13.png", label: "YKS Gurur Tablomuz", href: "https://www.sultanfatih.k12.tr/sultan-fatih-anadolu-lisesi-fen-lisesi/yks-gurur-tablomuz-3871" },
  { src: "/sites/sultanfatih/hero/hero-14.jpg", label: "Tanıtım Kataloğumuzu İnceleyin", href: "https://www.sultanfatih.k12.tr/Uploads/files/katalog.pdf" },
  { src: "/sites/sultanfatih/hero/hero-15.png", label: "İstanbul Bilgi Yarışması Şampiyonluğu", href: "#" },
];

export interface CampusItem {
  image: string;
  title: string;
  caption: string;
  href: string;
}

export const CAMPUS: CampusItem[] = [
  { image: "/sites/sultanfatih/campus/beylikduzu.jpg", title: "Beylikdüzü Kampüsü", caption: "Anaokulu · İlkokul · Ortaokul", href: "https://www.sultanfatih.k12.tr/kampusler/beylikduzu-kampusu/beylikduzu-sultan-fatih-ilkokulu" },
  { image: "/sites/sultanfatih/campus/fatih.jpg", title: "Fatih Kampüsü", caption: "İlkokul · Ortaokul · Lise", href: "https://www.sultanfatih.k12.tr/kampusler/fatih-kampusu/sultan-fatih-ilkokulu" },
  { image: "/sites/sultanfatih/campus/kayit.jpg", title: "Ön Kayıt Formu", caption: "2026–2027 kayıt dönemi başladı", href: "https://www.sultanfatih.k12.tr/iletisim-bilgileri/on-kayit-formu" },
];

export interface NewsItem {
  image: string;
  title: string;
  spot: string;
  href: string;
}

export const NEWS: NewsItem[] = [
  { image: "/sites/sultanfatih/news/1.jpg", title: "Bir Okuldan Daha Fazlası", spot: "", href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/bir-okuldan-daha-fazlasi-1037" },
  { image: "/sites/sultanfatih/news/2.jpg", title: "Yabancı Dil Eğitimi", spot: "Öğrencilerimizin İngilizce kazanımları, University of Cambridge ESOL sınavları ile belgelenmektedir.", href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/yabanci-dil-egitimi-639" },
  { image: "/sites/sultanfatih/news/3.jpg", title: "LGS Başarısını Ödüllendiriyoruz", spot: "Okulumuzu arayarak LGS indirim oranlarını öğrene bilirsiniz.", href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/lgs-basarisini-odullendiriyoruz-10" },
  { image: "/sites/sultanfatih/news/4.jpg", title: "STEAM Sultan Fatih'te", spot: "", href: "https://www.sultanfatih.k12.tr/okul-haberleri//okul-haberleri/steam-sultan-fatihte--3" },
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
    href: "#",
    items: ["Robot & Lego Kulübü", "Deney Kulübü", "Satranç Kulübü", "Tiyatro Kulübü", "Zeka Oyunları Kulübü"],
  },
  {
    image: "/sites/sultanfatih/values/s4.jpg",
    title: "Değerler Eğitimi",
    href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/degerler-egitimi",
    items: ["Yardımseverlik ve cömertlik", "Sabır, irade ve sorumluluk", "Özgüven ve cesaret", "Dürüstlük ve adalet"],
  },
];

export const NAV_ITEMS = [
  { label: "Kurumsal", href: "https://www.sultanfatih.k12.tr/kurumsal/genel-mudurun-mesaji" },
  { label: "Kampüsler", href: "https://www.sultanfatih.k12.tr/kampusler/beylikduzu-kampusu/beylikduzu-sultan-fatih-ilkokulu" },
  { label: "Eğitim & Öğretim", href: "https://www.sultanfatih.k12.tr/egitim-ve-ogretim/egitim-surecleri" },
  { label: "Başarılarımız", href: "https://www.sultanfatih.k12.tr/haberler/okul-haberleri/" },
  { label: "İletişim", href: "https://www.sultanfatih.k12.tr/iletisim-bilgileri/iletisim-bilgilerimiz" },
];

export const PARTNERS = [
  { image: "/sites/sultanfatih/partners/e-okul.png", alt: "e-Okul MEB", href: "https://e-okul.meb.gov.tr/" },
  { image: "/sites/sultanfatih/partners/okulsagligi.png", alt: "Okul Sağlığı MEB", href: "https://okulsagligi.meb.gov.tr/" },
  { image: "/sites/sultanfatih/partners/vakif.png", alt: "Tilmih Vakfı", href: "https://www.tilmihvakfi.org.tr" },
  { image: "/sites/sultanfatih/partners/k12net.png", alt: "K12Net", href: "https://sultanfatih.k12net.com" },
];

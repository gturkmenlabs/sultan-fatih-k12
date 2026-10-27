/**
 * Sultan Fatih Koleji — asset indirme script'i.
 * Kaynak site: https://www.sultanfatih.k12.tr/
 * Hedef: public/sites/sultanfatih/
 *
 * Kullanım: node scripts/download-sultanfatih-assets.mjs
 * Tekrar çalıştırılabilir — mevcut dosyaların üzerine yazar.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://www.sultanfatih.k12.tr";
const OUT = path.resolve(process.cwd(), "public/sites/sultanfatih");

/** Masaüstü slider sırası (15 slayt) + href'leri */
const HERO = [
  ["B0JN598845365109US5691H3YKWNRH.jpg", "/sultan-fatih-anadolu-lisesi-fen-lisesi/t-c-genclik-ve-spor-bakanligi-bilgi-yarismasinda-istanbul-sampiyonuyuz--4318"],
  ["4WEWV5LAUTNH3J2KBWNEKGUIKE0Y2R.jpg", "/sultan-fatih-ilkokulu/sultan-fatih-koleji-nden-turkiye-vex-robotics-finalleri-nde-sampiyonluk-4313"],
  ["5S27YWKMEO0L6U8GC21M12Z860M23U.jpeg", "#"],
  ["A7VK806F11Z2O3784O4KQC81VP08E0.jpg", "/sultan-fatih-ortaokulu/-sfk-dron-takimimiza-best-pilot-team-award-odulu-4312"],
  ["QAVG291D225W1XZ101J5399Z26Q10N.png", "/sultan-fatih-anadolu-lisesi-fen-lisesi/kelimelerin-gucuyle-gelen-birincilik-4303"],
  ["IEXKM1C6QOZ9OEA77H2P6919ZVVYZ1.png", "/sultan-fatih-ortaokulu/robotun-fatihleri-4301"],
  ["8LLB2U7G9B91UKSAQ0KHA56W6A34L2.jpg", "/sultan-fatih-ortaokulu/uluslararasi-alanda-buyuk-basari-4249"],
  ["111E1939G1P749MPO7HW800ZAPQ42A.jpeg", "/beylikduzu-sultan-fatih-ilkokulu/bilsem-4218"],
  ["1R227D59VUUNMF3G06M1J1XOMVKJG8.png", "/sultan-fatih-ortaokulu/robot-turnuvasinda-birincilik-ve-3-kupa-4174"],
  ["M5YNCGQB43Y8Q9O4U4V2JE84XB09EG.png", "/sultan-fatih-ortaokulu/lgs-2024-4147"],
  ["08S1CEH934W83B2B2Y68A44LVNA3LQ.jpg", "/sultan-fatih-anadolu-lisesi-fen-lisesi/bilim-olimpiyatlarinda-2-madalya-4146"],
  ["9Q2Q8JJEQ2B1W150G8F4UHTZ4XZE6M.jpg", "/iletisim-bilgileri/on-kayit-formu"],
  ["H0F36XW53Q5249R7HS795AQD3A89WL.png", "/sultan-fatih-anadolu-lisesi-fen-lisesi/yks-gurur-tablomuz-3871"],
  ["FSZAVO3091O8M195A3AQZBZ7ZU02B4.jpg", "/Uploads/files/katalog.pdf"],
  ["V0O5SA86E31U4PAW42QMNXN02YAR5D.png", "#"],
];
/** `
 * Galeride gösterilecek başlıklar için slayt etiketleri (kısa).
 */
const HERO_LABELS = [
  "Bilgi Yarışması — İstanbul Şampiyonu",
  "VEX Robotics — Türkiye Finali Şampiyonluğu",
  "Quiz Bilgi Yarışması",
  "Drone Takımı — Best Pilot Award",
  "Kelimelerinin Gücüyle Birincilik",
  "Robotun Fatihleri",
  "Uluslararası Alanda Büyük Başarı",
  "BİLSEM Yetenek Avcıları",
  "Robot Turnuvasında Birincilik — 3 Kupa",
  "LGS 2024 Başarıları",
  "Bilim Olimpiyatlarında 2 Madalya",
  "Ön Kayıt Formu",
  "YKS Gurur Tablomuz",
  "Tanıtım Kataloğumuz",
  "Gençlik ve Spor Bakanlığı Yarışması",
];

const NEWS = [
  ["1QEV84D0I6W8G0J25NWS83SO4M1LSP.jpg", "Bir Okuldan Daha Fazlası", "", "/okul-haberleri//okul-haberleri/bir-okuldan-daha-fazlasi-1037"],
  ["U29N38D6V3PAQG4T4C637OKB5D2DDR.jpg", "Yabancı Dil Eğitimi", "Öğrencilerimizin İngilizce kazanımları, University of Cambridge ESOL sınavları ile belgelenmektedir.", "/okul-haberleri//okul-haberleri/yabanci-dil-egitimi-639"],
  ["T3650F0Y67YU4RI407RWE9K4EX7V35.jpg", "LGS Başarısını Ödüllendiriyoruz", "Okulumuzu arayarak LGS indirim oranlarını öğrene bilirsiniz.", "/okul-haberleri//okul-haberleri/lgs-basarisini-odullendiriyoruz-10"],
  ["W50TBA5QDX6ZX9G7Z9OQ4GRU9ELF3F.jpg", "STEAM Sultan Fatih'te", "", "/okul-haberleri//okul-haberleri/steam-sultan-fatihte--3"],
];

const GALLERY_THUMBS = [
  "3RM6M2M10B57J879MER1CU4CTB280M.jpg",
  "69571X38049CT00FY4X21F1GQ7JH23.jpg",
  "8I07QT8J247WUA243JI8786XXOW513.jpeg",
  "DCC0W3O892S0O3NP420784Y92E18U9.jpg",
  "NDH90ERE12384D5NFD7R3H6EY2457D.jpeg",
  "UB619FQL5BXD30CO12P0T5W8I75966.jpeg",
  "X73EWZO570SP19Y1MAEFRW59V65252.jpeg",
  "XZS5WGOCXMGA51820O548U3Y4WM76Y.jpg",
];

/** Slaytsız ekstra görseller */
const EXTRAS = [
  ["images/logo.png", "brand/logo.png"],
  ["images/favicon-96x96.png", "brand/favicon-96x96.png"],
  ["images/kmp2.jpg", "campus/fatih.jpg"],
  ["images/kmp1.jpg", "campus/beylikduzu.jpg"],
  ["images/kmp3a.jpg", "campus/kayit.jpg"],
  ["images/okulico.jpg", "campus/okulico.jpg"],
  ["images/s1.jpg", "values/s1.jpg"],
  ["images/s2.jpg", "values/s2.jpg"],
  ["images/s3.jpg", "values/s3.jpg"],
  ["images/s4.jpg", "values/s4.jpg"],
  ["images/altlogo1.png", "partners/e-okul.png"],
  ["images/altlogo2.png", "partners/okulsagligi.png"],
  ["images/altlogo3.png", "partners/vakif.png"],
  ["images/altlogo4.png", "partners/k12net.png"],
];

/** kaynak path → hedef path çiftleri üretir */
function assetList() {
  const list = [...EXTRAS];
  HERO.forEach(([file], i) => {
    list.push([`Uploads/Banners/${file}`, `hero/hero-${String(i + 1).padStart(2, "0")}${path.extname(file)}`]);
  });
  NEWS.forEach(([file]) => list.push([`Uploads/News/${file}`, `news/${NEWS.findIndex((n) => n[0] === file) + 1}.jpg`]));
  GALLERY_THUMBS.forEach((file, i) => {
    list.push([`Uploads/PhotoGallery/1351/t_500_${file}`, `gallery/${String(i + 1).padStart(2, "0")}-thumb${path.extname(file)}`]);
    list.push([`Uploads/PhotoGallery/1351/${file}`, `gallery/${String(i + 1).padStart(2, "0")}-full${path.extname(file)}`]);
  });
  return list;
}

async function download(from, to) {
  const url = from.startsWith("http") ? from : `${BASE}/${from}`;
  const dest = path.join(OUT, to);
  await mkdir(path.dirname(dest), { recursive: true });
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`✓ ${to} (${(buf.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (err) {
    console.warn(`✗ ${to} — ${err.message}`);
    return false;
  }
}

async function main() {
  const list = assetList();
  let ok = 0;
  for (const [from, to] of list) {
    if (await download(from, to)) ok++;
  }
  console.log(`\n${ok}/${list.length} asset indirildi → ${OUT}`);
  process.exit(ok === list.length ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

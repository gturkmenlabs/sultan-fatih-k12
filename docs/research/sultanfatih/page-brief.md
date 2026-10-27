# Sultan Fatih Koleji — Ana Sayfa Brief

Kaynak: https://www.sultanfatih.k12.tr/ (klon kapsamı: sadece ana sayfa)
İnceleme: HTTP üzerinden tam HTML + `css/style.css`, `js/custom.js`, `js/revolution-active.js` okundu (tarayıcı oturumu yok; eksikler aşağıda işaretli).

## Teknoloji (kaynak)
- Bootstrap 3 grid `.container/.col-*`, Revolution Slider 5.3 (fullscreen, fade, 9 sn), Slick, jQuery, FontAwesome 4, WOW.js, Fancybox/colorbox lightbox.
- Fontlar: **Montserrat** (başlık/menü, 600–700, uppercase) + **Open Sans** (gövde) — Google Fonts.
- Renk paleti:
  - Accent kırmızı: `#a20427` (buton, hover, widget başlığı nokta, fokus)
  - Kırmızı kenar: `#c60226` (kampüs başlık altı), `#b21f29` (form buton)
  - Cyan menü altı çizgi: `#0aaac0` (hover'da 4px, soldan büyür)
  - Turuncu: `#e48114` (arama input çerçevesi + Ara buton bg), `#e68f1b` (copyright şeridi)
  - Mobil menü: `#272732` zemin, `#2d2c31` ayraç
  - Başlık rengi `#243a4f`, gövde `#606060`
  - Gri zeminler: `#f4f4f4` (hizmet şeridi), `#fafafa` (haberler), `#f2f2f2` (partner logoları)
- Gövde: 14px Open Sans; h başlıklar Montserrat 700 `#243a4f`.

## Bölüm sırası (top → bottom)
1. **Header** (hero üzerine absolute, `rgba(255,255,255,.9)` zemin + `border-bottom #ccc`):
   - Sol logo (`images/logo.png`), sağ yatay menü. Menü item: Montserrat 600 14px uppercase `#606060`, padding `37px 25px` (≥1200) / `27px 5px` (<1200); hover → `#a20427` + altında cyan 4px çizgi.
   - Dropdownlar: beyaz zemin, `padding:15px 26px`, item link genişlik 150px, sağda `>` (FontAwesome \f105); iç içe açılan 2. seviye soldan %100 ofset (enum: Kampüsler → Fatih/Beylikdüzü → okullar).
   - Menü: Kurumsal (Genel Müdürün Mesajı, Vizyon & Misyon, E-Safety, Okul Marşı, Tanıtım Filmi, Destek Hizmetleri) · Kampüsler (2 kampüs, alt okullar) · Eğitim & Öğretim (Maarif Modeli↗tymm.meb.gov.tr, Değerler Eğitimi, Eğitim Süreçleri, Yabancı Dil Eğitimi, Sınav Hazırlık, Erasmus+, eTwinning) · İletişim (İletişim Bilgilerimiz, Ön Kayıt Formu, İnsan Kaynakları↗).
   - ≤991px: hamburger (fa-bars, `hidden-lg hidden-md` → <992 görünür) → tam ekran koyu (#272732) menü, akordeon (click → slideToggle 350ms, fa-angle-down sağda).
2. **Hero slider** (Revolution, masaüstü ≥768): fullscreen, 15 slayt, fade geçiş, 9 sn delay, venüs "uranus" oklar, klavye dikey. Görsel slayt başına tam ekran cover görsel + link (iç boş text layer'lar). Yükseklik override'ı: ≥991 `calc(100vh - 150px)`, altında `calc(100vh - 500px)`.
   Slayt linkleri (15): 4318 bilgi yarışması, 4313 VEX Robotics, #, 4312 drone, 4303 kelimeler, 4301 robotun fatihleri, 4249 uluslararası, 4218 bilsem, 4174 robot turnuvası, 4147 LGS, 4146 olimpiyat, "", ön kayıt, 3871 YKS, katalog.pdf.
3. **Mobil banner carousel** (`<768`): tek slayt slick, dots açık, autoplay 1500ms, ok yok. 17 görsel + link.
4. **Kampüs şeridi** (`.anaokullar`): ≥1100 sabit 900px genişlik, `margin:-70px auto 50px` (hero'ya taşar), beyaz bg. 3 sütun: Fatih Kampüsü (`kmp2.jpg`), Beylikdüzü Kampüsü (`kmp1.jpg`), Kayıt Formu (`kmp3a.jpg`; `/iletisim-bilgileri/on-kayit-formu`). Başlık çubuğu: 70px, soldan `okulico.jpg` bg ikonu, `border-bottom:4px solid #c60226`, Montserrat benzeri 18px 600. Görsel yükseklik 192px.
5. **Hizmet ikonları** (`.anahizmetler`): full-bleed `#f4f4f4` şerit (margin-y 75px), container içinde 4 öğe, sol tarafta 90px bg ikon (icos1/5/3/4.png), link 13px 600 `line-height:90px`: SFK ÜZEM, BAŞARILARIMIZ, KULÜPLERİMİZ (kapalı </a> hatası kaynakta), ÖĞRENCİ TAKİP SİSTEMİ (k12net.com↗).
6. **Bizden Haberler** (`.bizdenhaberler`, `#fafafa`): başlık "Bizden Haberler" (h3 24px Montserrat) + right'a "Tüm Haberler" outline btn (hover: kırmızı bg). 4 kart (col-sm-3): görsel 200px, içeriği taşan beyaz kutu (width 85%, margin-top -45px, iç padding 10px): başlık 14px 600, spot 13px. Kartlar yukarıda listelendi.
7. **Değerler / Eğitim kutuları** (`.anadegerler`, padding 35px 0): 4 bg-image kutu (s1–s4.jpg, cover), grid: col-sm-3. Başlık beyaz 20px 600 `line-height:89px` `padding-left:70px`; içerik beyaz 13px, yükseklik 290px kutu. ("S" görselleri foto + koyu katman içeriyor.)
8. **Sultan Fatih'te Yaşam** galerisi: başlık "Sultan Fatih'te Yaşam" + 8 foto (t_500_ thumb, tam boy lightbox fancybox/colorbox). Grid: lg:4, md:3, sm/6.. → col-lg-3 col-md-4 col-sm-6 col-xs-6, padding 0. WOW fadeInUp girişi.
9. **Partner logo şeridi** (`.altlogolar` `#f2f2f2`, ≥1100 içerik 900px): e-okul.meb.gov.tr, okulsagligi.meb.gov.tr, tilmihvakfi.org.tr, sultanfatih.k12net.com (tümü ↗).
10. **Footer** (`.fund-footer` → `.main-footer` beyaz zemin `section-padding` 87/70px): 4 sütun (md-3): logo + açık metin · KURUMSAL · KAMPÜSLER · EĞİTİM ÖĞRETİM link listeleri (list itemleri sol beyaz dash `:before`; all-text-black). Altında: sosyal ikonlar (FB, X, IG, YouTube) + sağda arama kutusu (turuncu çerçeveli input + turuncu "Ara" butonu → /arama/<q>). 
    **Copyright şeridi**: `#e68f1b`, beyaz yazı: "© 2020. Tüm hakları saklıdır." + sağda footer menu (`|` ayraçlı: Hakkımızda, Çerez Politikası, Aydınlatma Metni, İletişim).
11. **Back-to-top**: büyüteç değil; sağ altta 50px kırmızı (#a20427) daire, fa-angle-up, scroll>10'da belirir, 1s smooth top.

## Etkileşim özet
- Menü hover → dropdown (desktop), hamburger → fullscreen menü (mobile), akordeon.
- Hero fade + oklar; mobil carousel dots autoplay.
- Lightbox: galeri foto → tam boyمد overlay (fancybox davranışı; NEXT/PREV/ESC).
- Back-to-top.

## Asset haritası (indirilen)
`public/sites/sultanfatih/` altında:
- `brand/logo.png`, `brand/favicon-96x96.png`
- `hero/hero-01..15.<ext>`  (Uploads/Banners, slider sırası)
- `carousel/01..17.<ext>`   (Uploads/Banners, slick sırası)
- `news/01..04.jpg`         (Uploads/News)
- `campus/fatih.jpg, beylikduzu.jpg, kayit.jpg, okulico.jpg`
- `icons/uzem.png, basarilar.png, kulupler.png, takip.png`
- `values/s1..s4.jpg`
- `gallery/01-full.<ext>+01-thumb.<ext>` … (PhotoGallery/1351)
- `partners/e-okul.png, okulsagligi.png, vakif.png, k12net.png` (altlogo1-4.png)

## Kapsam dışı / bilinen eksikler
- Tarayıcı oturumu yok → ekran görüntüsü yanlızca HTML+CSS'ten türetildi; font ölçümü Google Fonts varsayılanlarından alındı.
- Katı: kaynakta `.desktopmobil` ≥768 gizli, `.slidermobil` <768 gizli (CSS 76–87 satırları) — klon aynı davranışta.
- Dış linkler (k12net, e-okul, MEB, sosyal medya) kaynak hedeflerine korunur; klon kapsamındaki iç sayfalar (haber/kampüs/iletişim detayları) klon edilmediği için kaynak URL'ye gider.

## Route haritası
- `/` (kaynak `/`) → `src/app/page.tsx` + `src/components/sites/sultanfatih/*` + `public/sites/sultanfatih/*`

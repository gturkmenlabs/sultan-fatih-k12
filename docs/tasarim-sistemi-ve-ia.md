# school-website-design-v3 — Uygulama Durumu

Bu belge, `.agents/skills/school-website-design-v3/SKILL.md` rehberinin
Sultan Fatih K.12 sitesinde madde madde nasıl karşılandığını kaydeder.
Durumlar: ✅ tamam · ◐ kısmi/uyarlama · ⏳ veri/varlık bekliyor (uydurulmadı).

## 1. Hedef kitle ve kullanıcı senaryoları (UX Matrix)

| Paydaş | Rehber önerisi | Sitedeki karşılığı | Durum |
|---|---|---|---|
| Potansiyel veliler | Hero Floating CTA | Hero'da Ön Kayıt + mobil sabit alt bar + yapışkan nav CTA | ✅ |
| | Bento Grid kampüs galerisi | Ana sayfa "Sultan Fatih'te Yaşam" bento grid (1 büyük + 1 geniş + 6 standart) | ✅ |
| | Akreditasyon rozetleri | Program Rozetleri şeridi — yalnızca belgelenebilenler: Cambridge ESOL, STEAM/VEX, Erasmus+/eTwinning, Bilim Olimpiyatları | ✅ (iddia disipliniyle) |
| | Bina güvenlik/deprem raporu indirme | Resmî rapor dosyası sağlanmadı | ⏳ rapor PDF'i gelince `/kampusler`e indirme kartı eklenecek |
| | Kayıt ücretleri | Değişken veri; sayfada rakam uydurulmaz — süreç SSS'de şeffafça açıklanır | ◐ bilinçli tercih |
| | 360° sanal tur | Fotoğraf Turu (`/kampusler#tur`) — dürüst adlandırma | ◐ 360° çekim gelince panorama ile değişecek |
| | Bursluluk sınavı kaydı | `/kayit-burslar` + formda "Bursluluk sınavı bilgilendirmesi" başvuru türü (`?tip=burs`) | ◐ sınav tarihi duyurulunca tam kayıt akışına döner |
| | Aday başvuru formu | `/on-kayit` (3 adımlı, taslaklı) + ana sayfa mini formu | ✅ |
| Mevcut veli & öğrenciler | Portal butonları | Top Bar + Hızlı Erişim + mobil bar: K12Net, e-Okul | ✅ |
| | Yemek menüsü / takvim / duyurular | "Bugün Okulda" şeridi → kayıt sistemi K12Net'e tek tık (sahte veri yayımlanmaz) | ◐ veri entegrasyonu (webhook/API) gelince yerinde gösterim |
| Mezunlar & topluluk | Mezun ağı, başarı öyküleri | `/kurumsal` "Topluluğumuz": başarı öyküleri bağlantısı + sosyal hesaplar | ◐ mezun portal URL'si verilirse doğrudan bağlanır |
| İK & adaylar | Kariyer modülü, iş başvuru formu | `/kurumsal` "Ekibimize katılın" kartı → resmî site İK kanalı | ◐ İK doğrudan URL/form tanımı verilirse yerel forma döner |

## 2. Tasarım sistemi (Visual Tokens)

Rehber tokenları `src/app/globals.css` `@theme` içinde tanımlıdır; daha
önceki "Bumble/honey" token adları aynı değerlere eşlenerek tüm site tek
noktadan yeni palete geçirilmiştir:

| Rehber tokenı | Değer | Sitedeki karşılığı |
|---|---|---|
| `--primary-navy` | `#0F172A` | `--color-primary-navy` = `--color-bumble-ink` = `--color-onyx` |
| `--brand-blue` | `#1E3A8A` | `--color-brand-blue` = `--color-charcoal` (hover) |
| `--accent-gold` | `#D97706` | `--color-accent-gold`; büyük altın zeminlerde okunabilirlik için amber 400 `#FBBF24` (`--color-bumble-honey`), açık ton `#FDE68A` (`--color-pollen`) |
| `--nature-green` | `#059669` | `--color-nature-green` (tanımlı; kullanım senaryosu bekleniyor) |
| `--bg-light` | `#F8FAFC` | `--color-bg-light` = `--color-mist` |
| `--text-main` | `#334155` | `--color-text-main` = `--color-graphite` (beyaz üzerinde ≈10,7:1 kontrast) |
| `--container-max` | `1280px` | `--page-max-width: 1280px` |
| `--radius-card / --radius-btn` | `16px / 8px` | `--radius-cards: 16px`, `--radius-buttons: 8px` |
| `--shadow-sm / --shadow-lg` | rehber değerleri | aynen tanımlı |
| Tipografi | Plus Jakarta Sans + Inter | **Sapma (bilinçli):** DM Sans self-host sürüyor — marka sürekliliği + tek aile performansı; başlık/gövde ayrımı ağırlık ve ölçekle yapılıyor. Değişiklik istenirse fontlar yine self-host eklenmelidir. |

## 3. Bilgi mimarisi (site haritası)

```
├── Üst Şerit (Top Bar) — Kampüs Turu | Aday Başvurusu | Veli Portalı | e-Okul | 0212 531 22 82 + duyuru
├── Ana Sayfa (/) — başarı hero'su, kampüs tercihi, hızlı erişim, Bugün Okulda,
│   eğitim/değerler, program rozetleri, başarı duvarı, haberler, bento galeri, ön kayıt bandı
├── Kurumsal (/kurumsal) — resmî kurumsal sayfa kartları (GM Mesajı, Vizyon-Misyon,
│   E-Safety, Marş, Katalog, Destek Hizmetleri), Değerlerimiz, Mezunlar & Kariyer, Vakıf
├── Kademeler (/kademeler) — Anaokulu, İlkokul, Ortaokul, Anadolu Lisesi, Fen Lisesi
│   (her kademeden ön kayıt derin bağlantısı: ?kademe=)
├── Kampüsler (/kampusler) — kampüs kartları (adres/telefon/yol tarifi), Fotoğraf Turu (#tur)
├── Kayıt & Burslar (/kayit-burslar) — süreç rehberi (4 adım), burs/indirim, SSS, sizi arayalım
├── İletişim (/iletisim) — kampüs iletişim kartları, hızlı kanallar, sizi arayalım
└── Ön Kayıt (/on-kayit) — 3 adımlı form; derin bağlantılar ?kampus= ?kademe= ?tip=burs
```

Doğrulanmış iletişim bilgileri (kaynak: resmî
[Kampüslerimiz sayfası](https://www.sultanfatih.k12.tr/kurumsal/kampuslerimiz)):

- **Fatih:** Derviş Ali Mah. Yahyazade Sok. No:7 Fatih İstanbul · 0212 531 22 82 · bilgi@sultanfatih.k12.tr
- **Beylikdüzü:** Fatih · 0212 421 08 22 / 0212 880 81 10 / 0212 509 38 20

> Not: LinkedIn şirket sayfasında kuruluş yılı **1965** görünmektedir;
> okul yönetiminden teyit edilmeden sitede "19xx'den beri" ifadesi
> kullanılmamıştır. Teyit edilirse kurumsal sayfaya ve Schema.org
> `foundingDate` alanına işlenmelidir.

## 4. Kritik bileşenler

- **SEO/Schema.org (§4A):** ✅ `EducationalOrganization` + `School`
  (tam sokak adresi, telefon, e-posta, `contactPoint`, `sameAs`) —
  `src/app/layout.tsx`. Ayrıca OpenGraph/Twitter, `sitemap.ts`,
  `robots.ts`, `manifest.ts`.
- **Aday kayıt formu (§4B):** ✅ Resmî ön kayıt formunun alanlarıyla
  hizalı (başvuru yapılacak okul/kampüs, veli adı, veli telefonu, öğrenci,
  kademe/sınıf, KVKK onayı) + ek olarak başvuru türü, isteğe bağlı e-posta
  ve ayrı iletişim izni. Resmî form başarı/fallback ekranlarında
  bağlantı olarak korunur.

## 5. LMS/SIS entegrasyonu (§5)

✅ `POST /api/on-kayit` güvenli webhook mimarisi hazırdır:
`LEAD_WEBHOOK_URL` (+ `LEAD_WEBHOOK_SECRET` → `X-Lead-Secret` başlığı)
tanımlanırsa başvurular K12Net/CRM köprüsüne iletilir; kişisel veri
loglanmaz/diskte saklanmaz, yanıt `no-store`'dur. Gövde: `reference,
submittedAt, source, lead{applicationType, parentName, phone, email,
studentName, level, grade, campus, note, contactConsent}`.

## 6. Kalite kapıları (§6)

| Kapı | Durum | Kanıt |
|---|---|---|
| Görsel `alt` metinleri | ✅ | tüm `Image` kullanımlarında anlamlı alt; dekoratiflerde `alt=""` |
| Focus ring | ✅ | küresel `:focus-visible` 3px lacivert outline (`globals.css`) |
| Kontrast ≥ 4.5:1 | ✅ | gövde `#334155`/beyaz ≈10,7:1; lacivert `#0F172A`/altın `#FBBF24` ≈9,6:1; beyaz/lacivert ≈17:1 |
| LCP | ◐ | self-host font (Google isteği yok), `next/image` + ilk hero görselinde `priority`, statik üretim. Saha ölçümü yayın ortamında Lighthouse ile doğrulanmalı (hedef < 1,8 sn) |
| CLS | ✅ hedef | görsellerde aspect-ratio/`fill` kapsayıcıları boyut rezervli; duyuru şeridi sabit yüksekliklidir |
| INP | ✅ hedef | etkileşimler hafif istemci bileşenleri; ağır kütüphane yok |
| Çerez yönetimi | ◐ | kabul/ret eşit ağırlıkta onay kartı + Çerez Politikası/Aydınlatma bağlantıları; izleme kodu şimdilik yok (eklenirse onaya bağlanacak). Tam IAB TCF 2.2, reklam izlemesi olmadığı için uygulanmadı |
| KVKK | ✅ | form gönderimi açık Aydınlatma Metni onayına bağlı; taslaklar yalnızca cihazda; iletişim izni ayrı ve varsayılanı kapalı |
| Hareket azaltma | ✅ | `prefers-reduced-motion`'da otomatik geçişler/animasyonlar durur |

## 7. Yayınlama iş akışında kalanlar (§7)

1. **Veri/varlık bekleyenler:** 360° çekimler, deprem/statik rapor PDF'i,
   bursluluk sınav tarihi, doğrudan İK başvuru URL'si, mezun portal URL'si,
   1965 kuruluş teyidi.
2. **Entegrasyon:** `LEAD_WEBHOOK_URL` prod tanımı; istenirse K12Net canlı
   verisi (yemek menüsü/takvim) için okuma yönlü köprü.
3. **Ölçüm:** Lighthouse saha doğrulaması; onaylı analitik ile
   `docs/hook-model-uygulama.md` §4'teki Alışkanlık Testi.

# Sultan Fatih K.12 — Web Sitesi

Özel Sultan Fatih Eğitim Kurumları'nın (Fatih & Beylikdüzü kampüsleri)
Next.js ile geliştirilen web sitesi. Ana sayfa; başarı vitrini, kampüs
tercihi, hızlı erişim portalları, filtreli başarı duvarı, galeri ve
**çok adımlı ön kayıt** akışını içerir.

Tasarım kararları iki iç rehbere dayanır:

- `.agents/skills/school-website-design-v3/` — K-12 okul sitesi mimarisi, SEO ve dönüşüm rehberi
- `.agents/skills/habit-forming-product-design/` — Kanca Modeli (Hook Model);
  bu sitedeki etik uygulaması için: [`docs/hook-model-uygulama.md`](docs/hook-model-uygulama.md)

## Hızlı başlangıç

Gereksinim: Node.js 24+ (`.nvmrc`)

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + typecheck + production build
```

## Rotalar

| Rota | Açıklama |
|---|---|
| `/` | Ana sayfa (hero, kampüsler, hızlı erişim, eğitim, başarılar, haberler, galeri, ön kayıt bandı) |
| `/on-kayit` | 3 adımlı ön kayıt formu; taslak cihazda saklanır, kaldığı yerden devam edilir |
| `POST /api/on-kayit` | Başvuru kabul ucu: doğrular, referans numarası üretir, tanımlıysa CRM webhook'una iletir |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | SEO/PWA dosyaları (otomatik üretilir) |

## Ön kayıt → CRM köprüsü

Başvurular varsayılan olarak yalnızca referans numarası döner ("local" mod,
kişisel veri saklanmaz/loglanmaz). Okulun öğrenci işleri/K12Net köprüsüne
iletmek için yayın ortamında tanımlayın:

```bash
LEAD_WEBHOOK_URL="https://<crm-köprünüz>/lead"
LEAD_WEBHOOK_SECRET="<isteğe bağlı paylaşılan sır>"   # X-Lead-Secret başlığıyla gönderilir
```

Webhook gövdesi: `{ reference, submittedAt, source, lead: { parentName,
phone, email, studentName, level, grade, campus, note, contactConsent } }`

## Dizin yapısı

```
src/
  app/                          # rotalar, layout (SEO + Schema.org), API
    fonts/                      # self-host DM Sans (OFL) — Google Fonts isteği yok
    on-kayit/  api/on-kayit/
  components/sites/sultanfatih/ # site bileşenleri (nav, hero, bölümler, form…)
    data.ts                     # tüm içerik modeli (tek kaynak)
    storage.ts                  # cihaz-içi tercih/taslak (depolanan değer)
public/sites/sultanfatih/       # görsel varlıklar
docs/hook-model-uygulama.md     # Kanca Modeli uygulama & etik haritası
docs/research/sultanfatih/      # kaynak site araştırma notları
```

## Notlar

- İçerik bağlantılarının çoğu resmî siteye (`sultanfatih.k12.tr`) gider;
  ön kayıt akışı ise bu sitede yerel olarak tamamlanır.
- Kampüs tercihi, form taslağı ve çerez seçimi yalnızca ziyaretçinin
  cihazında (`localStorage`) tutulur; ayrıntılar
  [`docs/hook-model-uygulama.md`](docs/hook-model-uygulama.md) §6'da.

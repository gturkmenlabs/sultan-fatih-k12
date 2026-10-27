# Kanca Modeli (Hook Model) — Sultan Fatih K.12 Uygulama Haritası

Bu belge, `.agents/skills/habit-forming-product-design/SKILL.md` rehberindeki
Kanca Modeli'nin bu siteye **nasıl ve hangi etik sınırlarla** uygulandığını
kaydeder. Amaç "bağımlılık" değil; velinin gerçekten işine yarayan, kendisinin
de isteyerek döneceği faydalı döngülerdir.

## 0. Etik konum: Kolaylaştırıcı (Facilitator) ✅

Manipülasyon Matrisi denetimi:

1. *"Bu ürünü kendimiz kullanır mıyız?"* — Evet: siteyi yöneten ekip ve veliler
   aynı portalları (K12Net, e-Okul) ve aynı formları kullanır.
2. *"Kullanıcının hayatını maddi olarak iyileştirir mi?"* — Evet: kayıt
   belirsizliğini azaltır, yarım kalan işi kaybetmez, günlük okul işlerini
   tek tıkla ulaştırır.

**Kesin yasaklar (bu sitede uygulanmaz):** sahte kıtlık/geri sayım,
çocuklara yönelik ödül döngüleri, varsayılanı işaretli pazarlama onayı,
zorlayıcı bildirim, iptali zorlaştırma, uydurma istatistik/yorum.
Her dış tetikleyici onaya (opt-in) dayanır ve KVKK Aydınlatma Metni'ne bağlıdır.

## 1. Kullanıcılar ve iç tetikleyiciler (5 Neden)

### A. Aday veli — iç tetikleyici: **belirsizlik ve yanlış karar korkusu**

> Okul araştırıyor → çocuğu için doğru okulu bulmak istiyor → LGS/YKS ve
> sosyal gelişimde geri kalmasından korkuyor → kanıt görmek istiyor →
> **"doğru kararı verdim" rahatlığına** ihtiyaç duyuyor.

Site karşılığı: hero'da akan gerçek başarı vitrini (kanıt), şeffaf 4 adımlı
kayıt süreci (belirsizliği azaltma), kampüs turuyla biten net bir yol haritası.

### B. Mevcut veli/öğrenci — iç tetikleyici: **"bir şeyi kaçırıyor muyum?"**

> Telefona bakıyor → çocuğunun notunu/duyurusunu merak ediyor → kontrol
> etmezse önemli bir tarihi kaçırmaktan çekiniyor.

Site karşılığı: **Hızlı Erişim** şeridi ve mobil alt bardaki K12Net düğmesi —
günlük kontrol alışkanlığı sitenin üzerinden tek tıkla akar.

## 2. Evre evre uygulama haritası

| Evre | Sitede karşılığı | Dosya |
|---|---|---|
| **Tetikleyici (dış / sahip olunan)** | Kapatılabilir duyuru şeridi ("2026–2027 ön kayıt başladı"); taslak varsa "kaldığın yerden devam et" şeridine dönüşür | `announcement.tsx` |
| **Tetikleyici (dış / sahip olunan)** | İletişim izni kutusu (varsayılanı **kapalı**) → kayıt dönemi/bursluluk bilgilendirmesi ancak onay verene gider | `on-kayit-form.tsx` adım 3 |
| **Tetikleyici (iç)** | Kaygı/belirsizlik → şeffaf süreç adımları ve KVKK güven satırları | `lead-cta.tsx`, `hero.tsx` |
| **Eylem (Fogg: Ability ↑)** | Yapışkan üst bar: Ön Kayıt her kaydırma konumunda 1 tık; sayfa-içi çapalar (dış siteye atma yok); scrollspy aktif pill | `nav.tsx` |
| **Eylem** | Mobil alt CTA barı (Ön Kayıt + K12Net) — başparmak bölgesi | `floating-actions.tsx` |
| **Eylem** | Mini form yalnızca 4 alan → tam form 3 kısa adım; her adım tek iş | `lead-cta.tsx`, `on-kayit-form.tsx` |
| **Eylem (Kazanılmış İlerleme)** | Mini formdan gelen kullanıcı forma **2. adımdan** başlar; ilerleme çubuğunda bulunduğu adım dolu görünür | `lead-cta.tsx` → `on-kayit-form.tsx` |
| **Değişken Ödül — Av** | Hero'da 4,5 sn'de dönen 15 gerçek başarı; filtrelenebilir Başarı Duvarı'nda keşif | `hero.tsx`, `achievements.tsx` |
| **Değişken Ödül — Kabile** | Okul topluluğunun gerçek kupaları/madalyaları (sosyal kanıt — uydurma yorum yok) | `data.ts` (ACHIEVEMENT_SLIDES) |
| **Değişken Ödül — Benlik** | Form adımlarını tamamlama hissi, ✓ işaretleri, başvuru numarasıyla kapanış | `on-kayit-form.tsx` başarı ekranı |
| **Yatırım (depolanan değer)** | "Benim Kampüsüm" seçimi cihazda hatırlanır; formda hazır gelir, kart öne çıkar | `campus-strip.tsx`, `storage.ts` |
| **Yatırım** | Form taslağı her tuşta cihazda saklanır; yarın dönersen kaldığın adım seni bekler | `storage.ts` (LeadDraft) |
| **Yatırım → sonraki tetikleyici** | Taslak, duyuru şeridini "devam et" çağrısına çevirir; gönderim sonrası referans numarası cihazda saklanır | `announcement.tsx`, `on-kayit-form.tsx` |
| **Yatırım (kalıcı değer)** | Kesin kayıtla K12Net portal hesabı oluşur → günlük alışkanlık yolu site üzerinden akar | `sections.tsx` (QuickAccessStrip) |

## 3. Alışkanlık yolları (Habit Paths)

**Aday veli yolu (haftalık sıklık hedefi):**
Duyuru/tavsiye (tetikleyici) → başarı vitrini (ödül: kanıt) → kampüs seçimi
(yatırım) → mini form (eylem) → taslak/devam (tetikleyici yükleme) → ön kayıt
→ tanışma randevusu.

**Mevcut veli yolu (günlük/haftalık):**
Siteyi aç → Hızlı Erişim'den K12Net (tek tık eylem) → not/duyuru kontrolü
(ödül) → haberler/galeride yeni içerik (değişken ödül) → tekrar.

## 4. Alışkanlık Testi planı (ölçüm önerileri)

1. **Tanımla:** Aday velide "sadık" ölçütü = 30 günde ≥3 ziyaret ve en az bir
   yatırım (kampüs seçimi veya taslak). Hedef: ziyaretçilerin ≥ %5'i.
2. **Kodla:** Başvuruya dönüşenlerin ortak yolunu çıkar (örn. başarı duvarı
   filtresi kullananların dönüşüm oranı). Ölçüm araçları (analitik) KVKK
   onayına bağlanmalı; bu repoda izleme kodu **yoktur**, eklenirken çerez
   onayındaki seçim esas alınmalıdır.
3. **Değiştir:** Kritik eşiği (örn. "kampüs seç + başarı sayfası gör")
   onboarding akışına (hero sırası, şerit metinleri) işle; A/B testinde
   yalnızca dürüst varyantlar yarışır (sahte kıtlık asla bir varyant olamaz).

## 5. Bilinçli olarak yapılmayanlar / sonraki adımlar

- **Yemek menüsü, akademik takvim, duyuru akışı:** Mevcut velinin en güçlü
  faydalı alışkanlık halkaları; ancak güncel veri kaynağı (K12Net/CRM)
  olmadan uydurma veri yayımlanmaz. `LEAD_WEBHOOK_URL` köprüsü
  (`src/app/api/on-kayit/route.ts`) bu entegrasyonun ilk halkasıdır.
- **360° sanal tur:** `school-website-design-v3` rehberindeki gibi güçlü bir
  keşif ödülüdür; çekim/assets hazır olunca Hızlı Erişim'e eklenmeli.
- **Telefon/adres:** Resmî iletişim sayfası doğrulama anında sunucu hatası
  verdiği için doğrulanamayan bilgi siteye yazılmadı; footer/schema'ya
  yalnızca doğrulanan bilgi girer.

## 6. Teknik notlar

- Tüm "depolanan değer" yalnızca **cihazda**dır (`localStorage`,
  `storage.ts`); sunucuya tek gönderim, formun son adımında açık KVKK
  onayıyla `POST /api/on-kayit` iledir. API kişisel veriyi loglamaz/saklamaz;
  `LEAD_WEBHOOK_URL` (+ istenirse `LEAD_WEBHOOK_SECRET`) tanımlıysa CRM'e
  iletir ve referans numarası döner.
- Depolama okumaları `useSyncExternalStore` ile yapılır (SSR uyumlu,
  effect-içinde-setState yok); yazımlar aynı sekmedeki bileşenleri özel
  olayla senkronlar.
- Animasyonlar `prefers-reduced-motion`'a saygılıdır; hero otomatik
  geçişi bu tercihte durur.

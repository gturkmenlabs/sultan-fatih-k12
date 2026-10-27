# Site geneli uyum kontrolü — 27 Ekim 2026

## Düzeltilenler
- Tailwind'in standart boşluk ölçeğini ezen `--spacing-8` … `--spacing-96` tanımları kaldırıldı. Örneğin `h-48` artık 48px değil, beklenen 192px; aynı hata form, ikon düğmeleri, bölüm aralıkları ve görselleri de etkiliyordu.
- Ortak başlık ölçeği küçük ekranlarda akışkan hâle getirildi.
- Haber kartları dar ekranlarda tek sütun; geniş ekranda görsel/metin düzeni kullanır.
- Kampüs kartlarında eşit yükseklik ve tercih düğmesi hizası sağlandı; 16:9 görseller korundu.
- Ana menü genişlik eşiği XL'e taşındı; daha dar ekranlarda mobil menü kullanılır. Logo genişliği ekranla uyumludur.
- Kurumsal alt sayfalarda Kurumsal menüsü aktif kalır. Mobil menü Escape ile kapanır.
- Küçük ekran duyuru satırında uzun mesaj yerine eylem korunur.
- Hero görselleri doğal oranlarını korur; uzun posterler ekran yüksekliğinin %65'ini aşmaz. Başarı duvarı görsellerinde kırpma/zoom kaldırıldı.
- Hero ilerleme düğmelerinin dokunma yüksekliği artırıldı.
- Boş `#` bağlantıları ilgili yerel içeriklere yönlendirildi.
- Reveal içeriği JavaScript çalışmadığında da görünür kalır. Hareket azaltma tercihinde animasyon/geçişler sınırlandırılır.

## Yapılan kontroller
- `npm run check`: ESLint, TypeScript ve üretim derlemesi başarılı.
- 12 iç sayfa HTTP 200.
- `public/sites/sultanfatih` altındaki 49 dosya HTTP 200.
- `git diff --check`: temiz.

## Sınırlar / kalan işler
- Bu turda gerçek tarayıcıyla ekran görüntüsü veya cihaz testi yapılmadı; mobil düzen değişiklikleri kod düzeyinde kontrol edildi. Bu rapor Lighthouse/WCAG sertifikası değildir.
- Eski resmî sitedeki tüm dış bağlantıların çalıştığı garanti edilmez; alan adı bu uygulamadan bağımsızdır.
- Kurumsal alt sayfalardaki özgün müdür mesajı, vizyon/misyon metni, marş ve onaylı belgeler hâlâ kurum tarafından sağlanmalıdır; yer tutucu durum notları açıkça gösterilir.
- Canlı başvuruların kuruma iletilmesi için webhook yapılandırması gerekir; yerel kabul modu kalıcı CRM kaydı değildir.

---
name: school-website-design-v3
description: K-12 özel okulları için ileri düzey web sitesi tasarım, dijital mimari ve yazılım geliştirme rehberi. Okul web sitesi tasarımı, aday kayıt dönüşüm hunisi, 360° sanal tur, LMS/SIS entegrasyonu, SEO (Schema.org EducationalOrganization) ve UX/UI tasarım sistemi konularında bu skill'i kullan.
---

# Skill: Okul Web Sitesi Tasarım, Dijital Mimari ve Yazılım Geliştirme Rehberi (`school-website-design-v3`)

## Overview
Bu yetenek rehberi, K-12 düzeyindeki kurumsal veya müstakil özel okullar için veli güvenini en üst düzeye çıkaran, aday öğrenci kayıt süreçlerini (dönüşüm hunisi) optimize eden, akademik modelleri şeffaflaştıran, dijital kampüs (360° VR) deneyimi sunan ve öğrenim yönetim sistemleriyle (LMS/SIS) entegre çalışan **ileri düzey okul web sitesi tasarım ve teknik geliştirme rehberidir**.

Rehber; Türkiye'nin önde gelen kurumsal özel okul ağlarının (Bahçeşehir Koleji, TED Okulları, Eyüboğlu Eğitim Kurumları, Bilfen, FMV Işık, Doğa Koleji, İSTEK Okulları, Uğur Okulları, Okyanus Koleji, Mektebim Koleji) dijital web mimarisi, görsel pazarlama stratejileri, UX/UI standartları ve teknik altyapıları analiz edilerek hazırlanmıştır.

---

## 1. Stratejik Hedef Kitle ve Kullanıcı Senaryoları (UX Matrix)

| Paydaş Grubu | Birincil İhtiyaç & Beklenti | Dijital Arayüz Bileşeni | Hedeflenen Eylem (Conversion) |
| :--- | :--- | :--- | :--- |
| **Potansiyel Veliler** | Kurumsal güven, akademik başarı (LGS/YKS/Yurt dışı kabulleri), burs olanakları, bina güvenlik & deprem teknik raporları, kayıt ücretleri. | Hero Floating CTA, Bento Grid Kampüs Galerisi, Akreditasyon Rozetleri, Şeffaf Statik Rapor İndirme. | Aday Öğrenci Başvuru Formu doldurma, 360° Sanal Tur başlatma, Bursluluk Sınavı kaydı yapma. |
| **Mevcut Veli & Öğrenciler** | LMS/SIS erişimi, günlük yemek menüsü, akademik takvim, sınav sonuçları, okul duyuruları. | Üst Navigasyon Portal Butonları (K12net, Google Classroom, EYS, e-Doğa, Metodbox, STOYS). | Tek tıkla güvenli portal girişi, yemek menüsü ve ders programı kontrolü. |
| **Mezunlar & Topluluk** | Mezunlar derneği ağı, kariyer dayanışması, geleneksel buluşma günleri. | Mezun Ağ Portal Bağlantısı (FID, Lokal1885 vb.), Portreler ve Başarı Öyküleri. | Mezun bilgi güncelleme, etkinlik katılımı. |
| **İnsan Kaynakları & Adaylar** | Kurumsal kültür, öğretmen eğitim akademisi ("Dijital Liderler Akademisi"), açık pozisyonlar. | Kariyer Modülü, İş Başvuru Formu, Akademi Tanıtımı. | CV gönderme, pozisyon başvurusu. |

---

## 2. Tasarım Sistemi ve Visual Tokens (UI/UX Design System)

Okul web sitelerinde güvenilirlik, köklü gelenek ve yenilikçi teknolojiyi yansıtan CSS/Design System standartları:

```css
:root {
  /* Renk Paleti (Color Tokens) */
  --primary-navy: #0F172A;      /* Güven ve kurumsallığı temsil eden derin lacivert */
  --brand-blue: #1E3A8A;        /* Akademik derinlik mavi tonu */
  --accent-gold: #D97706;        /* Meşale/Işık ve başarı simgeleyen altın sarısı */
  --accent-gold-hover: #B45309;  
  --nature-green: #059669;       /* Eko-okul/doğa kampüsü yeşil vurgusu */
  --bg-light: #F8FAFC;          /* Zemin gri/beyaz tonu */
  --surface-white: #FFFFFF;     /* Kart zeminleri */
  --text-main: #334155;         /* Okunabilir gövde metin rengi */
  --text-dark: #0F172A;         /* Başlık renkleri */
  
  /* Tipografi (Typography Stack) */
  --font-heading: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  
  /* Grid & Spacing */
  --container-max: 1280px;
  --radius-card: 16px;
  --radius-btn: 8px;
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
  --shadow-lg: 0 10px 25px -5px rgba(15, 23, 42, 0.1);
}
```

---

## 3. Bilgi Mimarisi ve Eksiksiz Site Haritası (Site Architecture)

```
├── Header / Top Bar
│   ├── Hızlı Erişim: [360° Sanal Tur] | [Aday Öğrenci Başvurusu] | [Veli/Öğrenci Portalı] | [Çağrı Merkezi]
│   └── Dil Seçimi (TR / EN)
├── Ana Navigasyon
│   ├── Kurumsal
│   │   ├── Kurucunun & Genel Müdürün Mesajı
│   │   ├── Tarihçe, Vakıf & Dernek Geleneği (Örn: 138+ Yıllık Birikim)
│   │   ├── Vizyon, Misyon ve Kurumsal Değerler
│   │   ├── Yönetim & Akademik Kadro
│   │   └── Kalite, Çocuk Koruma & Yapay Zekâ Politikaları
│   ├── Eğitim & Akademik Modeller
│   │   ├── Özgün Pedagojik Çerçeveler (ASDF, Bilfen Mükemmellik, STEAM+A)
│   │   ├── Uluslararası Programlar & Akreditasyonlar (IB PYP/MYP/DP, CIS, AP)
│   │   ├── Yabancı Dil Eğitimi & CEFR C1 Düzeyi Hedefleri
│   │   ├── Kodlama, Robotik, Maker & Bilişim Teknolojileri
│   │   └── Psikolojik Danışmanlık ve Rehberlik (PDR)
│   ├── Kademelerimiz
│   │   ├── Anaokulu / Okul Öncesi (Erken Çocukluk & Oyun Odaları)
│   │   ├── İlkokul (Bütünsel Öğrenme & Keşif)
│   │   ├── Ortaokul (LGS Merkezi Sınav Projeksiyonu)
│   │   └── Lise / Fen ve Teknoloji Lisesi (YKS & Yurt Dışı Üniversite Danışmanlığı)
│   ├── Kampüs & Fiziki İmkanlar
│   │   ├── Interaktif 360° Sanal Tur (Matterport / Pano2VR Entegrasyonu)
│   │   ├── Laboratuvarlar, Maker Stüdyoları & Sanat Atölyeleri
│   │   ├── Spor Tesisleri (Yarı Olimpik Havuz, Kapalı Spor Salonları, Buz Pateni)
│   │   └── Bina Güvenlik, Deprem Statik Raporları & Yeşil Kampüs (Eko-Okul)
│   ├── Başarılarımız & Sosyal Yaşam
│   │   ├── LGS / YKS / Yurt Dışı Üniversite Kabulleri
│   │   ├── Öğrenci Kulüpleri, Spor & Sanat Akademisi
│   │   └── Sosyal Sorumluluk & eTwinning Projeleri
│   ├── Kayıt & Burslar
│   │   ├── Kayıt Koşulları ve Süreç Rehberi
│   │   ├── Bursluluk Sınavı Kayıt Otomasyonu
│   │   └── Aday Öğrenci İletişim & Bilgi Formu
│   └── İletişim
│       ├── Kampüs Yerleşke Konumları & Ulaşım Haritası
│       └── Bize Ulaşın / Sizi Arayalım Çağrı Formu
```

---

## 4. Kritik Sayfa Bileşenleri ve Teknik Yapı

### A. SEO & Google Zengin Sonuçlar (Schema.org EducationalOrganization)
Arama motorlarında okul adresinin, akreditasyonlarının ve iletişim bilgilerinin doğru görünmesi için HTML `<head>` alanında yapılandırılmış veri kullanılmalıdır:
- **@type:** EducationalOrganization / School
- **name:** Kurumsal Okul Adı
- **address:** Kampüs adresi ve posta kodu
- **sameAs:** Resmi sosyal medya bağlantıları

### B. Dönüşüm Odaklı Aday Kayıt Formu (Lead Capture Form)
Form arayüzü aday veliden yalnızca gerekli birincil bilgileri toplamalıdır:
- **Veli Adı Soyadı**
- **İletişim Telefonu**
- **Öğrenci Kademesi / Sınıfı** (Anaokulu, İlkokul, Ortaokul, Lise)
- **Kampüs Tercihi**
- **Aydınlatma Metni Onay Kutusu**

---

## 5. Öğrenim Yönetim Sistemleri (LMS/SIS) & API Entegrasyonu

Web sitesi üzerinden alınan aday başvurularının okulun öğrenci bilgi sistemine (K12net vb.) aktarımı için güvenli Webhook mimarisi kurgulanmalıdır.

---

## 6. Güvenlik, Erişilebilirlik ve Performans Kalite Gate'leri (Checklist)

1. **Erişilebilirlik (WCAG 2.1 AA Compliance):**
   - Tüm görsellerde anlamlı `alt` etiketleri.
   - Odaklanabilir öğelerde belirgin `outline` / focus ring.
   - Metin-zemin renk kontrast oranı en az `4.5:1`.
2. **Performans Metrikleri (Core Web Vitals):**
   - **LCP (Largest Contentful Paint):** < 1.8 saniye (Hero video/görsel optimizasyonu).
   - **CLS (Cumulative Layout Shift):** < 0.05.
   - **INP (Interaction to Next Paint):** < 100 ms.
3. **Kişisel Verilerin Korunması & Çerez Yönetimi:**
   - IAB Europe TCF 2.2 uyumlu Çerez Onay Modülü.
   - Verilerin mevzuata uygun şekilde güvenli sunucularda barındırılması.

---

## 7. Adım Adım Yayınlama ve Operasyon İş Akışı

1. **Analiz & Konumlandırma:** Okulun vakıf/dernek kökenli geleneksel yapısı mı yoksa teknoloji odaklı büyüme zinciri mi vurgulanacak kararlaştırılır.
2. **Wireframe & UI Tasarımı:** Figma üzerinde mobil ve masaüstü grid düzeni oluşturulur.
3. **Medya Üretimi:** 360° VR çekimleri tamamlanır, stüdyo ortamında laboratuvar ve spor kompleksi fotoğrafları çekilir.
4. **Front-End & Back-End Geliştirme:** Responsive düzen kurulur, LMS/CRM entegrasyonu tamamlanır.
5. **Test & Yayınlama:** Form iletim testleri, mobil görünüm denetimi ve güvenlik taraması sonrasında site yayına alınır.

---

*Bu rehber, K-12 okul web sitelerinin hem tasarım hem de teknik yazılım standartlarını belirleyen eksiksiz kılavuzdur.*

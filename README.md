# 📚 Raf. - Modern Book Explorer

**Raf.**, kullanıcıların kitapları keşfedebileceği, kişisel okuma listeleri oluşturabileceği ve editoryal bir kütüphane yönetebileceği modern bir React uygulamasıdır. [Open Library API](https://openlibrary.org/developers/api) kullanılarak geliştirilmiştir.

## 🚀 Canlı Demo
https://raf-app-hg29.vercel.app/

## 🛠 Kullanılan Teknolojiler
Bu proje, modern web standartlarına uygun olarak aşağıdaki teknolojilerle inşa edilmiştir:

*   **Framework:** React 18 + Vite
*   **Dil:** TypeScript
*   **State Yönetimi:** Zustand (Persist middleware ile localStorage desteği)
*   **Veri Yönetimi:** TanStack Query (React Query)
*   **Stil:** Tailwind CSS
*   **Routing:** React Router v6
*   **Form Yönetimi:** React Hook Form + Zod (Validasyon)
*   **İkonlar:** Lucide React

## ✨ Temel Özellikler
*   **Gelişmiş Arama:** Kitap veya yazar adına göre arama, yayın yılı ve dil filtreleme.
*   **Kişiselleştirme:** Favoriler ve Durum bazlı (Okunacak, Okunuyor, Okundu) okuma listesi yönetimi.
*   **Okuma Deneyimi:** Her kitap için kişisel notlar, puanlama (rating) sistemi.
*   **İstatistikler:** Okuma ilerleme durumunu gösteren interaktif dashboard.
*   **Responsive Tasarım:** Mobil, tablet ve masaüstü cihazlar için optimize edilmiş arayüz.
*   **Tema Desteği:** Sistem tercihlerine uyumlu Dark Mode/Light Mode.

## 📦 Kurulum

Projeyi yerel bilgisayarınızda çalıştırmak için şu adımları izleyin:

1. Depoyu klonlayın:
   ```bash
   git clone [https://github.com/sudeafcn/RAF-APP](https://github.com/sudeafcn/RAF-APP)

2. Gerekli paketleri yükleyin:
   ```bash
   npm install

3. Ortam değişkenlerini ayarlayın (Ana dizinde .env dosyası oluşturun):
   ```bash
   VITE_API_URL=[https://openlibrary.org](https://openlibrary.org)

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
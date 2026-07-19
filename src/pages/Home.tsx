import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Search, TrendingUp, Compass, Heart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { bookApi } from '../services/api';
import BookCard from '../components/BookCard';

export default function Home() {
  const { data: featuredBooks } = useQuery({
    queryKey: ['featuredBooks'],
    queryFn: () => bookApi.searchBooks('lord of the rings', 1),
  });

  return (
    <div className="space-y-24 pb-20 animate-fade-in overflow-hidden">
      
      {/* 1. YENİ HERO (KAHRAMAN) BÖLÜMÜ - Editoryal & Asimetrik Tasarım */}
      <section className="relative pt-12 md:pt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto px-4">

          {/* Sol Taraf: Metin ve Aksiyon (Sola Hizalı Dergi Stili) */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium text-sm border border-slate-200 dark:border-slate-700 w-fit shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Kişisel dijital kütüphanenize hoş geldiniz
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.05]">
              Sayfalarda <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-500">
                Kaybolun.
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
              Ruhunuzu doyuracak o kusursuz hikayeyi bulun. Okuduklarınızı kaydedin, notlar alın ve kendi editoryal rafınızı oluşturun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/search" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/20 text-lg">
                <Search className="w-5 h-5" /> Kitap Ara
              </Link>
              <Link to="/search?q=classics" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 active:scale-95 text-lg shadow-sm">
                Rastgele Keşfet <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Sağ Taraf: Estetik Görsel Kompozisyon (Masaüstünde görünür) */}
          <div className="relative hidden lg:block h-[550px] w-full">
            {/* Arka plan devasa renk bulanıklığı */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-500/20 dark:bg-indigo-500/30 blur-[100px] rounded-full pointer-events-none" />

            {/* Ana Büyük Fotoğraf (Hafif Eğik) */}
            <div className="absolute right-0 top-4 w-[85%] h-[95%] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 border-8 border-white dark:border-[#1E293B]">
              <div className="absolute inset-0 bg-black/10 z-10" />
              <img
                src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop"
                alt="Kitaplık Estetik"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
            </div>

            {/* Fotoğrafın Üzerinde Yüzen İstatistik Kartı */}
            <div className="absolute left-0 bottom-20 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 -rotate-6 hover:rotate-0 transition-transform duration-500 w-64 z-20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center text-rose-500">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Favori</p>
                  <p className="font-bold text-slate-900 dark:text-white leading-tight">Suç ve Ceza</p>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-indigo-500 rounded-full" />
              </div>
              <p className="text-xs text-right mt-2 text-slate-500 font-bold">%75 Okundu</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. VİTRİN: CANLI KİTAP KAPAKLARI (Değiştirilmedi) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-indigo-500" /> Haftanın Öne Çıkanları
          </h2>
          <Link to="/search" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors hidden sm:flex items-center gap-1">
            Tümünü Gör <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {!featuredBooks ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="aspect-[2/3] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {featuredBooks.docs.slice(0, 5).map((book: any) => (
              <div key={book.key} className="transition-transform hover:-translate-y-2">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. BENTO GRID: GÖRSELLİ KATEGORİ KARTLARI (Değiştirilmedi) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Compass className="w-8 h-8 text-emerald-500" />
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Kategorilerde Gezin
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/search?q=kurgu" className="relative overflow-hidden group rounded-[2rem] bg-linear-to-br from-indigo-500 to-purple-700 p-8 aspect-square md:aspect-auto md:h-72 flex flex-col justify-end transition-transform hover:-translate-y-2 shadow-xl shadow-indigo-500/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-2">Roman & Kurgu</h3>
              <p className="text-indigo-100 font-medium">Sınırları aşan büyüleyici hikayeler</p>
            </div>
          </Link>

          <Link to="/search?q=bilim" className="relative overflow-hidden group rounded-[2rem] bg-linear-to-br from-emerald-500 to-teal-700 p-8 aspect-square md:aspect-auto md:h-72 flex flex-col justify-end transition-transform hover:-translate-y-2 shadow-xl shadow-emerald-500/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-2">Bilim & Tarih</h3>
              <p className="text-emerald-100 font-medium">Gerçek dünyanın gizemli sırları</p>
            </div>
          </Link>

          <Link to="/search?q=felsefe" className="relative overflow-hidden group rounded-[2rem] bg-linear-to-br from-rose-500 to-orange-600 p-8 aspect-square md:aspect-auto md:h-72 flex flex-col justify-end transition-transform hover:-translate-y-2 shadow-xl shadow-rose-500/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-2">Felsefe</h3>
              <p className="text-rose-100 font-medium">Düşüncenin ve varoluşun derinlikleri</p>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
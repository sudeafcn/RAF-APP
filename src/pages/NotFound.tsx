import { Link } from 'react-router-dom';
import { BookX, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      
      <div className="relative mb-8">
        {/* Arkadaki parlayan 404 yazısı */}
        <h1 className="text-[120px] md:text-[180px] font-black text-slate-100 dark:text-slate-800/50 leading-none select-none">
          404
        </h1>
        {/* Öndeki ikon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0B1120] p-6 rounded-full shadow-2xl border border-slate-100 dark:border-slate-800 text-indigo-500">
          <BookX className="w-16 h-16 md:w-20 md:h-20" />
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
        Kitaplıkta Bulunamadı
      </h2>
      
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10 text-lg">
        Aradığınız sayfa yırtılmış, hiç yazılmamış veya başka bir rafa kaldırılmış olabilir.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-bold transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
        >
          <Home className="w-5 h-5" /> Ana Sayfaya Dön
        </Link>
        <Link 
          to="/search" 
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 active:scale-95 shadow-sm"
        >
          <Search className="w-5 h-5" /> Kitap Ara
        </Link>
      </div>

    </div>
  );
}
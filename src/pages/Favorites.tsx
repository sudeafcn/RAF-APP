import { useBookStore } from '../store/useBookStore';
import BookCard from '../components/BookCard';
import { HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  // Zustand mağazamızdan sadece favorileri çekiyoruz
  const { favorites } = useBookStore();

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      
      {/* Sayfa Başlığı */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Favori <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-pink-500">Kitapların</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Kalp bıraktığın ve unutmak istemediğin o özel hikayeler.
        </p>
      </div>

      {/* BOŞ DURUM: Favorilerde kitap yoksa */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
          <HeartCrack className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg font-medium mb-6">Henüz favorilerine bir kitap eklemedin.</p>
          <Link 
            to="/search" 
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-500/20 active:scale-95"
          >
            Kitap Keşfetmeye Başla
          </Link>
        </div>
      ) : (
        /* DOLU DURUM: Favori kitapları listele */
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pt-4">
          {favorites.map((book) => (
            <div key={book.key} className="relative group">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
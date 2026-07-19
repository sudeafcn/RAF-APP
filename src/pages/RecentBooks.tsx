import { History, BookX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookStore } from '../store/useBookStore';
import BookCard from '../components/BookCard';

export default function RecentBooks() {
  const { recentBooks } = useBookStore();

  return (
    <div className="space-y-10 animate-fade-in pb-10 max-w-7xl mx-auto px-4">
      
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
          <History className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Son <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-500">Görüntülenenler</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-lg">
          İncelediğiniz son 20 kitap burada listelenir.
        </p>
      </div>

      {recentBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#1E293B] rounded-3xl border border-slate-200 dark:border-slate-800">
          <BookX className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg font-medium mb-6">Henüz hiçbir kitabı incelemediniz.</p>
          <Link to="/search" className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md active:scale-95 cursor-pointer">
            Keşfetmeye Başla
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {recentBooks.map((book: any, index: number) => (
            <div key={`${book.key}-${index}`} className="transition-transform hover:-translate-y-1">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
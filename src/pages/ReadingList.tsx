import { useState } from 'react';
import { useBookStore, type ReadingStatus } from '../store/useBookStore';
import BookCard from '../components/BookCard';
import { BookMarked, Star, Edit3, Trash2, CheckCircle2, Clock, BookOpen, BarChart3, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReadingList() {
  const { 
    readingList, 
    updateReadingStatus, 
    removeFromReadingList, 
    updateBookRating, 
    updateBookNote
  } = useBookStore();
  
  const [activeFilter, setActiveFilter] = useState<ReadingStatus | 'tümü'>('tümü');

  const displayedBooks = readingList.filter(book => activeFilter === 'tümü' ? true : book.status === activeFilter);

  // OKUMA İSTATİSTİKLERİ (Dashboard için)
  const totalBooks = readingList.length;
  const readBooks = readingList.filter(b => b.status === 'okundu').length;
  const readingBooks = readingList.filter(b => b.status === 'okunuyor').length;
  const toReadBooks = readingList.filter(b => b.status === 'okunacak').length;

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      
      <div className="max-w-4xl mx-auto space-y-8 pt-4">
        <h1 className="text-4xl md:text-5xl font-black text-center text-slate-900 dark:text-white tracking-tight">
          Okuma <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-emerald-500">Listem</span>
        </h1>

        {/* OKUMA İSTATİSTİKLERİ DASHBOARD'U (Geri Geldi!) */}
        {totalBooks > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-0">
            <div className="bg-white dark:bg-[#1E293B] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Toplam</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{totalBooks}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E293B] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Biten</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{readBooks}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E293B] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Okunan</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{readingBooks}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E293B] p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sırada</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{toReadBooks}</p>
              </div>
            </div>
          </div>
        )}

        <div className="w-full overflow-x-auto no-scrollbar px-4 -mx-4 md:px-0 md:mx-0 text-center">
          <div className="inline-flex bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/50 min-w-max mx-auto">
            <button 
              onClick={() => setActiveFilter('tümü')}
              className={`whitespace-nowrap shrink-0 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeFilter === 'tümü' ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Tümü
            </button>
            <button 
              onClick={() => setActiveFilter('okunacak')}
              className={`whitespace-nowrap shrink-0 px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeFilter === 'okunacak' ? 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <Clock className="w-4 h-4" /> Okunacaklar
            </button>
            <button 
              onClick={() => setActiveFilter('okunuyor')}
              className={`whitespace-nowrap shrink-0 px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeFilter === 'okunuyor' ? 'bg-white dark:bg-[#1E293B] text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <BookOpen className="w-4 h-4" /> Okunuyor
            </button>
            <button 
              onClick={() => setActiveFilter('okundu')}
              className={`whitespace-nowrap shrink-0 px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeFilter === 'okundu' ? 'bg-white dark:bg-[#1E293B] text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <CheckCircle2 className="w-4 h-4" /> Okundu
            </button>
          </div>
        </div>
      </div>

      {readingList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
          <BookMarked className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg font-medium mb-6">Listenizde henüz kitap bulunmuyor.</p>
          <Link to="/search" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md active:scale-95 cursor-pointer">
            Kitap Keşfet
          </Link>
        </div>
      ) : displayedBooks.length === 0 ? (
        <div className="text-center py-20 text-slate-500 font-medium">Bu kategoride kitap bulunmuyor.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBooks.map((book) => (
            <div key={book.key} className="flex flex-col bg-slate-50 dark:bg-[#0B1120] rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm group">
              
              <div className="flex justify-between items-start mb-4">
                <select 
                  value={book.status}
                  onChange={(e) => updateReadingStatus(book.key, e.target.value as ReadingStatus)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer border ${
                    book.status === 'okundu' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                    book.status === 'okunuyor' ? 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20' : 
                    'bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                  }`}
                >
                  <option value="okunacak">⏳ Okunacak</option>
                  <option value="okunuyor">📖 Okunuyor</option>
                  <option value="okundu">✅ Okundu</option>
                </select>

                <button onClick={() => removeFromReadingList(book.key)} className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer" title="Listeden Çıkar">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="w-1/2 mx-auto mb-4">
                <BookCard book={book} />
              </div>

              <div className="flex-1 flex flex-col gap-5 border-t border-slate-200 dark:border-slate-800 pt-5 mt-auto">
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Puanın:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        onClick={() => updateBookRating(book.key, star)}
                        className="transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= (book.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Edit3 className="w-4 h-4" /> Notların:
                  </span>
                  <textarea 
                    defaultValue={book.note}
                    onBlur={(e) => updateBookNote(book.key, e.target.value)}
                    placeholder="Bu kitap hakkında ne düşünüyorsun?"
                    className="w-full flex-1 min-h-[80px] p-3 text-sm rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-500 resize-none transition-all"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
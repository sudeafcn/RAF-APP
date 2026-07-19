import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search as SearchIcon, Loader2, Book, User, ChevronLeft, ChevronRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookApi } from '../services/api';
import BookCard from '../components/BookCard';

const searchSchema = z.object({
  query: z.string().min(2, 'Arama yapmak için en az 2 karakter girmelisiniz.'),
});

type SearchForm = z.infer<typeof searchSchema>;
type SearchType = 'title' | 'author';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialQuery = searchParams.get('q') || '';
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<SearchType>('title');
  const [page, setPage] = useState(1);
  
  // YENİ: Filtre State'leri
  const [showFilters, setShowFilters] = useState(false);
  const [yearFilter, setYearFilter] = useState('');
  const [langFilter, setLangFilter] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: initialQuery }
  });

  useEffect(() => {
    if (initialQuery) {
      setValue('query', initialQuery);
      setActiveQuery(initialQuery);
    }
  }, [initialQuery, setValue]);

  const isDefaultView = activeQuery.length < 2;
  const queryToFetch = isDefaultView ? 'bestseller' : activeQuery;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['search', queryToFetch, searchType, page, yearFilter, langFilter],
    queryFn: () => bookApi.searchBooks(queryToFetch, page, searchType, yearFilter, langFilter),
  });

  const onSubmit = (data: SearchForm) => {
    setPage(1);
    setActiveQuery(data.query);
    setSearchParams({ q: data.query });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 animate-fade-in pb-10">
      
      <div className="max-w-3xl mx-auto space-y-6 pt-4">
        <h1 className="text-4xl md:text-5xl font-black text-center text-slate-900 dark:text-white tracking-tight">
          Kütüphanede <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-500">Ara</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <SearchIcon className="w-6 h-6" />
            </div>
            <input
              {...register('query')}
              type="text"
              placeholder="Kitap veya yazar adı yazın..."
              className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white dark:bg-[#1E293B] border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all shadow-sm text-lg font-medium"
            />
            <button
              type="submit"
              className="absolute inset-y-2 right-2 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all active:scale-95 cursor-pointer shadow-md shadow-indigo-500/20"
            >
              Ara
            </button>
          </div>
          {errors.query && (
            <p className="text-rose-500 font-medium text-sm text-center animate-shake">
              {errors.query.message}
            </p>
          )}

          {/* Kitap / Yazar Seçim Butonları */}
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => { setSearchType('title'); setPage(1); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm ${
                searchType === 'title' 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 ring-2 ring-indigo-500/20' 
                  : 'bg-white dark:bg-[#1E293B] text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Book className="w-4 h-4" /> Kitap Adına Göre
            </button>
            <button
              type="button"
              onClick={() => { setSearchType('author'); setPage(1); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm ${
                searchType === 'author' 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 ring-2 ring-indigo-500/20' 
                  : 'bg-white dark:bg-[#1E293B] text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <User className="w-4 h-4" /> Yazar Adına Göre
            </button>
          </div>

          {/* YENİ: Gelişmiş Filtreler Butonu */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilters ? 'Filtreleri Gizle' : 'Gelişmiş Filtreler'}
            </button>
          </div>

          {/* YENİ: Filtre Paneli */}
          {showFilters && (
            <div className="flex flex-col md:flex-row gap-4 mt-2 p-5 bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700 animate-fade-in">
              <div className="flex-1 space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider pl-1">Kitap Dili</label>
                <select
                  value={langFilter}
                  onChange={(e) => { setLangFilter(e.target.value); setPage(1); }}
                  className="w-full p-3 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition-all text-sm font-medium cursor-pointer"
                >
                  <option value="">Tüm Diller</option>
                  <option value="tur">Türkçe</option>
                  <option value="eng">İngilizce</option>
                  <option value="fre">Fransızca</option>
                  <option value="ger">Almanca</option>
                  <option value="spa">İspanyolca</option>
                </select>
              </div>
              
              <div className="flex-1 space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider pl-1">Yayın Yılı</label>
                <input
                  type="number"
                  placeholder="Örn: 2023"
                  value={yearFilter}
                  onChange={(e) => { setYearFilter(e.target.value); setPage(1); }}
                  className="w-full p-3 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition-all text-sm font-medium"
                />
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="flex items-center gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        {isDefaultView ? (
          <>
            <Sparkles className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Sizin İçin Seçtiklerimiz</h2>
          </>
        ) : (
          <>
            <SearchIcon className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              "<span className="text-indigo-600 dark:text-indigo-400">{activeQuery}</span>" için sonuçlar
            </h2>
          </>
        )}
      </div>

      {isLoading || isFetching ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <div key={i} className="aspect-[2/3] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20 bg-rose-50 dark:bg-rose-500/10 rounded-3xl border border-rose-100 dark:border-rose-500/20">
          <p className="text-lg font-bold text-rose-600 dark:text-rose-400">Kitaplar getirilirken bir hata oluştu.</p>
        </div>
      ) : data && data.docs ? (
        <div className="space-y-12">
          {data.docs.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-[#1E293B] rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-xl font-bold text-slate-600 dark:text-slate-400">Aradığınız kriterlere uygun sonuç bulunamadı.</p>
              <p className="text-slate-500 mt-2">Filtreleri temizleyip veya farklı kelimelerle tekrar deneyin.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {data.docs.map((book: any, index: number) => (
                  <BookCard key={`${book.key}-${index}`} book={book} />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 pt-8 pb-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" /> Önceki
                </button>
                
                <div className="px-6 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 font-black text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                  {page}
                </div>
                
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={data.docs.length < 20}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Sonraki <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
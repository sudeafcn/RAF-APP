import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader2, User, BookOpen, Calendar } from 'lucide-react';
import { bookApi } from '../services/api';
import BookCard from '../components/BookCard';

export default function AuthorDetail() {
  // URL'den yazarın ID'sini alıyoruz (örnek: OL26320A)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Yazarın genel bilgilerini çeken sorgu
  const { data: author, isLoading: isAuthorLoading, isError: isAuthorError } = useQuery({
    queryKey: ['authorDetail', id],
    queryFn: () => bookApi.getAuthorDetails(id!),
    enabled: !!id,
  });

  // Yazarın kitaplarını çeken sorgu
  const { data: authorBooks, isLoading: isBooksLoading } = useQuery({
    queryKey: ['authorBooks', id],
    queryFn: () => bookApi.getAuthorBooks(id!),
    enabled: !!id,
  });

  if (isAuthorLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="mt-4 font-medium">Yazar arşivi açılıyor...</p>
      </div>
    );
  }

  if (isAuthorError || !author) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-red-500">
        <p className="text-lg font-medium">Yazar detayları bulunamadı.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 underline cursor-pointer">Geri Dön</button>
      </div>
    );
  }

  // API bazen biyografiyi string, bazen de obje içinde gönderiyor. Güvenli şekilde alıyoruz.
  const bioText = typeof author.bio === 'object' ? author.bio?.value : author.bio;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-12 pb-10">
      
      {/* Üst Bar: Geri Dön */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Geri Dön
        </button>
      </div>

      {/* Yazar Profil Kartı (Hero) */}
      <div className="flex flex-col md:flex-row gap-8 items-start bg-white dark:bg-[#1E293B] p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Yazar Fotoğrafı */}
        <div className="shrink-0 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-700 shadow-xl mx-auto md:mx-0">
          {author.photos ? (
            <img 
              src={bookApi.getAuthorPhotoUrl(author.photos[0], 'L')} 
              alt={author.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <User className="w-20 h-20" />
            </div>
          )}
        </div>

        {/* Yazar Bilgileri */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {author.name}
          </h1>

          {(author.birth_date || author.death_date) && (
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 dark:text-slate-400 font-medium">
              <Calendar className="w-5 h-5" />
              <span>{author.birth_date || '?'} - {author.death_date || 'Günümüz'}</span>
            </div>
          )}

          {bioText ? (
            <div className="prose prose-slate dark:prose-invert max-w-none pt-4">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg whitespace-pre-line line-clamp-6 hover:line-clamp-none transition-all">
                {bioText}
              </p>
            </div>
          ) : (
            <p className="text-slate-500 italic pt-4">Bu yazar için henüz detaylı bir biyografi girilmemiş.</p>
          )}
        </div>
      </div>

      {/* Yazarın Kitapları Vitrini */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-500" />
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Yazarın Kitapları
          </h2>
        </div>

        {isBooksLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="aspect-[2/3] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : authorBooks && authorBooks.entries && authorBooks.entries.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {/* API kitapları 'entries' adında farklı bir formatla yolladığı için map ederken uyarlıyoruz */}
            {authorBooks.entries.map((entry: any) => {
              const formattedBook = {
                key: entry.key,
                title: entry.title,
                cover_i: entry.covers ? entry.covers[0] : undefined,
                first_publish_year: entry.first_publish_date,
              };
              return <BookCard key={entry.key} book={formattedBook as any} />;
            })}
          </div>
        ) : (
          <p className="text-slate-500 font-medium">Yazarın bu kütüphanede kayıtlı kitabı bulunamadı.</p>
        )}
      </div>

    </div>
  );
}
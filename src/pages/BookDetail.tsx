import BookCard from '../components/BookCard';
import { useEffect } from 'react'; 
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Heart, BookMarked, ArrowLeft, Loader2, Share2, Calendar} from 'lucide-react';
import { bookApi } from '../services/api';
import { useBookStore } from '../store/useBookStore';
import { useToastStore } from '../store/useToastStore'; // Bildirim store'umuzu dahil ettik

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { addToFavorites, removeFromFavorites, favorites, addToReadingList, readingList, addRecentBook } = useBookStore();
  const { addToast } = useToastStore(); // Bildirim fonksiyonumuzu aldık

  const { data: book, isLoading, isError } = useQuery({
    queryKey: ['bookDetail', id],
    queryFn: () => bookApi.getBookDetails(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (book) {
      addRecentBook({
        key: `/works/${id}`,
        title: book.title,
        cover_i: book.covers?.[0],
      } as any);
    }
  }, [book, addRecentBook, id]);

  const firstSubjectRaw = book?.subjects?.[0];
  const firstSubject = typeof firstSubjectRaw === 'string' ? firstSubjectRaw : firstSubjectRaw?.name;

  const { data: similarBooks } = useQuery({
    queryKey: ['similarBooks', firstSubject],
    queryFn: () => bookApi.getSimilarBooks(firstSubject!),
    enabled: !!firstSubject,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="mt-4 font-medium">Kitap sayfaları açılıyor...</p>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-red-500">
        <p className="text-lg font-medium">Kitap detayları bulunamadı.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 underline cursor-pointer">Geri Dön</button>
      </div>
    );
  }

  const descriptionText = typeof book.description === 'object' ? book.description?.value : book.description;

  const formattedBook = {
    key: `/works/${id}`,
    title: book.title,
    cover_i: book.covers?.[0]
  };

  const isFav = favorites.some((b) => b.key === formattedBook.key);
  const isReading = readingList.some((b) => b.key === formattedBook.key);

  const handleShare = async () => {
    const shareData = {
      title: book?.title,
      text: `${book?.title} kitabını RAF'ta incele!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Eski alert() yerine yeni şık bildirimimizi kullanıyoruz:
        addToast('Kitap bağlantısı panoya kopyalandı!', 'success');
      }
    } catch (err) {
      addToast('Paylaşım işlemi iptal edildi.', 'info');
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in space-y-8 pb-10">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" /> Geri Dön
        </button>

        <button 
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors font-medium shadow-sm cursor-pointer"
        >
          <Share2 className="w-5 h-5" /> Paylaş
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        <div className="md:col-span-4 lg:col-span-3">
          <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-slate-200 dark:border-slate-800 sticky top-28">
            <img 
              src={bookApi.getCoverUrl(book.covers?.[0], 'L')} 
              alt={book.title}
              className="w-full h-full object-cover bg-slate-100 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {book.title}
            </h1>

            {book.authors && book.authors.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center text-lg font-medium text-slate-600 dark:text-slate-300">
                <span className="text-slate-400">Yazar:</span>
                {book.authors.map((authorObj: any, index: number) => {
                  const authorId = authorObj.author?.key?.replace('/authors/', '');
                  return (
                    <span key={index}>
                      {authorId ? (
                        <Link to={`/author/${authorId}`} className="text-indigo-600 dark:text-indigo-400 hover:underline transition-all cursor-pointer">
                          {authorObj.author?.name || 'Yazar Detayına Git'}
                        </Link>
                      ) : (
                        <span>{authorObj.name}</span>
                      )}
                      {index < book.authors.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </div>
            )}
            {/* YENİ: İLK YAYIN YILI */}
            {book.first_publish_date && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                <Calendar className="w-5 h-5" />
                <span>İlk Yayın: {book.first_publish_date}</span>
              </div>
            )}
            {book.subjects && Array.isArray(book.subjects) && (
              <div className="flex flex-wrap gap-2">
                {book.subjects
                  .map((sub: any) => typeof sub === 'string' ? sub : sub?.name)
                  .filter((name: string) => {
                    if (!name) return false;
                    const lower = name.toLowerCase();
                    return (
                      name.length < 25 && 
                      name.split(' ').length <= 3 && 
                      !name.includes(':') && 
                      !name.includes('=') &&
                      !lower.includes('bestseller') && 
                      !lower.includes('times') &&
                      !lower.includes('manual') &&
                      !lower.includes('conduct') && 
                      !lower.includes('civilization')
                    );
                  })
                  .slice(0, 5) 
                  .map((subjectName: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                      {subjectName}
                    </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => {
                if (isFav) {
                  removeFromFavorites(formattedBook.key);
                  addToast('Kitap favorilerden çıkarıldı.', 'info'); // Bildirim eklendi
                } else {
                  addToFavorites(formattedBook as any);
                  addToast('Kitap favorilere eklendi!', 'success'); // Bildirim eklendi
                }
              }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                isFav 
                  ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30' 
                  : 'bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-rose-500 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              {isFav ? 'Favorilerde' : 'Favorilere Ekle'}
            </button>

            <button 
              onClick={() => {
                if (!isReading) {
                  addToReadingList(formattedBook as any, 'okunacak');
                  addToast('Kitap okuma listesine eklendi!', 'success'); // Bildirim eklendi
                }
              }}
              disabled={isReading}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md cursor-pointer ${
                isReading 
                  ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-indigo-600/30'
              }`}
            >
              <BookMarked className="w-5 h-5" />
              {isReading ? 'Listende Ekli' : 'Listeye Ekle'}
            </button>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Kitap Hakkında</h3>
            {descriptionText ? (
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg whitespace-pre-line">
                {descriptionText}
              </p>
            ) : (
              <p className="text-slate-500 italic">Bu kitap için henüz detaylı bir açıklama girilmemiş.</p>
            )}
          </div>
          
          {similarBooks && similarBooks.docs && similarBooks.docs.length > 0 && (
            <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
                Bunu Sevenler Şunları Da Okudu
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {similarBooks.docs
                  .filter((simBook: any) => simBook.key !== `/works/${id}`)
                  .slice(0, 5)
                  .map((simBook: any) => (
                    <BookCard key={simBook.key} book={simBook} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
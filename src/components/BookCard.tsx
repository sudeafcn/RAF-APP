import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { bookApi } from '../services/api';

export default function BookCard({ book }: { book: any }) {
  // API'den gelen verileri güvenli bir şekilde alıyoruz
  const id = book.key?.replace('/works/', '');
  const coverUrl = bookApi.getCoverUrl(book.cover_i, 'M');
  const author = book.author_name ? book.author_name[0] : 'Bilinmeyen Yazar';
  
  // Arama sonuçlarında first_publish_year, yazar detayında first_publish_date olarak gelebiliyor
  const publishYear = book.first_publish_year || book.first_publish_date; 

  return (
    <Link to={`/book/${id}`} className="group flex flex-col gap-3">
      <div className="aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-indigo-500/20 group-hover:-translate-y-2 relative border border-slate-200/50 dark:border-slate-700/50">
        <img 
          src={coverUrl} 
          alt={book.title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 bg-slate-100 dark:bg-slate-800"
        />
        
        {/* YENİ: Yayın Yılı Rozeti (Badge) */}
        {publishYear && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
            <Calendar className="w-3 h-3" />
            {publishYear}
          </div>
        )}
      </div>
      
      <div className="flex flex-col px-1">
        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
          {author}
        </p>
      </div>
    </Link>
  );
}
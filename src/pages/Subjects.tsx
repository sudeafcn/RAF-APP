import { Link } from 'react-router-dom';
import { Compass, Sparkles, Brain, History, Heart, FlaskConical, Palette, Baby, GraduationCap, Globe } from 'lucide-react';

// Dinamik Kategori Listesi
const categories = [
  { id: 'fiction', name: 'Roman & Kurgu', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/20' },
  { id: 'science', name: 'Bilim & Teknoloji', icon: FlaskConical, color: 'text-cyan-500', bg: 'bg-cyan-100 dark:bg-cyan-500/20' },
  { id: 'philosophy', name: 'Felsefe', icon: Brain, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/20' },
  { id: 'history', name: 'Tarih', icon: History, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
  { id: 'romance', name: 'Aşk & Romantizm', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100 dark:bg-rose-500/20' },
  { id: 'art', name: 'Sanat & Mimari', icon: Palette, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-500/20' },
  { id: 'children', name: 'Çocuk Kitapları', icon: Baby, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20' },
  { id: 'education', name: 'Eğitim & Akademi', icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-500/20' },
  { id: 'travel', name: 'Gezi & Rehber', icon: Globe, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-500/20' },
];

export default function Subjects() {
  return (
    <div className="space-y-10 animate-fade-in pb-10">
      
      {/* Sayfa Başlığı */}
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Türleri <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-indigo-500">Keşfet</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-lg">
          İlginizi çeken kategoriyi seçin ve yepyeni dünyalara adım atın.
        </p>
      </div>

      {/* Kategori Kartları (Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-6">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/search?q=${category.name}`}
            className="group flex flex-col items-center text-center p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${category.bg} ${category.color}`}>
              <category.icon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>

    </div>
  );
}
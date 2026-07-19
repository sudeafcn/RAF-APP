import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Heart, BookMarked, History, BookOpen, Home as HomeIcon, Compass } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function MainLayout() {
  const location = useLocation();

  // MOBİL İÇİN: Tüm menü
  const mobileNavItems = [
    { path: '/', name: 'Ana Sayfa', icon: HomeIcon },
    { path: '/subjects', name: 'Konular', icon: Compass },
    { path: '/search', name: 'Keşfet', icon: Search },
    { path: '/recent', name: 'Geçmiş', icon: History },
    { path: '/favorites', name: 'Favoriler', icon: Heart },
    { path: '/reading-list', name: 'Listem', icon: BookMarked },
  ];

  // MASAÜSTÜ İÇİN SOL GRUP: Sadece keşif
  const mainNavItems = [
    { path: '/subjects', name: 'Konular' },
    { path: '/search', name: 'Keşfet' },
  ];

  // MASAÜSTÜ İÇİN SAĞ GRUP: Kişisel alan
  const personalNavItems = [
    { path: '/recent', name: 'Geçmiş', icon: History },
    { path: '/favorites', name: 'Favoriler', icon: Heart },
    { path: '/reading-list', name: 'Listem', icon: BookMarked },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-white font-sans transition-colors duration-300">
      
      {/* ÜST MENÜ (HEADER) */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Sol Taraf: Logo ve Şık Metin Menüsü */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-lg shadow-indigo-600/20">
                <BookOpen className="w-6 h-6" />
              </div>
              {/* DÜZELTME: "hidden lg:block" sınıfını kaldırdık, artık mobilde de Raf yazacak! */}
              <span className="text-2xl font-black tracking-tight">Raf<span className="text-indigo-600">.</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-bold text-sm transition-colors ${
                    location.pathname === item.path
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sağ Taraf: Kapsül Kişisel Menü ve Tema Butonu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-slate-800">
              {personalNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={item.name}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white dark:bg-[#0B1120] text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800"></div>

            <ThemeToggle />
          </div>

          {/* Mobilde sağ üstte sadece Tema Butonu görünür */}
          <div className="md:hidden shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ANA İÇERİK ALANI */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-28 md:pb-8">
        <Outlet />
      </main>

      {/* MOBİL ALT MENÜ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar px-2 py-2 gap-2">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all shrink-0 w-16 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <item.icon className={`w-6 h-6 ${isActive ? 'scale-110 transition-transform' : ''}`} />
                <span className="text-[10px] font-bold truncate w-full text-center">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
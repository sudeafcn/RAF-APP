import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  // Tema state'i her değiştiğinde HTML kök etiketine 'dark' sınıfını ekle veya çıkar
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
      title={theme === 'light' ? 'Karanlık Moda Geç' : 'Açık Moda Geç'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
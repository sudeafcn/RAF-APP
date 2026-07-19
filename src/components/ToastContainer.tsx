import { useToastStore } from '../store/useToastStore';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-24 md:bottom-10 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className="pointer-events-auto flex items-center gap-3 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-4 min-w-[300px] max-w-sm transition-all duration-300 animate-fade-in"
        >
          {/* Bildirim Tipine Göre İkon */}
          {toast.type === 'success' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
          {toast.type === 'error' && <XCircle className="w-6 h-6 text-rose-500" />}
          {toast.type === 'info' && <Info className="w-6 h-6 text-indigo-500" />}
          
          <p className="font-bold text-sm text-slate-700 dark:text-slate-200 flex-1">
            {toast.message}
          </p>
          
          {/* Çarpı (Kapatma) Butonu */}
          <button 
            onClick={() => removeToast(toast.id)} 
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
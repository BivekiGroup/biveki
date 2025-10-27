"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(7);
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[10000] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="pointer-events-auto animate-in slide-in-from-right-full duration-300 fade-in"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const config = {
    success: {
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-teal-600",
      bg: "bg-white dark:bg-neutral-900",
      border: "border-emerald-500/20",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      text: "text-emerald-900 dark:text-emerald-100",
      shadow: "shadow-xl shadow-emerald-500/20",
    },
    error: {
      icon: AlertCircle,
      gradient: "from-red-500 to-rose-600",
      bg: "bg-white dark:bg-neutral-900",
      border: "border-red-500/20",
      iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
      text: "text-red-900 dark:text-red-100",
      shadow: "shadow-xl shadow-red-500/20",
    },
    info: {
      icon: Info,
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-white dark:bg-neutral-900",
      border: "border-blue-500/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
      text: "text-blue-900 dark:text-blue-100",
      shadow: "shadow-xl shadow-blue-500/20",
    },
  };

  const { icon: Icon, gradient, bg, border, iconBg, text, shadow } = config[toast.type];

  return (
    <div
      className={`relative flex items-start gap-3 rounded-2xl border ${border} ${bg} p-4 pr-12 ${shadow} backdrop-blur-sm min-w-[320px] max-w-md group`}
    >
      {/* Gradient line on top */}
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient} rounded-t-2xl`} />

      {/* Icon */}
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} text-white shadow-lg`}>
        <Icon className="h-5 w-5" />
      </div>

      {/* Message */}
      <div className="flex-1 pt-1">
        <p className={`text-sm font-medium ${text} leading-relaxed`}>{toast.message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-lg text-neutral-400 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-white/10 dark:hover:text-neutral-300"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-2xl bg-neutral-900/5 dark:bg-white/5">
        <div
          className={`h-full bg-gradient-to-r ${gradient} animate-progress origin-left`}
          style={{
            animation: "progress 4s linear forwards",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
        .animate-progress {
          animation: progress 4s linear forwards;
        }
      `}</style>
    </div>
  );
}

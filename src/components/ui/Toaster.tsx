import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const toastStore = {
  toasts: [] as ToastProps[],
  listeners: new Set<() => void>(),
  
  addToast(toast: Omit<ToastProps, 'id' | 'onClose'>) {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts.push({
      ...toast,
      id,
      onClose: this.removeToast.bind(this),
    });
    this.notify();
    return id;
  },
  
  removeToast(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notify();
  },
  
  notify() {
    this.listeners.forEach(listener => listener());
  },
  
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
  
  // Convenience methods
  success(props: { title: string; message?: string; duration?: number }) {
    return this.addToast({ type: 'success', ...props });
  },
  
  error(props: { title: string; message?: string; duration?: number }) {
    return this.addToast({ type: 'error', ...props });
  },
  
  info(props: { title: string; message?: string; duration?: number }) {
    return this.addToast({ type: 'info', ...props });
  }
};

const Toast: React.FC<ToastProps> = ({ id, type, title, message, duration = 5000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);
  
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success-500" />,
    error: <AlertCircle className="w-5 h-5 text-error-500" />,
    info: <Info className="w-5 h-5 text-primary-500" />
  };
  
  const bgColors = {
    success: 'bg-success-500 bg-opacity-10',
    error: 'bg-error-500 bg-opacity-10',
    info: 'bg-primary-500 bg-opacity-10'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className={`w-full max-w-sm bg-white rounded-lg shadow-lg border ${bgColors[type]}`}
    >
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
          {message && <p className="mt-1 text-sm text-neutral-600">{message}</p>}
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-4 flex-shrink-0 text-neutral-400 hover:text-neutral-600 focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  
  useEffect(() => {
    const unsubscribe = toastStore.subscribe(() => {
      setToasts([...toastStore.toasts]);
    });
    
    return unsubscribe;
  }, []);
  
  return createPortal(
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-end gap-2 p-4 sm:p-6">
      <AnimatePresence>
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};
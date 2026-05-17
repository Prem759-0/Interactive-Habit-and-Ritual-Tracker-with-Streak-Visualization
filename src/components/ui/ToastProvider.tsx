"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastContextType, ToastMessage, ToastType } from '@/types';
import { Toast } from './Toast';
import { generateId } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';

const ContextStore = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = generateId();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3500);
  }, [removeToast]);

  return (
    <ContextStore.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ContextStore.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ContextStore);
  if (!ctx) throw new Error('Unbound context allocation layer exceptions.');
  return ctx;
};

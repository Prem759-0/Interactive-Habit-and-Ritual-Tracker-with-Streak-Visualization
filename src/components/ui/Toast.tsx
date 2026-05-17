"use client";

import { motion } from 'framer-motion';
import { ToastMessage } from '@/types';
import { cn } from '@/lib/utils';
import { X, CheckCircle, ShieldAlert, Award } from 'lucide-react';

export function Toast({ toast, onClose }: { toast: ToastMessage, onClose: () => void }) {
  const contextIcons = {
    success: <Award className="w-5 h-5 text-[#3730a3]" />,
    error: <ShieldAlert className="w-5 h-5 text-red-600" />,
    info: <CheckCircle className="w-5 h-5 text-slate-700" />,
    warning: <ShieldAlert className="w-5 h-5 text-orange-600" />
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="pointer-events-auto flex items-center gap-3 py-3.5 px-5 bg-white border border-slate-200 shadow-xl rounded-md font-sans max-w-sm"
    >
      {contextIcons[toast.type]}
      <span className="flex-1 text-sm font-medium text-slate-800">{toast.message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

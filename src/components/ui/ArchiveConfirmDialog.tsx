"use client";

import { motion, AnimatePresence } from 'framer-motion';

interface ArchiveConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ArchiveConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ArchiveConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50" onClick={onCancel} />
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-[#fafaf8] border border-slate-200 p-6 rounded-lg shadow-xl w-full max-w-sm pointer-events-auto font-sans">
              <h3 className="font-serif text-xl text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">{message}</p>
              <div className="flex justify-end gap-3 text-sm font-medium">
                <button onClick={onCancel} className="px-4 py-2 text-slate-500 hover:text-slate-800 transition-colors">Abort</button>
                <button onClick={onConfirm} className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-colors rounded-sm">Confirm purging</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

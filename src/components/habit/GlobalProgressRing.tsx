"use client";

import { motion } from 'framer-motion';

interface GlobalProgressRingProps {
  completed: number;
  total: number;
}

export function GlobalProgressRing({ completed, total }: GlobalProgressRingProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-md shadow-sm">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} className="stroke-slate-100 fill-none" strokeWidth="6" />
          <motion.circle 
            cx="50" cy="50" r={radius} className="stroke-[#3730a3] fill-none" strokeWidth="6" 
            strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} 
            animate={{ strokeDashoffset: offset }} transition={{ duration: 0.6, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-serif text-sm font-bold text-slate-800">
          {Math.round(percentage)}%
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-lg font-bold text-slate-900">Ritual Synchronization</span>
        <span className="text-xs text-slate-500 font-medium mt-0.5">{completed} of {total} nodes activated today</span>
      </div>
    </div>
  );
}

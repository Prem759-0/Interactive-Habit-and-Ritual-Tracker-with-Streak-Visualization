"use client";

import { Habit } from '@/types';
import { MonthlyHeatmap } from './MonthlyHeatmap';
import { calculateLongestStreak, calculateCurrentStreak } from '@/lib/utils';
import { Trash2, Archive, ArrowLeft } from 'lucide-react';
import * as Icons from 'lucide-react';

interface HabitDetailProps {
  habit: Habit;
  onDelete: () => void;
  onClose: () => void;
}

export function HabitDetail({ habit, onDelete, onClose }: HabitDetailProps) {
  const IconComponent = (Icons as any)[habit.iconName] || Icons.Activity;
  const currentStreak = calculateCurrentStreak(habit.completions, habit.graceDaysUsed);
  const longestStreak = calculateLongestStreak(habit.completions, habit.graceDaysUsed);

  return (
    <div className="flex flex-col gap-6 bg-[#fafaf8] h-full overflow-y-auto p-1 font-sans">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 shrink-0 bg-white p-4 rounded-md shadow-sm">
        <button onClick={onClose} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Exit inspector
        </button>
        <div className="flex items-center gap-2">
          <button onClick={onDelete} className="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Purge Record">
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-md shadow-sm flex flex-col md:flex-row justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded text-[#3730a3]">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">{habit.name}</h2>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed max-w-xl">{habit.description || 'No contextual definition mapped.'}</p>
          </div>
        </div>
        <div className="flex gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Velocity</span>
            <span className="text-3xl font-serif font-bold text-slate-800 mt-1">{currentStreak} <span className="text-xs font-sans font-medium text-slate-400">Days</span></span>
          </div>
          <div className="flex flex-col ml-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Peak Streak</span>
            <span className="text-3xl font-serif font-bold text-slate-800 mt-1">{longestStreak} <span className="text-xs font-sans font-medium text-slate-400">Days</span></span>
          </div>
        </div>
      </div>

      <MonthlyHeatmap habit={habit} />
    </div>
  );
}

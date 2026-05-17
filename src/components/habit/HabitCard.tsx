"use client";

import { Habit } from '@/types';
import * as Icons from 'lucide-react';
import { getTodayString, calculateCurrentStreak } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CelebrationBurst } from './CelebrationBurst';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onUseGrace: (id: string) => void;
  onClick: () => void;
  isActive: boolean;
}

export function HabitCard({ habit, onToggle, onUseGrace, onClick, isActive }: HabitCardProps) {
  const [triggerExplosion, setTriggerExplosion] = useState(false);
  const IconComponent = (Icons as any)[habit.iconName] || Icons.Activity;
  const todayStr = getTodayString();
  const isDoneToday = habit.completions.includes(todayStr);
  const isGraceToday = habit.graceDaysUsed.includes(todayStr);
  const streak = calculateCurrentStreak(habit.completions, habit.graceDaysUsed);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDoneToday) setTriggerExplosion(true);
    onToggle(habit.id);
  };

  const handleGraceAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDoneToday && !isGraceToday) onUseGrace(habit.id);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border p-4 rounded-md transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between h-40 group shadow-sm hover:shadow-md",
        isActive ? "border-[#3730a3] ring-1 ring-[#3730a3]/20" : "border-slate-200"
      )}
    >
      {triggerExplosion && <CelebrationBurst />}
      <div className="flex justify-between items-start gap-4">
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded text-slate-800">
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={handleGraceAction} disabled={isDoneToday || isGraceToday}
            className={cn(
              "p-2 border transition-all rounded-sm",
              isGraceToday ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-white border-slate-200 text-slate-400 hover:text-orange-500 disabled:opacity-40"
            )}
            title="Inject Grace Day Preserve"
          >
            <Icons.Flame className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={handleAction}
            className={cn(
              "px-3.5 py-1.5 border text-xs font-semibold tracking-wider uppercase transition-all rounded-sm",
              isDoneToday 
                ? "bg-[#3730a3] border-[#3730a3] text-white" 
                : "bg-white border-slate-200 text-slate-700 hover:border-[#3730a3] hover:text-[#3730a3]"
            )}
          >
            {isDoneToday ? 'Synchronized' : 'Log'}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#3730a3] transition-colors truncate">
          {habit.name}
        </h4>
        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mt-1">
          <span className="flex items-center gap-1"><Icons.Zap className="w-3.5 h-3.5 fill-current text-amber-500" /> {streak} day streak</span>
          <span>•</span>
          <span className="uppercase tracking-wider text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{habit.category}</span>
        </div>
      </div>
    </div>
  );
}

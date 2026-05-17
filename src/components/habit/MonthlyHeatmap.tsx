"use client";

import { Habit } from '@/types';
import { eachDayOfInterval, subWeeks, format, isSameDay } from 'date-fns';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface HeatmapProps {
  habit: Habit;
}

export function MonthlyHeatmap({ habit }: HeatmapProps) {
  const matrixDays = useMemo(() => {
    const end = new Date();
    const start = subWeeks(end, 12);
    return eachDayOfInterval({ start, end });
  }, []);

  const totalActivations = habit.completions.length;
  
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-md shadow-sm font-sans">
      <div className="flex justify-between items-baseline mb-4">
        <h4 className="font-serif font-bold text-slate-800">Rolling Alignment Blueprint</h4>
        <span className="text-xs text-slate-500 font-medium">Total events: {totalActivations}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 max-w-full">
        {matrixDays.map((day, idx) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const isComplete = habit.completions.includes(dateStr);
          const isGrace = habit.graceDaysUsed.includes(dateStr);

          return (
            <div
              key={idx} title={`${format(day, 'MMM d, yyyy')}: ${isComplete ? 'Complete' : isGrace ? 'Grace Period Applied' : 'No record'}`}
              className={cn(
                "w-4 h-4 rounded-[2px] transition-all relative group",
                isComplete ? "bg-[#3730a3]" : isGrace ? "bg-orange-400" : "bg-slate-100 hover:bg-slate-200"
              )}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-slate-100 rounded-[2px]" /> Blank</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#3730a3] rounded-[2px]" /> Completed Node</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-orange-400 rounded-[2px]" /> Grace Override</div>
      </div>
    </div>
  );
}

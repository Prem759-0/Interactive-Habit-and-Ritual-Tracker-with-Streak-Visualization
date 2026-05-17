"use client";

import * as Icons from 'lucide-react';
import { AVAILABLE_ICONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface IconPickerProps {
  currentName: string;
  onSelect: (name: string) => void;
}

export function IconPicker({ currentName, onSelect }: IconPickerProps) {
  return (
    <div className="grid grid-cols-7 gap-2 border border-slate-200 p-3 bg-white rounded-md">
      {AVAILABLE_ICONS.map(name => {
        const IconComponent = (Icons as any)[name];
        if (!IconComponent) return null;
        return (
          <button
            key={name} type="button" onClick={() => onSelect(name)}
            className={cn(
              "p-2.5 rounded-sm border transition-all flex items-center justify-center hover:border-slate-400",
              currentName === name ? "border-[#3730a3] bg-[#3730a3]/5 text-[#3730a3]" : "border-slate-100 text-slate-600"
            )}
          >
            <IconComponent className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}

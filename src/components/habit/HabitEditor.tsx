"use client";

import { useState } from 'react';
import { Habit } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { IconPicker } from './IconPicker';
import { generateId } from '@/lib/utils';
import { X } from 'lucide-react';

interface HabitEditorProps {
  onSave: (habit: Habit) => void;
  onCancel: () => void;
}

export function HabitEditor({ onSave, onCancel }: HabitEditorProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Mind');
  const [iconName, setIconName] = useState('Brain');
  const [frequency, setFrequency] = useState<Habit['frequency']>('daily');
  const [validationError, setValidationError] = useState('');

  const executeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Ritual configuration demands a distinct name property identifier.');
      return;
    }
    const payload: Habit = {
      id: generateId(),
      name: name.trim(),
      description: description.trim(),
      frequency,
      customDays: [],
      category,
      colorKey: 'ink',
      iconName,
      completions: [],
      graceDaysUsed: [],
      createdAt: new Date().toISOString(),
      archivedAt: null
    };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form onSubmit={executeSubmit} className="bg-[#fafaf8] border border-slate-200 p-6 rounded-md shadow-2xl max-w-lg w-full flex flex-col gap-5 max-h-[90vh] overflow-y-auto font-sans">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <h3 className="font-serif text-xl font-bold text-slate-900">Blueprint New Ritual Node</h3>
          <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-800"><X className="w-5 h-5" /></button>
        </div>

        {validationError && <span className="text-xs text-red-600 bg-red-50 p-2 border border-red-100 rounded">{validationError}</span>}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ritual Label</label>
          <input 
            type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Balance Sheet Recalibration"
            className="border border-slate-200 bg-white p-2.5 text-sm text-slate-900 rounded-sm focus:outline-none focus:border-[#3730a3]" autoFocus
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Context Parameters</label>
          <textarea 
            value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Define structural constraints or strategic goals..."
            className="border border-slate-200 bg-white p-2.5 text-sm text-slate-900 rounded-sm resize-none h-20 focus:outline-none focus:border-[#3730a3]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Categorical Domain</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="border border-slate-200 bg-white p-2.5 text-sm text-slate-900 rounded-sm focus:outline-none focus:border-[#3730a3]">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recurrence Frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value as any)} className="border border-slate-200 bg-white p-2.5 text-sm text-slate-900 rounded-sm focus:outline-none focus:border-[#3730a3]">
              <option value="daily">Daily Manifestation</option>
              <option value="weekdays">Weekdays Isolation</option>
              <option value="weekends">Weekends Recess</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vector Icon Affiliation</label>
          <IconPicker currentName={iconName} onSelect={setIconName} />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 font-medium text-sm">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-slate-500 hover:text-slate-800">Discard</button>
          <button type="submit" className="px-5 py-2 bg-[#3730a3] text-white rounded-sm hover:bg-[#3730a3]/90 transition-colors shadow-sm">Initialize Node</button>
        </div>
      </form>
    </div>
  );
}

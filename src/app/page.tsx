"use client";

import { useState, useEffect } from 'react';
import { useHabits } from '@/hooks/useHabits';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useToast } from '@/components/ui/ToastProvider';
import { Habit } from '@/types';
import { getTodayString, downloadJsonBlueprint } from '@/lib/utils';

import { GlobalProgressRing } from '@/components/habit/GlobalProgressRing';
import { HabitCard } from '@/components/habit/HabitCard';
import { HabitDetail } from '@/components/habit/HabitDetail';
import { HabitEditor } from '@/components/habit/HabitEditor';
import { ArchiveConfirmDialog } from '@/components/ui/ArchiveConfirmDialog';
import { Plus, Download, SlidersHorizontal, Layers } from 'lucide-react';

export default function HabitTrackerApp() {
  const { habits, isLoaded, addHabit, updateHabit, deleteHabit } = useHabits();
  const { addToast } = useToast();

  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [purgeTargetId, setPurgeTargetId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useKeyboardShortcuts({
    'N': (e) => { e.preventDefault(); setIsCreating(true); },
  });

  const todayStr = getTodayString();
  const activeHabits = habits.filter(h => !h.archivedAt);

  const completedTodayCount = activeHabits.filter(h => h.completions.includes(todayStr)).length;

  const handleToggleCompletion = (id: string) => {
    const target = habits.find(h => h.id === id);
    if (!target) return;

    let updatedCompletions = [...target.completions];
    if (updatedCompletions.includes(todayStr)) {
      updatedCompletions = updatedCompletions.filter(d => d !== todayStr);
      addToast('Ritual node verification suspended.', 'info');
    } else {
      updatedCompletions.push(todayStr);
      addToast('Ritual node synced successfully.', 'success');
    }

    updateHabit({ ...target, completions: updatedCompletions });
  };

  const handleApplyGrace = (id: string) => {
    const target = habits.find(h => h.id === id);
    if (!target) return;

    if (target.graceDaysUsed.includes(todayStr)) return;

    updateHabit({
      ...target,
      graceDaysUsed: [...target.graceDaysUsed, todayStr]
    });
    addToast('Grace day override injected for structural maintenance.', 'warning');
  };

  const executePurge = () => {
    if (purgeTargetId) {
      deleteHabit(purgeTargetId);
      addToast('Ritual record dropped from database indexes.', 'error');
      if (selectedHabitId === purgeTargetId) setSelectedHabitId(null);
    }
    setPurgeTargetId(null);
  };

  const exportBlueprint = () => {
    downloadJsonBlueprint(habits, 'ritual_matrix');
    addToast('Structural JSON matrix compiled and dispatched.', 'success');
  };

  if (!mounted || !isLoaded) return null;

  const filteredHabits = activeHabits.filter(h => {
    if (activeCategoryFilter && h.category !== activeCategoryFilter) return false;
    return true;
  });

  const selectedHabit = habits.find(h => h.id === selectedHabitId);

  return (
    <div className="min-h-screen bg-base font-sans selection:bg-[#3730a3]/10 selection:text-[#3730a3]">
      
      {/* Top Banner Context Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900">Ritual.</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Ver 3.4.1</span>
          </div>
          <div className="flex items-center gap-3 font-medium text-sm">
            <button onClick={exportBlueprint} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors py-2 px-3">
              <Download className="w-4 h-4" /> Export Matrix
            </button>
            <button onClick={() => setIsCreating(true)} className="flex items-center gap-1.5 bg-[#3730a3] text-white py-2 px-4 hover:bg-[#3730a3]/90 transition-all rounded-sm shadow-sm">
              <Plus className="w-4 h-4" /> Initialize Ritual
            </button>
          </div>
        </div>
      </header>

      {/* Main Structural Node Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 w-full">
        
        {/* Left Interactive Panel */}
        <div className="flex-1 flex flex-col gap-6">
          <GlobalProgressRing completed={completedTodayCount} total={activeHabits.length} />

          {/* Context Filter Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto scrollbar-hide">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button 
              onClick={() => setActiveCategoryFilter(null)}
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 transition-all rounded-full ${!activeCategoryFilter ? 'bg-[#3730a3]/10 text-[#3730a3]' : 'text-slate-400 hover:text-slate-700'}`}
            >
              All Matrix Nodes
            </button>
            {['Mind', 'Body', 'Creative', 'Learning', 'Work'].map(cat => (
              <button
                key={cat} onClick={() => setActiveCategoryFilter(cat)}
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 transition-all rounded-full whitespace-nowrap ${activeCategoryFilter === cat ? 'bg-[#3730a3]/10 text-[#3730a3]' : 'text-slate-400 hover:text-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Manifestation Layer */}
          {filteredHabits.length === 0 ? (
            <div className="py-24 border border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center text-center font-sans p-6 bg-white shadow-sm">
              <Layers className="w-8 h-8 text-slate-300 mb-3" />
              <h4 className="font-serif text-lg font-bold text-slate-800">No Active Routine Signatures</h4>
              <p className="text-sm text-slate-400 max-w-xs mt-1">Initialize custom behavioral sequences to construct matrix telemetry tracking metrics.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHabits.map(habit => (
                <HabitCard 
                  key={habit.id} habit={habit} 
                  isActive={habit.id === selectedHabitId}
                  onToggle={handleToggleCompletion} 
                  onUseGrace={handleApplyGrace}
                  onClick={() => setSelectedHabitId(habit.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Isolated Analytical Blueprint View Inspector Panel */}
        <div className="w-full lg:w-[450px] shrink-0 h-[calc(100vh-12rem)] sticky top-28">
          {selectedHabit ? (
            <HabitDetail 
              habit={selectedHabit} 
              onClose={() => setSelectedHabitId(null)} 
              onDelete={() => setPurgeTargetId(selectedHabitId)}
            />
          ) : (
            <div className="h-full border border-slate-200 bg-white/40 backdrop-blur-sm rounded-md flex flex-col items-center justify-center text-center p-6 border-dashed font-sans text-slate-400">
              <span className="font-serif text-base text-slate-600 font-medium">Select Operational Node</span>
              <span className="text-xs max-w-xs mt-1">Audit historic contribution heatmap models, deep-dive rolling sequences, and evaluate long-term ritual trajectories.</span>
            </div>
          )}
        </div>
      </main>

      {/* Structural Overlays */}
      {isCreating && (
        <HabitEditor onSave={(h) => { addHabit(h); setIsCreating(false); }} onCancel={() => setIsCreating(false)} />
      )}

      <ArchiveConfirmDialog 
        isOpen={!!purgeTargetId}
        title="Execute Purge Chain?"
        message="This operation terminates all metadata indexes associated with the ritual node. Data cannot be recovered."
        onConfirm={executePurge}
        onCancel={() => setPurgeTargetId(null)}
      />
    </div>
  );
}

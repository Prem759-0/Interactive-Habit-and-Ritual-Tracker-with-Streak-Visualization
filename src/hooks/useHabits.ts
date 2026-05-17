"use client";

import { useState, useEffect, useCallback } from 'react';
import { Habit } from '@/types';
import { STORAGE_KEY, SEED_FLAG_KEY } from '@/lib/constants';
import { seedHabits } from '@/data/seedProject3';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const isSeeded = localStorage.getItem(SEED_FLAG_KEY);
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!isSeeded || !stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedHabits));
        localStorage.setItem(SEED_FLAG_KEY, 'true');
        setHabits(seedHabits);
      } else {
        setHabits(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Storage parse exception: ", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const dispatchUpdate = useCallback((mutated: Habit[]) => {
    setHabits(mutated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mutated));
    } catch (e) {
      console.error("Storage update transaction failure: ", e);
    }
  }, []);

  const addHabit = useCallback((item: Habit) => {
    dispatchUpdate([item, ...habits]);
  }, [habits, dispatchUpdate]);

  const updateHabit = useCallback((updated: Habit) => {
    dispatchUpdate(habits.map(h => h.id === updated.id ? updated : h));
  }, [habits, dispatchUpdate]);

  const deleteHabit = useCallback((id: string) => {
    dispatchUpdate(habits.filter(h => h.id !== id));
  }, [habits, dispatchUpdate]);

  return { habits, isLoaded, addHabit, updateHabit, deleteHabit };
}

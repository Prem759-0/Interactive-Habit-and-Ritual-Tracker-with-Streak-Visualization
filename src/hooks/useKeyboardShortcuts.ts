"use client";

import { useEffect } from 'react';

type KeyBindingMap = { [key: string]: (e: KeyboardEvent) => void };

export function useKeyboardShortcuts(bindings: KeyBindingMap) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key !== 'Escape') return;
      }
      const keyStr = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      if (bindings[keyStr]) {
        bindings[keyStr](e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bindings]);
}

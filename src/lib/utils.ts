import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, subDays, eachDayOfInterval } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15);
}

export function getTodayString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function calculateCurrentStreak(completions: string[], graceDays: string[] = []): number {
  const combined = new Set([...completions, ...graceDays]);
  let currentStreak = 0;
  let checkDate = new Date();

  while (true) {
    const dateStr = format(checkDate, 'yyyy-MM-dd');
    if (combined.has(dateStr)) {
      currentStreak++;
      checkDate = subDays(checkDate, 1);
    } else {
      // If today is missing, check if yesterday was active before breaking
      if (currentStreak === 0) {
        checkDate = subDays(checkDate, 1);
        const yestStr = format(checkDate, 'yyyy-MM-dd');
        if (combined.has(yestStr)) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
          continue;
        }
      }
      break;
    }
  }
  return currentStreak;
}

export function calculateLongestStreak(completions: string[], graceDays: string[] = []): number {
  const sortedDates = Array.from(new Set([...completions, ...graceDays]))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    
  if (sortedDates.length === 0) return 0;

  let longest = 0;
  let current = 0;
  let prevTime: number | null = null;

  sortedDates.forEach((dateStr) => {
    const currTime = new Date(dateStr).getTime();
    if (prevTime === null) {
      current = 1;
    } else {
      const diffDays = Math.round((currTime - prevTime) / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        current++;
      } else {
        if (current > longest) longest = current;
        current = 1;
      }
    }
    prevTime = currTime;
  });

  return current > longest ? current : longest;
}

export function downloadJsonBlueprint(data: any, name: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const el = document.createElement('a');
  el.href = url;
  el.download = `${name}_blueprint.json`;
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
  URL.revokeObjectURL(url);
}

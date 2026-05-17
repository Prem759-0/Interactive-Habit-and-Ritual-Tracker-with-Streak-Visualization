import { Habit } from "@/types";
import { format, subDays } from "date-fns";

const generateHistory = (probability: number, days: number): string[] => {
  const list: string[] = [];
  for (let i = 1; i <= days; i++) {
    if (Math.random() < probability) {
      list.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }
  }
  return list;
};

// Seed accurate historic streaks
const continuousDays = (count: number): string[] => {
  return Array.from({ length: count }).map((_, i) => format(subDays(new Date(), i), 'yyyy-MM-dd'));
};

export const seedHabits: Habit[] = [
  {
    id: "h1",
    name: "Architectural Ledger Entry",
    description: "Review comprehensive balance sheets, final accounts, and partnership assets systematically.",
    frequency: "daily",
    customDays: [],
    category: "Work",
    colorKey: "ink",
    iconName: "Briefcase",
    completions: [...continuousDays(14), ...generateHistory(0.7, 45)],
    graceDaysUsed: [format(subDays(new Date(), 15), 'yyyy-MM-dd')],
    createdAt: subDays(new Date(), 60).toISOString(),
    archivedAt: null
  },
  {
    id: "h2",
    name: "Cortex Core Iterations",
    description: "Write structured frontend features, configure Tailwind tokens, or integrate models natively.",
    frequency: "weekdays",
    customDays: [1, 2, 3, 4, 5],
    category: "Creative",
    colorKey: "burnt-sienna",
    iconName: "PenTool",
    completions: [...continuousDays(5), ...generateHistory(0.8, 30)],
    graceDaysUsed: [],
    createdAt: subDays(new Date(), 40).toISOString(),
    archivedAt: null
  },
  {
    id: "h3",
    name: "Stoic Morning Ritual",
    description: "Isolate consciousness from algorithmic streams. Read early physical reference documentation.",
    frequency: "daily",
    customDays: [],
    category: "Mind",
    colorKey: "plum",
    iconName: "Brain",
    completions: generateHistory(0.65, 50),
    graceDaysUsed: [],
    createdAt: subDays(new Date(), 55).toISOString(),
    archivedAt: null
  },
  {
    id: "h4",
    name: "Postural & Grooming Tuning",
    description: "Physical core alignment execution. Maintenance routine for specialized framing structures.",
    frequency: "custom",
    customDays: [1, 3, 5],
    category: "Body",
    colorKey: "moss",
    iconName: "Dumbbell",
    completions: generateHistory(0.5, 20),
    graceDaysUsed: [],
    createdAt: subDays(new Date(), 25).toISOString(),
    archivedAt: null
  }
];

export const STORAGE_KEY = 'ritual_habits_store';
export const SEED_FLAG_KEY = 'ritual_habits_seeded';

export const CATEGORIES = ['Mind', 'Body', 'Creative', 'Learning', 'Social', 'Work', 'Other'] as const;

export const THEME_COLORS = [
  { key: 'ink', hex: '#3730a3', bg: 'bg-[#3730a3]/10', text: 'text-[#3730a3]', border: 'border-[#3730a3]' },
  { key: 'burnt-sienna', hex: '#c2410c', bg: 'bg-[#c2410c]/10', text: 'text-[#c2410c]', border: 'border-[#c2410c]' },
  { key: 'moss', hex: '#166534', bg: 'bg-[#166534]/10', text: 'text-[#166534]', border: 'border-[#166534]' },
  { key: 'plum', hex: '#6b21a8', bg: 'bg-[#6b21a8]/10', text: 'text-[#6b21a8]', border: 'border-[#6b21a8]' },
  { key: 'slate', hex: '#334155', bg: 'bg-[#334155]/10', text: 'text-[#334155]', border: 'border-[#334155]' }
];

export const AVAILABLE_ICONS = [
  'Brain', 'Flame', 'Heart', 'BookOpen', 'Compass', 'PenTool', 'Briefcase',
  'Activity', 'Coffee', 'Dumbbell', 'Music', 'Sun', 'Moon', 'Smile'
];

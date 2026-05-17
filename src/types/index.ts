export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekdays' | 'weekends' | 'custom';
  customDays: number[]; // 0=Sunday, 6=Saturday
  category: 'Mind' | 'Body' | 'Creative' | 'Learning' | 'Social' | 'Work' | 'Other';
  colorKey: string;
  iconName: string;
  completions: string[]; // Array of YYYY-MM-DD
  graceDaysUsed: string[]; // Array of YYYY-MM-DD
  createdAt: string;
  archivedAt: string | null;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

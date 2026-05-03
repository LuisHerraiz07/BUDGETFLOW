/**
 * types/index.ts
 * Contratos de datos compartidos entre frontend y backend.
 */

export type Category =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'health'
  | 'shopping'
  | 'other';

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string }> = {
  food:          { label: 'Comida',       emoji: '🍔', color: 'bg-orange-100 text-orange-700' },
  transport:     { label: 'Transporte',   emoji: '🚗', color: 'bg-blue-100 text-blue-700' },
  entertainment: { label: 'Ocio',         emoji: '🎮', color: 'bg-purple-100 text-purple-700' },
  health:        { label: 'Salud',        emoji: '💊', color: 'bg-green-100 text-green-700' },
  shopping:      { label: 'Compras',      emoji: '🛍️', color: 'bg-pink-100 text-pink-700' },
  other:         { label: 'Otros',        emoji: '📦', color: 'bg-gray-100 text-gray-700' },
};

export interface Expense {
  id:        string;
  title:     string;
  amount:    number;
  category:  Category;
  date:      string;   // YYYY-MM-DD
  note?:     string;
  createdAt: string;
}

export interface ExpenseInput {
  title:    string;
  amount:   number;
  category: Category;
  date:     string;
  note?:    string;
}

export interface Stats {
  total:      number;
  count:      number;
  byCategory: Record<Category, number>;
  avgPerDay:  number;
}

export interface ApiResponse<T> {
  success:   boolean;
  data:      T;
  error?:    string;
  timestamp: string;
}

export type NetworkState = 'idle' | 'loading' | 'success' | 'error';

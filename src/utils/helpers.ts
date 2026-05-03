/**
 * utils/helpers.ts
 * Funciones utilitarias puras (sin efectos secundarios).
 */

import type { Expense, Category } from '../types';

/** Formatea un número como moneda en euros */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style:    'currency',
    currency: 'EUR',
  }).format(amount);
}

/** Formatea una fecha ISO (YYYY-MM-DD) al estilo español */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('es-ES', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  });
}

/** Devuelve la fecha de hoy en formato YYYY-MM-DD */
export function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/** Filtra los gastos por categoría */
export function filterByCategory(expenses: Expense[], category: Category | 'all'): Expense[] {
  if (category === 'all') return expenses;
  return expenses.filter(e => e.category === category);
}

/** Filtra los gastos por texto de búsqueda (en el título) */
export function filterBySearch(expenses: Expense[], query: string): Expense[] {
  if (!query.trim()) return expenses;
  const q = query.toLowerCase();
  return expenses.filter(e => e.title.toLowerCase().includes(q));
}

/** Ordena los gastos por fecha descendente */
export function sortByDateDesc(expenses: Expense[]): Expense[] {
  return [...expenses].sort((a, b) => b.date.localeCompare(a.date));
}

/** Calcula el total de un array de gastos */
export function totalAmount(expenses: Expense[]): number {
  return expenses.reduce((acc, e) => acc + e.amount, 0);
}

/**
 * hooks/useExpenses.ts
 * Custom hook reutilizable para filtrar y buscar gastos.
 *
 * Centraliza la lógica de filtrado para que los componentes
 * no necesiten implementarla ellos mismos.
 */

import { useState, useMemo, useCallback } from 'react';
import type { Expense, Category } from '../types';
import { filterByCategory, filterBySearch, sortByDateDesc } from '../utils/helpers';

interface UseExpensesOptions {
  expenses: Expense[];
}

interface UseExpensesReturn {
  filtered:         Expense[];
  searchQuery:      string;
  categoryFilter:   Category | 'all';
  setSearchQuery:   (q: string) => void;
  setCategoryFilter:(c: Category | 'all') => void;
  clearFilters:     () => void;
  hasActiveFilters: boolean;
}

export function useExpenses({ expenses }: UseExpensesOptions): UseExpensesReturn {
  const [searchQuery,    setSearchQuery]    = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

  // useMemo: solo recalcula cuando cambian las dependencias
  const filtered = useMemo(() => {
    let result = sortByDateDesc(expenses);
    result = filterByCategory(result, categoryFilter);
    result = filterBySearch(result, searchQuery);
    return result;
  }, [expenses, searchQuery, categoryFilter]);

  // useCallback: estabiliza la referencia de la función entre renders
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setCategoryFilter('all');
  }, []);

  const hasActiveFilters = searchQuery.trim() !== '' || categoryFilter !== 'all';

  return {
    filtered,
    searchQuery,
    categoryFilter,
    setSearchQuery,
    setCategoryFilter,
    clearFilters,
    hasActiveFilters,
  };
}

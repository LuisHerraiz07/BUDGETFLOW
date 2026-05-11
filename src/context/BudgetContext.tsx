/**
 * BudgetContext.tsx
 * Estado global. Usa Supabase como fuente de verdad.
 * Requiere que el usuario esté autenticado (user_id de Firebase).
 */

import {
  createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode,
} from 'react';
import type { Expense, ExpenseInput, NetworkState } from '../types';
import * as api from '../api/client';

interface BudgetContextValue {
  expenses:      Expense[];
  networkState:  NetworkState;
  errorMessage:  string | null;
  monthlyBudget: number;
  totalSpent:    number;
  reload:        () => Promise<void>;
  addExpense:    (input: ExpenseInput) => Promise<void>;
  editExpense:   (id: string, changes: Partial<ExpenseInput>) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
  setBudget:     (amount: number) => void;
}

const BudgetContext = createContext<BudgetContextValue | null>(null);
const BUDGET_KEY = 'budgetflow_monthly_budget';

export function BudgetProvider({ userId, children }: { userId: string; children: ReactNode }) {
  const [expenses,      setExpenses]      = useState<Expense[]>([]);
  const [networkState,  setNetworkState]  = useState<NetworkState>('idle');
  const [errorMessage,  setErrorMessage]  = useState<string | null>(null);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(() => {
    const s = localStorage.getItem(BUDGET_KEY);
    return s ? parseFloat(s) : 1000;
  });

  const reload = useCallback(async () => {
    setNetworkState('loading');
    setErrorMessage(null);
    try {
      const data = await api.getExpenses(userId);
      setExpenses(data);
      setNetworkState('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error de conexión');
      setNetworkState('error');
    }
  }, [userId]);

  useEffect(() => { reload(); }, [reload]);

  const totalSpent = useMemo(() => expenses.reduce((a, e) => a + e.amount, 0), [expenses]);

  const addExpense = useCallback(async (input: ExpenseInput) => {
    const e = await api.createExpense(userId, input);
    setExpenses(prev => [e, ...prev]);
  }, [userId]);

  const editExpense = useCallback(async (id: string, changes: Partial<ExpenseInput>) => {
    const updated = await api.updateExpense(id, changes);
    setExpenses(prev => prev.map(e => e.id === id ? updated : e));
  }, []);

  const removeExpense = useCallback(async (id: string) => {
    await api.deleteExpense(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, []);

  const setBudget = useCallback((amount: number) => {
    setMonthlyBudget(amount);
    localStorage.setItem(BUDGET_KEY, amount.toString());
  }, []);

  return (
    <BudgetContext.Provider value={{ expenses, networkState, errorMessage, monthlyBudget, totalSpent, reload, addExpense, editExpense, removeExpense, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget(): BudgetContextValue {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error('useBudget debe usarse dentro de <BudgetProvider>');
  return ctx;
}

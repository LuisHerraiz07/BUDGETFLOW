/**
 * context/BudgetContext.tsx
 * Estado global de la aplicación.
 *
 * Provee:
 * - Lista de gastos (cargados desde la API)
 * - Estado de red (loading / error)
 * - Presupuesto mensual (guardado en localStorage)
 * - Funciones de mutación que sincronizan con la API
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Expense, ExpenseInput, NetworkState } from '../types';
import * as api from '../api/client';

// ── Tipos del contexto ───────────────────────────────────────────

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

// ── Creación del contexto ────────────────────────────────────────

const BudgetContext = createContext<BudgetContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────────

const BUDGET_KEY = 'budgetflow_monthly_budget';

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [expenses,      setExpenses]      = useState<Expense[]>([]);
  const [networkState,  setNetworkState]  = useState<NetworkState>('idle');
  const [errorMessage,  setErrorMessage]  = useState<string | null>(null);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(() => {
    const saved = localStorage.getItem(BUDGET_KEY);
    return saved ? parseFloat(saved) : 1000;
  });

  // Carga inicial de gastos desde la API
  const reload = useCallback(async () => {
    setNetworkState('loading');
    setErrorMessage(null);
    try {
      const data = await api.getExpenses();
      setExpenses(data);
      setNetworkState('success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error de conexión';
      setErrorMessage(msg);
      setNetworkState('error');
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // Total gastado — useMemo para no recalcular en cada render
  const totalSpent = useMemo(
    () => expenses.reduce((acc, e) => acc + e.amount, 0),
    [expenses]
  );

  const addExpense = useCallback(async (input: ExpenseInput) => {
    const newExpense = await api.createExpense(input);
    setExpenses(prev => [newExpense, ...prev]);
  }, []);

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

  const value: BudgetContextValue = {
    expenses,
    networkState,
    errorMessage,
    monthlyBudget,
    totalSpent,
    reload,
    addExpense,
    editExpense,
    removeExpense,
    setBudget,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
}

// ── Hook de consumo ───────────────────────────────────────────────

export function useBudget(): BudgetContextValue {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error('useBudget debe usarse dentro de <BudgetProvider>');
  return ctx;
}

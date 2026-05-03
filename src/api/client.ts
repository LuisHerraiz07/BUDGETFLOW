/**
 * api/client.ts
 * Cliente de API tipado — única fuente de comunicación con el servidor.
 * Todas las funciones devuelven datos fuertemente tipados con TypeScript.
 */

import type { Expense, ExpenseInput, Stats, ApiResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/v1';

// ── Helper interno ───────────────────────────────────────────────

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (response.status === 204) return null as unknown as T;

  const data: ApiResponse<T> = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error ?? `Error ${response.status}`);
  }

  return data.data;
}

// ── Expenses ─────────────────────────────────────────────────────

export async function getExpenses(): Promise<Expense[]> {
  return apiFetch<Expense[]>(`${API_BASE}/expenses`);
}

export async function createExpense(input: ExpenseInput): Promise<Expense> {
  return apiFetch<Expense>(`${API_BASE}/expenses`, {
    method: 'POST',
    body:   JSON.stringify(input),
  });
}

export async function updateExpense(id: string, changes: Partial<ExpenseInput>): Promise<Expense> {
  return apiFetch<Expense>(`${API_BASE}/expenses/${id}`, {
    method: 'PATCH',
    body:   JSON.stringify(changes),
  });
}

export async function deleteExpense(id: string): Promise<void> {
  return apiFetch<void>(`${API_BASE}/expenses/${id}`, { method: 'DELETE' });
}

// ── Stats ─────────────────────────────────────────────────────────

export async function getStats(): Promise<Stats> {
  return apiFetch<Stats>(`${API_BASE}/stats`);
}

/**
 * api/client.ts
 * Cliente de API tipado — única fuente de comunicación con el servidor.
 */

import type { Expense, ExpenseInput, Stats, ApiResponse } from '../types';

const API_BASE = 'https://budgetflow-xi.vercel.app/api/v1';

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

export async function getStats(): Promise<Stats> {
  return apiFetch<Stats>(`${API_BASE}/stats`);
}
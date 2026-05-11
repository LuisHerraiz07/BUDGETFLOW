/**
 * api/client.ts
 * Cliente de datos usando Supabase directamente.
 * Cada operación filtra por user_id para aislar los datos de cada usuario.
 */

import { supabase } from '../lib/supabase';
import type { Expense, ExpenseInput, Stats } from '../types';

function mapExpense(row: Record<string, unknown>): Expense {
  return {
    id:        row.id as string,
    title:     row.title as string,
    amount:    row.amount as number,
    category:  row.category as Expense['category'],
    date:      row.date as string,
    note:      row.note as string | undefined,
    createdAt: row.created_at as string,
  };
}

export async function getExpenses(userId: string): Promise<Expense[]> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapExpense);
}

export async function createExpense(userId: string, input: ExpenseInput): Promise<Expense> {
  const { data, error } = await supabase
    .from('expenses')
    .insert([{ ...input, user_id: userId }])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapExpense(data);
}

export async function updateExpense(id: string, changes: Partial<ExpenseInput>): Promise<Expense> {
  const { data, error } = await supabase
    .from('expenses')
    .update(changes)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapExpense(data);
}

export async function deleteExpense(id: string): Promise<void> {
  const { error } = await supabase.from('expenses').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function getStats(userId: string): Promise<Stats> {
  const expenses = await getExpenses(userId);
  const total    = expenses.reduce((s, e) => s + e.amount, 0);
  const byCategory = {} as Record<string, number>;
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] ?? 0) + e.amount; });
  const days = new Set(expenses.map(e => e.date)).size;
  return { total, count: expenses.length, byCategory: byCategory as Stats['byCategory'], avgPerDay: days ? total / days : 0 };
}

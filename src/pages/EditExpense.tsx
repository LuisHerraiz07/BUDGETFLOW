import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useBudget } from '../context/BudgetContext';
import { ExpenseForm } from '../components/ExpenseForm';
import type { ExpenseInput } from '../types';

export default function EditExpense() {
  const { id } = useParams<{ id: string }>();
  const { expenses, editExpense } = useBudget();

  const expense = useMemo(
    () => expenses.find(e => e.id === id),
    [expenses, id]
  );

  if (!expense) return <Navigate to="/expenses" replace />;

  const handleSubmit = async (input: ExpenseInput) => {
    await editExpense(expense.id, input);
  };

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar gasto</h1>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <ExpenseForm
          initialValues={{
            title:    expense.title,
            amount:   expense.amount,
            category: expense.category,
            date:     expense.date,
            note:     expense.note,
          }}
          onSubmit={handleSubmit}
          submitLabel="Guardar cambios"
        />
      </div>
    </main>
  );
}

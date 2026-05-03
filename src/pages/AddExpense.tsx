import { useBudget } from '../context/BudgetContext';
import { ExpenseForm } from '../components/ExpenseForm';
import type { ExpenseInput } from '../types';

export default function AddExpense() {
  const { addExpense } = useBudget();

  const handleSubmit = async (input: ExpenseInput) => {
    await addExpense(input);
  };

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Añadir gasto</h1>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <ExpenseForm onSubmit={handleSubmit} submitLabel="Añadir gasto" />
      </div>
    </main>
  );
}

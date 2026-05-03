import { useNavigate } from 'react-router-dom';
import { CategoryBadge } from './CategoryBadge';
import { formatCurrency, formatDate } from '../utils/helpers';
import { useBudget } from '../context/BudgetContext';
import type { Expense } from '../types';

interface Props {
  expense: Expense;
}

export function ExpenseCard({ expense }: Props) {
  const navigate = useNavigate();
  const { removeExpense } = useBudget();

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar "${expense.title}"?`)) return;
    await removeExpense(expense.id);
  };

  return (
    <article className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Importe */}
      <div className="text-right min-w-[80px]">
        <p className="text-lg font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
        <p className="text-xs text-gray-400">{formatDate(expense.date)}</p>
      </div>

      {/* Separador */}
      <div className="w-px h-10 bg-gray-100" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">{expense.title}</p>
        {expense.note && (
          <p className="text-xs text-gray-400 truncate mt-0.5">{expense.note}</p>
        )}
        <div className="mt-1.5">
          <CategoryBadge category={expense.category} size="sm" />
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={() => navigate(`/edit/${expense.id}`)}
          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          aria-label="Editar gasto"
        >
          ✎
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Eliminar gasto"
        >
          ✕
        </button>
      </div>
    </article>
  );
}

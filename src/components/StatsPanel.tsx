import { useMemo } from 'react';
import { useBudget } from '../context/BudgetContext';
import { CategoryBadge } from './CategoryBadge';
import { formatCurrency } from '../utils/helpers';
import { CATEGORIES } from '../types';
import type { Category } from '../types';

export function StatsPanel() {
  const { expenses, totalSpent, monthlyBudget, setBudget } = useBudget();

  const budgetPct = useMemo(
    () => Math.min((totalSpent / monthlyBudget) * 100, 100),
    [totalSpent, monthlyBudget]
  );

  const byCategory = useMemo(() => {
    const map: Partial<Record<Category, number>> = {};
    expenses.forEach(e => {
      map[e.category] = (map[e.category] ?? 0) + e.amount;
    });
    return map;
  }, [expenses]);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0) setBudget(val);
  };

  const barColor = budgetPct >= 90 ? 'bg-red-500' : budgetPct >= 70 ? 'bg-yellow-400' : 'bg-indigo-500';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Total gastado */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Total gastado</p>
        <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
        <p className="text-sm text-gray-400 mt-1">{expenses.length} gasto{expenses.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Presupuesto mensual */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Presupuesto</p>
          <input
            type="number"
            defaultValue={monthlyBudget}
            onBlur={handleBudgetChange}
            className="w-24 text-right text-sm border-b border-gray-200 focus:outline-none focus:border-indigo-400"
            aria-label="Presupuesto mensual"
          />
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-3">
          <div
            className={`h-full rounded-full transition-all duration-300 ${barColor}`}
            style={{ width: `${budgetPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatCurrency(totalSpent)}</span>
          <span>{formatCurrency(monthlyBudget - totalSpent)} restante</span>
        </div>
      </div>

      {/* Por categoría */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sm:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Por categoría</p>
        {Object.keys(CATEGORIES).length === 0 ? (
          <p className="text-sm text-gray-400">Sin datos</p>
        ) : (
          <div className="space-y-2">
            {(Object.keys(CATEGORIES) as Category[]).map(cat => {
              const amount = byCategory[cat] ?? 0;
              const pct    = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;
              return (
                <div key={cat} className="flex items-center gap-3">
                  <div className="w-24 flex-shrink-0">
                    <CategoryBadge category={cat} size="sm" />
                  </div>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-20 text-right">
                    {formatCurrency(amount)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

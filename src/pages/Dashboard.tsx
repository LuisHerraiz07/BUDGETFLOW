import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBudget } from '../context/BudgetContext';
import { StatsPanel } from '../components/StatsPanel';
import { ExpenseCard } from '../components/ExpenseCard';
import { EmptyState } from '../components/EmptyState';

export default function Dashboard() {
  const { expenses, networkState, errorMessage } = useBudget();
  const navigate = useNavigate();

  // Los 5 gastos más recientes
  const recent = useMemo(
    () => [...expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    [expenses]
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Estado de red */}
      {networkState === 'loading' && (
        <div className="flex items-center gap-3 text-gray-400 py-8">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-sm">Cargando datos…</span>
        </div>
      )}

      {networkState === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
          ⚠ {errorMessage}
        </div>
      )}

      {networkState === 'success' && (
        <>
          {/* Estadísticas */}
          <section className="mb-8">
            <StatsPanel />
          </section>

          {/* Últimos gastos */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-700">Últimos gastos</h2>
              {expenses.length > 5 && (
                <button
                  onClick={() => navigate('/expenses')}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Ver todos →
                </button>
              )}
            </div>

            {recent.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-2">
                {recent.map(e => <ExpenseCard key={e.id} expense={e} />)}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

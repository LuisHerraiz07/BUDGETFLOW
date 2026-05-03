import { useBudget } from '../context/BudgetContext';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseCard } from '../components/ExpenseCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { CategoryBadge } from '../components/CategoryBadge';
import { CATEGORIES } from '../types';
import type { Category } from '../types';

export default function Expenses() {
  const { expenses, networkState, errorMessage } = useBudget();
  const {
    filtered,
    searchQuery,
    categoryFilter,
    setSearchQuery,
    setCategoryFilter,
    clearFilters,
    hasActiveFilters,
  } = useExpenses({ expenses });

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Todos los gastos</h1>
        <span className="text-sm text-gray-400">{expenses.length} total</span>
      </div>

      {/* Controles */}
      <div className="space-y-3 mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Filtro por categoría */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition
              ${categoryFilter === 'all'
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'}`}
          >
            Todas
          </button>
          {(Object.keys(CATEGORIES) as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`transition rounded-full border ${categoryFilter === cat ? 'ring-2 ring-indigo-400' : ''}`}
            >
              <CategoryBadge category={cat} size="sm" />
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1 text-xs text-gray-400 hover:text-gray-700 transition"
            >
              ✕ Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Estado de red */}
      {networkState === 'loading' && (
        <div className="flex items-center gap-3 text-gray-400 py-8">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-sm">Cargando gastos…</span>
        </div>
      )}

      {networkState === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          ⚠ {errorMessage}
        </div>
      )}

      {/* Lista */}
      {networkState === 'success' && (
        filtered.length === 0 ? (
          <EmptyState
            title={hasActiveFilters ? 'Sin resultados' : 'Sin gastos'}
            message={hasActiveFilters ? 'Prueba con otros filtros.' : 'Añade tu primer gasto.'}
            showAdd={!hasActiveFilters}
          />
        ) : (
          <div className="space-y-2">
            {filtered.map(e => <ExpenseCard key={e.id} expense={e} />)}
          </div>
        )
      )}
    </main>
  );
}

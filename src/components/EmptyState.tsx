import { useNavigate } from 'react-router-dom';

interface Props {
  title?:   string;
  message?: string;
  showAdd?: boolean;
}

export function EmptyState({
  title   = 'Sin gastos',
  message = 'Añade tu primer gasto para empezar.',
  showAdd = true,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16 px-6 text-gray-400">
      <span className="block text-5xl mb-4 opacity-40">💸</span>
      <p className="text-lg font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-sm mb-4">{message}</p>
      {showAdd && (
        <button
          onClick={() => navigate('/add')}
          className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white text-sm
                     font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          + Añadir gasto
        </button>
      )}
    </div>
  );
}

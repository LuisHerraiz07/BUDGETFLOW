import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <span className="text-7xl mb-4">💸</span>
      <h1 className="text-5xl font-bold text-gray-200 mb-2">404</h1>
      <p className="text-xl font-semibold text-gray-700 mb-1">Página no encontrada</p>
      <p className="text-sm text-gray-400 mb-6">Esta URL no existe en BudgetFlow.</p>
      <button
        onClick={() => navigate('/')}
        className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
      >
        Volver al Dashboard
      </button>
    </main>
  );
}

import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('budgetflow_dark');
    return saved ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('budgetflow_dark', dark.toString());
  }, [dark]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700/50 hover:text-white'
    }`;

  return (
    <header className="bg-indigo-800 shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-2xl">💸</span>
          <span className="font-bold text-white text-lg tracking-tight">
            Budget<span className="text-indigo-300">Flow</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <nav className="flex gap-1">
            <NavLink to="/"         end className={linkClass}>Dashboard</NavLink>
            <NavLink to="/expenses"     className={linkClass}>Gastos</NavLink>
            <NavLink to="/add"          className={linkClass}>+ Añadir</NavLink>
          </nav>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(d => !d)}
            className="ml-2 w-8 h-8 flex items-center justify-center rounded-lg text-indigo-200
                       hover:bg-indigo-700 transition-colors"
            aria-label="Cambiar modo oscuro/claro"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* User + logout */}
          {user && (
            <div className="flex items-center gap-2 ml-1">
              <span className="text-indigo-300 text-xs hidden sm:block truncate max-w-[120px]">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="px-2 py-1.5 text-xs font-medium text-indigo-200 border border-indigo-600
                           rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

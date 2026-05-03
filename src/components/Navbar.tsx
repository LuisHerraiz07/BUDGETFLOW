import { NavLink } from 'react-router-dom';

export function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-700 text-white'
        : 'text-indigo-200 hover:bg-indigo-700/50 hover:text-white'
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
        <nav className="flex gap-1">
          <NavLink to="/"         end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/expenses"     className={linkClass}>Gastos</NavLink>
          <NavLink to="/add"          className={linkClass}>+ Añadir</NavLink>
        </nav>
      </div>
    </header>
  );
}

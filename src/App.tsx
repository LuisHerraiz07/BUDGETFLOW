import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import { Navbar } from './components/Navbar';
import Dashboard   from './pages/Dashboard';
import Expenses    from './pages/Expenses';
import AddExpense  from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import NotFound    from './pages/NotFound';

export default function App() {
  return (
    <BudgetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/"          element={<Dashboard />} />
            <Route path="/expenses"  element={<Expenses />} />
            <Route path="/add"       element={<AddExpense />} />
            <Route path="/edit/:id"  element={<EditExpense />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </BudgetProvider>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BudgetProvider } from './context/BudgetContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import Dashboard   from './pages/Dashboard';
import Expenses    from './pages/Expenses';
import AddExpense  from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import NotFound    from './pages/NotFound';
import Login       from './pages/Login';
import Register    from './pages/Register';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
        <Route path="*" element={
          <ProtectedRoute>
            <BudgetProvider userId={user?.uid ?? ''}>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Navbar />
                <Routes>
                  <Route path="/"         element={<Dashboard />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/add"      element={<AddExpense />} />
                  <Route path="/edit/:id" element={<EditExpense />} />
                  <Route path="*"         element={<NotFound />} />
                </Routes>
              </div>
            </BudgetProvider>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

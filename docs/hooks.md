# Hooks de React

## useState

Usado en `ExpenseForm` para gestionar el estado de cada campo del formulario (título, importe, categoría, fecha, nota) y los estados de validación (`errors`, `submitting`, `serverError`).

```tsx
const [title, setTitle] = useState('');
const [errors, setErrors] = useState<FormErrors>({});
```

Cada campo tiene su propio estado para que los cambios sean granulares y no rerendericen el componente entero.

---

## useEffect

Usado en `BudgetContext` para cargar los gastos desde la API al montar el provider:

```tsx
useEffect(() => {
  reload();
}, [reload]);
```

La dependencia `[reload]` está estabilizada con `useCallback` para que el efecto solo se ejecute una vez al montar, no en cada render.

---

## useMemo

Usado en dos sitios:

**1. `BudgetContext`** — calcula el total gastado sin recalcular si `expenses` no cambia:
```tsx
const totalSpent = useMemo(
  () => expenses.reduce((acc, e) => acc + e.amount, 0),
  [expenses]
);
```

**2. `useExpenses` hook** — aplica filtros de búsqueda y categoría:
```tsx
const filtered = useMemo(() => {
  let result = sortByDateDesc(expenses);
  result = filterByCategory(result, categoryFilter);
  result = filterBySearch(result, searchQuery);
  return result;
}, [expenses, searchQuery, categoryFilter]);
```

---

## useCallback

Usado en `BudgetContext` para estabilizar las referencias de las funciones de mutación. Sin `useCallback`, cada render del Provider crearía funciones nuevas, lo que haría que los componentes consumidores se re-renderizaran innecesariamente.

```tsx
const addExpense = useCallback(async (input: ExpenseInput) => {
  const newExpense = await api.createExpense(input);
  setExpenses(prev => [newExpense, ...prev]);
}, []);
```

---

## Custom hook — useExpenses

Encapsula la lógica de filtrado y búsqueda de gastos. Permite reutilizar esta lógica en cualquier componente sin duplicar código.

```tsx
const { filtered, searchQuery, categoryFilter, setSearchQuery, setCategoryFilter, clearFilters } =
  useExpenses({ expenses });
```

Internamente usa `useState` para los filtros y `useMemo` para aplicarlos.

---

## useBudget (hook de contexto)

Wrapper sobre `useContext(BudgetContext)` que lanza un error si se usa fuera del `BudgetProvider`, mejorando el diagnóstico de errores en desarrollo.

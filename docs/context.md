# Context API — BudgetContext

## ¿Por qué Context?

Sin Context, la lista de gastos tendría que pasarse como prop desde `App` hasta cada componente que la necesite (Dashboard, Expenses, ExpenseCard…). Esto crea "prop drilling" — pasar props a través de componentes intermedios que no los usan.

Context API resuelve esto creando un almacén global accesible desde cualquier componente descendiente.

## Cuándo usar Context (y cuándo no)

**Usar Context cuando:**
- El estado es compartido por múltiples componentes en distintos niveles del árbol
- El estado cambia con poca frecuencia relativa (listas, sesiones, preferencias)

**No usar Context cuando:**
- El estado es solo local a un componente (usar `useState`)
- El estado cambia muy frecuentemente (podría causar re-renders innecesarios)

## Implementación

```tsx
const BudgetContext = createContext<BudgetContextValue | null>(null);

export function BudgetProvider({ children }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // ...
  return (
    <BudgetContext.Provider value={...}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error('useBudget debe usarse dentro de <BudgetProvider>');
  return ctx;
}
```

## Valor del contexto

| Campo | Tipo | Descripción |
|---|---|---|
| `expenses` | `Expense[]` | Lista completa de gastos |
| `networkState` | `NetworkState` | `idle / loading / success / error` |
| `errorMessage` | `string \| null` | Mensaje de error de red |
| `monthlyBudget` | `number` | Presupuesto mensual (localStorage) |
| `totalSpent` | `number` | Suma de todos los gastos (memoizado) |
| `reload` | `() => Promise<void>` | Recarga gastos desde la API |
| `addExpense` | función | Crea un gasto y actualiza el estado |
| `editExpense` | función | Actualiza un gasto |
| `removeExpense` | función | Elimina un gasto |
| `setBudget` | función | Cambia el presupuesto mensual |

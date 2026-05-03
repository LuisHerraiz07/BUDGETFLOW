# Capa de red — src/api/client.ts

## Diseño

El cliente de API es el único lugar donde se llama a `fetch`. Ningún componente ni hook accede directamente a la red — siempre lo hacen a través de este módulo.

```typescript
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/v1';
```

La URL base se lee de la variable de entorno `VITE_API_URL`. Si no está definida, usa `localhost:3001` (desarrollo local).

## Helper interno apiFetch

```typescript
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (response.status === 204) return null as unknown as T;
  const data: ApiResponse<T> = await response.json();
  if (!response.ok || !data.success) throw new Error(data.error ?? `Error ${response.status}`);
  return data.data;
}
```

El genérico `<T>` garantiza que el tipo de retorno es exactamente el esperado en cada llamada. Los errores se lanzan como `Error` con el mensaje del servidor, que los componentes capturan en el bloque `catch`.

## Funciones exportadas

| Función | Retorno | Descripción |
|---|---|---|
| `getExpenses()` | `Promise<Expense[]>` | Lista todos los gastos |
| `createExpense(input)` | `Promise<Expense>` | Crea un gasto |
| `updateExpense(id, changes)` | `Promise<Expense>` | Actualiza parcialmente |
| `deleteExpense(id)` | `Promise<void>` | Elimina un gasto |
| `getStats()` | `Promise<Stats>` | Estadísticas agregadas |

## Gestión de estados de red

Los tres estados se gestionan en `BudgetContext`:

```typescript
type NetworkState = 'idle' | 'loading' | 'success' | 'error';
```

- **loading**: se muestra un spinner mientras `networkState === 'loading'`
- **success**: se renderiza la lista de gastos
- **error**: se muestra un banner con el mensaje de error

## Variable de entorno para producción

En el archivo `.env` de la raíz (o en Vercel → Environment Variables):

```
VITE_API_URL=https://tu-proyecto.vercel.app/api/v1
```

Nota: las variables de entorno de Vite deben empezar por `VITE_` para ser accesibles en el navegador.

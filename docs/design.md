# Arquitectura de BudgetFlow

## Estructura de componentes

```
App
├── Navbar
└── Routes
    ├── / → Dashboard
    │   ├── StatsPanel
    │   └── ExpenseCard (lista de últimos 5)
    ├── /expenses → Expenses
    │   ├── SearchBar
    │   ├── CategoryFilter
    │   └── ExpenseCard (lista completa)
    ├── /add → AddExpense
    │   └── ExpenseForm
    ├── /edit/:id → EditExpense
    │   └── ExpenseForm
    └── * → NotFound
```

## Gestión del estado

- **Estado local** (`useState`): estado del formulario, búsqueda activa, filtro seleccionado.
- **Estado global** (`Context API`): lista de gastos, presupuesto mensual, estado de red (loading/error). Compartido entre Dashboard y Expenses para evitar llamadas duplicadas a la API.
- **Efectos** (`useEffect`): carga inicial de gastos al montar los componentes, recarga tras mutaciones.

## Diseño del backend — API REST

Base URL: `/api/v1`

| Método | Ruta | Descripción | Código |
|---|---|---|---|
| GET | `/expenses` | Listar todos los gastos | 200 |
| POST | `/expenses` | Crear un gasto | 201 |
| PATCH | `/expenses/:id` | Actualizar parcialmente | 200 |
| DELETE | `/expenses/:id` | Eliminar | 204 |
| GET | `/stats` | Estadísticas agregadas | 200 |
| GET | `/health` | Health check | 200 |

## Contratos de datos

### Expense

```typescript
interface Expense {
  id:        string;   // UUID generado por el servidor
  title:     string;   // Descripción del gasto
  amount:    number;   // Importe en euros (positivo)
  category:  Category; // Enum de categorías
  date:      string;   // Fecha ISO (YYYY-MM-DD)
  note?:     string;   // Nota opcional
  createdAt: string;   // Timestamp ISO generado por el servidor
}

type Category = 'food' | 'transport' | 'entertainment' | 'health' | 'shopping' | 'other';
```

### Stats

```typescript
interface Stats {
  total:        number;
  count:        number;
  byCategory:   Record<Category, number>;
  avgPerDay:    number;
}
```

### ApiResponse<T>

```typescript
interface ApiResponse<T> {
  success:   boolean;
  data:      T;
  error?:    string;
  timestamp: string;
}
```

## Flujo de datos

```
Usuario
  │
  ▼
React Component
  │ llama a
  ▼
src/api/client.ts  (fetch + tipos)
  │ HTTP Request
  ▼
server/src/index.js
  │
  ├── middlewares: cors, json, logger
  │
  ▼
routes/expense.routes.js
  │
  ▼
controllers/expense.controller.js  (valida req.body)
  │
  ▼
services/expense.service.js  (lógica pura, array en memoria)
  │
  ▼ JSON Response
React Component  (actualiza estado → re-render)
```

## Persistencia

- **Servidor**: array en memoria (se reinicia al reiniciar el servidor). En producción con base de datos real se sustituiría solo la capa de servicios.
- **Cliente**: no se usa LocalStorage para gastos (la API es la fuente de verdad). Solo se guarda en LocalStorage el presupuesto mensual y la preferencia de moneda.

## Decisiones de arquitectura

- **Tailwind CDN vs npm**: se usa npm + PostCSS para tener purging de clases en producción y acceso a la configuración completa.
- **Context vs Redux**: Context API es suficiente para este tamaño de aplicación. Redux añadiría complejidad innecesaria.
- **CommonJS en el servidor**: se usa CommonJS en lugar de ES Modules para mayor compatibilidad con Node.js y Vercel serverless.

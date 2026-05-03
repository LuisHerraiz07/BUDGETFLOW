# BudgetFlow

Tracker de gastos personales fullstack. Frontend con **React + TypeScript + Tailwind**, backend con **Node.js + Express**.

**Demo:** _(añade tu URL de Vercel aquí)_
**Tablero Trello:** _(añade el enlace aquí)_

---

## Estructura del proyecto

```
budgetflow/
├── docs/                        ← Documentación completa
│   ├── agile.md
│   ├── idea.md
│   ├── project-management.md
│   ├── design.md
│   ├── components.md
│   ├── hooks.md
│   ├── context.md
│   ├── routing.md
│   ├── forms.md
│   ├── api.md
│   ├── api-client.md
│   ├── testing.md
│   ├── deployment.md
│   └── retrospective.md
├── server/                      ← Backend Express
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── config/env.js
│       ├── routes/expense.routes.js
│       ├── controllers/expense.controller.js
│       ├── services/expense.service.js
│       └── middlewares/logger.js + errorHandler.js
├── src/                         ← Frontend React
│   ├── api/client.ts
│   ├── components/
│   ├── pages/
│   ├── hooks/useExpenses.ts
│   ├── context/BudgetContext.tsx
│   ├── types/index.ts
│   └── utils/helpers.ts
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── vercel.json
```

---

## Cómo ejecutar en local

### 1. Frontend

```bash
npm install
npm run dev
# → http://localhost:5173
```

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
# → http://localhost:3001/api/v1
```

---

## API REST

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/v1/expenses` | Listar gastos |
| POST | `/api/v1/expenses` | Crear gasto |
| PATCH | `/api/v1/expenses/:id` | Actualizar |
| DELETE | `/api/v1/expenses/:id` | Eliminar |
| GET | `/api/v1/expenses/stats` | Estadísticas |
| GET | `/api/v1/health` | Estado del servidor |

---

## Tecnologías

**Frontend:** React 18 · TypeScript · Tailwind CSS · React Router v6 · Vite

**Backend:** Node.js · Express · CORS · dotenv

**Despliegue:** Vercel (frontend estático + Express serverless)

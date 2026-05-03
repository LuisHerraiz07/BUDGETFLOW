# Gestión del Proyecto

## Tablero Trello

El proyecto se gestiona con un tablero Kanban en Trello con las siguientes columnas:

- **Backlog** — todas las funcionalidades pendientes de priorizar
- **Todo** — tareas priorizadas listas para empezar
- **In Progress** — tareas en desarrollo activo
- **Review** — tareas terminadas pendientes de revisión
- **Done** — tareas completadas y verificadas

Enlace al tablero: _(añadir URL de Trello aquí)_

---

## Organización del trabajo

Se ha seguido un enfoque Kanban en lugar de Scrum porque el proyecto es individual y el trabajo llega de forma continua. No tiene sentido definir sprints cuando una sola persona desarrolla todas las capas.

### Tarjetas principales del tablero

**Backend**
- [ ] Inicializar servidor Express con arquitectura por capas
- [ ] Endpoint GET /api/v1/expenses
- [ ] Endpoint POST /api/v1/expenses
- [ ] Endpoint PATCH /api/v1/expenses/:id
- [ ] Endpoint DELETE /api/v1/expenses/:id
- [ ] Endpoint GET /api/v1/stats
- [ ] Middleware de logger y errorHandler

**Frontend — Infraestructura**
- [ ] Setup Vite + React + TypeScript + Tailwind
- [ ] Configurar React Router
- [ ] Crear estructura de carpetas
- [ ] Definir tipos TypeScript compartidos

**Frontend — Componentes**
- [ ] Navbar
- [ ] ExpenseCard
- [ ] ExpenseForm
- [ ] StatsPanel
- [ ] CategoryBadge
- [ ] SearchBar
- [ ] EmptyState

**Frontend — Páginas**
- [ ] Dashboard (stats + últimos gastos)
- [ ] Expenses (lista completa con filtros)
- [ ] AddExpense (formulario)
- [ ] EditExpense (formulario de edición)
- [ ] NotFound (404)

**Estado y Context**
- [ ] BudgetContext (estado global)
- [ ] Custom hook useExpenses

**Documentación**
- [ ] docs/agile.md
- [ ] docs/idea.md
- [ ] docs/design.md
- [ ] docs/components.md
- [ ] docs/hooks.md
- [ ] docs/context.md
- [ ] docs/routing.md
- [ ] docs/forms.md
- [ ] docs/api.md
- [ ] docs/api-client.md
- [ ] docs/testing.md
- [ ] docs/deployment.md
- [ ] docs/retrospective.md

**Despliegue**
- [ ] Configurar vercel.json
- [ ] Desplegar en Vercel
- [ ] Verificar frontend + API en producción

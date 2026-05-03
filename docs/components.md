# Documentación de Componentes

## Navbar

Barra de navegación fija en la parte superior. Usa `NavLink` de React Router para activar la clase `active` en el enlace de la ruta actual.

**Props:** ninguna (consume el router context internamente)

---

## CategoryBadge

Muestra una etiqueta con el emoji y nombre de una categoría.

**Props:**
- `category: Category` — obligatorio
- `size?: 'sm' | 'md'` — opcional (por defecto `'md'`)

---

## ExpenseCard

Tarjeta que muestra un gasto con importe, fecha, título, categoría y botones de edición/eliminación. Al eliminar pide confirmación.

**Props:**
- `expense: Expense` — obligatorio

Consume `useBudget()` para llamar a `removeExpense`.

---

## ExpenseForm

Formulario controlado reutilizable para crear y editar gastos. Valida todos los campos antes de enviar y muestra errores inline.

**Props:**
- `initialValues?: Partial<ExpenseInput>` — valores previos para edición
- `onSubmit: (input: ExpenseInput) => Promise<void>` — callback al guardar
- `submitLabel?: string` — texto del botón de envío

---

## StatsPanel

Panel de estadísticas con total gastado, barra de progreso del presupuesto mensual y desglose por categoría. El presupuesto es editable inline.

**Props:** ninguna (consume `useBudget()`)

Usa `useMemo` para calcular `totalSpent` y `byCategory` sin recalcular en cada render.

---

## SearchBar

Input de búsqueda con icono de lupa.

**Props:**
- `value: string`
- `onChange: (value: string) => void`
- `placeholder?: string`

---

## EmptyState

Estado vacío mostrado cuando no hay gastos o no hay resultados de búsqueda.

**Props:**
- `title?: string`
- `message?: string`
- `showAdd?: boolean` — si `true` muestra botón para ir a `/add`

# Rutas y Navegación

## Configuración

Se usa **React Router v6** con `BrowserRouter` + `Routes` + `Route`.

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/"         element={<Dashboard />} />
    <Route path="/expenses" element={<Expenses />} />
    <Route path="/add"      element={<AddExpense />} />
    <Route path="/edit/:id" element={<EditExpense />} />
    <Route path="*"         element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

## Estructura de rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Dashboard` | Panel principal con stats y últimos gastos |
| `/expenses` | `Expenses` | Lista completa con filtros y búsqueda |
| `/add` | `AddExpense` | Formulario para añadir un gasto |
| `/edit/:id` | `EditExpense` | Formulario para editar un gasto existente |
| `*` | `NotFound` | Página 404 para rutas desconocidas |

## Navegación

- **`NavLink`** en `Navbar`: añade automáticamente la clase `active` en el enlace de la ruta actual.
- **`useNavigate()`**: usado en formularios para volver atrás (`navigate(-1)`) y en botones de acción.
- **`<Navigate>`** en `EditExpense`: redirige a `/expenses` si el ID del gasto no existe en el estado.
- **`useParams()`** en `EditExpense`: extrae el `:id` de la URL para encontrar el gasto a editar.

## Página 404

La ruta `path="*"` captura cualquier URL no reconocida y muestra la página `NotFound` con un botón para volver al Dashboard.

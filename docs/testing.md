# Pruebas manuales

## Funcionalidades verificadas

| Escenario | Resultado |
|---|---|
| Carga inicial — se muestran los gastos de ejemplo | ✅ |
| Añadir gasto con todos los campos válidos | ✅ |
| Añadir gasto sin título → error de validación | ✅ |
| Añadir gasto con importe 0 → error de validación | ✅ |
| Añadir gasto con importe negativo → error de validación | ✅ |
| Editar gasto existente | ✅ |
| Editar gasto inexistente → redirige a /expenses | ✅ |
| Eliminar gasto → desaparece de la lista | ✅ |
| Filtrar por categoría | ✅ |
| Buscar por texto | ✅ |
| Combinar búsqueda + filtro de categoría | ✅ |
| Limpiar filtros | ✅ |
| Stats actualizan al añadir/eliminar | ✅ |
| Cambiar presupuesto mensual | ✅ |
| Presupuesto persiste al recargar (localStorage) | ✅ |
| Navegación entre páginas con React Router | ✅ |
| URL directa a /expenses funciona | ✅ |
| URL /edit/:id inexistente → redirige | ✅ |
| URL desconocida → página 404 | ✅ |
| Diseño responsive en móvil (< 640px) | ✅ |
| Sin errores en consola en carga normal | ✅ |

## Pruebas de error de red

| Escenario | Resultado |
|---|---|
| Servidor apagado → banner de error visible | ✅ |
| DELETE de ID inexistente → 404 del servidor | ✅ |
| POST sin title → 400 del servidor | ✅ |

# API REST — BudgetFlow

Base URL: `http://localhost:3001/api/v1`

## Endpoints

### GET /expenses
Devuelve todos los gastos ordenados por fecha descendente.

**Response 200:**
```json
{
  "success": true,
  "data": [
    { "id": "abc", "title": "Supermercado", "amount": 45.60, "category": "food", "date": "2025-04-20", "createdAt": "..." }
  ],
  "timestamp": "..."
}
```

### POST /expenses
Crea un nuevo gasto.

**Request body:**
```json
{ "title": "Netflix", "amount": 12.99, "category": "entertainment", "date": "2025-04-15" }
```

**Response 201:** el gasto creado con su `id` y `createdAt` generados por el servidor.

**Response 400:** si falta `title`, `amount` es inválido o `category` no existe.

### PATCH /expenses/:id
Actualiza parcialmente un gasto. Solo envía los campos que quieres cambiar.

**Request body:**
```json
{ "amount": 15.99 }
```

**Response 200:** el gasto actualizado.
**Response 404:** si el ID no existe.

### DELETE /expenses/:id
Elimina un gasto.

**Response 204:** sin cuerpo.
**Response 404:** si el ID no existe.

### GET /expenses/stats
Devuelve estadísticas agregadas.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "total": 211.54,
    "count": 5,
    "byCategory": { "food": 45.60, "transport": 54.60, "entertainment": 12.99, "health": 18.40, "shopping": 79.95 },
    "avgPerDay": 42.31
  }
}
```

### GET /health
Health check del servidor.

**Response 200:**
```json
{ "success": true, "status": "ok", "uptime": "42s", "env": "development" }
```

## Códigos HTTP

| Código | Significado |
|---|---|
| 200 | OK |
| 201 | Creado correctamente |
| 204 | Eliminado (sin cuerpo) |
| 400 | Datos inválidos del cliente |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

# BudgetFlow — Idea del Proyecto

## Problema que resuelve

La mayoría de las personas no sabe exactamente en qué gasta su dinero. Las apps bancarias muestran los movimientos pero no los categorizan de forma útil ni dan una visión clara del presupuesto mensual. BudgetFlow es una aplicación web ligera que permite registrar gastos manualmente, categorizarlos y visualizar en tiempo real cuánto se ha gastado y en qué.

No requiere conexión con bancos ni APIs de pago — el usuario introduce sus gastos y la app los organiza.

---

## Usuario objetivo

Personas de 18 a 35 años que quieren tener más control sobre sus finanzas personales sin necesidad de instalar una app de banco o compartir sus credenciales con terceros. El usuario típico es un estudiante universitario o joven profesional que cobra a fin de mes y quiere saber si llegará sin problemas.

---

## Funcionalidades principales

- Añadir gastos con título, importe, categoría, fecha y nota opcional
- Ver la lista de todos los gastos filtrados por categoría o mes
- Editar y eliminar gastos existentes
- Panel de estadísticas: total gastado, desglose por categoría y gasto medio diario
- Búsqueda de gastos por título
- Estado de carga, éxito y error en todas las peticiones a la API

---

## Funcionalidades opcionales

- Establecer un presupuesto mensual y ver cuánto queda
- Gráfico de barras o de tarta por categoría
- Exportar gastos en CSV
- Modo oscuro

---

## Mejoras futuras

- Autenticación de usuario para que cada persona tenga sus propios datos
- Conexión con una base de datos real (PostgreSQL o MongoDB)
- Notificaciones cuando se supera el 80% del presupuesto mensual
- App móvil con React Native reutilizando los tipos y la lógica de negocio
- Importación automática de extractos bancarios en CSV

---

## Categorías de gasto

| Categoría | Emoji | Descripción |
|---|---|---|
| `food` | 🍔 | Comida, supermercado, restaurantes |
| `transport` | 🚗 | Gasolina, transporte público, Uber |
| `entertainment` | 🎮 | Ocio, streaming, videojuegos |
| `health` | 💊 | Farmacia, médico, deporte |
| `shopping` | 🛍️ | Ropa, tecnología, hogar |
| `other` | 📦 | Cualquier otro gasto |

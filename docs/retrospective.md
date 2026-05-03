# Retrospectiva — BudgetFlow

## Qué aprendí

Este proyecto consolidó la integración de tres capas que hasta ahora había trabajado por separado: React con TypeScript en el frontend, Express con arquitectura por capas en el backend, y la comunicación entre ambos a través de un cliente de API tipado.

Lo más valioso fue entender que TypeScript en un proyecto fullstack no es solo añadir tipos a variables — es definir contratos de datos (`interface Expense`, `ApiResponse<T>`) que garantizan que frontend y backend hablan el mismo idioma. Si el servidor devuelve un campo que el cliente no espera, o viceversa, el compilador lo detecta antes de ejecutar el código.

## Conexión frontend – backend – API

El flujo completo que aprendí a construir:

1. El usuario interactúa con un componente React
2. El componente llama a una función del Context (`addExpense`, `removeExpense`)
3. El Context llama al cliente de API tipado (`src/api/client.ts`)
4. El cliente hace `fetch` al servidor Express
5. Express valida los datos en el controlador, delega la lógica al servicio
6. El servicio devuelve los datos, el controlador responde con JSON
7. El cliente parsea la respuesta con el tipo correcto
8. El Context actualiza el estado de React
9. Los componentes se re-renderizan con los datos nuevos

## Problemas encontrados

**CORS en producción**: Vercel genera URLs de preview distintas en cada despliegue. La solución fue configurar `CORS_ORIGIN = true` en producción para aceptar cualquier origen mientras se desarrolla.

**Variables de entorno de Vite**: Las variables deben empezar por `VITE_` para que Vite las incluya en el bundle del cliente. `REACT_APP_*` no funciona en Vite. Perdí tiempo con esto hasta entenderlo.

**`useMemo` y dependencias**: Al principio ponía demasiadas dependencias en `useMemo`, lo que hacía que se recalculara en cada render. Aprendí a ser preciso con las dependencias.

**Formulario controlado vs no controlado**: El formulario `ExpenseForm` usa estado controlado (un `useState` por campo). Es más código pero da control total sobre la validación y el estado del botón de submit.

## Uso de IA durante el desarrollo

Usé IA para:
- Generar la estructura inicial del proyecto y los tipos TypeScript
- Resolver dudas sobre la configuración de Tailwind con Vite
- Depurar el error de CORS en Vercel
- Generar la documentación de los archivos `docs/`

Lo que hice yo:
- Entender cada archivo generado antes de usarlo
- Adaptar los componentes al diseño visual que quería
- Probar manualmente todas las funcionalidades
- Corregir los bugs que aparecían al ejecutar

## Reflexión final

La diferencia más grande respecto a las prácticas anteriores es la integración. Antes cada pieza (HTML/CSS, JavaScript, TypeScript, Express) se trabajaba en aislamiento. En este proyecto todo está conectado y un cambio en el tipo de datos del backend afecta directamente al frontend. TypeScript hace que esa conexión sea explícita y verificable automáticamente.

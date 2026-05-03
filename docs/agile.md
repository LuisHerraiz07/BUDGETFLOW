# Metodologías de Desarrollo Ágil

## ¿Qué es Agile?

Agile es una filosofía de desarrollo de software que pone el foco en entregar valor continuamente al cliente en lugar de seguir un plan rígido de principio a fin. En vez de planificar todo al comienzo y esperar meses para ver resultados, Agile propone dividir el trabajo en ciclos cortos y adaptar el rumbo según el feedback recibido.

Su objetivo principal es reducir el riesgo: si algo no funciona, lo descubres pronto y puedes corregirlo sin haber invertido meses de trabajo en la dirección equivocada. Los valores fundamentales de Agile, recogidos en el **Manifiesto Ágil** (2001), son:

- Las personas y sus interacciones por encima de los procesos y las herramientas
- El software funcionando por encima de la documentación exhaustiva
- La colaboración con el cliente por encima de la negociación de contratos
- La respuesta al cambio por encima de seguir un plan

---

## Scrum

Scrum es el marco de trabajo ágil más extendido. Organiza el trabajo en bloques de tiempo fijos llamados **sprints** (normalmente de 1 a 4 semanas), al final de los cuales se entrega un incremento funcional del producto.

### Roles

- **Product Owner**: representa al cliente. Define qué hay que construir y en qué orden de prioridad. Mantiene y ordena el Product Backlog.
- **Scrum Master**: facilita el proceso. No es el jefe del equipo, sino quien elimina los obstáculos y protege al equipo de interrupciones externas.
- **Development Team**: los desarrolladores que ejecutan el trabajo. Son autónomos y multidisciplinares.

### Conceptos principales

- **Product Backlog**: lista priorizada de todo lo que se quiere construir. El Product Owner la gestiona continuamente.
- **Sprint Backlog**: subconjunto del Product Backlog que el equipo se compromete a completar durante un sprint.
- **Sprint Planning**: reunión al inicio de cada sprint donde el equipo decide qué tareas caben en el sprint.
- **Daily Scrum**: reunión diaria de 15 minutos. Cada persona responde: ¿qué hice ayer?, ¿qué haré hoy?, ¿hay algún impedimento?
- **Sprint Review**: al final del sprint, el equipo muestra el trabajo completado al Product Owner y stakeholders.
- **Sprint Retrospective**: reflexión interna del equipo sobre cómo mejorar el proceso en el siguiente sprint.
- **Definition of Done**: criterio acordado que define cuándo una tarea está realmente terminada.

---

## Kanban

Kanban es un sistema de gestión del flujo de trabajo que hace visible el trabajo en curso. Originado en Toyota para la producción industrial, fue adaptado al desarrollo de software por David Anderson.

La idea central es representar el flujo de trabajo como un tablero con columnas (Backlog → To Do → In Progress → Review → Done). Cada tarea es una tarjeta que avanza de izquierda a derecha.

La regla más importante de Kanban es el **límite WIP** (Work In Progress): cada columna tiene un número máximo de tarjetas simultáneas. Esto evita la multitarea y obliga al equipo a terminar lo que está empezado antes de empezar algo nuevo.

No tiene sprints, roles fijos ni ceremonias obligatorias. El trabajo fluye de forma continua.

---

## Diferencias entre Scrum y Kanban

| Aspecto | Scrum | Kanban |
|---|---|---|
| Cadencia | Sprints fijos (1-4 semanas) | Flujo continuo |
| Roles | Product Owner, Scrum Master, Dev Team | Ninguno obligatorio |
| Cambios | Solo entre sprints | En cualquier momento |
| Métricas clave | Velocidad (puntos por sprint) | Cycle time, throughput |
| WIP | Limitado por el sprint | Limitado por columna |
| Reuniones | Daily, Planning, Review, Retro | Solo las necesarias |

---

## ¿Cuándo usar cada uno?

**Scrum** es adecuado cuando:
- El proyecto tiene entregables claros y se puede planificar en sprints
- El equipo es estable y trabaja junto en el mismo producto
- El cliente quiere ver progreso regular y dar feedback periódico
- Hay incertidumbre sobre los requisitos y se necesita iterar rápido

**Kanban** es adecuado cuando:
- El trabajo llega de forma continua e impredecible (bugs, soporte, mantenimiento)
- El equipo trabaja en múltiples proyectos simultáneamente
- No tiene sentido dividir el trabajo en sprints (ej. equipos de operaciones)
- Se quiere mejorar un proceso existente sin cambiar la estructura del equipo

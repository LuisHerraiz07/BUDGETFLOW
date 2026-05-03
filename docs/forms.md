# Formularios

## ExpenseForm — Formulario controlado

Toda la gestión de estado de los inputs ocurre en React (no en el DOM). Cada campo tiene su propio `useState` y su `onChange` correspondiente.

```tsx
const [title, setTitle] = useState('');

<input
  value={title}
  onChange={e => setTitle(e.target.value)}
/>
```

## Validación

La validación se ejecuta en la función `validate()` al hacer submit. Devuelve un objeto con los errores encontrados:

```tsx
function validate(): FormErrors {
  const errs: FormErrors = {};
  if (!title.trim())      errs.title  = 'El título es obligatorio.';
  if (parseFloat(amount) <= 0) errs.amount = 'El importe debe ser mayor que 0.';
  if (!date)              errs.date   = 'La fecha es obligatoria.';
  return errs;
}
```

Si hay errores, se muestran debajo de cada campo y el formulario no se envía.

## Mensajes de error inline

Cada campo tiene su mensaje de error debajo:

```tsx
{errors.title && (
  <p className="text-xs text-red-500 mt-1">{errors.title}</p>
)}
```

El borde del input cambia a rojo cuando hay error en ese campo.

## Error de servidor

Si la llamada a la API falla, se muestra un banner de error en la parte superior del formulario:

```tsx
{serverError && (
  <div className="bg-red-50 border border-red-200 text-red-700 ...">
    ⚠ {serverError}
  </div>
)}
```

## Estado de envío

El botón de submit se desactiva mientras se está enviando el formulario para evitar envíos duplicados:

```tsx
<button disabled={submitting}>
  {submitting ? 'Guardando…' : submitLabel}
</button>
```

/**
 * ExpenseForm.tsx
 * Formulario controlado reutilizable para crear y editar gastos.
 * Valida campos antes de enviar y muestra mensajes de error inline.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ExpenseInput, Category } from '../types';
import { CATEGORIES } from '../types';
import { todayISO } from '../utils/helpers';

interface Props {
  initialValues?: Partial<ExpenseInput>;
  onSubmit:       (input: ExpenseInput) => Promise<void>;
  submitLabel?:   string;
}

type FormErrors = Partial<Record<keyof ExpenseInput, string>>;

export function ExpenseForm({
  initialValues = {},
  onSubmit,
  submitLabel = 'Guardar gasto',
}: Props) {
  const navigate = useNavigate();

  // Estado del formulario — formulario controlado
  const [title,    setTitle]    = useState(initialValues.title    ?? '');
  const [amount,   setAmount]   = useState(String(initialValues.amount ?? ''));
  const [category, setCategory] = useState<Category>(initialValues.category ?? 'other');
  const [date,     setDate]     = useState(initialValues.date     ?? todayISO());
  const [note,     setNote]     = useState(initialValues.note     ?? '');

  const [errors,     setErrors]     = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // ── Validación ─────────────────────────────────────────────────
  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!title.trim())              errs.title    = 'El título es obligatorio.';
    if (title.trim().length > 100)  errs.title    = 'Máximo 100 caracteres.';
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt))      errs.amount   = 'Introduce un importe válido.';
    if (amt <= 0)                   errs.amount   = 'El importe debe ser mayor que 0.';
    if (!date)                      errs.date     = 'La fecha es obligatoria.';
    return errs;
  }

  // ── Submit ─────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    setServerError(null);
    try {
      await onSubmit({
        title:    title.trim(),
        amount:   parseFloat(amount),
        category,
        date,
        note:     note.trim() || undefined,
      });
      navigate(-1);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Error al guardar.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          ⚠ {serverError}
        </div>
      )}

      {/* Título */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => { setTitle(e.target.value); setErrors(p => ({ ...p, title: undefined })); }}
          placeholder="Ej. Supermercado Mercadona"
          maxLength={100}
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition
            ${errors.title ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-400'}`}
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>

      {/* Importe */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Importe (€) <span className="text-red-500">*</span>
        </label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={e => { setAmount(e.target.value); setErrors(p => ({ ...p, amount: undefined })); }}
          placeholder="0.00"
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition
            ${errors.amount ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-400'}`}
        />
        {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(CATEGORIES) as Category[]).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition
                ${category === cat
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'}`}
            >
              <span>{CATEGORIES[cat].emoji}</span>
              <span>{CATEGORIES[cat].label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fecha */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha <span className="text-red-500">*</span>
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={e => { setDate(e.target.value); setErrors(p => ({ ...p, date: undefined })); }}
          className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition
            ${errors.date ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-200 focus:border-indigo-400'}`}
        />
        {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
      </div>

      {/* Nota */}
      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
          Nota <span className="text-gray-400 text-xs">(opcional)</span>
        </label>
        <textarea
          id="note"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Ej. Compra semanal"
          rows={2}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition resize-none"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg
                     hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {submitting ? 'Guardando…' : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium
                     rounded-lg hover:bg-gray-50 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

'use strict';

const express = require('express');
const cors    = require('cors');
const { randomUUID } = require('crypto');

const app = express();

app.use(cors({ origin: true, methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));
app.use(express.json());

// ── Datos en memoria ──────────────────────────────────────────
let expenses = [
  { id: randomUUID(), title: 'Supermercado',  amount: 45.60, category: 'food',          date: '2025-04-20', createdAt: new Date().toISOString() },
  { id: randomUUID(), title: 'Metro mensual', amount: 54.60, category: 'transport',     date: '2025-04-01', createdAt: new Date().toISOString() },
  { id: randomUUID(), title: 'Netflix',       amount: 12.99, category: 'entertainment', date: '2025-04-15', createdAt: new Date().toISOString() },
  { id: randomUUID(), title: 'Farmacia',      amount: 18.40, category: 'health',        date: '2025-04-10', note: 'Ibuprofeno', createdAt: new Date().toISOString() },
  { id: randomUUID(), title: 'Ropa Zara',     amount: 79.95, category: 'shopping',      date: '2025-04-05', createdAt: new Date().toISOString() },
];

const VALID_CATEGORIES = ['food','transport','entertainment','health','shopping','other'];

function ok(res, data, code = 200) {
  res.status(code).json({ success: true, data, timestamp: new Date().toISOString() });
}
function err(res, message, code) {
  res.status(code).json({ success: false, data: null, error: message, timestamp: new Date().toISOString() });
}

// Health
app.get('/api/v1/health', (req, res) => {
  ok(res, { status: 'ok', uptime: `${Math.round(process.uptime())}s`, env: 'production' });
});

// Stats
app.get('/api/v1/expenses/stats', (req, res) => {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const byCategory = {};
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });
  const dates = [...new Set(expenses.map(e => e.date))];
  ok(res, { total, count: expenses.length, byCategory, avgPerDay: dates.length > 0 ? total / dates.length : 0 });
});

// GET all
app.get('/api/v1/expenses', (req, res) => {
  ok(res, [...expenses]);
});

// POST
app.post('/api/v1/expenses', (req, res) => {
  const { title, amount, category, date, note } = req.body;
  if (!title || typeof title !== 'string' || !title.trim())
    return err(res, '"title" es obligatorio.', 400);
  if (typeof amount !== 'number' || amount <= 0)
    return err(res, '"amount" debe ser un número positivo.', 400);
  if (!VALID_CATEGORIES.includes(category))
    return err(res, '"category" no válida.', 400);
  if (!date)
    return err(res, '"date" es obligatoria.', 400);
  const e = { id: randomUUID(), title: title.trim(), amount, category, date, note: note?.trim(), createdAt: new Date().toISOString() };
  expenses.unshift(e);
  ok(res, e, 201);
});

// PATCH
app.patch('/api/v1/expenses/:id', (req, res) => {
  const e = expenses.find(x => x.id === req.params.id);
  if (!e) return err(res, 'Recurso no encontrado.', 404);
  const { title, amount, category, date, note } = req.body;
  if (title !== undefined) e.title = title.trim();
  if (amount !== undefined) e.amount = amount;
  if (category !== undefined) e.category = category;
  if (date !== undefined) e.date = date;
  if (note !== undefined) e.note = note?.trim();
  e.updatedAt = new Date().toISOString();
  ok(res, e);
});

// DELETE
app.delete('/api/v1/expenses/:id', (req, res) => {
  const idx = expenses.findIndex(x => x.id === req.params.id);
  if (idx === -1) return err(res, 'Recurso no encontrado.', 404);
  expenses.splice(idx, 1);
  res.status(204).send();
});

// 404
app.use((req, res) => {
  err(res, `Ruta no encontrada: [${req.method}] ${req.originalUrl}`, 404);
});

module.exports = app;

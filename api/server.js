const express = require('express');
const cors    = require('cors');
const crypto  = require('crypto');

const app = express();
app.use(cors({ origin: true, methods: ['GET','POST','PATCH','DELETE'] }));
app.use(express.json());

let expenses = [
  { id: crypto.randomUUID(), title: 'Supermercado',  amount: 45.60, category: 'food',          date: '2025-04-20', createdAt: new Date().toISOString() },
  { id: crypto.randomUUID(), title: 'Metro mensual', amount: 54.60, category: 'transport',     date: '2025-04-01', createdAt: new Date().toISOString() },
  { id: crypto.randomUUID(), title: 'Netflix',       amount: 12.99, category: 'entertainment', date: '2025-04-15', createdAt: new Date().toISOString() },
  { id: crypto.randomUUID(), title: 'Farmacia',      amount: 18.40, category: 'health',        date: '2025-04-10', note: 'Ibuprofeno', createdAt: new Date().toISOString() },
  { id: crypto.randomUUID(), title: 'Ropa Zara',     amount: 79.95, category: 'shopping',      date: '2025-04-05', createdAt: new Date().toISOString() },
];

const CATEGORIES = ['food','transport','entertainment','health','shopping','other'];

function ok(res, data, code) { res.status(code||200).json({ success: true, data, timestamp: new Date().toISOString() }); }
function fail(res, msg, code) { res.status(code).json({ success: false, data: null, error: msg, timestamp: new Date().toISOString() }); }

app.get('/api/v1/health', (req, res) => ok(res, { status: 'ok' }));

app.get('/api/v1/expenses/stats', (req, res) => {
  const total = expenses.reduce((s,e) => s+e.amount, 0);
  const byCategory = {};
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category]||0) + e.amount; });
  const days = [...new Set(expenses.map(e => e.date))].length;
  ok(res, { total, count: expenses.length, byCategory, avgPerDay: days ? total/days : 0 });
});

app.get('/api/v1/expenses', (req, res) => ok(res, [...expenses]));

app.post('/api/v1/expenses', (req, res) => {
  const { title, amount, category, date, note } = req.body;
  if (!title || !title.trim()) return fail(res, '"title" es obligatorio.', 400);
  if (typeof amount !== 'number' || amount <= 0) return fail(res, '"amount" debe ser positivo.', 400);
  if (!CATEGORIES.includes(category)) return fail(res, '"category" no válida.', 400);
  if (!date) return fail(res, '"date" es obligatoria.', 400);
  const e = { id: crypto.randomUUID(), title: title.trim(), amount, category, date, note: note||'', createdAt: new Date().toISOString() };
  expenses.unshift(e);
  ok(res, e, 201);
});

app.patch('/api/v1/expenses/:id', (req, res) => {
  const e = expenses.find(x => x.id === req.params.id);
  if (!e) return fail(res, 'No encontrado.', 404);
  const { title, amount, category, date, note } = req.body;
  if (title !== undefined) e.title = title.trim();
  if (amount !== undefined) e.amount = amount;
  if (category !== undefined) e.category = category;
  if (date !== undefined) e.date = date;
  if (note !== undefined) e.note = note;
  e.updatedAt = new Date().toISOString();
  ok(res, e);
});

app.delete('/api/v1/expenses/:id', (req, res) => {
  const idx = expenses.findIndex(x => x.id === req.params.id);
  if (idx === -1) return fail(res, 'No encontrado.', 404);
  expenses.splice(idx, 1);
  res.status(204).send();
});

app.use((req, res) => fail(res, `Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404));

module.exports = app;

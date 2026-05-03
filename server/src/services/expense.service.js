'use strict';

const { randomUUID } = require('crypto');

let expenses = [
  { id: randomUUID(), title: 'Supermercado',     amount: 45.60, category: 'food',          date: '2025-04-20', createdAt: new Date().toISOString() },
  { id: randomUUID(), title: 'Metro mensual',    amount: 54.60, category: 'transport',     date: '2025-04-01', createdAt: new Date().toISOString() },
  { id: randomUUID(), title: 'Netflix',          amount: 12.99, category: 'entertainment', date: '2025-04-15', createdAt: new Date().toISOString() },
  { id: randomUUID(), title: 'Farmacia',         amount: 18.40, category: 'health',        date: '2025-04-10', note: 'Ibuprofeno', createdAt: new Date().toISOString() },
  { id: randomUUID(), title: 'Ropa Zara',        amount: 79.95, category: 'shopping',      date: '2025-04-05', createdAt: new Date().toISOString() },
];

function getAll()     { return [...expenses]; }
function getById(id)  {
  const e = expenses.find(x => x.id === id);
  if (!e) throw new Error('NOT_FOUND');
  return e;
}

function create(data) {
  const e = { id: randomUUID(), ...data, createdAt: new Date().toISOString() };
  expenses.unshift(e);
  return e;
}

function update(id, changes) {
  const e = getById(id);
  Object.assign(e, changes, { updatedAt: new Date().toISOString() });
  return e;
}

function remove(id) {
  const idx = expenses.findIndex(x => x.id === id);
  if (idx === -1) throw new Error('NOT_FOUND');
  expenses.splice(idx, 1);
}

function getStats() {
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const byCategory = {};
  expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });
  const dates   = [...new Set(expenses.map(e => e.date))];
  const avgPerDay = dates.length > 0 ? total / dates.length : 0;
  return { total, count: expenses.length, byCategory, avgPerDay };
}

module.exports = { getAll, getById, create, update, remove, getStats };

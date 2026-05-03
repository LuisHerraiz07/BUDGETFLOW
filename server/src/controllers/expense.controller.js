'use strict';

const svc = require('../services/expense.service');

const VALID_CATEGORIES = ['food', 'transport', 'entertainment', 'health', 'shopping', 'other'];

function ok(res, data, code = 200) {
  res.status(code).json({ success: true, data, timestamp: new Date().toISOString() });
}
function err(res, message, code) {
  res.status(code).json({ success: false, data: null, error: message, timestamp: new Date().toISOString() });
}

const getAll = (req, res, next) => {
  try { ok(res, svc.getAll()); } catch (e) { next(e); }
};

const getOne = (req, res, next) => {
  try { ok(res, svc.getById(req.params.id)); } catch (e) { next(e); }
};

const create = (req, res, next) => {
  try {
    const { title, amount, category, date, note } = req.body;
    if (!title || typeof title !== 'string' || !title.trim())
      return err(res, '"title" es obligatorio.', 400);
    if (typeof amount !== 'number' || amount <= 0)
      return err(res, '"amount" debe ser un número positivo.', 400);
    if (!VALID_CATEGORIES.includes(category))
      return err(res, '"category" no válida.', 400);
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date))
      return err(res, '"date" debe tener formato YYYY-MM-DD.', 400);
    ok(res, svc.create({ title: title.trim(), amount, category, date, note: note?.trim() }), 201);
  } catch (e) { next(e); }
};

const update = (req, res, next) => {
  try {
    const { title, amount, category, date, note } = req.body;
    if (title !== undefined && (typeof title !== 'string' || !title.trim()))
      return err(res, '"title" debe ser texto no vacío.', 400);
    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0))
      return err(res, '"amount" debe ser un número positivo.', 400);
    if (category !== undefined && !VALID_CATEGORIES.includes(category))
      return err(res, '"category" no válida.', 400);
    const changes = {};
    if (title    !== undefined) changes.title    = title.trim();
    if (amount   !== undefined) changes.amount   = amount;
    if (category !== undefined) changes.category = category;
    if (date     !== undefined) changes.date     = date;
    if (note     !== undefined) changes.note     = note?.trim();
    ok(res, svc.update(req.params.id, changes));
  } catch (e) { next(e); }
};

const remove = (req, res, next) => {
  try { svc.remove(req.params.id); res.status(204).send(); } catch (e) { next(e); }
};

const getStats = (req, res, next) => {
  try { ok(res, svc.getStats()); } catch (e) { next(e); }
};

module.exports = { getAll, getOne, create, update, remove, getStats };

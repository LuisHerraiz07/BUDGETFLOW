'use strict';

const MAP = { NOT_FOUND: 404, CONFLICT: 409, FORBIDDEN: 403 };

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = MAP[err.message] || 500;
  if (status === 500) console.error('[ERROR]', err);
  res.status(status).json({
    success:   false,
    data:      null,
    error:     status === 404 ? 'Recurso no encontrado.' : 'Error interno del servidor.',
    timestamp: new Date().toISOString(),
  });
};

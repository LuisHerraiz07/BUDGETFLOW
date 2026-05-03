'use strict';

module.exports = (req, res, next) => {
  const t = performance.now();
  res.on('finish', () => {
    const ms = (performance.now() - t).toFixed(2);
    const ok = res.statusCode < 400;
    console.log(`${ok ? '✓' : '✗'} [${req.method}] ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
  });
  next();
};

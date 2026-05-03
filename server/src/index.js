'use strict';

const config       = require('./config/env');
const express      = require('express');
const cors         = require('cors');
const logger       = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const expenseRoutes = require('./routes/expense.routes');

const app = express();

app.use(cors({ origin: config.CORS_ORIGIN, methods: ['GET','POST','PATCH','DELETE'] }));
app.use(express.json());
app.use(logger);

app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, status: 'ok', uptime: `${Math.round(process.uptime())}s`, env: config.NODE_ENV });
});

app.use('/api/v1/expenses', expenseRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, data: null, error: `Ruta no encontrada: [${req.method}] ${req.originalUrl}` });
});

app.use(errorHandler);

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(config.PORT, () => {
    console.log(`\n  BudgetFlow API → http://localhost:${config.PORT}/api/v1\n`);
  });
}

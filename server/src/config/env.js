'use strict';
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

if (!process.env.PORT && !isProd) {
  throw new Error('[CONFIG] PORT no definida. Crea .env con PORT=3001');
}

module.exports = {
  PORT:        parseInt(process.env.PORT, 10) || 3001,
  NODE_ENV:    process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : isProd ? true : ['http://localhost:5173', 'http://127.0.0.1:5173'],
};

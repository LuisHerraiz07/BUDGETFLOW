'use strict';

const { Router } = require('express');
const ctrl = require('../controllers/expense.controller');

const router = Router();

router.get   ('/stats',  ctrl.getStats); // ANTES de /:id
router.get   ('/',       ctrl.getAll);
router.post  ('/',       ctrl.create);
router.get   ('/:id',    ctrl.getOne);
router.patch ('/:id',    ctrl.update);
router.delete('/:id',    ctrl.remove);

module.exports = router;

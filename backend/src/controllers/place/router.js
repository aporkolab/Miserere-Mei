const express = require('express');
const router = express.Router();
const { Place } = require('../../models');

const controller = require('../base/controller')(Place);

router.get('/select/:id', (req, res, next) => {
  return controller.findOneById(req, res, next);
});

router.get('/:location', (req, res, next) => {
  return controller.findOnebyPlaceName(req, res, next);
});

module.exports = router;

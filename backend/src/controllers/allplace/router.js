const express = require('express');
const router = express.Router();
const { Place } = require('../../models');
const authorize = require('../../models/auth/authorize');

const fields = [
  'location',
  'narrationZoneText',
  'opponentName',
  'opponenthealth',
  'opponentMinDamage',
  'opponentMaxDamage',
  'decision1',
  'decision2',
  'decision3',
  'decision4',
  'furtherLocation1',
  'furtherLocation2',
  'furtherLocation3',
  'furtherLocation4',
  'objectFound',
];
const controller = require('../base/controller')(Place, {
  writableFields: fields,
  searchableFields: fields,
});

router.use(authorize(3));

// Create
router.post('/', (req, res, next) => {
  return controller.create(req, res, next);
});

// Read
router.get('/', (req, res, next) => {
  return controller.findAll(req, res, next);
});

router.get('/select/:id', (req, res, next) => {
  return controller.findOneById(req, res, next);
});

// Update
router.put('/select/:id', (req, res, next) => {
  return controller.update(req, res, next);
});

router.patch('/select/:id', (req, res, next) => {
  return controller.update(req, res, next);
});

// Delete
router.delete('/:id', (req, res, next) => {
  return controller.delete(req, res, next);
});

module.exports = router;

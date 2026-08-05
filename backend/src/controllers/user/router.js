const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const authorize = require('../../models/auth/authorize');

const controller = require('../base/controller')(User, {
  writableFields: ['email', 'password', 'firstName', 'lastName', 'role'],
  searchableFields: ['email', 'firstName', 'lastName', 'role'],
  prepareWrite: data => {
    if (!data.password) delete data.password;
    if (typeof data.email === 'string') data.email = data.email.trim().toLowerCase();
    return data;
  },
});

router.use(authorize(3));

// Create
router.post('/', (req, res, next) => {
  return controller.create(req, res, next);
});

//Read
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

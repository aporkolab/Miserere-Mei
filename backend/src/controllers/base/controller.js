const express = require('express');
const createError = require('http-errors');
const baseService = require('./service');

module.exports = (model, populateList = []) => {
  const service = baseService(model, populateList);
  return {
    findOnebyPlaceName(req, res, next) {
      return service
        .findPlace(req.params.location)
        .then(entity => {
          if (!entity) {
            return next(new createError.NotFound('Entity by location name has not found'));
          }
          return res.json(entity);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
    },
    findAll(req, res, next) {
      return service
        .findAll(req.query)
        .then(list => res.json(list))
        .catch(err => next(new createError.InternalServerError(err.message)));
    },
    findOneById(req, res, next) {
      return service
        .findId(req.params.id)
        .then(entity => {
          if (!entity) {
            return next(new createError.NotFound('Entity by id has not found'));
          }
          return res.json(entity);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
    },
    update(req, res, next) {
      return service
        .update(req.params.id, req.body)
        .then(entity => res.json(entity))
        .catch(err => {
          if (err.message === 'Not found') {
            return next(new createError.NotFound(err.message));
          }
          return next(new createError.InternalServerError(err.message));
        });
    },
    create(req, res, next) {
      return service
        .create(req.body)
        .then(entity => res.json(entity))
        .catch(err => next(new createError.BadRequest(err.message)));
    },
    delete(req, res, next) {
      return service
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => {
          if (err.message === 'Not found') {
            return next(new createError.NotFound(err.message));
          }
          next(new createError.InternalServerError(err.message));
        });
    },
  };
};

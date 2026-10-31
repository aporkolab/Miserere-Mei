const createError = require('http-errors');
const baseService = require('./service');

const toHttpError = (err, fallback = createError.InternalServerError) => {
  if (err.message === 'Not found') return new createError.NotFound(err.message);
  if (err.name === 'SequelizeUniqueConstraintError') {
    return new createError.Conflict('Entity violates a unique constraint');
  }
  if (err.name === 'SequelizeValidationError') {
    return new createError.BadRequest(err.errors?.map(e => e.message).join('; ') || err.message);
  }
  return new fallback(err.message);
};

module.exports = (model, options = {}) => {
  const service = baseService(model, options);
  const idFrom = req => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new createError.BadRequest('Invalid entity id');
    }
    return id;
  };
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
      let id;
      try {
        id = idFrom(req);
      } catch (error) {
        return next(error);
      }
      return service
        .findId(id)
        .then(entity => {
          if (!entity) {
            return next(new createError.NotFound('Entity by id has not found'));
          }
          return res.json(entity);
        })
        .catch(err => next(new createError.InternalServerError(err.message)));
    },
    update(req, res, next) {
      let id;
      try {
        id = idFrom(req);
      } catch (error) {
        return next(error);
      }
      return service
        .update(id, req.body)
        .then(entity => res.json(entity))
        .catch(err => next(toHttpError(err)));
    },
    create(req, res, next) {
      return service
        .create(req.body)
        .then(entity => res.status(201).json(entity))
        .catch(err => next(toHttpError(err)));
    },
    delete(req, res, next) {
      let id;
      try {
        id = idFrom(req);
      } catch (error) {
        return next(error);
      }
      return service
        .delete(id)
        .then(() => res.status(204).send())
        .catch(err => next(toHttpError(err)));
    },
  };
};

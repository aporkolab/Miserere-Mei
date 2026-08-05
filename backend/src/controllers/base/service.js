const { Op } = require('sequelize');

const pickAllowedFields = (source, allowedFields) =>
  Object.fromEntries(
    Object.entries(source).filter(
      ([key]) => allowedFields.length === 0 || allowedFields.includes(key)
    )
  );

module.exports = (
  model,
  { writableFields = [], searchableFields = [], prepareWrite = data => data } = {}
) => {
  return {
    findPlace: location => {
      return model.findOne({
        where: {
          location,
        },
      });
    },
    findAll: (params = {}) => {
      const allowedFilters = pickAllowedFields(params, searchableFields);
      if (Object.keys(allowedFilters).length) {
        const filters = Object.fromEntries(
          Object.entries(allowedFilters).map(([key, value]) => [
            key,
            { [Op.like]: `%${String(value).slice(0, 100)}%` },
          ])
        );
        return model.findAll({
          where: filters,
        });
      }
      return model.findAll();
    },
    findId: id => model.findByPk(id),
    update: async (id, updateData) => {
      const entity = await model.findByPk(id);
      if (!entity) {
        throw new Error('Not found');
      }
      return entity.update(prepareWrite(pickAllowedFields(updateData, writableFields)));
    },
    create: async body => {
      const newEntity = await model.create(prepareWrite(pickAllowedFields(body, writableFields)));
      return model.findByPk(newEntity.id);
    },
    delete: async id => {
      const doc = await model.findByPk(id);
      if (!doc) {
        throw new Error('Not found');
      }
      await doc.destroy();
      return doc;
    },
  };
};

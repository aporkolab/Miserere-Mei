const { Op } = require('sequelize');

module.exports = (model, populateList = []) => {
  return {
    findPlace: location => {
      return model.findOne({
        where: {
          location,
        },
      });
    },
    findAll: (params = {}) => {
      if (Object.keys(params).length) {
        Object.keys(params).forEach(key => {
          params[key] = {
            [Op.like]: `%${params[key]}%`,
          };
        });
        return model.findAll({
          where: params,
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
      return entity.update(updateData);
    },
    create: async body => {
      const newEntity = await model.create(body);
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

const baseService = require('./service');

describe('base service', () => {
  test('updates and returns the entity on MySQL-compatible models', async () => {
    const updated = { id: 7, name: 'after' };
    const entity = { update: jest.fn().mockResolvedValue(updated) };
    const model = { findByPk: jest.fn().mockResolvedValue(entity) };

    await expect(baseService(model).update(7, { name: 'after' })).resolves.toBe(updated);
    expect(entity.update).toHaveBeenCalledWith({ name: 'after' });
  });

  test('rejects updates for missing entities', async () => {
    const model = { findByPk: jest.fn().mockResolvedValue(null) };
    await expect(baseService(model).update(99, {})).rejects.toThrow('Not found');
  });

  test('drops fields outside the writable allowlist', async () => {
    const entity = { update: jest.fn().mockResolvedValue({ id: 1 }) };
    const model = { findByPk: jest.fn().mockResolvedValue(entity) };
    const service = baseService(model, { writableFields: ['name'] });

    await service.update(1, { name: 'safe', role: 3 });

    expect(entity.update).toHaveBeenCalledWith({ name: 'safe' });
  });

  test('ignores query fields outside the searchable allowlist', async () => {
    const model = { findAll: jest.fn().mockResolvedValue([]) };
    const service = baseService(model, { searchableFields: ['name'] });

    await service.findAll({ password: 'secret' });

    expect(model.findAll).toHaveBeenCalledWith();
  });
});

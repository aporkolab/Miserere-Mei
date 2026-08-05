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
});

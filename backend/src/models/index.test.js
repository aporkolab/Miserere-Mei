describe('model registry', () => {
  test('registers every model used by a router', () => {
    const models = require('./index');
    expect(models.User).toBeDefined();
    expect(models.Place).toBeDefined();
    expect(models.Player).toBeDefined();
    expect(models.AllPlace).toBeDefined();
  });
});

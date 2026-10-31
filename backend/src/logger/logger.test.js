describe('logger', () => {
  const load = env => {
    jest.resetModules();
    Object.assign(process.env, env);
    return require('./logger');
  };

  afterEach(() => {
    delete process.env.LOG_LEVEL;
    process.env.NODE_ENV = 'test';
  });

  test('honours LOG_LEVEL', () => {
    expect(load({ LOG_LEVEL: 'warn' }).level).toBe('warn');
  });

  test('emits structured JSON in production', () => {
    const logger = load({ NODE_ENV: 'production' });
    const info = logger.format.transform({ level: 'info', message: 'hello' });
    expect(() => JSON.parse(info[Symbol.for('message')])).not.toThrow();
  });

  test('forwards morgan stream lines without trailing newlines', () => {
    const logger = load({ NODE_ENV: 'development' });
    const spy = jest.spyOn(logger, 'info').mockImplementation(() => logger);
    logger.stream.write('GET / 200\n');
    expect(spy).toHaveBeenCalledWith('GET / 200');
  });
});

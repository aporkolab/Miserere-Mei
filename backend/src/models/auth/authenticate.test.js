const authenticate = require('./authenticate');

describe('JWT authentication', () => {
  const response = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  test('rejects malformed authorization headers', async () => {
    const res = response();
    await authenticate({ headers: { authorization: 'Basic abc' } }, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('accepts valid bearer tokens', async () => {
    const { SignJWT } = await import('jose');
    const token = await new SignJWT({ id: 1 })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuer('miserere-api')
      .setAudience('miserere-web')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    const req = { headers: { authorization: `Bearer ${token}` } };
    const next = jest.fn();
    await authenticate(req, response(), next);
    expect(req.user.id).toBe(1);
    expect(next).toHaveBeenCalledWith();
  });

  test('passes missing server configuration to error handling', async () => {
    delete process.env.JWT_SECRET;
    const next = jest.fn();
    await authenticate({ headers: { authorization: 'Bearer token' } }, response(), next);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'JWT_SECRET is not configured' })
    );
  });
});

const authorize = require('./authorize');

describe('role authorization', () => {
  const response = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  test('allows users who meet the required role', () => {
    const next = jest.fn();
    authorize(3)({ user: { role: 3 } }, response(), next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test.each([undefined, 1, 'invalid'])('rejects insufficient or invalid roles: %s', role => {
    const res = response();
    const next = jest.fn();
    authorize(3)({ user: { role } }, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});

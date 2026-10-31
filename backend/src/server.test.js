process.env.DB_DIALECT = 'sqlite';
process.env.DB_STORAGE = ':memory:';
process.env.JWT_SECRET = 'integration-test-secret-with-enough-length';
process.env.CORS_ORIGIN = 'http://allowed.example';
process.env.ADMIN_EMAIL = 'Admin@Example.com';
process.env.ADMIN_PASSWORD = 'admin-password-123';
process.env.LOG_LEVEL = 'error';

const request = require('supertest');
const app = require('./server');
const { sequelize, User, Place } = require('./models');
const migrate = require('./database/migrate');
const seedDatabase = require('./seed/seeder');

const login = async (email = 'admin@example.com', password = 'admin-password-123') => {
  const agent = request.agent(app);
  const response = await agent.post('/login').send({ email, password });
  return { agent, response };
};

// The login endpoint is rate limited (10 attempts / 15 min), so most tests authenticate with a
// directly signed token and only the authentication tests go through POST /login.
const bearer = async user => {
  const { SignJWT } = await import('jose');
  const token = await new SignJWT({ id: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('miserere-api')
    .setAudience('miserere-web')
    .setExpirationTime('5m')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `Bearer ${token}`;
};

const as = async (email = 'admin@example.com') => {
  const user = await User.findOne({ where: { email } });
  const authorization = await bearer(user);
  const client = request(app);
  return {
    get: url => client.get(url).set('Authorization', authorization),
    post: url => client.post(url).set('Authorization', authorization),
    put: url => client.put(url).set('Authorization', authorization),
    patch: url => client.patch(url).set('Authorization', authorization),
    delete: url => client.delete(url).set('Authorization', authorization),
  };
};

beforeAll(async () => {
  await migrate();
  await seedDatabase();
});

afterAll(async () => {
  await sequelize.close();
});

describe('health and infrastructure endpoints', () => {
  test('reports health and readiness when the database is reachable', async () => {
    await request(app).get('/health').expect(200, { status: 'ok' });
    await request(app).get('/ready').expect(200, { status: 'ready' });
  });

  test('exposes prometheus metrics', async () => {
    const response = await request(app).get('/metrics').expect(200);
    expect(response.text).toContain('http_request_duration_seconds');
  });

  test('returns a JSON 404 for unknown routes', async () => {
    const response = await request(app).get('/does-not-exist').expect(404);
    expect(response.body).toEqual({ hasError: true, message: 'Not found' });
  });

  test('sets security headers and hides the framework', async () => {
    const response = await request(app).get('/health');
    expect(response.headers['x-powered-by']).toBeUndefined();
    expect(response.headers['x-content-type-options']).toBe('nosniff');
  });
});

describe('error handling', () => {
  test('reports 503 without internals when the database is unreachable', async () => {
    jest.spyOn(sequelize, 'authenticate').mockRejectedValueOnce(new Error('ECONNREFUSED db:3306'));
    const response = await request(app).get('/ready').expect(503);
    expect(response.body).toEqual({ hasError: true, message: 'Internal server error' });
  });

  test('rejects malformed JSON bodies with 400', async () => {
    const response = await request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send('{"email":')
      .expect(400);
    expect(response.body.hasError).toBe(true);
  });

  test('hides database failures behind a generic 500', async () => {
    jest.spyOn(Place, 'findOne').mockRejectedValueOnce(new Error('SQLITE_BUSY secret detail'));
    const response = await request(app).get('/place/GameBeginning').expect(500);
    expect(response.body).toEqual({ hasError: true, message: 'Internal server error' });
  });

  test('answers the root route even without a bundled frontend', async () => {
    const response = await request(app).get('/').expect(200);
    expect(response.text).toContain('Miserere Mei backend is working.');
  });
});

describe('CORS', () => {
  test('allows configured origins', async () => {
    const response = await request(app).get('/health').set('Origin', 'http://allowed.example');
    expect(response.headers['access-control-allow-origin']).toBe('http://allowed.example');
  });

  test('rejects unknown origins without leaking internals', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://evil.example')
      .expect(403);
    expect(response.body).toEqual({ hasError: true, message: 'Not allowed by CORS' });
  });
});

describe('public story endpoints', () => {
  test('finds a place by its location name', async () => {
    const response = await request(app).get('/place/GameBeginning').expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({ location: 'GameBeginning', furtherLocation1: 'spendTime' })
    );
  });

  test('returns 404 for unknown locations', async () => {
    await request(app).get('/place/NoSuchPlace').expect(404);
  });

  test('finds a place by id and validates the id', async () => {
    const response = await request(app).get('/place/select/1').expect(200);
    expect(response.body.id).toBe(1);
    await request(app).get('/place/select/abc').expect(400);
    await request(app).get('/place/select/999999').expect(404);
  });
});

describe('authentication', () => {
  test('rejects missing credentials', async () => {
    await request(app).post('/login').send({ email: 'admin@example.com' }).expect(400);
  });

  test('rejects wrong passwords and unknown users with the same message', async () => {
    const wrong = await request(app)
      .post('/login')
      .send({ email: 'admin@example.com', password: 'nope-nope' })
      .expect(401);
    const unknown = await request(app)
      .post('/login')
      .send({ email: 'ghost@example.com', password: 'nope-nope' })
      .expect(401);
    expect(wrong.body).toEqual(unknown.body);
  });

  test('issues an HttpOnly session cookie and never returns the password', async () => {
    const { response } = await login('  ADMIN@example.com ');
    expect(response.status).toBe(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({ email: 'admin@example.com', role: 3 })
    );
    expect(response.body.user.password).toBeUndefined();
    const cookie = response.headers['set-cookie'].join(';');
    expect(cookie).toContain('miserere_session=');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('SameSite=Strict');
  });

  test('restores and ends the session', async () => {
    const { agent } = await login();
    const session = await agent.get('/login/session').expect(200);
    expect(session.body.user.email).toBe('admin@example.com');
    expect(session.body.user.password).toBeUndefined();

    const logout = await agent.post('/login/logout').expect(204);
    expect(logout.headers['set-cookie'].join(';')).toMatch(/miserere_session=;/);
  });

  test('requires a token for protected routes', async () => {
    await request(app).get('/users').expect(401);
    await request(app).get('/allplace').expect(401);
    await request(app).get('/player').expect(401);
  });
});

describe('admin user management', () => {
  test('forbids non-admin users', async () => {
    await User.create({
      email: 'player@example.com',
      password: 'player-password-1',
      firstName: 'Plain',
      lastName: 'Player',
      role: 1,
    });
    const agent = await as('player@example.com');
    await agent.get('/users').expect(403);
    await agent.get('/allplace').expect(403);
  });

  test('creates, updates and deletes users without exposing password hashes', async () => {
    const agent = await as();

    const created = await agent
      .post('/users')
      .send({
        email: ' New.User@Example.com ',
        password: 'initial-password',
        firstName: 'New',
        lastName: 'User',
        role: 2,
      })
      .expect(201);
    expect(created.body.email).toBe('new.user@example.com');
    expect(created.body.password).toBeUndefined();

    const updated = await agent
      .put(`/users/select/${created.body.id}`)
      .send({ password: 'changed-password', firstName: 'Renamed' })
      .expect(200);
    expect(updated.body.firstName).toBe('Renamed');
    expect(updated.body.password).toBeUndefined();

    const relogin = await login('new.user@example.com', 'changed-password');
    expect(relogin.response.status).toBe(200);

    await agent.delete(`/users/${created.body.id}`).expect(204);
    await agent.delete(`/users/${created.body.id}`).expect(404);
  });

  test('maps validation and uniqueness failures to client errors', async () => {
    const agent = await as();
    await agent
      .post('/users')
      .send({ email: 'bad', password: 'x', firstName: 'A', lastName: 'B', role: 9 })
      .expect(400);
    await agent
      .post('/users')
      .send({
        email: 'admin@example.com',
        password: 'another-password',
        firstName: 'Dup',
        lastName: 'Licate',
        role: 1,
      })
      .expect(409);
    await agent.patch('/users/select/1').send({ role: 42 }).expect(400);
  });

  test('filters lists only by allowlisted fields', async () => {
    const agent = await as();
    const response = await agent.get('/users').query({ email: 'admin', password: 'x' }).expect(200);
    expect(response.body.map(user => user.email)).toEqual(['admin@example.com']);
  });

  test('rejects state-changing cookie requests from foreign origins', async () => {
    const { agent } = await login();
    await agent
      .post('/users')
      .set('Origin', 'http://evil.example')
      .send({ email: 'x@example.com' })
      .expect(403);
  });
});

describe('admin place and player management', () => {
  test('lists, searches and edits places', async () => {
    const agent = await as();
    const all = await agent.get('/allplace').expect(200);
    expect(all.body.length).toBeGreaterThan(10);

    const search = await agent.get('/allplace').query({ location: 'GameBeginning' }).expect(200);
    expect(search.body.every(place => place.location.includes('GameBeginning'))).toBe(true);

    const created = await agent
      .post('/allplace')
      .send({
        location: 'TestPlace',
        narrationZoneText: 'A test narration.',
        decision1: 'Go back',
        furtherLocation1: 'GameBeginning',
        id: 1,
      })
      .expect(201);
    expect(created.body.id).not.toBe(1);

    await agent
      .patch(`/allplace/select/${created.body.id}`)
      .send({ objectFound: 'Lamp' })
      .expect(200);
    const fetched = await agent.get(`/allplace/select/${created.body.id}`).expect(200);
    expect(fetched.body.objectFound).toBe('Lamp');

    await agent.delete(`/allplace/${created.body.id}`).expect(204);
  });

  test('reads and updates player state', async () => {
    const agent = await as();
    const players = await agent.get('/player').expect(200);
    const [player] = players.body;
    expect(player.currentWeaponName).toBe('Beretta 92FS');

    await agent.get(`/player/${player.id}`).expect(200);
    const updated = await agent
      .put(`/player/select/${player.id}`)
      .send({ playerAmmo: 3 })
      .expect(200);
    expect(updated.body.playerAmmo).toBe(3);
  });
});

describe('login rate limiting', () => {
  test('throttles repeated login attempts', async () => {
    let status;
    for (let attempt = 0; attempt < 12 && status !== 429; attempt += 1) {
      ({ status } = await request(app)
        .post('/login')
        .send({ email: 'admin@example.com', password: 'wrong-password' }));
    }
    expect(status).toBe(429);
  });
});

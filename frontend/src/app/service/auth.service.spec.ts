import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { testProviders } from '../../testing/test-providers';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let router: Router;
  const notifications = { showSuccess: vi.fn(), showError: vi.fn() };
  const admin = { id: 1, email: 'admin@example.com', firstName: 'A', lastName: 'B', role: 3 };

  beforeEach(() => {
    notifications.showSuccess.mockReset();
    notifications.showError.mockReset();
    TestBed.configureTestingModule({
      providers: [...testProviders, { provide: NotificationService, useValue: notifications }],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  afterEach(() => http.verify());

  it('restores an existing cookie session on startup', () => {
    http.expectOne(req => req.url.endsWith('/login/session')).flush({ user: admin });
    expect(service.isAuthenticated).toBe(true);
    expect(service.currentUser).toEqual(admin);
  });

  it('marks itself ready even when there is no session', () => {
    let ready = false;
    service.ready$.subscribe(value => (ready = value));
    http
      .expectOne(req => req.url.endsWith('/login/session'))
      .flush(null, { status: 401, statusText: 'Unauthorized' });
    expect(ready).toBe(true);
    expect(service.isAuthenticated).toBe(false);
  });

  it('logs in, stores the user and navigates home', () => {
    http
      .expectOne(req => req.url.endsWith('/login/session'))
      .flush(null, { status: 401, statusText: '' });

    service.login({ email: 'admin@example.com', password: 'secret-password' });
    const request = http.expectOne(req => req.method === 'POST' && req.url.endsWith('/login'));
    expect(request.request.withCredentials).toBe(true);
    request.flush({ user: admin });

    expect(service.currentUser).toEqual(admin);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('shows a credential error on 401', () => {
    http
      .expectOne(req => req.url.endsWith('/login/session'))
      .flush(null, { status: 401, statusText: '' });

    service.login({ email: 'admin@example.com', password: 'wrong' });
    http
      .expectOne(req => req.method === 'POST')
      .flush({ error: 'Invalid' }, { status: 401, statusText: 'Unauthorized' });

    expect(service.isAuthenticated).toBe(false);
    expect(notifications.showError).toHaveBeenCalledWith(
      'Hibás e-mail-cím vagy jelszó.',
      'Miserere Mei'
    );
  });

  it('clears the session on logout', () => {
    http.expectOne(req => req.url.endsWith('/login/session')).flush({ user: admin });

    service.logout();

    expect(service.isAuthenticated).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    http.expectOne(req => req.url.endsWith('/login/logout')).flush(null);
  });
});

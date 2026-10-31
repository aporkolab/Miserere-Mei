import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { testProviders } from '../../testing/test-providers';
import { PlaceService } from './place.service';
import { UserService } from './user.service';

describe('BaseService (via concrete entity services)', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('uses the entity name of the subclass in every URL', () => {
    const users = TestBed.inject(UserService);
    users.getAll().subscribe();
    users.getOne(4).subscribe();
    users.delete({ id: 4 } as never).subscribe();

    http.expectOne(req => req.method === 'GET' && req.url.endsWith('/users')).flush([]);
    http.expectOne(req => req.url.endsWith('/users/select/4')).flush({});
    http.expectOne(req => req.method === 'DELETE' && req.url.endsWith('/users/4')).flush(null);
  });

  it('never sends a client-chosen id on create', () => {
    TestBed.inject(UserService)
      .create({ id: 99, email: 'x@example.com' } as never)
      .subscribe();
    const request = http.expectOne(req => req.method === 'POST');
    expect(request.request.body).toEqual({ email: 'x@example.com' });
    request.flush({});
  });

  it('url-encodes location names', () => {
    TestBed.inject(PlaceService).getOnePlace('a/b c').subscribe();
    http.expectOne(req => req.url.endsWith('/place/a%2Fb%20c')).flush({});
  });

  it('patches updates to the select endpoint', () => {
    TestBed.inject(UserService)
      .update({ id: 2, firstName: 'N' } as never)
      .subscribe();
    const request = http.expectOne(req => req.method === 'PATCH');
    expect(request.request.url).toMatch(/\/users\/select\/2$/);
    request.flush({});
  });
});

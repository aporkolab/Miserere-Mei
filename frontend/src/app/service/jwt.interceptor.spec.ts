import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { credentialsInterceptor } from './jwt.interceptor';

describe('credentialsInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([credentialsInterceptor])),
        provideHttpClientTesting(),
      ],
    })
  );

  it('sends cookies with every request', () => {
    TestBed.inject(HttpClient).get('/api/test').subscribe();
    const request = TestBed.inject(HttpTestingController).expectOne('/api/test');
    expect(request.request.withCredentials).toBe(true);
    request.flush({});
  });
});

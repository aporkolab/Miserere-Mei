import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { testProviders } from '../../testing/test-providers';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RoleGuardService } from './role-guard.service';

describe('route guards', () => {
  const ready$ = new BehaviorSubject(true);
  const auth = { ready$, isAuthenticated: false, currentUser: null as { role: number } | null };
  const route = (expectedRole: number) =>
    ({ data: { expectedRole } }) as unknown as ActivatedRouteSnapshot;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...testProviders, { provide: AuthService, useValue: auth }],
    });
    router = TestBed.inject(Router);
  });

  it('redirects anonymous users to the login page with a return URL', async () => {
    auth.isAuthenticated = false;
    const result = await firstValueFrom(
      TestBed.inject(AuthGuardService).canActivate(route(3), {
        url: '/users',
      } as RouterStateSnapshot)
    );
    expect(router.serializeUrl(result as UrlTree)).toBe('/login?returnUrl=%2Fusers');
  });

  it('lets authenticated users through the auth guard', async () => {
    auth.isAuthenticated = true;
    const result = await firstValueFrom(
      TestBed.inject(AuthGuardService).canActivate(route(3), {
        url: '/users',
      } as RouterStateSnapshot)
    );
    expect(result).toBe(true);
  });

  it('sends users without the required role to /forbidden', async () => {
    auth.currentUser = { role: 1 };
    const result = await firstValueFrom(TestBed.inject(RoleGuardService).canActivate(route(3)));
    expect(router.serializeUrl(result as UrlTree)).toBe('/forbidden');
  });

  it('allows admins', async () => {
    auth.currentUser = { role: 3 };
    expect(await firstValueFrom(TestBed.inject(RoleGuardService).canActivate(route(3)))).toBe(true);
  });
});

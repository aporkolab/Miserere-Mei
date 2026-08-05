import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.auth.ready$.pipe(
      filter(Boolean),
      take(1),
      map(() => {
        const expectedRole = route.data['expectedRole'];
        const userRole = this.auth.currentUser?.role || 1;
        return userRole >= expectedRole ? true : this.router.createUrlTree(['/forbidden']);
      })
    );
  }
}

import { AuthService } from 'src/app/service/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.auth.ready$.pipe(
      filter(Boolean),
      take(1),
      map(() =>
        this.auth.isAuthenticated
          ? true
          : this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
      )
    );
  }
}

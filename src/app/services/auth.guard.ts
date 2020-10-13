import { Observable } from 'rxjs';
import { AuthStore } from './auth.store';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthStore, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  private checkIfAuthenticated() {
    return this.auth.isLoggedIn$.pipe(
      map((loggedIn) => (loggedIn ? true : this.router.parseUrl('login')))
    );
  }
}

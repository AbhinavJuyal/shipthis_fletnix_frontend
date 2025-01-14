import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { isTokenExpired } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    const isAuthenticated = this.checkAuthentication();
    if (isAuthenticated) return true;
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  checkAuthentication() {
    const token = this.localStorageService.getItem('accessToken');

    if (isTokenExpired(this.localStorageService)) return false;

    return !!token;
  }
}

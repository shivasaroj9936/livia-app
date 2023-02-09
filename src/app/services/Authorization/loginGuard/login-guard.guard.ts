import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private _router: Router) { }

  canActivate(): boolean | UrlTree {
    let isAuth = localStorage.getItem('isAuth');
    if (isAuth) {
      const tree: UrlTree = this._router.parseUrl('dashboard');
      return tree;
    } else {
      return true;
    }
  }
}

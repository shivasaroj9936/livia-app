import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuardGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(): Observable<any> | Promise<any> | any {
    let isAuth = localStorage.getItem('isAuth');
    console.log(isAuth, 'jijijji', isAuth != 'under-validation');
    if (isAuth != 'under-validation') {
      console.log(isAuth, 'Auth');
      return new Observable((observer) => {
        observer.next(true);
      });
    } else {
      console.log('noooooooooo');
      localStorage.clear();
      const tree: UrlTree = this._router.parseUrl('log-in');
      return tree;
    }
  }
}

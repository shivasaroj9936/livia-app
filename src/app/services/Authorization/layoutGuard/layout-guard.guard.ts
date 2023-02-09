import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutGuardGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(): Observable<any> | Promise<any> | any {
    let isAuth = localStorage.getItem('isAuth');
    if (isAuth) {
      // if (isAuth == 'under-validation') {
      //   console.log(isAuth,"Auth guardddddd");
      //   const tree: UrlTree = this._router.parseUrl('dashboard/validate');
      //   return tree;
      // } else {
      console.log(isAuth, 'Auth');
      return new Observable((observer) => {
        observer.next(true);
      });
      // }
    } else {
      const tree: UrlTree = this._router.parseUrl('login');
      return tree;
    }
  }
}

import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { Constant } from "src/app/constant/constant";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private http: HttpClient) {}
  // intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
  //     const modifiedReq = req.clone({
  //     headers: req.headers
  //       .set("liviaapp-token", `${localStorage.getItem("access_token")}`)
  //       .set("liviaapp-apiversion", "2.0"),
  //   });

  //   return next.handle(modifiedReq).pipe(
  //     catchError((error: any) => {
  //       console.log(error);
  //       return Observable.throw(error.statusText);
  //     })
  //   );
  // }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      headers: req.headers
        .set("liviaapp-token", `${localStorage.getItem("access_token")}`)
        .set("liviaapp-apiversion", "2.0"),
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          if (error.message == "unauthorization") {
            let payload = {
              access_token: localStorage.getItem("access_token"),
              refresh_token: localStorage.getItem("refresh_token"),
            };
            return this.http.post(Constant.labRequestUrl, payload).pipe(
              mergeMap((res: any) => {
                if (res.status == 200) {
                  localStorage.setItem("refresh_token", res.refresh_token);
                  localStorage.setItem("access_token", res.accesss_token);
                  req = req.clone({
                    headers: req.headers
                      .set(
                        "liviaapp-token",
                        `${localStorage.getItem("access_token")}`
                      )
                      .set("liviaapp-apiversion", "2.0"),
                  });
                  return next.handle(req).pipe(
                    catchError((err) => {
                      console.log(err);
                      return Observable.throw(error);
                    })
                  );
                } else {
                }
                return Observable.throw(error);
              })
            );
          } else {
          }
        } else {
          //logout
        }
        console.log(error);
        return Observable.throw(error.statusText);
      })
    );
  }
}

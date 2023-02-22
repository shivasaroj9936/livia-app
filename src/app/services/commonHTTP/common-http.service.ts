import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonHTTPService {
  constructor(public http: HttpClient) {}
  
  post(apiRoute:any,body:any) {
    return this.http.post(`${apiRoute}`,body)
  }

  get(apiRoute:any) {
    return this.http.get(`${apiRoute}`)
  }
//////////////////////////Get request with query params///////////////////////////
  getParam(apiRoute:any,data:any) {
    return this.http.get(`${apiRoute}`,{params:data})
  }

  put(apiRoute:any,body:any):Observable<any> {
    return this.http.put(apiRoute, body) as Observable<any>;
  }

  delete(apiRoute:any):Observable<any> {
    return this.http.delete(apiRoute);
  }

  patch(apiRoute:any,body:any):Observable<any> {
    return this.http.patch(apiRoute, body);
  }
}

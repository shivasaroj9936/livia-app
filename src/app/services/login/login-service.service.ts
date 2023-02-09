import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/constant/constant';

@Injectable()
export class LoginServiceService {
  userDetail: any;
  
  constructor(private http: HttpClient) { }

  // putReq(data: any): Observable<any> {
  //   let head = new HttpHeaders({ 'liviaapp-apiversion': '2.0' });
  //   console.log(data,"Login data of User in service!");
  //   return this.http.put(Constant.loginUrl, data,{headers:head});
  // }

  setUserData(data: any) {
    this.userDetail = data;
  }

  getUserData() {
    return this.userDetail;
  }

}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/constant/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupServiceService {
  constructor(public http: HttpClient) {}
  userInfo: any;
  user_id: any;
  //signup api
  signUp(data: any): Observable<any> {
    console.log(data, 'signup services');
    return this.http.post(Constant.signUrl, data);
  }

  //patch data api
  patchData(data: any): Observable<any>{
    // let param_data = new HttpParams().set('access_token', data.access_token).set('os_type', data.os_type).set('phone_id', data.phone_id);
    console.log(data,"query data from servicee");
    return this.http.patch(Constant.signUrl,data);
  }

  //step 1
  registrationStep1(data: any): Observable<any> {
    console.log(`${environment._url}/lab-signup?id=1`,data,'registrationStep1');
    return this.http.put(`${Constant.signUrl}?id=${this.user_id}`, data);
  }

  //cities
  selectCities(): Observable<any> {
    let head=new HttpHeaders({'liviaapp-token':`${localStorage.getItem('access_token')}`})
    return this.http.get(`${environment._url}/city?country_code=ke`,{headers:head});
  }

  //step2
  registrationStep2(data: any) {
    console.log(data, 'Document http request');
    return this.http.put(`${Constant.signUrl}?id=${this.user_id}`, data);
  }

  //step2
  registrationStep3(data: any) {
    console.log(data, 'Lab Photo http request final data');
    return this.http.put(`${Constant.signUrl}?id=${this.user_id}`, data);
  }

  //set data of user
  setUserData(userData: any) {
    console.log(userData,"User data from service!!");
    this.userInfo = userData;
    this.user_id = userData.id;
  }
}

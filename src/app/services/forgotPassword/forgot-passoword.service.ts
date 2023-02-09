import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassowordService {

  constructor(private http: HttpClient) { }
  sendEmail(data:any):Observable<any> {
    return this.http.post(Constant.forgotPasswordUrl, data);
  }
  verifyToken(data: any):Observable<any>  {
    return this.http.patch(`${Constant.forgotPasswordUrl}?verify_token=1`,data)
  }
  resetPassword(data:any):Observable<any> {
    return this.http.patch(Constant.forgotPasswordUrl,data)
  }
  getUserData(data:any) {
    
  }
}

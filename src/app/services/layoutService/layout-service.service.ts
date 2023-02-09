import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/constant/constant';

@Injectable()
export class LayoutServiceService {
  profileData: any;
  constructor(private http: HttpClient, private route: Router) { }
  
  // head = new HttpHeaders({ 'liviaapp-token': `${localStorage.getItem('access_token')}` });

  //******************************* Common Request ************************************/
  getInsuranceList(): Observable<any> {
    return this.http.get(Constant.insuranceListUrl);
  }

  getUserBalance(id:any): Observable<any> {
    return this.http.get(`${Constant.userCurrentBalance}/${id}`);
  }

  //******************************* Lab Request ************************************/
  getLabReq(queryObj: any): Observable<any> {
    // console.log(queryObj,"serviceeeee! verifyyyyyyyyyyyyyyyy",this.head,localStorage.getItem('access_token'));
    return this.http.get(Constant.labRequestUrl, {params:queryObj});
  }

  sendOtp(queryObj: any, claimId: any): Observable<any> {
    return this.http.put(`${Constant.labRequestUrl}/${claimId}`,queryObj);
  }

  verifyOtp(queryObj: any, claimId: any): Observable<any> {
    return this.http.patch(`${Constant.labRequestUrl}/${claimId}`,queryObj);
  }

  deleteLabReq(id: number) {
    return this.http.delete(`${Constant.labRequestUrl}/${id}`);
  }

  //******************************* Lab Report ************************************/

  getLabReport(queryObj: any): Observable<any> {
    // console.log(queryObj,"serviceeeee!",head,localStorage.getItem('access_token'));
    return this.http.get(Constant.labReportUrl, {params:queryObj});
  }

  getReportDetail(claimId:any): Observable<any> {
    // console.log(queryObj,"serviceeeee!",head,localStorage.getItem('access_token'));
    return this.http.get(`${Constant.labReportUrl}/${claimId}`);
  }

  sendReportDetail(requestId:any,payLoad:any): Observable<any> {
    // console.log(queryObj,"serviceeeee!",head,localStorage.getItem('access_token'));
    return this.http.put(`${Constant.labReportUrl}/${requestId}`,payLoad);
  }

  setUserEmail(payLoad:any): Observable<any> {
    // console.log(queryObj,"serviceeeee!",head,localStorage.getItem('access_token'));
    return this.http.post(Constant.labReportUrl,payLoad);
  }
  

  //******************************* E-Claims ************************************/
  getEclaims(queryObj: any): Observable<any> {
    // console.log(queryObj,"serviceeeee!",head,localStorage.getItem('access_token'));
    return this.http.get(Constant.eClaimUrl, {params:queryObj});
  }

 //******************************* Lab Test ************************************/
  getLabTest(queryObj: any): Observable<any> {
    return this.http.get(Constant.labTestUrl, {params:queryObj});
  }

  //******************************* Payment  ************************************/
  getPaymentData(queryObj: any): Observable<any> {
    return this.http.get(Constant.paymentUrl, {params:queryObj});
  }

  initiatePayment(claimId: any): Observable<any> {
    return this.http.patch(Constant.paymentUrl,claimId);
  }
  
  //******************************* Profile Detail  ************************************/
  getProfileData(): Observable<any> {
    // console.log(queryObj,"serviceeeee!",head,localStorage.getItem('access_token'));
    return this.http.get(Constant.profileDetailUrl);
  }

}
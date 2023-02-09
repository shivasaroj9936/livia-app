import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private _snackBar: MatSnackBar) { }
  stDate: any;
  enDate: any;
  spinner = false;
  claimId: any;
  paymentIds: any;
  
  registerSnackBar(message: any, action: string, theme: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [theme],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  authSnackBar(message: any, action: string, theme: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: [theme],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
  hashValue() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
    const lengthOfCode = 40;
    return  this.makeRandom(lengthOfCode, possible);
  }

  setDate(date:any) {
    date= JSON.stringify(date);
    date = date.substring(1, 11);
    return date;
  }

  setCliamId(data: any) {
    this.claimId = data;
  }
  getCliamId() {
      return this.claimId;
  }
/////////////////////////////////For Payment Section/////////////////////////////////////////////////////
  setPaymentId(data: any) {
    this.paymentIds = data;
  }
  getPaymentId() {
      return this.paymentIds;
  }
}
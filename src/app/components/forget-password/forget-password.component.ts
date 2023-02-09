import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constant } from 'src/app/constant/constant';
import { DialogData } from 'src/app/Modules/account/registration/add-profile/add-profile.component';
import { LoginComponent } from 'src/app/Modules/account/verification/login/login.component';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { ForgotPassowordService } from 'src/app/services/forgotPassword/forgot-passoword.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  email=new FormControl('',[Validators.email])
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private forgotService: ForgotPassowordService,
    private _snackBar: MatSnackBar,
    private httpService:CommonHTTPService
  ) {}
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBar(message:any,action:string,theme:string) {
    this._snackBar.open(message,action, {
      duration: 4000,
      panelClass: [theme],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  submit(form: any) {
    const formValue = {
      email:form.value.email,
      server_path: location.origin + '/',
    }
    this.httpService.post(Constant.forgotPasswordUrl,formValue).subscribe((res:any) => {
      console.log(res, "response from forgot component.....");
      if (res.code == 200) {
        this.openSnackBar(res.messages, 'Close', 'success-snackbar');
      } else {
        this.openSnackBar(res.messages, 'Close', 'red-snackbar');
      }
    }, err => {
      console.log(err, "err from forget component!");
      this.openSnackBar(err.error.messages, 'Close', 'red-snackbar');
    })
    console.log(formValue,'hiiiiiiiii from forget component!!');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { ForgotPassowordService } from 'src/app/services/forgotPassword/forgot-passoword.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  userData = { token: '', email: '' };
  resetForm!: FormGroup;
  showErr = false;
  showPassword = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private forgotService: ForgotPassowordService,
    private nav: Router,
    private _snackBar: MatSnackBar,
    private httpService:CommonHTTPService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.createForm();
  }
  createForm() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required]],
      cnfPassword: ['', [Validators.required]],
    });
  }
  openSnackBar(message: any, action: string, theme: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: [theme],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  getData() {
    this.route.params.subscribe((event) => {
      this.userData.email = event.email;
      this.userData.token = event.token;
    });
    this.httpService.patch(`${Constant.forgotPasswordUrl}?verify_token=1`,this.userData).subscribe(
      (res) => {
        console.log(res, 'verify token response');
        if (res.code == 200 && res.status == 1) {
          console.log('sucess verify');
        } else {
          this.openSnackBar(res.messages, 'Close', 'red-snackbar');
          this.nav.navigate(['/log-in']);
        }
      },
      (err) => {
        this.openSnackBar(err.error.messages, 'Close', 'red-snackbar');
        console.log(err, 'Error from verify token!');
        this.nav.navigate(['/log-in']);
      }
    );
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.resetForm.valid && this.resetForm.controls.password.value == this.resetForm.controls.cnfPassword.value) {
      this.showErr = false;
      const formValue = {
        token: this.userData.token,
        email: this.userData.email,
        password: this.resetForm.controls.password.value,
      };
      console.log(formValue,"kkkkkkkkkkk",this.resetForm.controls.password.value);
      this.httpService.patch(Constant.forgotPasswordUrl,formValue).subscribe(res => {
        console.log(res, "Response from reset password");
        if (res.code == 200) {
          this.openSnackBar(res.messages, 'Close', 'success-snackbar');
          this.nav.navigate(['/log-in']);
        } else {
          this.openSnackBar(res.messages, 'Close', 'red-snackbar');
        }
      }, err => {
        console.log(err, 'error from reset module!');
        this.openSnackBar(err.error.messages, 'Close', 'red-snackbar');
      })
    } else {
      console.log('sssssss');
      this.showErr = true;
    }
  }
}

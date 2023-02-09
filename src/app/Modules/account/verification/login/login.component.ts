import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgetPasswordComponent } from 'src/app/components/forget-password/forget-password.component';
import { Constant } from 'src/app/constant/constant';
import { loginValidation } from 'src/app/constant/validationError';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { LoginServiceService } from 'src/app/services/login/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validationMessage: any;
  loginForm!: FormGroup;
  showPassword = false;
  spinner = false;
  validators = loginValidation;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private logService: LoginServiceService,
    public dialog: MatDialog,
    private commonService: CommonServiceService,
    private httpService:CommonHTTPService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.validationMessage = loginValidation;
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  openDialog() {
    const dialogRef = this.dialog.open(ForgetPasswordComponent,
      {
        width: '550px',
        height: '300px',
      });
    dialogRef.afterClosed();
  }
 
  onSubmit() {
    const formValue = this.loginForm.value;
    formValue['phone_id'] = btoa(this.loginForm.controls.email.value + this.commonService.hashValue());
    formValue['os_type'] = 3;
    formValue['liviaapp-apiversion'] = 2.0;
    if (this.loginForm.valid) {
      this.spinner = true;
      this.httpService.put(Constant.loginUrl,formValue).subscribe((res) => {
        if (res.user_status == '1' || res.user_status == '6') {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
            if (res.user.status_name=='In registration process') {
              this.commonService.authSnackBar(res.user.status_name, 'Close', 'red-snackbar');
              this.spinner = false; 
            } else {
              this.logService.setUserData(res.user);
              localStorage.setItem('isAuth', res.user.user_id);
              localStorage.setItem('phone_id', formValue['phone_id']);
              this.router.navigate(['/dashboard']);
              this.spinner = false; 
            }
          } else {
            this.commonService.authSnackBar(res.message, 'Close', 'red-snackbar');
            this.spinner = false;
          }
        },
        (err) => {
          this.commonService.authSnackBar(err.error.messages[0],'Close','red-snackbar');
          console.log(err.error.messages[0], 'errr in login page!');
          this.spinner = false;
        }
      );
    }
  }
}
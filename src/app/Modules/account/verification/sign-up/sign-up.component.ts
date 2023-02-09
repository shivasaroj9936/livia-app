import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupConfirmationComponent } from 'src/app/components/signup-confirmation/signup-confirmation.component';
import { Constant } from 'src/app/constant/constant';
import { signUpValidation } from 'src/app/constant/validationError';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { SignupServiceService } from 'src/app/services/signup/signup-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  showPassword = false;
  signForm!: FormGroup;
  spinner = false;
  validationMessage: any;
  constructor(private fb: FormBuilder, private _router: Router,public signupService:SignupServiceService,public dialog: MatDialog,private commonService:CommonServiceService,private httpService:CommonHTTPService) { }

  ngOnInit(): void {
    this.createForm();
    this.validationMessage = signUpValidation;
  }
  createForm() {
    this.signForm = this.fb.group({
      name_prefix: ['', [Validators.required]],
      first_name: ['',[Validators.required,Validators.minLength(3),this.noWhitespaceValidator,]],
      last_name: ['',[Validators.required,Validators.minLength(3),this.noWhitespaceValidator,]],
      country_code: ['', [Validators.required]],
      phone_number: ['',[Validators.required, Validators.pattern(/^[7][9][0-9]{7}$/)]],
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),this.noWhitespaceValidator,]],
      password: ['',[Validators.required,Validators.minLength(5),Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'),this.noWhitespaceValidator]],
    });
  }
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  openDialog() {
    const dialogRef = this.dialog.open(SignupConfirmationComponent,
      {
        restoreFocus: false,
        width: '550px',
        height: '200px'
      });
    dialogRef.afterClosed().subscribe(() => this._router.navigate(['/log-in']));
  }

  onSubmit() {
    const formValue = this.signForm.value;
    formValue['phone_code'] = 254;
    formValue['phone_id'] = btoa(this.signForm.get('phone_number')?.value);
    formValue['os_type'] = 3;
    formValue['server_path'] = location.origin+'/';
    localStorage.setItem('phone_id', formValue.phone_id);
    if (this.signForm.valid) {
      this.spinner = true;
      this.httpService.post(Constant.signUrl,formValue).subscribe((res:any) => {
        console.log(res, 'signup response page!');
        if (res.code == 200) {
          this.openDialog();
          this.spinner = false;
        } else {
          this.commonService.authSnackBar(res.message, 'Close', 'red-snackbar');
          this.spinner = false;
        }
      }, err => {
        this.commonService.authSnackBar(err.error.messages[0],'Close','red-snackbar');
        console.log(err,"signup page api error!");
        console.log(err.error.messages, "signup page api error!");
        this.spinner = false;
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant/constant';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { RegisterFormService } from 'src/app/services/registerForm/register-form.service';
import { SignupServiceService } from 'src/app/services/signup/signup-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  selectedIndex: number = 0;
  isShow = false;
  constructor(
    private registerService: RegisterFormService,
    private route: ActivatedRoute,
    public signupService: SignupServiceService,
    private nav: Router,
    private commonHttp:CommonHTTPService
  ) {}

  ngOnInit(): void {
    this.patchDataApiCall();
    this.registerService.createForm();
  }

  setIndex(event: any) {
    this.selectedIndex = event.selectedIndex;
  }

  triggerClick(event: any) {
    console.log(`Selected tab index: ${this.selectedIndex}`);
    if (this.selectedIndex!=0) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  onClick(stepper: MatStepper) {
    if (this.selectedIndex!=0) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    stepper.previous();
  }
  
  patchDataApiCall() {
    let token;
    this.route.params.subscribe((event) => {
      token = event.data;
      console.log(token, 'query data');
    });
    let phoneId = localStorage.getItem('phone_id');
    const paramData = {
      access_token: token,
      os_type: 3,
      phone_id: phoneId,
    };
    this.commonHttp.patch(Constant.signUrl,paramData).subscribe(
      (res) => {
        console.log(res, 'response from api data!');
        if (res.user_status == '1' || res.user_status == '6') {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          this.signupService.setUserData(res.user);
        } else {
          // this.nav.navigate(['/log-in'])
        }
      },
      (err) => {
        console.log(err, 'error from patch api');
        // this.nav.navigate(['/log-in'])
      }
    );
  }
}

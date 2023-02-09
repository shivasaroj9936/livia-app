import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  href: any;
  constructor(private _router:Router) { }
  regImg = false;
  changeOfRoutes() {
    if (!((location.origin + this._router.url) == 'http://localhost:4200/log-in' || (location.origin + this._router.url) == 'http://localhost:4200/sign-up')) {
      this.regImg = false;
    } else {
      this.regImg = true;
    }
  }
  ngOnInit(): void {
    this.href = this._router.url;
  }
  navigateToLogin() {
    this._router.navigate(['/log-in'])
  }
  navigateToSign() {
    this._router.navigate(['account/sign-up'])
  }
  onSubmit() {
    this.href = this._router.url;
    console.log(this.href,"url");
    this._router.navigate(['account/register'])
  }
}

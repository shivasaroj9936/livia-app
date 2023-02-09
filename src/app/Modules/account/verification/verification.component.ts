import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  showNav = true;
  constructor(private router: Router) {
   }

  ngOnInit(): void {
    
  }
  changeOfRoutes() {
    if (!((location.origin + this.router.url) == 'http://localhost:4200/log-in' || (location.origin + this.router.url) == 'http://localhost:4200/sign-up')) {
      this.showNav = false;
    } else {
      this.showNav = true;
    }
  }
  onChange(event:any) {
    console.log("hiii navbar" ,event);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutPopupComponent } from 'src/app/components/logout-popup/logout-popup.component';
import { Constant } from 'src/app/constant/constant';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  childNav = false;
  subHeading: string = '';
  heading = '';
  isShown = true;
  url = '';
  disableTab = false;
  select = 0;
  profileImg: any;
  breadcrumHead: any;
  headingName=['Lab Requests','Lab Reports','E-Claims','Lab Tests','Payments','Web-Managment']
  constructor(private router: Router,public dialog: MatDialog,private layoutService: LayoutServiceService, private http:CommonHTTPService) {}

  ngOnInit(): void {
    this.getProfileDetail();
    this.subHeading = 'Lab Requests';
    this.checkUrl();
  }
  getProfileDetail() {
    this.http.get(Constant.profileDetailUrl).subscribe(
      (res:any) => {
        this.profileImg=environment.imgUrl+ res.avatar;
      },
      (err) => {
        localStorage.removeItem('isAuth');
      }
    );
  }
  checkUrl() {
    this.url = this.router.url;
    if (this.url == '/dashboard/validate') {
      this.isShown = false;
      this.disableTab = true;
      this.subHeading = 'Validate';
      this.childNav = false;
    } else {
      this.disableTab = false;
      this.childNav = false;
    }
    if (this.url == '/dashboard/image-reports/report-detail') {
      this.subHeading = 'Lab Reports / Report Detail'
      this.heading = 'Report Detail';
      this.childNav = true;
    }
    if (this.url == '/dashboard/profile/editProfile') {
      this.subHeading = 'Profile / Edit Profile'
      this.childNav = true;
      this.heading = 'Edit Profile';
    }
    if (this.url == '/dashboard/e-claims/create-claim') {
      this.subHeading = 'E-Claim / Create Claim'
      this.childNav = true;
      this.heading = 'Create Claim';
    }
    if (this.url == '/dashboard/payments/initiate-payment') {
      this.subHeading = 'Payments / Initiate Payment'
      this.childNav = true;
      this.heading = 'Initiate Payment';
    }
    console.log('urlllll', this.url);
  }
  tabChanged(index:number) {
    console.log('header', this.subHeading == 'Lab Requests',);
    this.isShown = true;
    this.subHeading = this.headingName[index];
    this.disableTab = false;
    // this.checkUrl();
  }
  openDialog() {
    const dialogRef = this.dialog.open(LogoutPopupComponent,
      {
        restoreFocus: false,
        width: '500px',
        height: '150px',
      });
    dialogRef.afterClosed().subscribe((res) => {
      if (res == 1) {
        this.router.navigate(['/log-in'])
        localStorage.removeItem('isAuth');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('phone_id');
      }
    });
  }
  navigateToDash() {
    if (!this.disableTab) {
      this.router.navigate(['dashboard']);
      this.subHeading = 'Lab Requests';
    }
  }
  navigateToProfile() {
    this.router.navigate(['dashboard/profile']);
    this.subHeading = 'My Profile';
  }
  navigateToLogout() {
    this.openDialog();
  }
}

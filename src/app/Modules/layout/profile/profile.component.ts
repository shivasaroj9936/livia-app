import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Constant } from 'src/app/constant/constant';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  slides: string[] = [];
  profileData: any;
  img = environment.imgUrl;
  spinner = true;
  constructor(private layoutService: LayoutServiceService,private httpService:CommonHTTPService, private commonService:CommonServiceService,private route:Router) { }

  ngOnInit(): void { 
    this.getProfileDetail();
  }
  
  getProfileDetail() {
    this.httpService.get(Constant.profileDetailUrl).subscribe(
      (res:any) => {
        console.log(res, 'Profile data Response');
        this.spinner = false;
        this.profileData = res;
        if (this.profileData.lab_images.length > 0) {
          for (let idx = 0; idx < this.profileData.lab_images.length; idx++){
            this.slides.push(this.img + this.profileData.lab_images[idx]);
          }
        } else {
        }
      },
      (err) => {
        this.spinner = false;
        localStorage.removeItem('isAuth');
        this.route.navigate(['/log-in'])
        console.log(err, 'err from Lab Request');
      }
    );
  }
}

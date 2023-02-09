import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AddressPopupComponent } from 'src/app/components/address-popup/address-popup.component';
import { Constant } from 'src/app/constant/constant';
import { CommonHTTPService } from 'src/app/services/commonHTTP/common-http.service';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { ImageServiceService } from 'src/app/services/imageService/image-service.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';
import { SignupServiceService } from 'src/app/services/signup/signup-service.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  address: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  deleteProfile = false;
  spinner = true;
  uploadSpin1 = false;
  updateData = false;
  img = environment.imgUrl;
  userData: any;
  editFrom!: FormGroup;
  city: any;
  payLoadData: string[] = [];
  imageSrc = '';
  uploadSpin = false;
  imgUrl = environment.imgUrl;
  typeUpload!: string;
  address!: string;
  constructor(private fb: FormBuilder,private httpService:CommonHTTPService, private router: Router, public signupService: SignupServiceService, private imageService: ImageServiceService, private commonService: CommonServiceService, private layoutService: LayoutServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProfileDetail();
    this.createForm();
    this.getCityData();
  }
  getProfileDetail() {
    this.httpService.get(Constant.profileDetailUrl).subscribe(
      (res:any) => {
        this.userData = res;
        this.user();
        this.spinner = false;
        this.signupService.setUserData(res)
      },
      (err) => {
        localStorage.removeItem('isAuth');
        this.spinner = false;
      }
    );
  }
  createForm() {
    this.editFrom = this.fb.group({
      avatar: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      lab_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      physical_address: ['', [Validators.required]],
      lab_bio: ['', [Validators.required]],
      lab_images: ['', [Validators.required]]
    });
  }
  user() {
    this.editFrom.patchValue({
      avatar: this.userData?.avatar,
      lab_name: this.userData?.lab_name,
      address: this.userData.physical_address,
      phone_number: "+" + this.userData.phone_code + " " + this.userData.phone_number,
      lab_bio: this.userData.lab_bio,
      lab_images: this.userData.lab_images
    })
    for (let idx in this.city){
      if (this.userData.city_name == this.city[idx].name) {
        this.editFrom.controls.physical_address.patchValue(this.city[idx])
      }
    }
    for (let idx in this.userData.lab_images){
      this.payLoadData.push(this.userData.lab_images[idx]);
      console.log(this.userData.lab_images[idx],"hmmmmmmmm!");
    }
  }
  getCityData() {
    this.signupService.selectCities().subscribe(res => {
      this.city = res.body;
    }, err => {
      console.log(err, "error in City!!!");
    })
  }
  onFileChange(event: any, type: string) {
    this.typeUpload = type;
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    console.log(file, "imageeeeeee");
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.commonService.registerSnackBar('invalid format', 'Close', 'red-snackbar');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e: any) {
    this.typeUpload == 'document' ? this.uploadSpin = true : this.uploadSpin1 = true;
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    let payLoad = {
      image: this.imageSrc,
      type: 'labs',
    };
    this.imageService.uploadImage(payLoad).subscribe(
      (res) => {
        if (this.typeUpload == 'document') {
          this.payLoadData.push(res.image);
          this.editFrom.patchValue({
            lab_images: this.payLoadData,
          });
          this.uploadSpin = false;
        } else {
          this.editFrom.get('avatar')?.patchValue(res.image);
          this.deleteProfile = false;
          this.uploadSpin1 = false;
        }
      },
      (err) => {
        console.log(err, 'Error from image service!');
        this.uploadSpin = false;
        this.uploadSpin1 = false;
      }
    );
  }
  deleteImg(idx: any) {
    // console.log(this.payLoadData[idx]);
    if (idx == 'delProfile') {
      this.imageService.deleteImage(this.userData.avatar).subscribe(res => {
        console.log(res, "delete image");
        this.deleteProfile = true;
      }, err => {
        console.log(err, "err in delete img!");
      })
    } else {
      this.imageService.deleteImage(this.payLoadData[idx]).subscribe(res => {
        console.log(res, "delete image");
      }, err => {
        console.log(err, "err in delete img!");
      })
      this.payLoadData.splice(idx, 1);
      this.editFrom.patchValue({
        lab_images: this.payLoadData,
      });
    }
  }

  openDialog(): void {
    this.address = this.editFrom.get('address')?.value;
    const dialogRef = this.dialog.open(AddressPopupComponent, {
      width: '500px',
      height: '600px',
      data: this.address,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.address = result;
        this.editFrom.get('address')?.setValue(this.address);
      }
    });
  }

  updateUser() {
    this.updateData = true;
    if (this.editFrom.valid) {
      const firstFormValue = {
        steps: 2,
        avatar: this.editFrom.get('avatar')?.value,
        lab_name: this.editFrom.get('lab_name')?.value,
        physical_address: this.editFrom.get('address')?.value,
        lab_bio: this.editFrom.get('lab_bio')?.value,
        latitude: 11.11,
        longitude: 33.33,
        city_id: this.editFrom.get('physical_address')?.value.id,
      };
      const secondFormValue = {
        steps: 4,
        images: this.editFrom.get('lab_images')?.value,
      };
      forkJoin(this.signupService.registrationStep1(firstFormValue), this.signupService.registrationStep3(secondFormValue))
        .subscribe(([res1, res2]) => {
          this.updateData = false;
          this.commonService.registerSnackBar("User Data Updated Successfully", 'Close', 'success-snackbar');
          this.router.navigate(['/dashboard/profile'])
        }, err => {
          this.commonService.registerSnackBar("Something Went Wrong, Please Try Again!", 'Close', 'red-snackbar');
          this.updateData = false;
        })
    } else {
      this.updateData = false;
    }
  }
}

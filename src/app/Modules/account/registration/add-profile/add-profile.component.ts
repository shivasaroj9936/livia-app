import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressPopupComponent } from 'src/app/components/address-popup/address-popup.component';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { ImageServiceService } from 'src/app/services/imageService/image-service.service';
import { RegisterFormService } from 'src/app/services/registerForm/register-form.service';
import { SignupServiceService } from 'src/app/services/signup/signup-service.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  address: string;
}

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit {
  address!: string;
  imageSrc = '';
  btn = true;
  showErr = false;
  img = environment.imgUrl;
  spinner = false;
  imgSpinner = false;
  city: any;
  constructor(
    public dialog: MatDialog,
    public formService: RegisterFormService,
    public signupService: SignupServiceService,
    private imageService: ImageServiceService,
    private commonService:CommonServiceService
  ) {}

  ngOnInit(): void {
    this.getCityData();
  }
  getCityData() {
    this.signupService.selectCities().subscribe(res => {
      console.log(res.body, "cityyyyyyyyyyy");
      this.city = res.body;
    }, err => {
      console.log(err,"error in City!!!");
    })
  }
  onFileChange(event: any) {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.commonService.authSnackBar('invalid format', 'Close', 'red-snackbar');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e: any) {
    this.imgSpinner = true;
    this.btn = false;
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    let payLoad = {
      image: this.imageSrc,
      type:'labs'
    }
    this.imageService.uploadImage(payLoad).subscribe(res => {
      this.regForm.get('avatar')?.patchValue(res.image);
      this.btn = false;
      this.imgSpinner = false;
    }, err => {
      this.btn = true;
      this.imgSpinner = false;
      console.log(err,"Error from image service!");
    });
  }

  get regForm() {
    return this.formService.registerForm.controls.profile;
  }

  deleteImg() {
    const formValue = {
      image:[this.regForm?.get('avatar')?.value]
    }
    console.log(this.regForm?.get('avatar')?.value,"del image");
     this.imageService.deleteImage(formValue).subscribe(res => {
       console.log(res, "delete image");
        this.imgSpinner = false;
       this.btn = true;
       this.regForm.get('avatar')?.reset();
    }, err => {
      console.log(err,"err in delete img!");
     })
  }

  openDialog(): void {
    this.address = this.regForm.get('address')?.value;
    const dialogRef = this.dialog.open(AddressPopupComponent, {
      width: '500px',
      height: '600px',
      data: this.address,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.address = result;
        this.regForm.get('address')?.setValue(this.address);
      }
    });
  }
  submit() {
    this.showErr = false;
    if (this.regForm.valid) {
      this.spinner = true;
      const formValue = {
        steps: 2,
        avatar: this.regForm.get('avatar')?.value,
        lab_name: this.regForm.get('lab_name')?.value,
        physical_address: this.regForm.get('physical_address')?.value.name,
        lab_bio: '',
        latitude: 11.11,
        longitude: 33.33,
        city_id: this.regForm.get('physical_address')?.value.id,
      };
      this.signupService.registrationStep1(formValue).subscribe(res => {
        console.log(res, "Step 1 response from sub");
        this.commonService.registerSnackBar(res.message, 'Close', 'success-snackbar');
        this.spinner = false;
      }, err => {
        this.commonService.registerSnackBar(err.error.messages[0],'Close','red-snackbar');
        console.log(err, 'Err in register step 1!');
        this.spinner = false;
      })
    }
    console.log(this.regForm.valid, 'Profile form', this.regForm);
  }
}

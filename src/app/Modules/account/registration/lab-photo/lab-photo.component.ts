import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { ImageServiceService } from 'src/app/services/imageService/image-service.service';
import { RegisterFormService } from 'src/app/services/registerForm/register-form.service';
import { SignupServiceService } from 'src/app/services/signup/signup-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lab-photo',
  templateUrl: './lab-photo.component.html',
  styleUrls: ['./lab-photo.component.scss'],
})
export class LabPhotoComponent implements OnInit {
  showErr = false;
  img=environment.imgUrl;
  payLoadData: string[] = [];
  imageSrc = '';
  uploadSpin = false;
  constructor(
    public formService: RegisterFormService,
    private router: Router,
    public signupService: SignupServiceService,
    private imageService: ImageServiceService,
    private commonService:CommonServiceService
  ) {}
  ngOnInit(): void {}
  get regForm() {
    return this.formService.registerForm;
  }
  onFileChange(event: any) {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    console.log(file,"imageeeeeee");
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.commonService.registerSnackBar('invalid format','Close','red-snackbar');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e: any) {
    this.uploadSpin = true;
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    // console.log(this.imageSrc, "imagggggggggggggggggggggggggggggg!!")
    let payLoad = {
      image: this.imageSrc,
      type: 'labs',
    };
    this.imageService.uploadImage(payLoad).subscribe(
      (res) => {
        // console.log(res.image, 'response from image service!',this.labPhoto);
        this.payLoadData.push(res.image);
        this.regForm.patchValue({
          images: this.payLoadData,
        });
        console.log(this.regForm.get('lab_photo')?.value, "imaggggggausiasuha");
        this.uploadSpin = false;
      },
      (err) => {
        console.log(err, 'Error from image service!');
        this.uploadSpin = false;
      }
    );
  }

  deleteImg(idx: any) {
    console.log(this.payLoadData[idx]);
     this.imageService.deleteImage(this.payLoadData[idx]).subscribe(res => {
      console.log(res,"delete image");
    }, err => {
      console.log(err,"err in delete img!");
    })
    this.payLoadData.splice(idx, 1);
    this.regForm.patchValue({
      lab_photo: this.payLoadData,
    });
  }
  navigateToValid() {
    console.log(this.regForm.get('lab_photo'), 'inside lab photo');
    if (this.regForm.get('lab_photo')?.valid && this.regForm.valid) {
      this.showErr = false;
      const formValue = {
        steps: 4,
        images: this.regForm.get('images')?.value,
      };
      this.signupService.registrationStep3(formValue).subscribe(
        (res: any) => {
          if (res.code == 200) {
            console.log(res, 'Lab photo Added');
            this.commonService.registerSnackBar(res.message, 'Close', 'success-snackbar');
            localStorage.setItem('isAuth', 'under-validation');
            this.router.navigate(['dashboard/validate']);
          } else {
            this.commonService.registerSnackBar(res.message, 'Close', 'success-snackbar');
          }
        },
        (err) => {
          console.log(err, 'errrr');
          this.commonService.registerSnackBar(err.error.messages[0],'Close','red-snackbar');
        }
      );
    } else {
      this.showErr = true;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { ImageServiceService } from 'src/app/services/imageService/image-service.service';
import { RegisterFormService } from 'src/app/services/registerForm/register-form.service';
import { SignupServiceService } from 'src/app/services/signup/signup-service.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  showErr = false;
  spinner = false;
  formControlName = '';
  imageSrc = '';
  uploadSpin = false;
  constructor(
    public formService: RegisterFormService,
    private imageService: ImageServiceService,
    public signupService: SignupServiceService,
    private commonService:CommonServiceService
  ) {}

  ngOnInit(): void {
    console.log(this.regForm.get('taxComp')?.value, 'documents');
  }
  get regForm() {
    return this.formService.registerForm.controls.document;
  }

  onChange(event: any, name: string) {
    console.log(event,"pppppppppppppppp");
    this.formControlName = name;
    var file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
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
    this.uploadSpin = true;
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    // console.log(this.imageSrc, 'imagggggggggggggggggggggggggggggg!!');
    let payLoad = {
      image: this.imageSrc,
      type: 'labs',
    };
    this.imageService.uploadImage(payLoad).subscribe(
      (res) => {
        console.log(res.image, 'response from image service!');
        this.regForm.get(this.formControlName)?.setValue(res.image);
        this.uploadSpin = false;
      },
      (err) => {
        console.log(err, 'Error from image service!');
        this.uploadSpin = false;
      }
    );
  }

  deleteImg(img:any) {
    const formValue = {
      image:[this.regForm.get(img)?.value]
    }
    console.log(img,"del image");
     this.imageService.deleteImage(formValue).subscribe(res => {
        console.log(res, "delete image");
        this.regForm.get(img)?.reset();
    }, err => {
      console.log(err,"err in delete img!");
     })
  }

  onSubmit() {
    this.showErr = false;
    if (this.regForm.valid) {
      this.spinner = true;
      const formValue = this.regForm.value;
      formValue['steps'] = 3;
      this.signupService.registrationStep2(formValue).subscribe(
        (res: any) => {
          console.log(res, 'Response from document page');
          this.commonService.registerSnackBar(res.message, 'Close', 'success-snackbar');
          this.spinner = false;
        },
        (err) => {
          console.log(err, 'Error in document page!');
          this.commonService.registerSnackBar(err.error.messages[0],'Close','red-snackbar');
          this.spinner = false;
        }
      );
    }
    console.log(this.regForm, 'document form');
  }
}

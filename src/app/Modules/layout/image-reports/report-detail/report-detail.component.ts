import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { ImageServiceService } from 'src/app/services/imageService/image-service.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {
  uploadSpin = false;
  updateData = false;
  saveData = false;
  spinner = true;
  img = environment.imgUrl;
  imageSrc = '';
  detailForm!: FormGroup;
  payLoadData: string[] = [];
  claimData: any;
  emailData = false;
  reportData: any;
  constructor(private router: Router, private commonService: CommonServiceService, private layoutService: LayoutServiceService, private imageService: ImageServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getClaimData();
    this.createForm();
  }

  getClaimData() {
    this.claimData = this.commonService.getCliamId();
    if (this.claimData?.claim_id) {
      this.layoutService.getReportDetail(this.claimData.claim_id).subscribe(res => {
        this.reportData = res;
        this.spinner = false;
        this.setValue();
      }, err => {
        this.router.navigate(['/dashboard/image-reports'])
        this.spinner = false;
      })
    } else {
      this.router.navigate(['/dashboard/image-reports'])
    }
  }

  createForm() {
    this.detailForm = this.fb.group({
      email: ['', [Validators.email]],
      notes: ['', [Validators.required]],
      lab_images: ['', [Validators.required]]
    });
  }
  setValue() {
    let index = 0;
    this.detailForm.controls?.notes.patchValue(this.reportData?.test_details[0]?.lab_notes);
    for (let idx = 0; idx < this.reportData?.test_details.length; idx++) {
      this.payLoadData.push(this.reportData?.test_details[index].documents[idx]);
    }
    index++;
  }
  onFileChange(event: any, type: string) {
    this.uploadSpin = true;
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
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    let payLoad = {
      image: this.imageSrc,
      type: 'labs',
    };
    this.imageService.uploadImage(payLoad).subscribe(
      (res) => {
        this.payLoadData.push(res.image);
        this.detailForm.patchValue({
          lab_images: this.payLoadData,
        });
        this.uploadSpin = false;
      },
      (err) => {
        console.log(err, 'Error from image service!');
        this.uploadSpin = false;
      }
    );
  }

  deleteImg(idx: any) {
    this.imageService.deleteImage(this.payLoadData[idx]).subscribe(res => {
      console.log(res, "delete image");
      this.payLoadData.splice(idx, 1);
      this.detailForm.patchValue({
        lab_images: this.payLoadData,
      });
    }, err => {
      console.log(err, "err in delete img!");
    })
  }

  setEmail() {
    this.emailData = true;
    let id = '';
    this.layoutService.getProfileData().subscribe(
      (res) => {
        id = res.id;
      },
      (err) => {
        localStorage.removeItem('isAuth');
        this.spinner = false;
      }
    );
    const formValue = {
      user_id: id,
      email: this.detailForm.controls.email.value
    }
    this.layoutService.setUserEmail(formValue).subscribe(res => {
      console.log(res, "User email set!!");
      this.commonService.registerSnackBar(res.messages[0], "Close", "success-snackbar")
      this.emailData = false;
    }, err => {
      console.log(err, "error in user email");
    })
  }
  sendReport(idx: any, num: number) {
    num == 1 ? this.updateData = true : this.saveData = true;
    let id: any;
    id = this.reportData.test_details[idx].lab_request_id;
    const formValue = {
      lab_notes: this.detailForm.controls.notes.value,
      send_to_doctor: num,
      documents: this.detailForm.controls.lab_images.value
    }
    console.log(formValue, "hiiii");
    this.layoutService.sendReportDetail(id, formValue).subscribe(res => {
      console.log(res, "response from send report!!!");
      num == 1 ? this.updateData = false : this.saveData = false;
      this.commonService.registerSnackBar(res.messages[0], "Close", "success-snackbar");
      this.router.navigate(['/dashboard/image-reports'])
    }, err => {
      console.log(err, "error from send report!!!");
      num == 1 ? this.updateData = false : this.saveData = false;
    })
  }
}

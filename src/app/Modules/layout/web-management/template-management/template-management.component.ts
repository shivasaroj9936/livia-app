import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../../services/commonService/common-service.service';

@Component({
  selector: 'app-template-management',
  templateUrl: './template-management.component.html',
  styleUrls: ['./template-management.component.scss']
})
export class TemplateManagementComponent implements OnInit {
  deleteProfile = false;
  uploadSpin1 = true;
  updateData = false;
  imgSpinner = false;
  imageSrc = '';
  constructor(private commonService:CommonServiceService) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    // console.log(file, "imageeeeeee");
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
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
  }

  deleteImg() {
    // console.log(this.payLoadData[idx]);
    //  this.imageService.deleteImage(this.payLoadData[idx]).subscribe(res => {
    //   console.log(res,"delete image");
    // }, err => {
    //   console.log(err,"err in delete img!");
    // })
    // this.payLoadData.splice(idx, 1);
    // this.regForm.patchValue({
    //   lab_photo: this.payLoadData,
    // });
  }

}

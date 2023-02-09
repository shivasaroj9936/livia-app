import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';
import { environment } from 'src/environments/environment';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';

@Component({
  selector: 'app-insurance-detail',
  templateUrl: './insurance-detail.component.html',
  styleUrls: ['./insurance-detail.component.scss'],
})
export class InsuranceDetailComponent implements OnInit {
  requestData: any;
  disabledBtn = true;
  profileData: any;
  spinner = true;
  imgUrl = environment.imgUrl+ '/';
  claimId!: any;
  selection = new SelectionModel<any>(true, []);
  constructor(public dialog: MatDialog,private commonService:CommonServiceService, private layoutService: LayoutServiceService, private dialogRef: MatDialogRef<InsuranceDetailComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.claimId = data.id;
    this.requestData = data.data;
    console.log(this.requestData, "Insurance detail!!!!",this.claimId);
  }

  ngOnInit(): void {
    this.getUserData();
    this.selection.changed.subscribe(item => {
      this.disabledBtn = this.selection.selected.length == 0;
    })
    // this.openDialog();
  }

  getUserData() {
    let queryObj = {
      offset: 0,
      limit: 10,
      search:this.claimId
    }
    this.layoutService.getLabReq(queryObj).subscribe(
      (res) => {
        this.profileData = res.body[0];
        this.spinner = false;
        console.log(res,"jiiiiiiiiiiiiiiiiiiiiiiiii",this.profileData);
      },
      (err) => {
        localStorage.removeItem('isAuth');
        // this.route.navigate(['/log-in'])
        console.log(err, 'err from Lab Request');
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
  openDialog(verificationId:any,userData:any,claimId:any) {
    this.close();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose= true;
    dialogConfig.minWidth = ' 500px';
    dialogConfig.data = {
      data: userData,
      id: verificationId,
      claimId:this.claimId 
    }
    const dialogRef = this.dialog.open(VerifyOtpComponent, dialogConfig);
    dialogRef.afterClosed();
  }

  sendOtp() {
    let requestId:any = [];
    const formValue = {
      phone_id: localStorage.getItem('phone_id'),
      lab_request_ids: [],
      declined_lab_request_due_to_user_balance: []
    }
    this.requestData.map((item: any) => {
      requestId.push(item.lab_request_id);
    })
    formValue['lab_request_ids'] = requestId;
    JSON.stringify(formValue['lab_request_ids']);
    this.layoutService.sendOtp(formValue, this.claimId).subscribe(res => {
      if (res.code == 200) {
        this.commonService.registerSnackBar(res.messages[0],"Close","success-snackbar")
         this.openDialog(res.verification_id,this.requestData,this.claimId);
      }
      console.log(res,"Data from opt request");
    }, err => {
      console.log(err,"Error from otp request!!");
    })
  }
}

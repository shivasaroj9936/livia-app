import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  otp = '';
  requestData: any;
  disabledBtn = true;
  verificationCode: any;
  claimId: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    inputStyles: {
      width: '50px',
      height: '50px',
      backgroundColor: '#f2f9fc',
      border: 'none',
      margin: '0 30px 0 0',
    },
  };
  constructor(private route:Router,public dialog: MatDialog,private commonService:CommonServiceService, private layoutService: LayoutServiceService, private dialogRef: MatDialogRef<VerifyOtpComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    console.log(data,"salcnaj");
    this.requestData = data.data;
    this.verificationCode = data.id;
    this.claimId = data.claimId;
  }

  ngOnInit(): void {
  }
  resendCode() {
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
        this.commonService.registerSnackBar(res.messages[0], "Close", "success-snackbar")
        this.verificationCode = res.verification_id;
      }
      console.log(res,"Data from opt request");
    }, err => {
      console.log(err,"Error from otp request!!");
    })
  }
  onOtpChange(otp: any) {
    this.otp = otp;
    if (otp.length == 4) {
      this.disabledBtn = false;
    }
  }
  close() {
    this.dialogRef.close();
  }
  verifyOtp() {
    if (this.otp.length == 4) {
      console.log("hiiiiiii");
      const formValue = {
        phone_id: localStorage.getItem('phone_id'),
        auth_code: this.otp,
        verification_id:this.verificationCode
      }
      this.layoutService.verifyOtp(formValue, this.claimId).subscribe(res => {
        console.log(res, "Verify OTP!!!");
        if (res.code == 200) {
          this.commonService.registerSnackBar(res.messages[0], "Close", "success-snackbar")
          this.close();
          this.route.navigate(['dashboard/image-reports'])
        }
      }, err => {
        this.commonService.registerSnackBar(err.error.messages[0], "Close", "red-snackbar")
        console.log(err,"Error in verify code!");
      })
    } else {
      this.disabledBtn = true;
    }
  }
}

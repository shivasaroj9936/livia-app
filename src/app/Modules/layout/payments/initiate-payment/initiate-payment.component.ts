import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/commonService/common-service.service';
import { LayoutServiceService } from 'src/app/services/layoutService/layout-service.service';

@Component({
  selector: 'app-initiate-payment',
  templateUrl: './initiate-payment.component.html',
  styleUrls: ['./initiate-payment.component.scss']
})
export class InitiatePaymentComponent implements OnInit {
  claimIds: any;
  paymentData: any;
  spinner = true;
  constructor(private layoutService: LayoutServiceService, private commonService: CommonServiceService, private route: Router) { }

  ngOnInit(): void {
    this.getPaymentData();
  }
  getPaymentData() {
    if (this.commonService.getPaymentId()) {
      this.claimIds = this.commonService.getPaymentId();
      console.log(this.claimIds, "paymenttttt");
      const payLoad: any = {
        claim_ids: []
      };
      this.claimIds?.map((item: any) => {
        payLoad.claim_ids.push(item.claim_id);
      })
      console.log(payLoad, "jiiiiiiiiiiii");

      this.layoutService.initiatePayment(payLoad).subscribe(res => {
        console.log(res, "Payment API");
        this.paymentData = res;
        this.spinner = false;
      }, err => {
        console.log(err, "Error in Payment API");
        this.spinner = false;
      })
    } else {
      this.route.navigate(['dashboard/payments'])
    }
  }
  makePayment() { }
}

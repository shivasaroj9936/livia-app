import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { InitiatePaymentComponent } from './initiate-payment/initiate-payment.component';


@NgModule({
  declarations: [
    PaymentsComponent,
    InitiatePaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule
  ]
})
export class PaymentsModule { }

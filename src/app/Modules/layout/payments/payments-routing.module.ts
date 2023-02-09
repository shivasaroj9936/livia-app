import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitiatePaymentComponent } from './initiate-payment/initiate-payment.component';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  { path: '', component: PaymentsComponent },
  { path: 'initiate-payment', component: InitiatePaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule {}

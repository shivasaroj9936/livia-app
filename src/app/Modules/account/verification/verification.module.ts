import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    VerificationComponent
  ],
  imports: [
    CommonModule,
    VerificationRoutingModule,
    MaterialModule
  ]
})
export class VerificationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EClaimsRoutingModule } from './e-claims-routing.module';
import { EClaimsComponent } from './e-claims.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { CreateClaimComponent } from './create-claim/create-claim.component';


@NgModule({
  declarations: [
    EClaimsComponent,
    CreateClaimComponent
  ],
  imports: [
    CommonModule,
    EClaimsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule
  ]
})
export class EClaimsModule { }

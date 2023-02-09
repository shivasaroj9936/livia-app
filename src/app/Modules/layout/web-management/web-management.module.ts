import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebManagementRoutingModule } from './web-management-routing.module';
import { WebManagementComponent } from './web-management.component';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WebManagementComponent
  ],
  imports: [
    CommonModule,
    WebManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WebManagementModule { }

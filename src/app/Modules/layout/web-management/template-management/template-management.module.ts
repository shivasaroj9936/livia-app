import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateManagementRoutingModule } from './template-management-routing.module';
import { TemplateManagementComponent } from './template-management.component';
import { MaterialModule } from '../../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TemplateManagementComponent
  ],
  imports: [
    CommonModule,
    TemplateManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TemplateManagementModule { }

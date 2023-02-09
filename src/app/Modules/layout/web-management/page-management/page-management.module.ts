import { EditorModule } from '@tinymce/tinymce-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageManagementRoutingModule } from './page-management-routing.module';
import { PageManagementComponent } from './page-management.component';
import { MaterialModule } from '../../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PageManagementComponent
  ],
  imports: [
    CommonModule,
    PageManagementRoutingModule,
    MaterialModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PageManagementModule { }

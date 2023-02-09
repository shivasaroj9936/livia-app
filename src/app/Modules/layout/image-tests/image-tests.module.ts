import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageTestsRoutingModule } from './image-tests-routing.module';
import { ImageTestsComponent } from './image-tests.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImageTestsComponent
  ],
  imports: [
    CommonModule,
    ImageTestsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ImageTestsModule { }

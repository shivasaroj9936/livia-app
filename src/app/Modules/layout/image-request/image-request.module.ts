import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageRequestRoutingModule } from './image-request-routing.module';
import { ImageRequestComponent } from './image-request.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImageRequestComponent,
  ],
  imports: [
    CommonModule,
    ImageRequestRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class ImageRequestModule { }

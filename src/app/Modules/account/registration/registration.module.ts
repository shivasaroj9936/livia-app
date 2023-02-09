import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { DocumentComponent } from './document/document.component';
import { LabPhotoComponent } from './lab-photo/lab-photo.component';
import { RegisterFormService } from 'src/app/services/registerForm/register-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistrationComponent,
    AddProfileComponent,
    DocumentComponent,
    LabPhotoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    MaterialModule
  ],
  providers:[RegisterFormService]
})
export class RegistrationModule { 
 
}

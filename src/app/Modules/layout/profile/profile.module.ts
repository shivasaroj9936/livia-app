import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel'; // ---------- Important
import { IvyCarouselModule } from 'angular-responsive-carousel';
  

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    MatCarouselModule,
    IvyCarouselModule
  ],
})
export class ProfileModule { }

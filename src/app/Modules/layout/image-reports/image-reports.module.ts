import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageReportsRoutingModule } from './image-reports-routing.module';
import { ImageReportsComponent } from './image-reports.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { ReportDetailComponent } from './report-detail/report-detail.component';


@NgModule({
  declarations: [
    ImageReportsComponent,
    ReportDetailComponent,
  ],
  imports: [
    CommonModule,
    ImageReportsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    SharedModuleModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]

})
export class ImageReportsModule { }

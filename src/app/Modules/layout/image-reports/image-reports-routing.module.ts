import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageReportsComponent } from './image-reports.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';

const routes: Routes = [
  { path: '', component: ImageReportsComponent },
  { path: 'report-detail', component: ReportDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageReportsRoutingModule { }

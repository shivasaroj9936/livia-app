import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageManagementComponent } from './page-management.component';

const routes: Routes = [{path:'',component:PageManagementComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageManagementRoutingModule { }

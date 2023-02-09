import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateManagementComponent } from './template-management.component';

const routes: Routes = [{path:'',component:TemplateManagementComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateManagementRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebManagementComponent } from './web-management.component';
import { staticRoutes } from '../../../constant/constant';

const routes: Routes = [
  {
    path: '', component: WebManagementComponent, children: [
      { path: '', loadChildren: () => import('./template-management/template-management.module').then(m => m.TemplateManagementModule) },
      { path: staticRoutes.pageMangement, loadChildren: () => import('./page-management/page-management.module').then(m => m.PageManagementModule) },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebManagementRoutingModule { }

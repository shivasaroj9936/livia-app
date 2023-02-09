import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { staticRoutes } from 'src/app/constant/constant';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '', component: AccountComponent, children: [
      // { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
      { path: staticRoutes.register, loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

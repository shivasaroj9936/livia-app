import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { staticRoutes } from 'src/app/constant/constant';
import { VerificationComponent } from './verification.component';

const routes: Routes = [
  {
    path: '', component: VerificationComponent, children: [
      { path: '', redirectTo: 'log-in', pathMatch: 'full' },
      {
        path:  staticRoutes.login,
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: staticRoutes.signup,
        loadChildren: () =>
          import('./sign-up/sign-up.module').then((m) => m.SignUpModule),
      },
      {
        path: staticRoutes.resetPassword,
        loadChildren:()=>import('./reset-password/reset-password.module').then(m=>m.ResetPasswordModule)
      }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationRoutingModule {}

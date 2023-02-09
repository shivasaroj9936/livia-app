import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { staticRoutes } from './constant/constant';
import { LayoutGuardGuard } from './services/Authorization/layoutGuard/layout-guard.guard';
import { LoginGuardGuard } from './services/Authorization/loginGuard/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Modules/account/account.module').then(
            (m) => m.AccountModule
          ),
        canActivate:[LoginGuardGuard]
      },
      {
        path: staticRoutes.dashboard,
        loadChildren: () =>
          import('./Modules/layout/layout.module').then((m) => m.LayoutModule),
        canActivate:[LayoutGuardGuard]
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

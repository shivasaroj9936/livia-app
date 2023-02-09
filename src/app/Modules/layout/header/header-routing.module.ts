import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { staticRoutes } from 'src/app/constant/constant';
import { HeaderComponent } from './header.component';
import { ValidationGuardGuard } from '../../../services/Authorization/validationGuard/validation-guard.guard';
import { DashboardGuardGuard } from '../../../services/Authorization/dashboardGuard/dashboard-guard.guard';

const routes: Routes = [
  {
    path: '', component: HeaderComponent, children: [
      { path: '', redirectTo: staticRoutes.request },
      { path: staticRoutes.request, loadChildren: () => import('../image-request/image-request.module').then(m => m.ImageRequestModule),canActivate:[DashboardGuardGuard] },
      { path: staticRoutes.report, loadChildren: () => import('../image-reports/image-reports.module').then(m => m.ImageReportsModule),canActivate:[DashboardGuardGuard] },
      { path: staticRoutes.eClaim, loadChildren: () => import('../e-claims/e-claims.module').then(m => m.EClaimsModule),canActivate:[DashboardGuardGuard] },
      { path: staticRoutes.test, loadChildren: () => import('../image-tests/image-tests.module').then(m => m.ImageTestsModule),canActivate:[DashboardGuardGuard] },
      { path: staticRoutes.payment, loadChildren: () => import('../payments/payments.module').then(m => m.PaymentsModule),canActivate:[DashboardGuardGuard] },
      { path: staticRoutes.webMangement, loadChildren: () => import('../web-management/web-management.module').then(m => m.WebManagementModule),canActivate:[DashboardGuardGuard] },
      { path: staticRoutes.profile, loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),canActivate:[DashboardGuardGuard] },
      { path: staticRoutes.validate, loadChildren: () => import('../validation/validation.module').then(m => m.ValidationModule),canActivate:[ValidationGuardGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { EClaimsComponent } from './e-claims.component';

const routes: Routes = [
  { path: '', component: EClaimsComponent },
  { path: 'create-claim', component: CreateClaimComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EClaimsRoutingModule { }

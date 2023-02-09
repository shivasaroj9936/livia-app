import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageTestsComponent } from './image-tests.component';

const routes: Routes = [{path:'',component:ImageTestsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageTestsRoutingModule { }

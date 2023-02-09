import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPipePipe } from '../customPipe/statusPipe/status-pipe.pipe';



@NgModule({
  declarations: [StatusPipePipe],
  imports: [
    CommonModule
  ],
  exports:[StatusPipePipe]
})
export class SharedModuleModule { }

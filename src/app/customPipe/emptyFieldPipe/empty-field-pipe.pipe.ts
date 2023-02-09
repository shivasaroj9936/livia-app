import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyFieldPipe'
})
export class EmptyFieldPipePipe implements PipeTransform {

  transform(value: unknown, data?: any): unknown {
    console.log(value,data,"custom pipeeee");
    return value;
  }

}

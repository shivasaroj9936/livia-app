import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe',
})
export class StatusPipePipe implements PipeTransform {

  transform(value: any, type: any): any {
    if (type == 'request') {
      switch (value) {
        case '1':
          return "Pending";
        case '2':
          return "In Process";
        case '4':
          return "Declined";
        case '6':
          return "Sent To Doctor";
        case '20':
          return "Preauthrization";
        default:
          break;
      }
    } else if (type == 'eClaim') {
      switch (value) {
        case '1':
          return 'Template'
        case '2':
          return 'Pre-Authrization'
        case '3':
          return 'Accepted'
        case '4':
          return 'Declined'
        case '5':
          return 'Template with Prescription'
        default:
          break;
      }
    } else if (type == 'payment') {
      switch (value) {
        case '3':
          return 'Loaded'
        case '7':
          return 'Ready for payment'
        case '9':
          return 'Fund in withdrawal process'
        case '10':
          return 'Disbusered'
        default:
          break;
      }
    }
  }

}

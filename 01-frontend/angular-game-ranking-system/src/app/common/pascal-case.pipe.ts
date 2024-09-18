import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pascalCase'
})
export class PascalCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
      //.replace(/\s+/g, '');
  }

}

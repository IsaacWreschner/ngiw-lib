import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngiwHighlightPrefix'
})
export class BeforeHighlightPipe implements PipeTransform {
  transform(value: string, pattern: string): string {
    if (!value || !pattern) {
      return value;
    }

    const regex = new RegExp(`(${pattern})`, 'gi');
    const val = value.replace(regex, '%$1%');
    return val.split('%').shift() as string;
  }
}   
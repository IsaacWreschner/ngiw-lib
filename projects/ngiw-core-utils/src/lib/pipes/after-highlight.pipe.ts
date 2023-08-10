import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngiwHighlightSuffix'
})
export class AfterHighlightPipe implements PipeTransform {
  transform(value: string, pattern: string): string {
    if (!value || !pattern) {
      return '';
    }

    const regex = new RegExp(`(${pattern})`, 'gi');
    const val = value.replace(regex, '%$1%');
    const splitted = val.split('%');
    return splitted.length > 1 ? splitted.pop() as string: '';
  }
}   
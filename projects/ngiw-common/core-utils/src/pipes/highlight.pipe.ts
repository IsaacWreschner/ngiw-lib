import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngiwHighlight'
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, pattern: string): string {
    if (!value || !pattern) {
      return '';
    }

    const regex = new RegExp(`(${pattern})`, 'gi');
    const val = value.replace(regex, '%$1%');
    const splitted = val.split('%');
    let toRet = '';
    splitted?.shift();
    splitted?.pop();
    return splitted.length > 0 ? splitted.reduce((str,chr) => str += chr) : '';
  }
}   
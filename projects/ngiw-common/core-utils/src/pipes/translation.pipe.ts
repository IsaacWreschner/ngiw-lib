import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';
 
@Pipe({
  name: 'ngiwTranslate'  
})
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: string): string { 
    return this.translationService.translate(key);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any;

  constructor(private http: HttpClient) {
    this.loadTranslations();
   }

  loadTranslations(): Promise<any> {
    return this.http.get('assets/strings/strings.json').toPromise()
      .then((translations) => {
        this.translations = translations;
      });
  }

  translate(key: string): string {
    if (this.translations) {
      const keys = key.split('.');

      let translatedValue = this.translations;
      console.log(this.translations,keys)
      for (const nestedKey of keys) {
        translatedValue = translatedValue[nestedKey];
        if (!translatedValue) {
          break; // If any nested key is missing, break out of the loop
        }
      }

      return translatedValue && translatedValue ? translatedValue : key;
    }
    return key;
  }
}

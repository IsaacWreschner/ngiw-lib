import { NgModule } from '@angular/core';
import { CoreUtilsComponent } from './core-utils.component';
import { TranslationPipe } from './pipes/translation.pipe';



@NgModule({
  declarations: [
    CoreUtilsComponent,
    TranslationPipe
  ],
  imports: [
  ],
  exports: [
    CoreUtilsComponent,
    TranslationPipe
  ]
})
export class NgiwCoreUtilsModule { }

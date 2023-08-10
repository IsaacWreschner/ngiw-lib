import { NgModule } from '@angular/core';
import { CoreUtilsComponent } from './core-utils.component';
import { TranslationPipe } from './pipes/translation.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { AfterHighlightPipe } from './pipes/after-highlight.pipe';
import { BeforeHighlightPipe } from './pipes/before-highlight.pipe';



@NgModule({
  declarations: [
    CoreUtilsComponent,
    TranslationPipe,
    HighlightPipe,
    AfterHighlightPipe,
    BeforeHighlightPipe
  ],
  imports: [
  ],
  exports: [
    CoreUtilsComponent,
    TranslationPipe
  ]
})
export class NgiwCoreUtilsModule { }

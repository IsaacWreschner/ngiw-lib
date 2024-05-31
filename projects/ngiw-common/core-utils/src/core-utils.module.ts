import { NgModule } from '@angular/core';
import { TranslationPipe } from './pipes/translation.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { AfterHighlightPipe } from './pipes/after-highlight.pipe';
import { BeforeHighlightPipe } from './pipes/before-highlight.pipe';



@NgModule({
  declarations: [
    TranslationPipe,
    HighlightPipe,
    AfterHighlightPipe,
    BeforeHighlightPipe
  ],
  imports: [
  ],
  exports: [
    TranslationPipe,
    HighlightPipe,
    AfterHighlightPipe,
    BeforeHighlightPipe
  ]
})
export class NgiwCoreUtilsModule { }

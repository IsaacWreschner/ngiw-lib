import { Component, input } from '@angular/core';

@Component({
  selector: 'ngiw-text-prettify',
  templateUrl: './text-prettify.component.html',
  styleUrls: ['./text-prettify.component.scss'],
})
export class TextPrettifyComponent {
  ngiwText = input('');
  ngiwHightlightPattern = input('');
  ngiwHightlighColor = input('');
}

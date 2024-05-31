import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngiw-text-prettify', 
  templateUrl: './text-prettify.component.html',
  styleUrls: ['./text-prettify.component.scss']
})
export class TextPrettifyComponent {
  @Input() ngiwText = '';
  @Input() ngiwHightlightPattern = ''; 
  @Input() ngiwHightlighColor = '';

}
 
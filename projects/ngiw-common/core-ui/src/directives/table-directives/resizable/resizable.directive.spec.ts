import { ElementRef } from '@angular/core';
import { ResizableDirective } from './resizable.directive';

describe('ResizableDirective', () => {
  it('should create an instance', () => {
    const directive = new ResizableDirective(new Document(), new ElementRef(new HTMLElement()));
    expect(directive).toBeTruthy();
  });
});

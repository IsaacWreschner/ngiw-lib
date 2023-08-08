import { Directive, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[ngiwStrechTable]'
})
export class StrechTableDirective {

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef)
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this._setTableHeight();
    window.onresize = () => { this._setTableHeight() };


  }
  private _setTableHeight() {
    let tTop = this.elementRef.nativeElement.offsetTop;
    let tHeight = window.innerHeight - tTop - 25;
    console.log('height:', tHeight)
    this.elementRef.nativeElement.style.height = tHeight.toString() + 'px';
  }

}




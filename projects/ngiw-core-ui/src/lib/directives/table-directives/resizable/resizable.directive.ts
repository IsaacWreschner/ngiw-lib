import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Output } from '@angular/core';
import { distinctUntilChanged, map, switchMap, takeUntil, tap, } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';
@Directive({
    selector: '[ngiwResizable]',
})
export class ResizableDirective {
    @Output()
    readonly ngiwResizable = fromEvent<MouseEvent>(
        this.elementRef.nativeElement,
        'mousedown'
    ).pipe(
        tap((e) => {console.log(e);e.preventDefault()}),
        switchMap(() => {
            const { width, right } = this.elementRef.nativeElement.closest('th')?.getBoundingClientRect() as any;
            console.log(right)
            return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
                map(({ clientX }) => { console.log('hi'); return clientX - right }),
                distinctUntilChanged(),
                takeUntil(fromEvent(this.documentRef, 'mouseup'))
            );
        })
    );

    constructor(
        @Inject(DOCUMENT) private readonly documentRef: Document,
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<HTMLElement>
    ) {
        console.log('hi')
        
     }

}

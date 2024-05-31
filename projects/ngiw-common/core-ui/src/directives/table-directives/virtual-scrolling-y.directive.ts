/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  input,
} from '@angular/core';

@Directive({
  selector: '[ngiwVirtualScrollingY]',
})
/**
 * @param {number} ngiwRecordsLength The length of all records;
 * @param {BehaviorSubject} ngiwArrowsKeysObservable An observebale to get keys event from host;
 * @callback ngiwGetYRange Get Y range to display in form of an array
 * for example [6,7,8,9,10,11,12] fro range 6-12;
 * @callback ngiwGetVirtulContainersHeights Return the heights of the virtual containers;
 */
export class VirtualScrollingYDirective {
  headHeight!: number;
  rowHeight!: number;
  YRange!: number[];
  virtualContainers!: [number, number];
  scrollTop = 0;
  lastPosition = 0;
  timeout!: any;
  ngiwRecordsLength = input<number>();
  ngiwArrowsKeysObservable = input<any>();
  @Output() ngiwGetYRange = new EventEmitter();
  @Output() ngiwIsLoading = new EventEmitter();
  @Output() ngiwGetVirtualContainersHeights = new EventEmitter();

  constructor(private elem: ElementRef) {
    this.elem.nativeElement.onscroll = (e: any) => {
      this.scrollTop = this.elem.nativeElement.scrollTop;
      this._vsManager();
      this.lastPosition = this.elem.nativeElement.scrollTop;
    };

    setTimeout(() => {
      this._vsManager();
      if (this.ngiwArrowsKeysObservable()) {
        this.ngiwArrowsKeysObservable()!.subscribe((e: any) => {
          if (!e.type) return;
          switch (e.type) {
            case 'down':
              this._onKeyDown(e.yIndex, e.xIndex);
              break;
            case 'up':
              this._onKeyUp(e.yIndex, e.xIndex);
              break;
          }
        });
      }
    }, 50);
  }

  OnChanges(e: any) {
    this._vsManager();
  }

  private _getHeadAndRowsHeight(): boolean {
    if (
      !this.elem.nativeElement.firstChild ||
      !this.elem.nativeElement.firstChild.firstChild.children[0] ||
      !this.elem.nativeElement.firstChild.firstChild.children[2]
    ) {
      this.ngiwGetYRange.emit([0]);
      this.ngiwIsLoading.emit(true);
      setTimeout(() => {
        this._vsManager();
      }, 50);
      setTimeout(() => {
        this.ngiwIsLoading.emit(false);
      }, 1000);
      return false;
    }
    this.headHeight = 30;
    this.rowHeight = 30;
    return true;
  }

  private _vsManager() {
    if (!this._getHeadAndRowsHeight()) return;

    const scrollBarHeight = this._calculateScrollBarHeight();
    const amountOfRowsToDispatch = this._getAmountOfRowsToDispatch(); //get rows to dispatch info
    const rowsDispatchedHeight = amountOfRowsToDispatch * this.rowHeight;
    let currScrollPosition = this.elem.nativeElement.scrollTop;

    currScrollPosition = this._preventScrollPositionOverload(
      currScrollPosition,
      scrollBarHeight,
      rowsDispatchedHeight,
    ); /*prevent curr scroll position to overload */
    this._setYRange(currScrollPosition, amountOfRowsToDispatch); //set the height of the virtual containers */
    this._setVirtualContainers(
      currScrollPosition,
      scrollBarHeight,
      rowsDispatchedHeight,
    );
    clearTimeout(this.timeout);
    if (Math.abs(this.lastPosition - this.elem.nativeElement.scrollTop) > 80) {
      this.timeout = setTimeout(() => {
        this.ngiwGetYRange.emit(this.YRange);
        this.ngiwGetVirtualContainersHeights.emit(this.virtualContainers);
      }, 70);
    } else {
      this.ngiwGetYRange.emit(this.YRange);
      this.ngiwGetVirtualContainersHeights.emit(this.virtualContainers);
    }
  }

  private _calculateScrollBarHeight() {
    return this.headHeight + this.rowHeight * this.ngiwRecordsLength();
  }

  private _preventScrollPositionOverload(
    currScrollPosition: number,
    scrollBarHeight: number,
    rowsDispatchedHeight: number,
  ): number {
    if (currScrollPosition > scrollBarHeight - rowsDispatchedHeight)
      currScrollPosition = scrollBarHeight - rowsDispatchedHeight;
    return currScrollPosition;
  }

  private _setVirtualContainers(
    currScrollPosition: number,
    scrollBarHeight: number,
    rowsDispatchedHeight: number,
  ) {
    const beforeCtnHeight = currScrollPosition; // Math.floor(currScrollPosition/this.rowHeight) * this.rowHeight; // to make virtual scrolling look great !!
    const afterCtnHeight =
      scrollBarHeight - (currScrollPosition + rowsDispatchedHeight);
    const virtualContainerBefore = this.elem.nativeElement.querySelector(
      '#virtual-container-before',
    );
    const virtualContainerAfter = this.elem.nativeElement.querySelector(
      '#virtual-container-after',
    );
    virtualContainerAfter.style.height = `${afterCtnHeight}px`;
    virtualContainerBefore.style.height = `${beforeCtnHeight}px`;
    this.virtualContainers = [beforeCtnHeight, afterCtnHeight];
  }

  private _getAmountOfRowsToDispatch() {
    let amountOfRows = Math.floor(
      (this._tblWrapper().offsetHeight - this.headHeight) / this.rowHeight,
    );
    if (amountOfRows > this.ngiwRecordsLength())
      amountOfRows = this.ngiwRecordsLength(); //this.virtualRowsCountIsSet = true;
    return amountOfRows;
  }

  private _setYRange(beforeCtnHeight: number, amountOfRowsToDispatch: number) {
    let rangeBegin = Math.floor(beforeCtnHeight / this.rowHeight);
    if (amountOfRowsToDispatch + rangeBegin > this.ngiwRecordsLength())
      rangeBegin = this.ngiwRecordsLength() - amountOfRowsToDispatch;
    this.YRange = Array.from(
      { length: amountOfRowsToDispatch },
      (x, i) => (x = i + rangeBegin),
    );
    return rangeBegin;
  }

  private _onKeyDown(indexRow: number, indexColumn: number) {
    const height = this._tblWrapperHeight();
    const tblTop = this._tblWrapperTop();
    let trTop;
    const trIndex = indexRow - this.YRange[0];
    const nthRow = this._nthRow(trIndex + 2);
    if (nthRow) {
      trTop = nthRow.getBoundingClientRect().y - tblTop;
      if (nthRow.children[indexColumn]) {
        //nthRow.children[indexColumn].focus();
      }
    }

    if (trTop && height - trTop < 50) {
      this._scroll(50);
    }
  }

  private _onKeyUp(indexRow: number, indexColumn: number) {
    let trTop;
    const tblTop = this._tblWrapperTop();
    const trIndex = indexRow - this.YRange[0];
    const nthRow = this._nthRow(trIndex + 2);
    if (nthRow) {
      trTop = nthRow.getBoundingClientRect().y - tblTop;
      // focus
      if (nthRow.children[indexColumn]) {
        nthRow.children[indexColumn].focus();
      }
    }
    if (trTop && trTop <= 50) this._scroll(-50);
  }

  private _tblWrapper() {
    return this.elem.nativeElement;
  }

  private _nthRow(n: number) {
    return this.elem.nativeElement.firstChild.firstChild.children[n];
  }

  private _tblWrapperTop() {
    return this.elem.nativeElement.getBoundingClientRect().y;
  }

  private _tblWrapperHeight() {
    return this.elem.nativeElement.offsetHeight;
  }

  private _scroll(inc: number) {
    const x = this._tblWrapper().scrollLeft;
    const y = this._tblWrapper().scrollTop;
    this._tblWrapper().scrollTo(x, y + inc);
  }
}

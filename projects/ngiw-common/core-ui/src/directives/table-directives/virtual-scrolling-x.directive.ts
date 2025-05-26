/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  input,
} from '@angular/core';

@Directive({
  selector: '[ngiwVirtualScrollingX]',
})
/**
 * @param {number} ngiwColumnsLength The length of all records;
 * @param {BehaviorSubject} ngiwArrowsKeysObservable An observebale to get keys event from host;
 * @callback ngiwGetYRange Get Y range to display in form of an array
 * for example [6,7,8,9,10,11,12] fro range 6-12;
 * @callback ngiwGetVirtulContainersHeights Return the heights of the virtual containers;
 */
export class VirtualScrollingXDirective {
  columnWidth!: number;
  XRange!: number[];
  currScrollPosition!: number;
  virtualContainers!: [number, number];
  ngiwColumnsLength = input<number>(0);
  ngiwArrowsKeysObservable = input<any>();
  ngiwFirstColumnFixed = input<any>(true);
  @Output() ngiwGetXRange = new EventEmitter();
  @Output() ngiwGetVirtualContainersWidths = new EventEmitter();
  @HostListener('scroll', ['$event']) scroll = () => {
    console.log('scrolling');
  };

  constructor(private elem: ElementRef) {
    setTimeout(() => {
      this._vsManager();
      if (this.ngiwArrowsKeysObservable()) {
        this.ngiwArrowsKeysObservable()!.subscribe((e: any) => {
          if (!e.type) return;
          switch (e.type) {
            case 'left':
              this._onKeyLeft(e.yIndex, e.xIndex);
              break;
            case 'right':
              this._onKeyRight(e.yIndex, e.xIndex);
              break;
          }
        });
      }
    }, 50);
  }

  private _getHeadAndRowsHeight(): boolean {
    //const th = document.getElementById('ngiwThForVS');
    this.columnWidth = 100;
    return true;
  }

  private _vsManager() {
    if (!this._getHeadAndRowsHeight()) {
      return;
    }
    const scrollBarWidths = this._calculateScrollBarWidths();
    const amountOfColumnsToDispatch = this._getAmountOfColumnsToDispatch(); //get rows to dispatch info
    const columnsDispatchedWidth = amountOfColumnsToDispatch * this.columnWidth;
    let currScrollPosition = -this._tblWrapper().scrollLeft;
    currScrollPosition = this._preventScrollPositionOverload(
      currScrollPosition,
      scrollBarWidths,
      columnsDispatchedWidth,
    ); /*prevent curr scroll position to overload */
    this.currScrollPosition = currScrollPosition;
    this._setXRange(currScrollPosition, amountOfColumnsToDispatch); //set the height of the virtual containers */
    this._setVirtualContainers(
      currScrollPosition,
      scrollBarWidths,
      columnsDispatchedWidth,
    );
    this.ngiwGetXRange.emit(this.XRange);
    this.ngiwGetVirtualContainersWidths.emit(this.virtualContainers);
  }

  private _calculateScrollBarWidths() {
    return this.columnWidth * this.ngiwColumnsLength();
  }

  private _preventScrollPositionOverload(
    currScrollPosition: number,
    scrollBarWidth: number,
    columnsDispatchedWidth: number,
  ) {
    if (currScrollPosition > scrollBarWidth - columnsDispatchedWidth)
      currScrollPosition = scrollBarWidth - columnsDispatchedWidth;
    return currScrollPosition;
  }

  private _setVirtualContainers(
    currScrollPosition: number,
    scrollBarWidth: number,
    columnsDispatchedWidth: number,
  ) {
    const beforeCtnWidth = currScrollPosition;
    let afterCtnWidth =
      scrollBarWidth - (currScrollPosition + columnsDispatchedWidth);
    if (afterCtnWidth < 0) afterCtnWidth = 0;
    this.virtualContainers = [beforeCtnWidth, afterCtnWidth];
  }

  private _getAmountOfColumnsToDispatch() {
    let amountOfColumns = Math.floor(
      this._tblWrapper().offsetWidth / this.columnWidth,
    );
    if (amountOfColumns > this.ngiwColumnsLength()) {
      amountOfColumns = this.ngiwColumnsLength();
    }
    return amountOfColumns;
  }

  private _setXRange(
    beforeCtnWidth: number,
    amountOfColumnsToDispatch: number,
  ) {
    let rangeBegin = Math.floor(beforeCtnWidth / this.columnWidth);
    if (amountOfColumnsToDispatch + rangeBegin > this.ngiwColumnsLength())
      rangeBegin = this.ngiwColumnsLength() - amountOfColumnsToDispatch;
    this.XRange = Array.from(
      { length: amountOfColumnsToDispatch },
      (x, i) => (x = i + rangeBegin),
    );
    return rangeBegin;
  }

  private _onKeyLeft(indexRow: number, indexColumn: number) {
    //const width = this._tblWrapperWidth();
    const tblLeft = this._tblWrapperLeft();
    let tdLeft;
    const tdIndex = indexColumn - this.XRange[0];
    const td = this._nthRow(indexRow + 2)?.children[tdIndex];
    if (td) {
      tdLeft = td.getBoundingClientRect().x - tblLeft;
      td.focus();
    }
    if (tdLeft && tdLeft < 200) {
      this._scroll(-200);
    }
  }

  private _onKeyRight(indexRow: number, indexColumn: number) {
    const tblLeft = this._tblWrapperLeft();
    let tdLeft;
    const tdIndex = indexColumn - this.XRange[0];
    const td = this._nthRow(indexRow + 2)?.children[tdIndex];
    const fixedTd: HTMLTableCellElement = this._nthRow(indexRow + 2)
      ?.children[0];
    const width = this._tblWrapperWidth() - fixedTd?.clientWidth;
    if (td) {
      tdLeft = td.getBoundingClientRect().x - tblLeft;
      td.focus();
    }
    if (tdLeft && width - tdLeft < 200) {
      this._scroll(200);
    }
  }

  private _scroll(inc: number) {
    const x = this._tblWrapper().scrollLeft;
    const y = this._tblWrapper().scrollTop;
    this.elem.nativeElement.scrollTo(x + inc, y);
  }

  private _scrollTo(to: number) {
    const y = this.elem.nativeElement.scrollTop;
    this.elem.nativeElement.scrollTo(to, y);
  }

  private _tblWrapper() {
    return this.elem.nativeElement;
  }

  private _nthRow(n: number) {
    return this.elem.nativeElement.firstChild.firstChild.children[n];
  }

  private _tblWrapperLeft() {
    return this.elem.nativeElement.getBoundingClientRect().x;
  }

  private _tblWrapperWidth() {
    return this.elem.nativeElement.offsetWidth;
  }

  OnChanges() {
    this._vsManager();
  }
}

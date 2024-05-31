/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidthService } from '../../services/table-services/width.service';
import { ActiveService } from '../../services/table-services/active.service';

@Component({
  selector: 'ngiw-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  @Input() ngiwRows!: number;
  @Input() ngiwCols!: number;
  @Input() ngiwFirstColumnFixed = true;
  @Input() ngiwHeight!: number;
  @Input() ngiwWidth!: number;
  @Input() ngiwIsLoading!: boolean;
  @Input() ngiwIsAdding!: boolean;
  //@Input() ngiwBindKeyEvents: boolean = true;
  @Input() ngiwCellCtxMenu = {};
  @ContentChild('ngiwHeader', { static: false }) headerTemplateRef!: TemplateRef<any>;
  @ContentChild('ngiwBody', { static: false }) bodyTemplateRef!: TemplateRef<any>;
  @ContentChild('ngiwContextMenu', { static: false }) contextMenuTemplateRef!: TemplateRef<any>;
  id: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  YRange: number[] = [];
  YRangeBegin!: number;
  YRangeFirstColumn: number[] = [];
  YRangeBeginFirstColumn!: number;
  XRange: number[] = [];
  XRangeBegin!: number;
  containersWidths!: [number, number];
  changedWidth!: { index: number, newWidth: number }
  columnsWidths: any = {}
  focusCoordinates: { row: number, col: number } = { row: 0, col: 1 }
  arrowsKeysObservable: BehaviorSubject<{
    type?: 'down' | 'up' | 'left' | 'right' | 'none',
    yIndex?: number, xIndex?: number
  }>
    = new BehaviorSubject({});
  isVirtualLoading = false;
  funcRef!: any;
  lastKeyPressTimestamp!: number;
  openCustomCtxMenu: { row: number, col: number } = { row: null as any, col: null as any };
  isScrolling = false;
  timeout!: any;
  table!: any;
  activeCell:any = {}
  public positions = [
    new ConnectionPositionPair({
      originX: 'start',
      originY: 'top'
    }, {
      overlayX: 'end',
      overlayY: 'top'
    },
      -5, -20
    )
  ];
  constructor(private widthService: WidthService,
    private activeService: ActiveService) { }

  ngOnInit(): void {
    this.onGetXRange({});
    /*if (this.ngiwBindKeyEvents) {
      this.funcRef = (e: any) => { this.handleKeyDown(e) }
      window.addEventListener('keydown', this.funcRef);
    }*/
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.funcRef);
  }

  ngAfterViewInit() {
    this.blurAllInputsChildsOnScrolling();
  }

  blurAllInputsChildsOnScrolling() {
    this.table = document.getElementById(this.id);
    this.table.addEventListener('scroll', () => {
      const hasFocusedElem = this.table.contains(document.activeElement);
      let isFocusedElemInput;
      if (hasFocusedElem) {
        isFocusedElemInput = document.activeElement?.matches('input')
          || document.activeElement?.matches('textarea')
        if (isFocusedElemInput)
          (<HTMLInputElement>document.activeElement).blur();
      }
    })
  }


  handleContextMenu(event: any, row: any, col: any) {
    if (!this.ngiwCellCtxMenu)
      return;
    event.preventDefault();
    this.openCustomCtxMenu = { row: row + this.YRangeBegin, col: col + this.XRangeBegin };

    this.detectChanges();
  }

  closeOverlay() {
    this.openCustomCtxMenu = { row: null as any, col: null as any };
    this.detectChanges();
  }

  handleKeyDown(e: any, row = 0, col = 0) {
    const keyCode = e.keyCode;
    if (keyCode > 36 && keyCode < 41)
      e.preventDefault();
    const d = new Date()
    const currTimestamp = d.getTime();
    if (currTimestamp - this.lastKeyPressTimestamp < 50)
      return;
    switch (keyCode) {
      case 37: this._goArrowLeft(); break;
      case 38: this._goArrowUp(); break;
      case 39: this._goArrowRight(); break;
      case 40: this.goArrowDown(); break;
    }
    this.lastKeyPressTimestamp = currTimestamp;
  }

  private goArrowDown() {
    if (this.focusCoordinates.row >= this.ngiwRows - 1)
      return;
    this.focusCoordinates.row++;
    this.arrowsKeysObservable
      .next({ type: 'down', yIndex: this.focusCoordinates.row, xIndex: this.focusCoordinates.col })
    this._setActiveCell();
    this.detectChanges();
  }

  private _goArrowUp() {
    if (this.focusCoordinates.row <= 0)
      return;
    this.focusCoordinates.row--;
    this.arrowsKeysObservable
      .next({ type: 'up', yIndex: this.focusCoordinates.row, xIndex: this.focusCoordinates.col })
    this._setActiveCell();
    this.detectChanges();
  }

  private _goArrowLeft() {
    if (this.focusCoordinates.col >= this.ngiwCols - 1)
      return;
    this.focusCoordinates.col++;
    this.arrowsKeysObservable
      .next({ type: 'left', yIndex: this.focusCoordinates.row, xIndex: this.focusCoordinates.col })
    this._setActiveCell();
    this.detectChanges();
  }

  private _goArrowRight() {
    if (this.focusCoordinates.col <= 0)
      return;
    this.focusCoordinates.col--;
    this.arrowsKeysObservable
      .next({ type: 'right', yIndex: this.focusCoordinates.row, xIndex: this.focusCoordinates.col });
    this._setActiveCell();
    this.detectChanges();
  }


  onFocus(row: any, col: any) {
    this.focusCoordinates.col = col + this.XRangeBegin;
    this.focusCoordinates.row = row + this.YRangeBegin;
    this._setActiveCell();
    this.detectChanges();
  }


  onGetYRange(e: any) {
    const len = e.length;
    this.YRange = [];
    Array.from({ length: len }, (x, i) => this.YRange[i] = i);
    this.YRangeBegin = e[0];
    this.isScrolling = false;
    this.detectChanges();
    this.timeout = null;
  }

  onGetXRange(e: any) {
    this.XRange = [];
    const len = this.ngiwCols;
    const incremente = (this.ngiwFirstColumnFixed) ? (1) : (0)
    Array.from({ length: len - incremente }, (x, i) => this.XRange[i] = i + incremente);
    this.XRangeBegin = 0;

  } 


  onGetContainersWidths(e: any) {
    this.containersWidths = e;
  }

  onResize(width: any, col: any) {
    const bar = document.getElementById('resize-bar');
    const table = document.getElementById(this.id) as any;
    const column = (<any>document.getElementById(this.id)?.firstChild?.firstChild).children[0].children[col + this.XRangeBegin];
    if (column && bar) {
      const leftFromDocument = column.getBoundingClientRect().right + width;
      const topFromDocument = table?.getBoundingClientRect().top;
      const bottomMinusTop = table.getBoundingClientRect().bottom - table.getBoundingClientRect().top;
      bar.style.left = leftFromDocument + 'px';
      bar.style.top = topFromDocument + 'px';
      bar.style.maxHeight = bottomMinusTop + 'px';
      bar.style.visibility = 'visible';
      this.changedWidth = { index: col + this.XRangeBegin, newWidth: -width }

    }
  }

  onMouseUp() {
    if (this.changedWidth) {
      this.columnsWidths[this.changedWidth.index] = this.changedWidth.newWidth;
      this.widthService.setWidth(this.changedWidth.index, this.changedWidth.newWidth);
      const bar = document.getElementById('resize-bar') as any;
      bar.style.visibility = 'hidden';
      this.detectChanges();
    }

    this.changedWidth = null as any;
  }

  onVirtualLoading(is: boolean) {
    this.isVirtualLoading = is;
    this.detectChanges();
  }

  getThWidth = (col:any) => {
    return (this.columnsWidths[col + this.XRangeBegin])
      ?
    (this.columnsWidths[col + this.XRangeBegin]+ 'px')
      :('') 
  }

  isOverlayOpen =  (row:any, col:any) => {
   return  (this.openCustomCtxMenu.row === row  + this.YRangeBegin
           && this.openCustomCtxMenu.col === col  + this.XRangeBegin);
  }

  showCloseOverlay =  (row:any) => {
    return (this.contextMenuTemplateRef &&  this.ngiwRows - row  + this.YRangeBegin > 0);
   }


  detectChanges() {
    console.log('changes detected')
  }

  private _setActiveCell() {
    this.activeCell = {row: this.focusCoordinates.row, col: this.focusCoordinates.col};
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'ngiw-header-cell',
  templateUrl: './header-cell.component.html',
  styleUrls: ['./header-cell.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderCellComponent {
  @Input() showFilterSorter = false;
  @Input() headerLabel = '';
  @Input() searchList: any[] = undefined as any;
  @Input() createSearchListFn: () => any[] = undefined as any;

  @Output() onFilter = new EventEmitter();
  @Output() onUndoFilter = new EventEmitter()

  locker = false;
  showPopover = false;
  currentSearchList: BehaviorSubject<any> = new BehaviorSubject([]);
  currentFilter = [];
  isCreatingList = false;
  constructor(private ref: ChangeDetectorRef) { }


  public columnHasFilter() {
    return this.currentFilter.length > 0;
  }

  public columnUndoFilter() {
    this.currentFilter = [];
    this.onUndoFilter.emit();
  }



  public createSearchList() {
    if (!this.searchList && typeof this.createSearchListFn === 'function') {
      this.isCreatingList = true;
      setTimeout(() => {
        const list = this.createSearchListFn();
        list.forEach(row => { if (typeof row.label === 'number') row.label = row.label.toString() });
        this.isCreatingList = false;
        this.currentSearchList.next(list);
      });
    }
  }



  public onSortColumn(event?: any) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public onFilterCol(event: any) {
    this.showPopover = false;
    this.lockPopover();
    this.currentFilter = event;
    this.onFilter.emit(event);
  }

  lockPopover = () => {
    this.locker = true;
    setTimeout(() => {
      this.locker = false;
    }, 500)
  }

  public onPopoverVisibleChange() {
    if (this.locker) {
      return;
    }
    this.showPopover = !this.showPopover;
  }
}


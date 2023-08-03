import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngiw-header-cell',
  templateUrl: './header-cell.component.html',
  styleUrls: ['./header-cell.component.scss']
})
export class HeaderCellComponent implements OnInit {
  @Input()showFilterSorter = false;
  @Input()headerLabel:string = '';
  @Input()searchList:any[] = undefined as any;
  @Input()createSearchListFn:() => any[] = undefined as any;
  
  @Output()onFilter = new EventEmitter();
  @Output()onUndoFilter = new EventEmitter()

  locker:boolean = false;
  showPopover:boolean = false;
  currentSearchList:any[] = [];
  currentFilter = [];
  constructor() { }

  ngOnInit(): void {
  }

  public columnHasFilter(){
    return this.currentFilter.length > 0;
  }

  public columnUndoFilter() {
    this.currentFilter = [];
    this.onUndoFilter.emit();
  }



  public createSearchList() {
    if (!this.searchList && typeof this.createSearchListFn === 'function') {
      this.currentSearchList = this.createSearchListFn();
      this.currentSearchList.forEach(row => { if (typeof row.label === 'number')  row.label =  row.label.toString()})
    }
   }

   

   public onSortColumn(event?:any) {
     if(event){
      event.preventDefault();
      event.stopPropagation();
     }
  }

   public onFilterCol(event:any) {
     this.showPopover = false;
     this.lockPopover();
     this.currentFilter = event;
     this.onFilter.emit(event);
   }

   lockPopover = () => {
    this.locker = true;
     setTimeout(() => {
      this.locker = false;
     },500)
   }

   public onPopoverVisibleChange() {
    if (this.locker) {
      return;
    }
      this.showPopover = !this.showPopover;
  }
}


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationPipe } from 'ngiw-core-utils';


interface ISearch {
  label: string, id: string, checked?: boolean
}


@Component({
  selector: 'ngiw-filter-sorter',
  templateUrl: './filter-sorter.component.html',
  styleUrls: ['./filter-sorter.component.scss']
})
export class FilterSorterComponent implements OnInit {
  @Input() listSortBy: ISearch[] = [];
  @Output() sorted = new EventEmitter();

  @Input() searchList: ISearch[] = [];

  @Output() filter = new EventEmitter();
  section: 'filter' | 'sort' | 'none' = 'none';


  constructor(private translate:TranslationPipe) { }

  translatePrefix = 'table.header-cell.filter-sorter.';
  tmpSearchList: any;
  isFilterError: boolean = false;
  isCreatingList: boolean = false;
  mode: "asc" | "desc" | "none" = "none";
  tmpSortList: any[] = [];
  sortId: any;

  ngOnInit(): void {
    this._initSearchList();
    this.onSectionFilter();
  }

  onSectionFilter() {
    this.section = 'filter';
    setTimeout(() => {
      let elem = document.getElementById('input-filter');
      if (elem) {
        elem.focus()
      }
    }, 200)
  }

  onInputSearch(event:any) {
    const searchPattern = event.target.value;
    let filtered = this.searchList.filter(searchRow => searchRow.label.includes(searchPattern))
    this.tmpSearchList = filtered;
  }

  onFilter() {
    let checked = this.tmpSearchList.filter((s: any) => s.checked);
    if (!checked || checked.length === 0) {
      this.isFilterError = true;
      return;
    }
    this.filter.emit(checked);
  }

  onSort() {
    this.sorted.emit({ prop: this.sortId, mode: this.mode });
  }

  onSectionSort() {
    this.section = 'sort';
  }

  _initSearchList() {
    this.tmpSearchList = this.searchList;
    this.tmpSortList = this.listSortBy;
    if (this.listSortBy && this.listSortBy[0])
      this.sortId = this.listSortBy[0].id;
  }

  onChangeSortMode = (mode:'asc' | 'desc') => {
    this.mode = mode;
    this.onSort();
  }

  ngOnChanges = (e:any) => {
    console.log(e)
      if (e.searchList) {
        this._initSearchList()
      }
  }
}


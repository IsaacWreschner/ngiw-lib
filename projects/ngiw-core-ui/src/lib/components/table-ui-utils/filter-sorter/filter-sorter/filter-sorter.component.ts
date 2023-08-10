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
  @Input() ngiwListSortBy: ISearch[] = [];
  @Input() ngiwIsCreatingList: boolean = false;
  @Input() ngiwSearchList: ISearch[] = [];
  @Output() ngiwSorted = new EventEmitter();
  @Output() ngiwFilter = new EventEmitter();

  section: 'filter' | 'sort' | 'none' = 'none';


  constructor(private translate:TranslationPipe) { }

  translatePrefix = 'table.header-cell.filter-sorter.';
  tmpSearchList: any;
  isFilterError: boolean = false;

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
    let filtered = this.ngiwSearchList.filter(searchRow => searchRow.label.includes(searchPattern))
    this.tmpSearchList = filtered;
  }

  onFilter() {
    let checked = this.tmpSearchList.filter((s: any) => s.checked);
    if (!checked || checked.length === 0) {
      this.isFilterError = true;
      return;
    }
    this.ngiwFilter.emit(checked);
  }

  onSort() {
    this.ngiwSorted.emit({ prop: this.sortId, mode: this.mode });
  }

  onSectionSort() {
    this.section = 'sort';
  }

  _initSearchList() {
    this.tmpSearchList = this.ngiwSearchList;
    this.tmpSortList = this.ngiwListSortBy;
    if (this.ngiwListSortBy && this.ngiwListSortBy[0])
      this.sortId = this.ngiwListSortBy[0].id;
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


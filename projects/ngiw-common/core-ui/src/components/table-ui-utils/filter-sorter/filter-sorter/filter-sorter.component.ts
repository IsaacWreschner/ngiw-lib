/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { TranslationPipe } from 'ngiw-core-utils';
import {Observable} from 'rxjs';


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
  @Input() ngiwIsCreatingList = false;
  @Input() $ngiwSearchList!: Observable<ISearch[]>;
  @Output() ngiwSorted = new EventEmitter();
  @Output() ngiwFilter = new EventEmitter();

  section: 'filter' | 'sort' | 'none' = 'none';


  //constructor(/*private translate:TranslationPipe*/) { }

  translatePrefix = 'table.header-cell.filter-sorter.';
  tmpSearchList: any;
  fullSearchList: any;
  isFilterError = false;

  mode: "asc" | "desc" | "none" = "none";
  tmpSortList: any[] = [];
  sortId: any;

  ngOnInit(): void {
    this.onSectionFilter();

    this.$ngiwSearchList?.subscribe((list:any) => {
      this._initSearchList(list);
    })
    //setInterval(() => {
      //console.log(this.ngiwSearchList)
    //},1000)
  }

  onSectionFilter() {
    this.section = 'filter';
    setTimeout(() => {
      const elem = document.getElementById('input-filter');
      if (elem) {
        elem.focus()
      }
    }, 200)
  }

  onInputSearch(event:any) {
    const searchPattern = event.target.value;
    this.tmpSearchList = this.top100(this.filter(searchPattern));
  }

  onFilter() {
    const checked = this.tmpSearchList.filter((s: any) => s.checked);
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

  _initSearchList(list:any) {
    console.log(list);
    this.fullSearchList = list;
    this.tmpSearchList =  this.top100(this.filter(''));
    this.tmpSortList = this.ngiwListSortBy;
    if (this.ngiwListSortBy && this.ngiwListSortBy[0])
      this.sortId = this.ngiwListSortBy[0].id;
  }

  onChangeSortMode = (mode:'asc' | 'desc') => {
    this.mode = mode;
    this.onSort();
  }

  top100 = (list:any) => {
      return list.filter((x:any,i:number) => i < 100);
  }

  filter = (searchPattern:string) => {
    return this.fullSearchList.filter((searchRow:any) => searchRow.label !== '' && searchRow.label?.includes(searchPattern))
  }
}


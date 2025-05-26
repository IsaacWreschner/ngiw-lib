/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, input } from '@angular/core';
import { BaseCdkComponent } from '../base-cdk/base-cdk.component';
import { TableCdkModel } from '../../models/table-cdk.model';
import { TableFiltersUtils, TableGroupsUtil, TableSelectionUtils } from 'ngiw-common/core-utils';
import { exhaustMap, map, tap } from 'rxjs';

@Component({
  selector: 'ngiw-table-cdk',
  templateUrl: './table-cdk.component.html',
  styleUrls: ['./table-cdk.component.css'],
})
export class TableCdkComponent<Data> extends BaseCdkComponent implements AfterViewInit {
  override model = input<TableCdkModel<Data>>({} as TableCdkModel<Data>);

  columnsHeaders: string[] = [];

  tableGroupsUtil!: TableGroupsUtil;
  tableFiltersUtil!: TableFiltersUtils;
  tableSeleciontUtil!: TableSelectionUtils;

  activeInput = {
    row: -1,
    column: -1,
    valid: true,
    errorMsg: '',
    hint: ''
  }

  _state = {
    rowsAmount: 0,
    data: []
  }

  asyncLoading: any = {

  }

  markdowns: any = {};
  dataSource:any[] = [];

  ngAfterViewInit(): void {
    this.setUtils();
    this.setDataPipe().subscribe((finalData: any[]) => {
      this.setSourceData(finalData)
    });
    this.setColumnsHeader();

    this.model().$freeSearchPattern.subscribe((pattern: string) => {
      if (typeof pattern == 'string') {
        this.tableFiltersUtil.setFreeSearchPattern(pattern);
      }
    });
  }

  setColumnsHeader = () => {
    this.columnsHeaders = this.model().columns
      .map((col: any) => col.headerName);
  }

  setUtils = () => {
    this.tableGroupsUtil = new TableGroupsUtil((this.model().groupBy) ? ({ groupBy: this.model().groupBy }) : {});
    const filters: any = {}
    this.model().columns
      .filter((col: any) => col.showFilterInHeader)
      .forEach((col: any) => {
        filters[col.prop] = {
          key: null, method: {
            name: 'exactmatch'
          }
        }
      });
    const filterParameter = {
      freeSearchProps: this.model().freeSearchProps,
      filters: filters
    }
    this.tableFiltersUtil = new TableFiltersUtils(filterParameter);
    this.tableSeleciontUtil = new TableSelectionUtils();
  }

  setDataPipe = () => {
    return this.model()?.$source.pipe(
      tap((data:Data[]) => { this.setUUID(data); }),
      tap(() => this.asyncLoading = {}),
      tap((data: Data[]) => this.createVirtualProps(data)),
      tap((data: Data[]) => this.createMarkdowns(data)),
      map((data: Data) => this.tableGroupsUtil.setData(data)),
      map((groupedData) => { this.tableFiltersUtil.setData(groupedData) }),
      exhaustMap(() => this.tableFiltersUtil.$data),
      tap((filteredData) => { this.tableSeleciontUtil.setData(filteredData) }),
    )
  }

  setSourceData = (finalData: any[]) => {
    this.dataSource = finalData.map(r => {return {...r}});
    this.updateState('rowsAmount', finalData.length);
  }

  setUUID = (data: Data[]) => {
    data.forEach((row: any, i: number) => {
      row['__uuid'] = i
    })
  }

  createVirtualProps = (data: any[]) => {
    Object.keys(this.model().virtualProps).forEach((virtualPropKey:string) => {
      if (typeof this.model().virtualProps[virtualPropKey] !== 'function') {
        return;
      }
      data.forEach((row: any) => {
        row[virtualPropKey] = this.model().virtualProps[virtualPropKey](row);
      })
    });
  }

  createMarkdowns = (data: any[]) => {
    data.forEach((rowData: any, rowIndex: number) => {
      const columns = this.model().columns;
      columns.forEach((column: any, colIndex: number) => {
        const prop = column.prop;
        const markdownFn = column.displaySettings?.markdownSettings?.markdown;

        if (markdownFn && typeof markdownFn === 'function') {
          const markdownValue = markdownFn(rowData[prop]);
          const key = `${rowIndex}-${colIndex}`;
          this.markdowns[key] = markdownValue;
        }
      });
    });
  }

  createSearchListFunction = (key: string): () => any[] => {
    return () => {
      return this.dataSource
        .map((row: any) =>
          Object.assign(
            {
              id: row[key],
              label: row[key],
              checked: false
            })
        )
    };
  }

  onFilterColumn = (column: any, event: any) => {
    this.tableFiltersUtil.setFilterKey(column.prop, event.map((entry: any) => entry.id));
  }

  onUndoFilterColumn = (column: any) => {
    this.tableFiltersUtil.setFilterKey(column.prop, null);
  }

  updateState = (stateProp: 'rowsAmount' | 'data', value: any, event?:any) => {
  /*  this._state[stateProp] = value;
    this.state.emit(this._state);
    const subscribption = this.model().state ? this.model().state[`$${stateProp}`] : null;
    if (subscribption && typeof subscribption == 'function') {
      subscribption(value, event);
    }*/
  }


  showFilterSorterOnHeader = (col: number) => {
    return this.model().showFilterInHeader || this.getDefs(col).showFilterInHeader;
  }

  hasCustomFisrtColumn = () => {
    return this.model().firstColumn ? true : false;
  }

  getAmountOfColumns = () => {
    return this.hasCustomFisrtColumn() ? this.model().columns.length + 1 : this.model().columns;
  }

  getDefs = (col: number) => {
    return this.hasCustomFisrtColumn() ? this.model().columns[col - 1] : this.model().columns[col]
  }

  getProp = (col: number) => {
    return this.getDefs(col).prop;
  }

  loadAsyncVirtualprop = (row: number, col: number) => {
    const ocuurenceUID = this.getAsyncPropUID(row, col);
    if (this.asyncLoading[ocuurenceUID]) {
      return;
    }
    const prop = this.getProp(col) as string;

    const zoneAwarePromise = this.model().asyncVirtualProps[prop](this.getRowData(row));
    if (!zoneAwarePromise) return
    zoneAwarePromise.then((loader: any) => {
      if (!loader) {
        this.asyncLoading[ocuurenceUID] = 'failed';
        return;
      }
      loader?.subscribe((asyncPropResults: any) => {

        this.getRowData(row)[prop] = asyncPropResults;
        this.asyncLoading[ocuurenceUID] = 'loaded';
      });
    })

    this.asyncLoading[ocuurenceUID] = 'loading';
  }

  getAsyncVirtualPropStatus = (row: number, col: number) => {
    return this.asyncLoading[this.getAsyncPropUID(row, col)];
  }

  getAsyncPropUID = (row: number, col: number) => {
    return `${this.getRowData(row)['__uuid']}-${col}`;
  }



  isAsyncVirtualProp = (col: number) => {
    return this.model().asyncVirtualProps && this.model().asyncVirtualProps[this.getDefs(col).prop as string] ? true : false;
  }

  getRowData = (row: number) => {
    return this.dataSource[row];
  }

  getExpandIcon = (row: number) => {
    return this.tableGroupsUtil
      .isExpanded(this.getRowData(row)) ? 'expand_more' : 'chevron_right';
  }

  getValue = (row: number, col: number) => {
    return this.getRowData(row) ? this.getRowData(row)[this.getProp(col)] : null;
  }

  getDisplay = (col: number) => {
    return this.getDefs(col).displaySettings
  }

  getDisplayType = (col: number) => {
    return this.getDefs(col).displaySettings?.type
  }

  setValue = (row: number, col: number, value: any) => {
    const oldValue = this.getRowData(row)[this.getProp(col)];
    this.getRowData(row)[this.getProp(col)] = value;
    this.updateState('data', this.dataSource, {
       row: this.getRowData(row),
       rowIndex: row,
       prop: this.getProp(col),
       oldValue: oldValue,
       newValue: value
    });
  }

  expand = (row: number) => {
    this.tableGroupsUtil.expand(row);
  }

  isExpandable = (row: number) => {
    return this.tableGroupsUtil.isExpandable(this.getRowData(row));
  }

  isEditable = (col: number) => {
    return this.getDefs(col).editable;
  }

  getInputStatus = () => {
    return this.activeInput.valid ? '' as any : 'error' as any
  }

  getHint = () => {

  }

  getErrorMsg = () => {

  }

  getLayout = (col: number) => {
    return this.getDefs(col).layout;
  }

  getMarkdown = (row: number, col: number) => {
    return this.markdowns[`${this.getRowData(row)['__uuid']}-${col -1}`];
  }

  onPopoverVisibiltyChange = (e: any, row: number, col: number) => {
    if (e === true && this.getLayout(col)?.popover?.onInit) {
      this.getLayout(col)?.popover?.onInit(this.getRowData(row), col)
    }
  }

  setActiveInputStatus = (e: any, row: number, col: number) => {
    const input = e.target.value;
    const validator = this.getDefs(col).editSettings?.validator;
    if (!validator || typeof validator !== 'function') {
      this.activeInput.valid = true;
      return;
    }
    this.activeInput.valid = validator(input);
  }

  isFirstColumn = (col: number) => {
    return col === 0;
  }

  isOnEditMode = (row: number, col: number) => {
    return this.activeInput.row === row && this.activeInput.column === col;
  }

  setOnEditMode = (row: number, col: number) => {
    this.activeInput = {
      row: row,
      column: col,
      valid: true,
      errorMsg: '',
      hint: ''
    }
  }

  onBlur = (row: number, col: number) => {
    if (this.isOnEditMode(row, col)) {
      this.setOnEditMode(-1, -1);
    }
  }

  onChange = (row: number, col: number, e: any) => {
    const value = e.target.value;
    if (this.activeInput.valid) {
      this.setValue(row, col, value);
      //this.emitDataChange(row, col, value);
    }
    this.onBlur(row, col);
  }
}



/* loadTemplates = () => {
     this.defs.columns.forEach((col: any, i:number) => {
       if (col.customTemplate) {
         this.templates[i] = 
       }
     });
   }*/


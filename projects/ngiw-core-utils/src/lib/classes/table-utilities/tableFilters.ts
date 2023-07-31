import { BehaviorSubject, Subject } from "rxjs";
import { IUtils } from "./Iutils";
import { _TableLayerService } from "./tableLayer";


type Filter = {
    key: string | number | boolean | string[] | number[] | boolean[],
    skip?: boolean,
    method: {
        name: 'exactmatch' | 'contain' | 'empty' | 'custom';
        func?:(row:any) => boolean
    }
}



export class TableFiltersUtils implements IUtils {
    private data: any[] = [];
    private filteredData: any[] = [];
    private freeSearchProps: string[] = []
    private filters: { [key: string]: Filter };
    private childFilters: { [key: string]: Filter }
    public freeSearchPattern = '';
    public $data:BehaviorSubject<any> = new BehaviorSubject([]);
    timeout = {};
    constructor(options: {
        freeSearchProps?: string[],
        filters?: { [key: string]: Filter },
        childFilters?: { [key: string]: Filter }
    }) {
        this.freeSearchProps = options.freeSearchProps || [];
        this.filters = options.filters || {};
        this.childFilters = options.childFilters || {};
    }

    private propagateChange = () => {
        clearTimeout(this.timeout as any)
        this.timeout = setTimeout(()=> {
            this.$data.next(this.filter());
        },100)
    }

    setData = (data: any) => {
        this.data = data;
        this.$data.next(this.filter());
        return data;
    }

    setFreeSearchPattern = (pattern: string) => {
        this.freeSearchPattern = pattern;
        this.propagateChange();
    }

    resetFreeSearchPattern = () => {
        this.freeSearchPattern = '';
        this.propagateChange();
    }

    setFilterKey = (filter:string,key:any) => {
        if(!this.filters[filter]) {
            console.error(`no filter found for "${filter}"`)
            return;
        }
        this.filters[filter].key = key;
        this.propagateChange();
    }

    setChildFilterKey = (filter:string,key:any) => {
        this.childFilters[filter].key = key;
        this.propagateChange();
    }



    filter = (limit = -1) => {
        let lastParentFiltered = false;
        let filteredCounter = 0;
        return this.data.filter((row: any) => {
            if (limit != -1 && filteredCounter > limit) {
                return false;
            }
            if (!_TableLayerService.getLayerOnRow(row,'tableDataUtil')?.isChild) {
                const isParent = _TableLayerService.getLayerOnRow(row,'tableDataUtil')?.isParent;
                let childsScanned = this.scanRows(row.courses,this.childFilters);
                lastParentFiltered = this.matchFreeSearchPattern(row) && this.scanFilters(row) && (childsScanned > 0 || !isParent);
                row.childsScanned = childsScanned;
                if (lastParentFiltered) {
                    filteredCounter ++;
                }
                return lastParentFiltered;
            }
            else {
                const filtered = this.scanChildFilters(row);
                return (lastParentFiltered && filtered);
            }
        });
    }


    scanRows = (rows:any,filters:{ [key: string]: Filter }) => {
        let rowScanned = 0;
        rows?.forEach((row:any) => {
            if (this.scanRow(row,filters)){
                rowScanned ++;
            }
        });
        return rowScanned;
    }

    scanRow = (row:any,filters:{ [key: string]: Filter }) => {
        let match = true;
        Object.keys(filters).forEach((prop) => {
            if (!filters[prop].skip) {
                if (!this.matchFilter(row, prop, filters[prop])) {
                    match = false;
                }
            }
        })
        return match;
    }

    matchFreeSearchPattern = (row: any) => {
        return !this.freeSearchPattern || Object.keys(row)
            .filter(key =>
                typeof (row as any)[key] === 'string'
                && this.freeSearchProps.includes(key)
                && (row as any)[key].includes(this.freeSearchPattern)).length > 0
    }

    scanFilters = (row: any) => {
        return this.scanRow(row,this.filters)
    }

    scanChildFilters = (row: any) => {
        return this.scanRow(row,this.childFilters)
    }

    matchFilter = (row: any, prop: string, filter: Filter) => {
        const key:any = filter.key;
        const isArray = typeof key === 'object';
        switch (filter.method.name) {
            case 'exactmatch': return (!key && key != 0) || (!isArray && row[prop] === key) || (isArray && key.includes(row[prop]));
            case 'custom': return filter.method.func ? filter.method.func(row): false;
            default: return false;
        }
    }


}
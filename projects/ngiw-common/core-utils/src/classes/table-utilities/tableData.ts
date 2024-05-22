import { Subject } from "rxjs";
import { _TableLayerService } from "./tableLayer";
import { IUtils } from "./Iutils";

const LAYER_NAME = 'tableDataUtil';

export class TableDataUtil implements IUtils {
    hasUid:boolean = false;
    uid:string | Function | undefined;
    data:any = [];
    $data:Subject<any[]> = new Subject();
    constructor(uid?:string | Function ) {
        this.uid = uid;
        if (uid) {
            this.hasUid = true;
        }
    }

    setData = (data: any) => {
        let _data = [];
        _data = data;
        _data.forEach((row:any,i:number) => {_TableLayerService.setLayerOnRow(row,LAYER_NAME,{idx:i})})

        if (this.data.length > 0 && this.hasUid) {
            _data = this.mergeData(_data);
        }
        this.data = _data;
        return _data;
    }


    private mergeData = (data:any) => {
       const helper:any = {};
       this.data.forEach((row:any) => helper[this.getUid(row)] = row);
       return data.map((row:any) => { return {...helper[this.getUid(row)], ...row}});
    }


    private getUid = (row:any) => {
        if (typeof this.uid === 'string') {
            return row[this.uid];
        }
        if (typeof this.uid === 'function') {
            return this.uid(row);
        }
    }

}
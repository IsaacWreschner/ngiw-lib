import { Subject } from "rxjs";
import { _TableLayerService } from "./tableLayer";
import { IUtils } from "./Iutils";

const LAYER_NAME = 'tableDataUtil';

export class TableDataUtil implements IUtils {
    hasUid:boolean = false;
    uid:string | Function | undefined;
    options:{ flatternBy?:string |Function } | undefined;
    data:any = [];
    $data:Subject<any[]> = new Subject();
    constructor(uid?:string | Function, options?:{ flatternBy?:string |Function }) {
        this.options = options;
        this.uid = uid;
        if (uid) {
            this.hasUid = true;
        }
    }

    setData = (data: any) => {
        let _data = [];
        if (this.options && this.options.flatternBy) {
           _data = this.flatternData(data);
        } else {
            _data = data;
            _data.forEach((row:any,i:number) => {_TableLayerService.setLayerOnRow(row,LAYER_NAME,{idx:i})})
        }
        if (this.data.length > 0 && this.hasUid) {
            _data = this.mergeData(_data);
        }
        this.data = _data;
        return _data;
    }

    isExpandable = (row:any) => {
        return this.hasChilds(row);
    }


    isChild = (row:any) => {
        return _TableLayerService.getLayerOnRow(row, LAYER_NAME).isChild;
    }

    refresh = () => {

    }

    chainUtil = (util:IUtils) => {
        util.setData(this.data);
        return util;
    }

    private mergeData = (data:any) => {
       const helper:any = {};
       this.data.forEach((row:any) => helper[this.getUid(row)] = row);
       return data.map((row:any) => { return {...helper[this.getUid(row)], ...row}});
    }

    private flatternData = (data:any):any[] => {
        let toggleCounter = 0;
        const _data:any[] = []
        data.forEach((row:any, i:number) => {
            const parentLayer = {
                hasChild:this.hasChilds(row),
                idx: i + toggleCounter,
                isChild:false,
                childsRef:[] as any
            }
            _TableLayerService.setLayerOnRow(row,LAYER_NAME, parentLayer )
            _data.push(row);
            this.getChilds(row)?.forEach((child:any,j:number) => {
                const childLayer = {
                    idx: i + toggleCounter + j + 1,
                    isChild:true
                }
                child.isChild = true;
                child.parent = row;
                _TableLayerService.setLayerOnRow(child,LAYER_NAME,childLayer)
                parentLayer.childsRef.push(child)
                _data.push(child);
            })
            toggleCounter += (this.getChilds(row)?.length || 0);
          });
        return _data;
    }

    private getChilds = (row:any) => {
        return this.options?.flatternBy ? row[this.options.flatternBy as string] : [];
     }
 
     private hasChilds(row: any): boolean {
         return !!this.getChilds(row) && this.getChilds(row).length > 0;
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
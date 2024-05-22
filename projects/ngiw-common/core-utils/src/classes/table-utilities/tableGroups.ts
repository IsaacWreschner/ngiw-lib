import { BehaviorSubject, Subject } from "rxjs";
import { IUtils } from "./Iutils";
import { TableDataUtil } from "./tableData";
import { _TableLayerService } from "./tableLayer";

const LAYER_NAME = 'tableGroupUtil';

type DataGroupRow = {
    isChild:boolean,
    idx:number,
    isToggled:boolean,
    expendable:boolean
    parent?:DataGroup,
} & any;

type DataGroup = DataGroupRow[];

export class TableGroupsUtil implements IUtils { 
  private data:any[] = [];
  public $data:BehaviorSubject<any> = new BehaviorSubject([]);

  
  options:{ groupBy?:string |Function } | undefined;


  constructor(options?:{ groupBy?:string |Function }) {
      this.options = options;
  }

  setData = (data: any) => {
    this.data = data;
    if (this.options && this.options.groupBy) {
      this.data = this.flatternData(data);
    }
    this.propagateChange();
    return data;
   }

   private propagateChange = () => {
      this.$data.next(this.filterRows());
   }


   expand = (row:any) => {
    const isExpandable = this.hasChilds(row);
    if (isExpandable) {
      _TableLayerService.setLayerOnRow(row, LAYER_NAME,{
        isExpanded:true
      });
      _TableLayerService.getLayerOnRow(row,LAYER_NAME).childsRef.map((child:any) => {
        _TableLayerService.setLayerOnRow(child,LAYER_NAME,{
          isToggledOn:true
        });
      });    
    }
    this.propagateChange();
   }

   hide = (row:any) => {
    const isExpandable = this.hasChilds(row);
    if (isExpandable) {
      _TableLayerService.setLayerOnRow(row, LAYER_NAME,{
        isExpanded:false
      });
      _TableLayerService.getLayerOnRow(row, LAYER_NAME).childsRef.map((child:any) => {
        _TableLayerService.setLayerOnRow(child, LAYER_NAME,{
          isToggledOn:false
        });
      });   
    }
    this.propagateChange();
   }

   isExpanded = (row:any) => {
      return _TableLayerService.getLayerOnRow(row, LAYER_NAME)?.isExpanded;
   }

 

   filterRows = (limit = -1) => {
    return this.data.filter((row: any) => {
        return this.isChild(row) || _TableLayerService.getLayerOnRow(row, LAYER_NAME)?.isToggledOn;
    });
  }




  isExpandable = (row:any) => {
      return this.hasChilds(row);
  }


  isChild = (row:any) => {
      return _TableLayerService.getLayerOnRow(row, LAYER_NAME)?.isChild;
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
      return this.options?.groupBy ? row[this.options.groupBy as string] : [];
   }

   private hasChilds(row: any): boolean {
       return !!this.getChilds(row) && this.getChilds(row).length > 0;
     }

}
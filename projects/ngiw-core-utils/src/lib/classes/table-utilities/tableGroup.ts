import { BehaviorSubject, Subject } from "rxjs";
import { IUtils } from "./Iutils";
import { TableDataUtil } from "./tableData";
import { _TableLayerService } from "./tableLayer";


const DATA_LAYER_NAME = 'tableDataUtil';
const TREE_LAYER_NAME = 'tableGroupUtil';

type DataGroupRow = {
    isChild:boolean,
    idx:number,
    isToggled:boolean,
    expendable:boolean
    parent?:DataGroup,
} & any;

type DataGroup = DataGroupRow[];

export class TableGroupUtil implements IUtils { 
  private data:any[] = [];
  public $data:BehaviorSubject<any> = new BehaviorSubject([]);

  setData = (data: any) => {
    this.data = data;
    this.propagateChange();
    return data;
   }

   private propagateChange = () => {
      this.$data.next(this.filterNonExpandedRows());
   }


   expand = (row:any) => {
    const isExpandable = _TableLayerService.getLayerOnRow(row,DATA_LAYER_NAME).hasChilds;
    if (isExpandable) {
      _TableLayerService.getLayerOnRow(row,DATA_LAYER_NAME).childsRef.map((child:any) => {
        _TableLayerService.setLayerOnRow(child,TREE_LAYER_NAME,{
          isToggledOn:true
        });
      });    
    }
    this.propagateChange();
   }

   hide = (row:any) => {
    const isExpandable = _TableLayerService.getLayerOnRow(row,DATA_LAYER_NAME).hasChilds;
    if (isExpandable) {
      _TableLayerService.getLayerOnRow(row,DATA_LAYER_NAME).childsRef.map((child:any) => {
        _TableLayerService.setLayerOnRow(child,TREE_LAYER_NAME,{
          isToggledOn:false
        });
      });   
    }
    this.propagateChange();
   }

filterNonExpandedRows = (limit = -1) => {
  return this.data.filter((row: any) => {
      return !_TableLayerService.getLayerOnRow(row,DATA_LAYER_NAME).isChild || _TableLayerService.getLayerOnRow(row,TREE_LAYER_NAME).isToggledOn;
  });
}


}
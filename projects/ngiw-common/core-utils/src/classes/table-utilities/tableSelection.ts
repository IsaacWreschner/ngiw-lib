/* eslint-disable @typescript-eslint/no-explicit-any */
import { BehaviorSubject} from "rxjs";
import { IUtils } from "./Iutils";

type DataSelectionRow = {
    isChild:boolean,
    idx:number,
    isToggled:boolean,
    expendable:boolean
    parent?:DataSelection,
} & any;

type DataSelection = DataSelection[];

export class TableSelectionUtils implements IUtils {
    private data:any[] = [];

    public $data:BehaviorSubject<any> = new BehaviorSubject([]);

    public setData = (data:any) => {
       this.data = data;
       this.propagateChange();
       return this.data;
    }

    public restSelection = () => {
        this.unselectAll();
     }



    /*public subscribeToDataSelection = (subscriber:any) => {
    }*/

    private propagateChange = () => {
        this.$data.next(this.data); 
    }


   
    toggleRow = (row:any) => {
         if (this.isSelected(row)) {
            this.unselectRow(row);
         } else {
            this.selectRow(row)
         }
    }

    selectRow = (row:any) => {
       row.selected = true;
       this.propagateChange();
    }

    unselectRow = (row:any) => {
        row.selected = false;
        this.propagateChange();
     }

     isSelected = (row:any) => {
        return row.selected;
     }
          
    selectAll = () => {
      this.data.forEach(row => {
        if (row.isSelectable) {
            row.selected = true;
        }  else {
            row.select = false;
        }    
      });
      this.propagateChange();
    }


    unselectAll = () => {
        this.data.forEach(row => {
            row.selected = false;
         });
       this.propagateChange();
    }
}
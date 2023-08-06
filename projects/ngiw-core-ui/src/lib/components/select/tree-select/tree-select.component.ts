import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


type Node = {
  value:any,
  label:any,
  children?:Node[],
  isLeaf?:boolean
}
@Component({
  selector: 'ngiw-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss']
})
export class TreeSelectComponent {
  @Input() width:number = 200;

  @Input() options!: Node[];

  @Input() isParentSelectable:boolean = true;

  @Input() value:any | any[] = 12;
  @Output() valueChanged = new EventEmitter();

  childToParent: { [key: number]: number } = {};

  values: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setChildToParent();  
  }

  ngOnChanges(e:any){
    if (e.options) {
      this.setChildToParent();
    }
  }

  setChildToParent = () => {
    this.options.forEach((parent:Node) => {
      if (this.isParentSelectable && (parent.children as any)[0].label !== 'בחר הכל') {
        parent.children?.unshift(
          {
            label:'בחר הכל', 
            value: JSON.stringify(parent.children.map(child => child.value))
        });
      }
      parent.children?.forEach((child:Node) => {
        child.isLeaf = true;
        this.childToParent[child.value] = parent.value;
      })
    });
    this.setModelFromId();
  }

  setModelFromId = () => {
    let val =  this.value
    if (typeof this.value === 'object') {
          val = this.value[0];
    }
    this.values = [this.childToParent[val], JSON.stringify(this.value)];
    console.log(this.values)
  }



  onChanges(values: string[]): void {
    console.log(values,JSON.parse(values[1]), this.value);
    this.values = values;
    this.valueChanged.emit(values[1]);
  }
}

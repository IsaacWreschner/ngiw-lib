import { Component, EventEmitter, Input, Output } from '@angular/core';


type Node = {
  value:any,
  label:any,
  children?:Node[],
  isLeaf?:boolean
}
@Component({
  selector: 'ngiw-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiSelectComponent {
  @Input() width:number = 200;

  @Input() ngiwOptions!: Node[];

  @Input() ngiwPlaceholder!: string;

  @Input() isParentSelectable:boolean = true;

  @Input() ngiwValue:any | any[] = 12;
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
    this.ngiwOptions.forEach((parent:Node) => {
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
    let val =  this.ngiwValue
    if (typeof this.ngiwValue === 'object') {
          val = this.ngiwValue[0];
    }
    this.values = [this.childToParent[val], JSON.stringify(this.ngiwValue)];
  }



  onChanges(values: string[]): void {
    this.values = values;
    this.valueChanged.emit(values[1]);
  }
}

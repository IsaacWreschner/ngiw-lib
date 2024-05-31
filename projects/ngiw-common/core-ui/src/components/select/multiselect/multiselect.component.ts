/* eslint-disable @typescript-eslint/no-explicit-any */
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
  @Input() ngiwWidth = 200;

  @Input() ngiwOptions!: Node[];

  @Input() ngiwPlaceholder!: string;

  @Input() ngiwIsParentSelectable = true;

  @Input() ngiwValue:any | any[] = null;

  @Input() ngiwTransform: any = null /*{
       value: 'parentId',
       label: 'name',
       children: {
        propInParent: 'branches',
          value: 'id',
          label: 'branch'
       },
       
  }*/
  @Output() valueChanged = new EventEmitter();

  childToParent: { [key: number]: number } = {};


  OnInit(): void {
    console.log(this.ngiwOptions)
    this.transformOptions(this.ngiwOptions, this.ngiwTransform);
    this.setChildToParent();  
  }

  OnChanges(e:any){
    if (e.ngiwOptions) {
      this.transformOptions(e.ngiwOptions.currentValue, this.ngiwTransform);
      this.setChildToParent();
    }
  }

  transformOptions = (options:any, transform:any) => {
    console.log(options)
    options?.forEach((parent:Node) => {
      if (transform?.label) {
        parent.label = (parent as any)[transform.label];
      }
      if (transform?.value) {
        parent.value = (parent as any)[transform.value];
      }
      if (transform?.children && transform?.children?.propInParent) {
        parent.children = (parent as any)[transform.children.propInParent];
        const childTransform = transform.children;
        if (parent.children) {
          this.transformOptions(parent.children, childTransform);
        } 
      } 
    });
  }

  setChildToParent = () => {
    this.ngiwOptions?.forEach((parent:Node) => {
      if (this.ngiwIsParentSelectable && (parent.children as any) && (parent.children as any)[0].label !== 'בחר הכל') {
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
    //this.setModelFromId();
  }

  onValueChanges(values: string[]): void {
    console.log(this.ngiwValue)
    this.valueChanged.emit(values[1]);
  }

  /*setModelFromId = () => {
    let val =  this.ngiwValue
    if (typeof this.ngiwValue === 'object') {
          val = this.ngiwValue[0];
    }
    this.ngiwValue = [this.childToParent[val], JSON.stringify(this.ngiwValue)];
  }*/
}


  


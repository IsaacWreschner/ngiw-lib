/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, input } from '@angular/core';

type Node = {
  value: any;
  label: any;
  children?: Node[];
  isLeaf?: boolean;
};
@Component({
  selector: 'ngiw-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})
export class MultiSelectComponent implements OnInit, OnChanges {
  
  ngiwWidth = input(200);
  ngiwOptions = input<Node[]>([]);
  ngiwPlaceholder = input<string>('');
  ngiwIsParentSelectable = input(true);
  ngiwValue = input<any | any[]>(null);
  ngiwTransform = input<any>(null); /*{
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
  value: any = [];

  ngOnInit(): void {
    console.log(this.ngiwOptions());
    this.transformOptions(this.ngiwOptions(), this.ngiwTransform());
    this.setChildToParent();
  }

  ngOnChanges(e: any) {
    if (e.ngiwOptions) {
      this.transformOptions(e.ngiwOptions.currentValue, this.ngiwTransform());
      this.setChildToParent();
    }
  }

  transformOptions = (options: any, transform: any) => {
    options?.forEach((parent: Node) => {
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
  };

  setChildToParent = () => {
    this.ngiwOptions()?.forEach((parent: Node) => {
      if (!parent.children) {
        parent.isLeaf = true;
        this.childToParent[parent.value] = parent.value;
      }
      if (
        this.ngiwIsParentSelectable() &&
        (parent.children as any) &&
        (parent.children as any)[0].label !== 'בחר הכל'
      ) {
        parent.children?.unshift({
          label: 'בחר הכל',
          value: JSON.stringify(parent.children.map((child) => child.value)),
        });
      }
      parent.children?.forEach((child: Node) => {
        child.isLeaf = true;
        this.childToParent[child.value] = parent.value;
      });
    });
    this.setModelFromId();
  };

  onValueChanges(values: string[]): void {
    console.log(values);
    this.valueChanged.emit(values[values.length - 1]);
  }

  setModelFromId = () => {
    let tmp =  this.ngiwValue()
    if (typeof this.ngiwValue() === 'object') {
          tmp = this.ngiwValue()[0];
    }
    if (this.childToParent[tmp] === tmp) {
      this.value = [tmp];
      return
    }
    //this.value = [this.childToParent[tmp], tmp];
    this.value = [this.childToParent[tmp], JSON.stringify(this.ngiwValue())];
  }
}

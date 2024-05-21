import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngiw-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent {
  @Input() ngiwValue: any = '';
  @Input() ngiwPlaceholder: string = '';
  @Input() ngiwOptions: any[] = [];
  @Input() ngiwTransform: {value: any, label: any} = {} as any;

  @Output() valueChanged = new EventEmitter();
  selectedValue = null; 

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  onValueChanges(value:any): void { 
    console.log(value);
    this.valueChanged.emit(value);
  }

  getLabel = (option:any) => {
    return this.ngiwTransform?.label ? option[this.ngiwTransform.label] : option.label;
  }

  getValue = (option:any) => {
    return this.ngiwTransform?.value ? option[this.ngiwTransform.value] : option.value;
  }
}

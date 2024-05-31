/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'ngiw-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent {
  ngiwValue = input<any>('');
  ngiwPlaceholder = input('');
  ngiwOptions = input<any[]>([]);
  ngiwTransform = input<{
    value: any;
    label: any;
  }>({} as any);

  @Output() valueChanged = new EventEmitter();
  selectedValue = null;

  onValueChanges(value: any): void {
    //console.log(value);
    this.valueChanged.emit(value);
  }

  getLabel = (option: any) => {
    return this.ngiwTransform()?.label
      ? option[this.ngiwTransform().label]
      : option.label;
  };

  getValue = (option: any) => {
    return this.ngiwTransform()?.value
      ? option[this.ngiwTransform().value]
      : option.value;
  };
}

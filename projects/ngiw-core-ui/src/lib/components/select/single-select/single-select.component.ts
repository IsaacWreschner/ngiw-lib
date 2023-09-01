import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngiw-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent {
  @Input() ngiwValue: any = '';
  @Input() ngiwPlaceholder: string = '';
  @Input() ngiwOptions: { id: any, label: string }[] = [];

  @Output() valueChanged = new EventEmitter();
  selectedValue = null; 

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  onChanges(value:any): void { 
    this.valueChanged.emit(value);
  }
}

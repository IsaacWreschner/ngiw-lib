import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'ngiw-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent {
  @Input() ngiwValue: any = '';
  @Input() ngiwPlaceholder: string = '';
  @Input() ngiwOptions: { id: any, label: string }[] = [];

  selectedValue = null; 

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}

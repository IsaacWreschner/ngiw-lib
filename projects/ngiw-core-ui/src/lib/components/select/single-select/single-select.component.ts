import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'ngiw-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent {
  @Input() value: any = '';
  @Input() placeholder: string = ''
  @Input() options: { id: any, label?: string }[] = [];

  selectedValue = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}

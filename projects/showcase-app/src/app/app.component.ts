import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'showcase-app';
  entryValue = 6;
  selectedValue = this.entryValue;
  placeholder = 'Select an option'
  options =  [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' , children: [
      { value: 4, label: 'Option 4' },
      { value: 5, label: 'Option 5' },
      { value: 6, label: 'Option 6'},
      { value: 10, label: 'Option 10' },
      { value: 11, label: 'Option 11'},
    ]},      
  ]; 


  onValueChanged(value: any) { 
    console.log('Value changed:', value);
    this.selectedValue = value;
  }
}

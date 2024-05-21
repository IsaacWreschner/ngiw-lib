import { Component } from '@angular/core';
import { filterData } from 'projects/ngiw-core-utils/src/lib/utils/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'showcase-app';
  selectedValue = null;
  options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]; 

  ngOnInit() {
    
  }

  onValueChanged(value: any) { 
    console.log('Value changed:', value);
    this.selectedValue = value;
  }
}

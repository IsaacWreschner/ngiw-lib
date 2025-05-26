/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, input } from '@angular/core';
import { BaseCdkModel } from '../../models/base-cdk.model';

@Component({
  selector: 'ngiw-base-cdk',
  templateUrl: './base-cdk.component.html',
  styleUrls: ['./base-cdk.component.css'],
})
export class BaseCdkComponent implements OnInit{
  model = input<any>({} as BaseCdkModel);

  private state = {};

  ngOnInit() {
    console.log('BaseCdkComponent initialized');
  }

  fireEvent = (eventName: string, event: any) => {
    const subscribption = this.model().events
 ? this.model().events[`$${eventName}`]
      : null;
    if (subscribption && typeof subscribption == 'function') {
      subscribption(event);
    }
  };

  updateState = (stateProp: 'rowsAmount' | 'data', value: any, event?:any) => {
    this._state[stateProp] = value;
    this.state.emit(this._state);
    const subscribption = this.model().state ? this.model().state[`$${stateProp}`] : null;
    if (subscribption && typeof subscribption == 'function') {
      subscribption(value, event);
    }
  }
}

import { Component, input } from '@angular/core';
import { BaseCdkModel } from '../../models/base-cdk.model';

@Component({
  selector: 'ngiw-base-cdk',
  templateUrl: './base-cdk.component.html',
  styleUrls: ['./base-cdk.component.css'],
})
export class BaseCdkComponent {
  model = input<BaseCdkModel>({} as BaseCdkModel);

  OnInit() {
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
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidthService {
  columnsWidths: any = {}
  columnsCallbacks: { [index: number]: BehaviorSubject<any> } = {};
  constructor() { }

  setWidth(index: number, width: number) {
    this.columnsWidths[index] = width;
    if (this.columnsCallbacks[index]) {

      this.columnsCallbacks[index].next(width)
    }

  }

  getWidth(index: number) {
    return this.columnsWidths[index];
  }

  subscribe(index: number, callback: CallableFunction): Subscription {
    if (!this.columnsCallbacks[index]) {
      this.columnsCallbacks[index] = new BehaviorSubject(null);
    }
    return this.columnsCallbacks[index].subscribe(width => callback(width))
  }
}

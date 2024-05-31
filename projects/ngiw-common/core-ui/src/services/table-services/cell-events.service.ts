import { EventEmitter, Injectable } from '@angular/core';


type TEventType = 'enter' | 'esc' | 'keyboard' | 'arrows';
@Injectable({
  providedIn: 'root'
})
export class CellEventsService {
  event: EventEmitter<
    {
      row: number,
      col: number,
      eventType: TEventType,
      eventObj: any
    }> = new EventEmitter()


  fireEvent(row: number, col: number, eventType: TEventType, eventObj: any) {
    this.event.emit({ row: row, col: col, eventType: eventType, eventObj: eventObj })

  }
}

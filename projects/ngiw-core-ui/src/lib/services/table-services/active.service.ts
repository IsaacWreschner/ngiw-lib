import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {
  activeCell: BehaviorSubject<{ row: number, col: number }> = new BehaviorSubject(null as any);
  constructor() { }

  setActive(row: number, col: number) {
    this.activeCell.next({ row: row, col: col });

  }

  getActive() {
    return this.activeCell;
  }


}

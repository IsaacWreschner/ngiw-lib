import { TestBed } from '@angular/core/testing';

import { CellEventsService } from './cell-events.service';

describe('CellEventsService', () => {
  let service: CellEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NgiwCommonService } from './ngiw-common.service';

describe('NgiwCommonService', () => {
  let service: NgiwCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgiwCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

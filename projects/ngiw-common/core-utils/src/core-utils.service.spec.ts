import { TestBed } from '@angular/core/testing';

import { CoreUtilsService } from './core-utils.service';

describe('CoreUtilsService', () => {
  let service: CoreUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

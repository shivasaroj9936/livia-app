import { TestBed } from '@angular/core/testing';

import { UtcDateFormatService } from './utc-date-format.service';

describe('UtcDateFormatService', () => {
  let service: UtcDateFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtcDateFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

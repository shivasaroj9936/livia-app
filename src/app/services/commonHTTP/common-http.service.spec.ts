import { TestBed } from '@angular/core/testing';

import { CommonHTTPService } from './common-http.service';

describe('CommonHTTPService', () => {
  let service: CommonHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

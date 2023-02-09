import { TestBed } from '@angular/core/testing';

import { ForgotPassowordService } from './forgot-passoword.service';

describe('ForgotPassowordService', () => {
  let service: ForgotPassowordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPassowordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

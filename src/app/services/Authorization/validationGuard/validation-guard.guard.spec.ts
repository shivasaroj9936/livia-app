import { TestBed } from '@angular/core/testing';

import { ValidationGuardGuard } from './validation-guard.guard';

describe('ValidationGuardGuard', () => {
  let guard: ValidationGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidationGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

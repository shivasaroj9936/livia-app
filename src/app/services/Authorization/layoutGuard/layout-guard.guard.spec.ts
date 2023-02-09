import { TestBed } from '@angular/core/testing';

import { LayoutGuardGuard } from './layout-guard.guard';

describe('LayoutGuardGuard', () => {
  let guard: LayoutGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LayoutGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

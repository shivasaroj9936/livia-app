import { TestBed } from '@angular/core/testing';

import { DashboardGuardGuard } from './dashboard-guard.guard';

describe('DashboardGuardGuard', () => {
  let guard: DashboardGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

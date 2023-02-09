import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EClaimsComponent } from './e-claims.component';

describe('EClaimsComponent', () => {
  let component: EClaimsComponent;
  let fixture: ComponentFixture<EClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

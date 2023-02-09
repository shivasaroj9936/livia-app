import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTestComponent } from './accept-test.component';

describe('AcceptTestComponent', () => {
  let component: AcceptTestComponent;
  let fixture: ComponentFixture<AcceptTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

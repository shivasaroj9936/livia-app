import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebManagementComponent } from './web-management.component';

describe('WebManagementComponent', () => {
  let component: WebManagementComponent;
  let fixture: ComponentFixture<WebManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageReportsComponent } from './image-reports.component';

describe('ImageReportsComponent', () => {
  let component: ImageReportsComponent;
  let fixture: ComponentFixture<ImageReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

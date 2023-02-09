import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPhotoComponent } from './lab-photo.component';

describe('LabPhotoComponent', () => {
  let component: LabPhotoComponent;
  let fixture: ComponentFixture<LabPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

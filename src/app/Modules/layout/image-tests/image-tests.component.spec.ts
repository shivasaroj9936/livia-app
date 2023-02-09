import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTestsComponent } from './image-tests.component';

describe('ImageTestsComponent', () => {
  let component: ImageTestsComponent;
  let fixture: ComponentFixture<ImageTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

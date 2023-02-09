import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRequestComponent } from './image-request.component';

describe('ImageRequestComponent', () => {
  let component: ImageRequestComponent;
  let fixture: ComponentFixture<ImageRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSetHomeComponent } from './image-set-home.component';

describe('ImageSetHomeComponent', () => {
  let component: ImageSetHomeComponent;
  let fixture: ComponentFixture<ImageSetHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSetHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

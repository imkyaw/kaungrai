import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSetDetailComponent } from './image-set-detail.component';

describe('ImageSetDetailComponent', () => {
  let component: ImageSetDetailComponent;
  let fixture: ComponentFixture<ImageSetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

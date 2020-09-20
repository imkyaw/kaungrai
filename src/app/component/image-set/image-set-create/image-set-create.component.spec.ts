import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSetCreateComponent } from './image-set-create.component';

describe('ImageSetCreateComponent', () => {
  let component: ImageSetCreateComponent;
  let fixture: ComponentFixture<ImageSetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

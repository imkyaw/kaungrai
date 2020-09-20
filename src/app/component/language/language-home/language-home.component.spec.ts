import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageHomeComponent } from './language-home.component';

describe('LanguageHomeComponent', () => {
  let component: LanguageHomeComponent;
  let fixture: ComponentFixture<LanguageHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

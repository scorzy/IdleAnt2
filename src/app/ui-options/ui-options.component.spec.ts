import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiOptionsComponent } from './ui-options.component';

describe('UiOptionsComponent', () => {
  let component: UiOptionsComponent;
  let fixture: ComponentFixture<UiOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

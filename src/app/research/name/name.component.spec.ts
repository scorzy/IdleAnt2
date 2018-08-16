import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RomanPipe } from "./../../roman.pipe";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormatPipe } from "../../format.pipe";
import { NameComponent } from "./name.component";

describe("NameComponent", () => {
  let component: NameComponent;
  let fixture: ComponentFixture<NameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [NameComponent, FormatPipe, RomanPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

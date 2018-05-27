import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitLineComponent } from "./unit-line.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormatPipe } from "../../format.pipe";

describe("UnitLineComponent", () => {
  let component: UnitLineComponent;
  let fixture: ComponentFixture<UnitLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ClarityModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [UnitLineComponent, FormatPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

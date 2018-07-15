import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UnitTabsComponent } from "./unit-tabs.component";
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from "ngx-toastr";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormatPipe } from "../format.pipe";
import { EndInPipe } from "../end-in.pipe";
import { FullUnit } from "../model/full-unit";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("UnitTabsComponent", () => {
  let component: UnitTabsComponent;
  let fixture: ComponentFixture<UnitTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ClarityModule.forRoot(),
        ToastrModule.forRoot(),
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [UnitTabsComponent, FormatPipe, EndInPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTabsComponent);
    component = fixture.componentInstance;
    component.unit = new FullUnit("", "", "");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
